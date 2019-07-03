// GENERATED CODE
// Manual modification is NOT RECOMMENDED as changes will be overwritten the next time the class is generated.

import { setPropertiesFromJSON, uuid, FHIRHelper } from '../../json-helper';

import ClassRegistry from '../../ClassRegistry';

import Observation from './Observation';

/**
 * Generated class for shr.base.NonLaboratoryObservation.
 * @extends Observation
 */
class NonLaboratoryObservation extends Observation {

  /**
   * Get the entry information.
   * @returns {Entry} The shr.base.Entry
   */
  get entryInfo() {
    return this._entryInfo;
  }

  /**
   * Set the entry information.
   * @param {Entry} entryInfo - The shr.base.Entry
   */
  set entryInfo(entryInfo) {
    this._entryInfo = entryInfo;
  }

  /**
   * Set the entry information and return 'this' for chaining.
   * @param {Entry} entryInfo - The shr.base.Entry
   * @returns {NonLaboratoryObservation} this.
   */
  withEntryInfo(entryInfo) {
    this.entryInfo = entryInfo; return this;
  }

  /**
   * Deserializes JSON data to an instance of the NonLaboratoryObservation class.
   * The JSON must be valid against the NonLaboratoryObservation JSON schema, although this is not validated by the function.
   * @param {object} json - the JSON data to deserialize
   * @returns {NonLaboratoryObservation} An instance of NonLaboratoryObservation populated with the JSON data
   */
  static fromJSON(json={}) {
    const klass = ClassRegistry.get('shr.base', 'NonLaboratoryObservation');
    const inst = new klass();
    setPropertiesFromJSON(inst, json);
    return inst;
  }

  /**
   * Serializes an instance of the NonLaboratoryObservation class to a JSON object.
   * The JSON is expected to be valid against the NonLaboratoryObservation JSON schema, but no validation checks are performed.
   * @returns {object} a JSON object populated with the data from the element
   */
  toJSON() {
    const inst = this._entryInfo.toJSON();
    inst['EntryType'] = { 'Value' : 'http://standardhealthrecord.org/spec/shr/base/NonLaboratoryObservation' };
    if (this.narrative != null) {
      inst['Narrative'] = typeof this.narrative.toJSON === 'function' ? this.narrative.toJSON() : this.narrative;
    }
    if (this.language != null) {
      inst['Language'] = typeof this.language.toJSON === 'function' ? this.language.toJSON() : this.language;
    }
    if (this.metadata != null) {
      inst['Metadata'] = typeof this.metadata.toJSON === 'function' ? this.metadata.toJSON() : this.metadata;
    }
    if (this.findingResult != null) {
      inst['FindingResult'] = typeof this.findingResult.toJSON === 'function' ? this.findingResult.toJSON() : this.findingResult;
    }
    if (this.findingTopicCode != null) {
      inst['FindingTopicCode'] = typeof this.findingTopicCode.toJSON === 'function' ? this.findingTopicCode.toJSON() : this.findingTopicCode;
    }
    if (this.exceptionValue != null) {
      inst['ExceptionValue'] = typeof this.exceptionValue.toJSON === 'function' ? this.exceptionValue.toJSON() : this.exceptionValue;
    }
    if (this.referenceRange != null) {
      inst['ReferenceRange'] = typeof this.referenceRange.toJSON === 'function' ? this.referenceRange.toJSON() : this.referenceRange;
    }
    if (this.patient != null) {
      inst['Patient'] = typeof this.patient.toJSON === 'function' ? this.patient.toJSON() : this.patient;
    }
    if (this.encounter != null) {
      inst['Encounter'] = typeof this.encounter.toJSON === 'function' ? this.encounter.toJSON() : this.encounter;
    }
    if (this.findingStatus != null) {
      inst['FindingStatus'] = typeof this.findingStatus.toJSON === 'function' ? this.findingStatus.toJSON() : this.findingStatus;
    }
    if (this.specificFocusOfFinding != null) {
      inst['SpecificFocusOfFinding'] = typeof this.specificFocusOfFinding.toJSON === 'function' ? this.specificFocusOfFinding.toJSON() : this.specificFocusOfFinding;
    }
    if (this.findingMethod != null) {
      inst['FindingMethod'] = typeof this.findingMethod.toJSON === 'function' ? this.findingMethod.toJSON() : this.findingMethod;
    }
    if (this.relevantTime != null) {
      inst['RelevantTime'] = typeof this.relevantTime.toJSON === 'function' ? this.relevantTime.toJSON() : this.relevantTime;
    }
    if (this.nonIndependentFinding != null) {
      inst['NonIndependentFinding'] = this.nonIndependentFinding.map(f => f.toJSON());
    }
    if (this.category != null) {
      inst['Category'] = typeof this.category.toJSON === 'function' ? this.category.toJSON() : this.category;
    }
    if (this.anatomicalLocation != null) {
      inst['AnatomicalLocation'] = typeof this.anatomicalLocation.toJSON === 'function' ? this.anatomicalLocation.toJSON() : this.anatomicalLocation;
    }
    if (this.commentOrDescription != null) {
      inst['CommentOrDescription'] = typeof this.commentOrDescription.toJSON === 'function' ? this.commentOrDescription.toJSON() : this.commentOrDescription;
    }
    if (this.interpretation != null) {
      inst['Interpretation'] = typeof this.interpretation.toJSON === 'function' ? this.interpretation.toJSON() : this.interpretation;
    }
    if (this.device != null) {
      inst['Device'] = typeof this.device.toJSON === 'function' ? this.device.toJSON() : this.device;
    }
    if (this.panelMembers != null) {
      inst['PanelMembers'] = typeof this.panelMembers.toJSON === 'function' ? this.panelMembers.toJSON() : this.panelMembers;
    }
    return inst;
  }

