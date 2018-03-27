import CreatorBase from './CreatorBase';
import CreatorIntermediary from './CreatorIntermediary';
import CreatorChild from './CreatorChild';
import InsertValue from './InsertValue';
import UpdaterBase from './UpdaterBase';
import ValueSetManager from '../lib/ValueSetManager';
import shortcutMetadata from './Shortcuts.json';
import Lang from 'lodash';

function addTriggerForKey(trigger) {
    if (trigger.name) {
        this.shortcutMap[trigger.name.toLowerCase()] = this.shortcuts[this.currentShortcut.id];
        this.triggersPerShortcut[this.currentShortcut.id].push(trigger);
    } else {
        // args optional
        let args = trigger["args"];
        let category = trigger["category"];
        let valueSet = trigger["valueSet"];
        let prefix = trigger["prefix"];
        let list;
        if (args) {
            list = ValueSetManager.getValueList(category, valueSet, ...args);
        } else {
            list = ValueSetManager.getValueList(category, valueSet);
        }
        if (this.currentShortcut["knownParentContexts"]) {
            const parent = this.currentShortcut["knownParentContexts"];
            const parentShortcutMD = this.shortcuts[parent];
            const voa = parentShortcutMD["valueObjectAttributes"].find((item) => {
                return (item.childShortcut === this.currentShortcut.id);
            });
            if (!Lang.isUndefined(voa)) {
                voa["numberOfItems"] = list.length;
            }
        }
        if (prefix) {
            list = list.map((t) => { return { "name": prefix + t.name, "description":t.description }; });
        }
        list.forEach(addTriggerForKey, this);
    }
}

class ShortcutManager {
    shortcutDefinitions = [];
    shortcutMap = {};
    
    getAllShortcutDefinitions() {
        return this.shortcutDefinitions;
    }
    
    getAllStringTriggers() {
        return Object.keys(this.shortcutMap);
    }
    
    constructor(shortcutList) {
        let shortcuts = shortcutList || [];
        this.shortcutsToSupportList = shortcuts;
        this.loadShortcutMetadata(shortcuts, shortcutMetadata);
    }
    
    getSupportedShortcuts() {
        return this.shortcutsToSupportList;
    }
    
    createShortcut(definition, trigger, patient, shortcutData, onUpdate) {
        let className;
        let metadata;
        if (!Lang.isNull(definition)) {
            metadata = definition;
        } else {
            metadata = this.shortcutMap[trigger.toLowerCase()];
        }
        if (Lang.isUndefined(metadata)) {
            throw new Error("Unknown trigger '" + trigger + "'. No structured phrase found.");
        }
        className = metadata["type"];
        let newShortcut;
        if (className === "CreatorBase") {
            newShortcut = new CreatorBase(onUpdate, metadata, patient, shortcutData);
        } else if (className === "UpdaterBase") {
            newShortcut = new UpdaterBase(onUpdate, metadata, patient, shortcutData);
        } else if (className === "CreatorChild") {
            newShortcut = new CreatorChild(onUpdate, metadata, patient, shortcutData);
        } else if (className === "CreatorIntermediary") {
            newShortcut = new CreatorIntermediary(onUpdate, metadata, patient, shortcutData);
        } else if (className === "InsertValue") {
            newShortcut = new InsertValue(onUpdate, metadata, patient, shortcutData);
        } else {
            console.error("unsupported type: " + className);
            return null;
        }
        newShortcut.initiatingTrigger = trigger;
        return newShortcut;
    }
    
    loadShortcutMetadata(shortcutList, shortcutMetadata) {
        this.childShortcuts = {};
        this.shortcuts = {};
        this.triggersPerShortcut = {};
        let disabled;
        shortcutMetadata.forEach((item) => {
            disabled = item["disabled"] || false;
            if (!disabled && (shortcutList.length === 0 || shortcutList.includes(item["id"]))) {
                this.shortcuts[item["id"]] = item;

                // add as child to its known parent
                if (item["knownParentContexts"]) {
                    const parent = item["knownParentContexts"];
                    let list = this.childShortcuts[parent];
                    if (Lang.isUndefined(list)) {
                        list = [];
                        this.childShortcuts[parent] = list;
                    }
                    if (!list.includes(item.id)) {
                        list.push(item.id);
                    }
                }
                
                // add known children to it
                if (item["valueObjectAttributes"]) {
                    let list = this.childShortcuts[item.id];
                    if (Lang.isUndefined(list)) {
                        list = [];
                        this.childShortcuts[item.id] = list;
                    }
                    let voas = item["valueObjectAttributes"];
                    let childShortcutId;
                    voas.forEach((voa) => {
                        childShortcutId = voa["childShortcut"];
                        if (!Lang.isUndefined(childShortcutId)) {
                            if (childShortcutId && !list.includes(childShortcutId)) {
                                list.push(childShortcutId);
                            }
                        }
                    });
                }
                if (item["idAttributes"]) {
                    let list = this.childShortcuts[item.id];
                    if (Lang.isUndefined(list)) {
                        list = [];
                        this.childShortcuts[item.id] = list;
                    }
                    let voas = item["idAttributes"];
                    let childShortcutId;
                    voas.forEach((voa) => {
                        childShortcutId = voa["childShortcut"];
                        if (!Lang.isUndefined(childShortcutId)) {
                            if (childShortcutId && !list.includes(childShortcutId)) {
                                list.push(childShortcutId);
                            }
                        }
                    });
                }
                
                this.shortcutDefinitions.push(item);
                // build up trigger to shortcut mapping
                const triggers = item["stringTriggers"];
                this.currentShortcut = item;
                this.triggersPerShortcut[this.currentShortcut.id] = [];
                if (Lang.isArray(triggers)) {
                    triggers.forEach(addTriggerForKey, this);
                } else {
                    addTriggerForKey.bind(this)(triggers);
                }
            }
        });
    }

