import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import TargetedDataSubpanel from '../summary/TargetedDataSubpanel';
import Minimap from '../lib/react-minimap/react-minimap.js';
import '../lib/react-minimap/react-minimap.css'
import './TargetedDataPanel.css';

export default class TargetedDataPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sectionsToDisplay: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.targetedDataPanelSize !== this.props.targetedDataPanelSize) {
            this.forceUpdate();
        }
    }

    startEditingMinimap = () => {
        const conditionMetadata = this.getConditionMetadata();
        const allSections = conditionMetadata.sections;
        this.setState({ sectionsToDisplay: allSections });
    }

    doneEditingMinimap = () => {
        const conditionMetadata = this.getConditionMetadata();
        const sectionsToDisplay = conditionMetadata.sections.filter((section) => {
            const preferenceManagerVisibleSettings = this.props.preferenceManager.getPreference('visibleSections');
            let currentSectionVisible = preferenceManagerVisibleSettings[section.name];
            if (!_.isUndefined(preferenceManagerVisibleSettings[section.name])) {
                currentSectionVisible = preferenceManagerVisibleSettings[section.name];
            }
            if (!currentSectionVisible) {
                this.props.searchIndex.removeDataBySection(section.name);
            }
            return currentSectionVisible;
        });
        this.setState({ sectionsToDisplay });
    }

    moveToSection(sectionName) {
        return this.minimap.moveToSection(sectionName);
    }

    moveToSubsection(sectionName, subsectionName) {
        if (this.minimap) {
            return this.minimap.moveToSubsection(sectionName, subsectionName);
        }
    }

    moveToSubsectionFromSearch(suggestion) {
        this.moveToSubsection(suggestion.section, suggestion.subsection);
    }
    
    getConditionMetadata() {
        const { loginUser } = this.props;
        const patient = this.props.appState.patient;
        const condition = this.props.appState.condition;
        return this.props.summaryMetadata.getMetadata(  this.props.preferenceManager,
                                                        patient,
                                                        condition, 
                                                        loginUser.getRoleType(), 
                                                        loginUser.getRole(), 
                                                        loginUser.getSpecialty());
    }

    getSectionsToDisplay = (conditionMetadata) => {
        let sectionsToDisplay = this.state.sectionsToDisplay;
        if (sectionsToDisplay.length === 0) {
            sectionsToDisplay = conditionMetadata.sections.filter((section) => {
                let preferenceManagerVisibleSettings = this.props.preferenceManager.getPreference('visibleSections');
                if (_.isNull(preferenceManagerVisibleSettings)) {
                    preferenceManagerVisibleSettings = {};
                    this.props.preferenceManager.setPreference('visibleSections', preferenceManagerVisibleSettings);
                }
                let currentSectionVisible = true;
                if (!_.isNull(preferenceManagerVisibleSettings) && !_.isUndefined(preferenceManagerVisibleSettings[section.name])) {
                    currentSectionVisible = preferenceManagerVisibleSettings[section.name];
                }
                return currentSectionVisible;
            });
        }
        return sectionsToDisplay;
    }

    render () {
        // The css data attribute associated with the minimap
        const minimapAttribute = 'data-test-summary-section';
        const shortTitleAttribute = 'data-minimap-short-title';
        const conditionMetadata = this.getConditionMetadata();

        const sectionsToDisplay = this.getSectionsToDisplay(conditionMetadata);

        if (conditionMetadata && conditionMetadata.sections.length > 1) {
            return (
                <div className="targeted-data-panel">
                    <Minimap
                        selector={`[${minimapAttribute}]`}
                        className="fitted-panel"
                        titleAttribute={minimapAttribute}
                        shortTitleAttribute={shortTitleAttribute}
                        width={80}
                        isFullHeight={true}
                        ref={(minimap) => { this.minimap = minimap; }}
                        preferenceManager={this.props.preferenceManager}
                        doneEditingMinimap={this.doneEditingMinimap}
                        startEditingMinimap={this.startEditingMinimap}
                    >
                        <div id="summary-subpanel">
                            <div className="summary-section">
                                <TargetedDataSubpanel
                                    actions={this.props.actions}
                                    forceRefresh={this.props.forceRefresh}
                                    allowItemClick={this.props.isNoteViewerEditable}
                                    clinicalEvent={this.props.appState.clinicalEvent}
                                    condition={this.props.appState.condition}
                                    isWide={this.props.isWide}
                                    loginUser={this.props.loginUser}
                                    preferenceManager={this.props.preferenceManager}
                                    patient={this.props.appState.patient} 
                                    setForceRefresh={this.props.setForceRefresh}
                                    conditionMetadata={conditionMetadata}
                                    sectionsToDisplay={sectionsToDisplay}
                                    searchIndex={this.props.searchIndex}
                                    moveToSubsectionFromSearch={this.moveToSubsectionFromSearch.bind(this)}
                                    searchSuggestions={this.props.searchSuggestions}
                                    />
                            </div>
                        </div>
                    </Minimap>
                </div>
            );    
        } else {
            return (
                <div className="targeted-data-panel">
                    <div id="summary-subpanel">
                        <div className="summary-section">
                            <TargetedDataSubpanel
                                className="targeted-data-subpanel-no-minimap"
                                actions={this.props.actions}
                                forceRefresh={this.props.forceRefresh}
                                allowItemClick={this.props.isNoteViewerEditable}
                                clinicalEvent={this.props.appState.clinicalEvent}
                                condition={this.props.appState.condition}
                                isWide={this.props.isWide}
                                loginUser={this.props.loginUser}
                                preferenceManager={this.props.preferenceManager}
                                patient={this.props.appState.patient} 
                                setForceRefresh={this.props.setForceRefresh}                                                              
                                conditionMetadata={conditionMetadata}
                                sectionsToDisplay={sectionsToDisplay}
                                searchIndex={this.props.searchIndex}
                                moveToSubsectionFromSearch={this.moveToSubsectionFromSearch.bind(this)}
                                searchSuggestions={this.props.searchSuggestions}
                                />
                        </div>
                    </div>
                </div>
            );    
        }
    }
}

TargetedDataPanel.proptypes = {
    actions: PropTypes.array.isRequired,
    appState: PropTypes.shape({
        patient: PropTypes.object.isRequired,
        clinicalEvent: PropTypes.object.isRequired,
        condition: PropTypes.object,
    }).isRequired,
    forceRefresh: PropTypes.bool,
    isNoteViewerEditable: PropTypes.bool.isRequired,
    isTargetedDataSubpanelVisible: PropTypes.bool,
    isWide: PropTypes.bool.isRequired,
    loginUser: PropTypes.object.isRequired,
    preferenceManager: PropTypes.object.isRequired,
    summaryMetadata: PropTypes.object.isRequired,
    setForceRefresh: PropTypes.func.isRequired,
    targetedDataPanelSize: PropTypes.string.isRequired,
    searchIndex: PropTypes.object.isRequired,
    searchSuggestions: PropTypes.array
}