  /**
   * Deserializes FHIR JSON data to an instance of the NonLaboratoryObservation class.
   * The FHIR must be valid against the NonLaboratoryObservation FHIR profile, although this is not validated by the function.
   * @param {object} fhir - the FHIR JSON data to deserialize
   * @param {string} fhirType - the type of the FHIR object that was passed in, in case not otherwise identifiable from the object itself
   * @param {string} shrId - a unique, persistent, permanent identifier for the overall health record belonging to the Patient; will be auto-generated if not provided
   * @param {Array} allEntries - the list of all entries that references in 'fhir' refer to
   * @param {object} mappedResources - any resources that have already been mapped to SHR objects. Format is { fhir_key: {shr_obj} }
   * @param {Array} referencesOut - list of all SHR ref() targets that were instantiated during this function call
   * @param {boolean} asExtension - Whether the provided instance is an extension
   * @returns {NonLaboratoryObservation} An instance of NonLaboratoryObservation populated with the FHIR data
   */
  static fromFHIR(fhir, fhirType, shrId=uuid(), allEntries=[], mappedResources={}, referencesOut=[], asExtension=false) {
    const klass = ClassRegistry.get('shr.base', 'NonLaboratoryObservation');
    const inst = new klass();
    inst.entryInfo = FHIRHelper.createInstanceFromFHIR('shr.base.Entry', {}, null);
    inst.entryInfo.shrId = FHIRHelper.createInstanceFromFHIR('shr.base.ShrId', shrId, 'string');
    inst.entryInfo.entryId = FHIRHelper.createInstanceFromFHIR('shr.base.EntryId', fhir['id'] || uuid(), 'string');
    inst.entryInfo.entryType = FHIRHelper.createInstanceFromFHIR('shr.base.EntryType', 'http://standardhealthrecord.org/spec/shr/base/NonLaboratoryObservation', 'uri');
    if (fhir['meta'] != null) {
      if (fhir['meta']['versionId'] != null) {
        inst.metadata = inst.metadata || FHIRHelper.createInstanceFromFHIR('shr.base.Metadata', {}, null, shrId);
        inst.metadata.versionId = FHIRHelper.createInstanceFromFHIR('shr.core.VersionId', fhir['meta']['versionId'], 'id', shrId, allEntries, mappedResources, referencesOut, false);
      }
      if (fhir['meta']['lastUpdated'] != null) {
        inst.metadata = inst.metadata || FHIRHelper.createInstanceFromFHIR('shr.base.Metadata', {}, null, shrId);
        inst.metadata.lastUpdated = FHIRHelper.createInstanceFromFHIR('shr.base.LastUpdated', fhir['meta']['lastUpdated'], 'instant', shrId, allEntries, mappedResources, referencesOut, false);
      }
      for (const fhir_meta_security of fhir['meta']['security'] || []) {
        inst.metadata = inst.metadata || FHIRHelper.createInstanceFromFHIR('shr.base.Metadata', {}, null, shrId);
        inst.metadata.securityLabel = inst.metadata.securityLabel || [];
        const inst_metadata_securityLabel = FHIRHelper.createInstanceFromFHIR('shr.base.SecurityLabel', fhir_meta_security, 'Coding', shrId, allEntries, mappedResources, referencesOut, false);
        inst.metadata.securityLabel.push(inst_metadata_securityLabel);
      }
      for (const fhir_meta_tag of fhir['meta']['tag'] || []) {
        inst.metadata = inst.metadata || FHIRHelper.createInstanceFromFHIR('shr.base.Metadata', {}, null, shrId);
        inst.metadata.tag = inst.metadata.tag || [];
        const inst_metadata_tag = FHIRHelper.createInstanceFromFHIR('shr.base.Tag', fhir_meta_tag, 'Coding', shrId, allEntries, mappedResources, referencesOut, false);
        inst.metadata.tag.push(inst_metadata_tag);
      }
    }
    if (fhir['language'] != null) {
      inst.language = FHIRHelper.createInstanceFromFHIR('shr.core.Language', fhir['language'], 'code', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['text'] != null) {
      inst.narrative = FHIRHelper.createInstanceFromFHIR('shr.base.Narrative', fhir['text'], 'Narrative', shrId, allEntries, mappedResources, referencesOut, false);
    }
    for (const fhir_extension of fhir['extension'] || []) {
      if (fhir_extension['url'] != null && fhir_extension['url'] === 'http://hl7.org/fhir/StructureDefinition/body-site-instance') {
        inst.anatomicalLocation = inst.anatomicalLocation || FHIRHelper.createInstanceFromFHIR('shr.core.AnatomicalLocation', {}, null, shrId);
        inst.anatomicalLocation.value = FHIRHelper.createInstanceFromFHIR('shr.core.AnatomicalLocationStructured', fhir_extension, 'Extension', shrId, allEntries, mappedResources, referencesOut, true);
      }
      if (fhir_extension['url'] != null && fhir_extension['url'] === 'http://example.com/fhir/StructureDefinition/shr-base-SpecificFocusOfFinding-extension') {
        inst.specificFocusOfFinding = FHIRHelper.createInstanceFromFHIR('shr.base.SpecificFocusOfFinding', fhir_extension, 'Extension', shrId, allEntries, mappedResources, referencesOut, true);
      }
    }
    if (fhir['status'] != null) {
      inst.findingStatus = FHIRHelper.createInstanceFromFHIR('shr.base.FindingStatus', fhir['status'], 'code', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['category'] != null) {
      inst.category = FHIRHelper.createInstanceFromFHIR('shr.core.Category', fhir['category'], 'CodeableConcept', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['code'] != null) {
      inst.findingTopicCode = FHIRHelper.createInstanceFromFHIR('shr.base.FindingTopicCode', fhir['code'], 'CodeableConcept', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['subject'] != null) {
      const entryId = fhir['subject']['reference'];
      if (!mappedResources[entryId]) {
        const referencedEntry = allEntries.find(e => e.fullUrl === entryId);
        if (referencedEntry) {
          mappedResources[entryId] = FHIRHelper.createInstanceFromFHIR('shr.entity.Patient', referencedEntry['resource'], 'undefined', shrId, allEntries, mappedResources, referencesOut);
        }
      }
      inst.patient = mappedResources[entryId];
    }
    if (fhir['encounter'] != null) {
      const entryId = fhir['encounter']['reference'];
      if (!mappedResources[entryId]) {
        const referencedEntry = allEntries.find(e => e.fullUrl === entryId);
        if (referencedEntry) {
          mappedResources[entryId] = FHIRHelper.createInstanceFromFHIR('shr.encounter.Encounter', referencedEntry['resource'], 'undefined', shrId, allEntries, mappedResources, referencesOut);
        }
      }
      inst.encounter = mappedResources[entryId];
    }
    if (fhir['effectiveDateTime'] != null) {
      inst.relevantTime = FHIRHelper.createInstanceFromFHIR('shr.base.RelevantTime', fhir['effectiveDateTime'], 'dateTime', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['valueCodeableConcept'] != null) {
      inst.findingResult = FHIRHelper.createInstanceFromFHIR('shr.base.FindingResult', fhir['valueCodeableConcept'], 'CodeableConcept', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['valueQuantity'] != null) {
      inst.findingResult = FHIRHelper.createInstanceFromFHIR('shr.base.FindingResult', fhir['valueQuantity'], 'Quantity', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['valueString'] != null) {
      inst.findingResult = FHIRHelper.createInstanceFromFHIR('shr.base.FindingResult', fhir['valueString'], 'string', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['valueRange'] != null) {
      inst.findingResult = FHIRHelper.createInstanceFromFHIR('shr.base.FindingResult', fhir['valueRange'], 'Range', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['valueRatio'] != null) {
      inst.findingResult = FHIRHelper.createInstanceFromFHIR('shr.base.FindingResult', fhir['valueRatio'], 'Ratio', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['valueTime'] != null) {
      inst.findingResult = FHIRHelper.createInstanceFromFHIR('shr.base.FindingResult', fhir['valueTime'], 'time', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['valueDateTime'] != null) {
      inst.findingResult = FHIRHelper.createInstanceFromFHIR('shr.base.FindingResult', fhir['valueDateTime'], 'dateTime', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['dataAbsentReason'] != null) {
      inst.exceptionValue = FHIRHelper.createInstanceFromFHIR('shr.base.ExceptionValue', fhir['dataAbsentReason'], 'CodeableConcept', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['interpretation'] != null) {
      inst.interpretation = FHIRHelper.createInstanceFromFHIR('shr.base.Interpretation', fhir['interpretation'], 'CodeableConcept', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['comments'] != null) {
      inst.commentOrDescription = FHIRHelper.createInstanceFromFHIR('shr.core.CommentOrDescription', fhir['comments'], 'string', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['bodySite'] != null) {
      inst.anatomicalLocation = inst.anatomicalLocation || FHIRHelper.createInstanceFromFHIR('shr.core.AnatomicalLocation', {}, null, shrId);
      inst.anatomicalLocation.value = FHIRHelper.createInstanceFromFHIR('shr.core.AnatomicalLocationPrecoordinated', fhir['bodySite'], 'CodeableConcept', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['method'] != null) {
      inst.findingMethod = FHIRHelper.createInstanceFromFHIR('shr.base.FindingMethod', fhir['method'], 'CodeableConcept', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['device'] != null) {
      const entryId = fhir['device']['reference'];
      if (!mappedResources[entryId]) {
        const referencedEntry = allEntries.find(e => e.fullUrl === entryId);
        if (referencedEntry) {
          mappedResources[entryId] = FHIRHelper.createInstanceFromFHIR('shr.entity.Device', referencedEntry['resource'], 'undefined', shrId, allEntries, mappedResources, referencesOut);
        }
      }
      inst.device = mappedResources[entryId];
    }
    if (fhir['referenceRange'] != null && fhir['referenceRange'][0] != null) {
      inst.referenceRange = FHIRHelper.createInstanceFromFHIR('shr.base.ReferenceRange', fhir['referenceRange'][0], 'BackboneElement', shrId, allEntries, mappedResources, referencesOut, false);
      if (fhir['referenceRange'][0]['low'] != null) {
        inst.referenceRange.range = inst.referenceRange.range || FHIRHelper.createInstanceFromFHIR('shr.core.Range', {}, null, shrId);
        inst.referenceRange.range.lowerBound = FHIRHelper.createInstanceFromFHIR('shr.core.LowerBound', fhir['referenceRange'][0]['low'], 'Quantity', shrId, allEntries, mappedResources, referencesOut, false);
      }
      if (fhir['referenceRange'][0]['high'] != null) {
        inst.referenceRange.range = inst.referenceRange.range || FHIRHelper.createInstanceFromFHIR('shr.core.Range', {}, null, shrId);
        inst.referenceRange.range.upperBound = FHIRHelper.createInstanceFromFHIR('shr.core.UpperBound', fhir['referenceRange'][0]['high'], 'Quantity', shrId, allEntries, mappedResources, referencesOut, false);
      }
      if (fhir['referenceRange'][0]['meaning'] != null) {
        inst.referenceRange.type = FHIRHelper.createInstanceFromFHIR('shr.core.Type', fhir['referenceRange'][0]['meaning'], 'CodeableConcept', shrId, allEntries, mappedResources, referencesOut, false);
      }
    }
    if (fhir['related'] != null && fhir['related'][0] != null) {
      inst.panelMembers = FHIRHelper.createInstanceFromFHIR('shr.base.PanelMembers', fhir['related'][0], 'BackboneElement', shrId, allEntries, mappedResources, referencesOut, false);
      if (fhir['related'][0]['target'] != null) {
        inst.panelMembers.observation = inst.panelMembers.observation || [];
        const entryId = fhir['related'][0]['target']['reference'];
        if (!mappedResources[entryId]) {
          const referencedEntry = allEntries.find(e => e.fullUrl === entryId);
          if (referencedEntry) {
            mappedResources[entryId] = FHIRHelper.createInstanceFromFHIR('shr.base.Observation', referencedEntry['resource'], 'undefined', shrId, allEntries, mappedResources, referencesOut);
          }
        }
        let inst_panelMembers_observation;
        if (mappedResources[entryId]) {
          inst_panelMembers_observation = FHIRHelper.createReference(mappedResources[entryId], referencesOut);
        }
        else {
          const entryType = 'http://standardhealthrecord.org/spec/shr/base/Observation';
          inst_panelMembers_observation = FHIRHelper.createReferenceWithoutObject(shrId, entryId, entryType);
        }
        inst.panelMembers.observation.push(inst_panelMembers_observation);
      }
    }
    for (const fhir_component of fhir['component'] || []) {
      inst.nonIndependentFinding = inst.nonIndependentFinding || [];
      const inst_nonIndependentFinding = FHIRHelper.createInstanceFromFHIR('shr.base.NonIndependentFinding', fhir_component, 'BackboneElement', shrId, allEntries, mappedResources, referencesOut, false);
      inst.nonIndependentFinding.push(inst_nonIndependentFinding);
      if (fhir_component['code'] != null) {
        inst_nonIndependentFinding.findingTopicCode = FHIRHelper.createInstanceFromFHIR('shr.base.FindingTopicCode', fhir_component['code'], 'CodeableConcept', shrId, allEntries, mappedResources, referencesOut, false);
      }
      if (fhir_component['valueCodeableConcept'] != null) {
        inst_nonIndependentFinding.findingResult = FHIRHelper.createInstanceFromFHIR('shr.base.FindingResult', fhir_component['valueCodeableConcept'], 'CodeableConcept', shrId, allEntries, mappedResources, referencesOut, false);
      }
      if (fhir_component['valueQuantity'] != null) {
        inst_nonIndependentFinding.findingResult = FHIRHelper.createInstanceFromFHIR('shr.base.FindingResult', fhir_component['valueQuantity'], 'Quantity', shrId, allEntries, mappedResources, referencesOut, false);
      }
      if (fhir_component['valueString'] != null) {
        inst_nonIndependentFinding.findingResult = FHIRHelper.createInstanceFromFHIR('shr.base.FindingResult', fhir_component['valueString'], 'string', shrId, allEntries, mappedResources, referencesOut, false);
      }
      if (fhir_component['valueRange'] != null) {
        inst_nonIndependentFinding.findingResult = FHIRHelper.createInstanceFromFHIR('shr.base.FindingResult', fhir_component['valueRange'], 'Range', shrId, allEntries, mappedResources, referencesOut, false);
      }
      if (fhir_component['valueRatio'] != null) {
        inst_nonIndependentFinding.findingResult = FHIRHelper.createInstanceFromFHIR('shr.base.FindingResult', fhir_component['valueRatio'], 'Ratio', shrId, allEntries, mappedResources, referencesOut, false);
      }
      if (fhir_component['valueTime'] != null) {
        inst_nonIndependentFinding.findingResult = FHIRHelper.createInstanceFromFHIR('shr.base.FindingResult', fhir_component['valueTime'], 'time', shrId, allEntries, mappedResources, referencesOut, false);
      }
      if (fhir_component['valueDateTime'] != null) {
        inst_nonIndependentFinding.findingResult = FHIRHelper.createInstanceFromFHIR('shr.base.FindingResult', fhir_component['valueDateTime'], 'dateTime', shrId, allEntries, mappedResources, referencesOut, false);
      }
      if (fhir_component['dataAbsentReason'] != null) {
        inst_nonIndependentFinding.exceptionValue = FHIRHelper.createInstanceFromFHIR('shr.base.ExceptionValue', fhir_component['dataAbsentReason'], 'CodeableConcept', shrId, allEntries, mappedResources, referencesOut, false);
      }
      for (const fhir_component_referenceRange of fhir_component['referenceRange'] || []) {
        inst_nonIndependentFinding.referenceRange = FHIRHelper.createInstanceFromFHIR('shr.base.ReferenceRange', fhir_component_referenceRange, 'BackboneElement', shrId, allEntries, mappedResources, referencesOut, false);
      }
    }
    return inst;
  }

}
export default NonLaboratoryObservation;