    getValidChildShortcutsInContext(context, recurse = false) {
        const currentContextId = context.getId();
        // Let's get all child shortcuts registered in shortcuts metadata via the current context
        // They can be registered in 2 ways:
        //      as a childShortcut on valueObjectAttributes
        //      OR as a shortcut having this context shortcut as a parent via knownParentContexts
        let contextValueObjectEntryType;
        let result = this.childShortcuts[currentContextId], parentAttribute;
        let value, parentVOAs, voa, isSettable, isSet, parentIdVOAs;
        if (Lang.isUndefined(result)) return [];
        result = result.filter((shortcutId) => {
            // to determine if a shortcut should be valid right now, we need to get its value
            // from its parent. If it's settable and not set, it's valid. If it's not settable, then it's
            // valid if it is set!
            contextValueObjectEntryType = this.shortcuts[shortcutId]["contextValueObjectEntryType"];

            if (Lang.isUndefined(contextValueObjectEntryType) || context.getValueObject().entryInfo.entryType.value === contextValueObjectEntryType) {
                parentAttribute = this.shortcuts[shortcutId]["parentAttribute"];
                if (Lang.isUndefined(parentAttribute)) return true;
                parentVOAs = this.shortcuts[currentContextId]["valueObjectAttributes"];
                parentIdVOAs = this.shortcuts[currentContextId]["idAttributes"];
                voa = parentVOAs.filter((item) => item.name === parentAttribute)[0];
                if (!voa) voa = parentIdVOAs.filter((item) => item.name === parentAttribute)[0];
                value = context.getAttributeValue(parentAttribute);
                isSet = context.getAttributeIsSet(parentAttribute);
                isSettable = Lang.isUndefined(voa.isSettable) ? false : (voa.isSettable === "true");
                if (isSettable) { // if is settable and not set, then we want to include the shortcut
                    if (Lang.isArray(value)) return value.length < this.triggersPerShortcut[shortcutId].length;
                    return (!isSet);
                } else {
                    if (Lang.isUndefined(value) || value === null) return false;
                    if (Lang.isBoolean(value)) return !value;
                    return value.length > 0;
                }
            } else {
                return false;
            }
        });
		if (recurse) {
			context.getChildren().forEach((subcontext) => {
				result = result.concat(this.getValidChildShortcutsInContext(subcontext, true));
			});
		}        
        return result;
    }
    
    // context is optional
    getTriggersForShortcut(shortcutId, context) {
        if (!Lang.isUndefined(context)) {
            const currentContextId = context.getId();
            const parentAttribute = this.shortcuts[shortcutId]["parentAttribute"];
            if (Lang.isUndefined(parentAttribute)) return this.triggersPerShortcut[shortcutId];
            const parentVOAs = this.shortcuts[currentContextId]["valueObjectAttributes"];
            const parentIdVOAs = this.shortcuts[currentContextId]["idAttributes"];
            let voa = parentVOAs.filter((item) => item.name === parentAttribute)[0];
            if (!voa) voa = parentIdVOAs.filter((item) => item.name === parentAttribute)[0];
            const value = context.getAttributeValue(parentAttribute);
            const isSettable = Lang.isUndefined(voa.isSettable) ? false : (voa.isSettable === "true");
            if (isSettable) { // if is settable and not set, then we want to include the shortcut
                if (value !== null && Lang.isArray(value)) {
                    let list = this.triggersPerShortcut[shortcutId];
                    list = list.filter((item) => {
                        return !value.includes(item.name.substring(1));
                    });
                    return list;
                }
            }
        }
        return this.triggersPerShortcut[shortcutId];
    }
    
    getShortcutGroupName(shortcutId) {
        return this.shortcuts[shortcutId]["shortcutGroupName"];
    }
}

export default ShortcutManager;