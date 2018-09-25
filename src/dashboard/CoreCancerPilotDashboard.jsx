import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TargetedDataPanel from '../panels/TargetedDataPanel';
import './CoreCancerPilotDashboard.css';

export default class CoreCancerPilotDashboard extends Component {
    // Based on currentClinicalEvent, determines if a note should be viewed
    noteViewerBasedOnClinicalEvent = (currentClinicalEvent) => {
        switch (currentClinicalEvent) {
            case "pre-encounter":
                this.props.setNoteViewerVisible(false);
                break;
            case "encounter":
                this.props.setNoteViewerVisible(true);
                break;
            case "post-encounter":
                this.props.setNoteViewerVisible(true);
                break;
            default:
                console.warn(`The task provided, ${currentClinicalEvent}, does not have a defined noteViewerBasedOnClinicalEvent value.`);
                this.props.setNoteViewerVisible(false);
                return;
        }
    }

    // Based on currentClinicalEvent, determines if a note should be editable
    noteEditableBasedOnClinicalEvent = (currentClinicalEvent) => {
        switch (currentClinicalEvent) {
            case "pre-encounter":
                this.props.setNoteViewerEditable(false);
                break;
            case "encounter":
                this.props.setNoteViewerEditable(true);
                break;
            case "post-encounter":
                this.props.setNoteViewerEditable(true);
                break;
            default:
                console.warn(`The task provided, ${currentClinicalEvent}, does not have a defined noteEditableBasedOnClinicalEvent value.`);
                this.props.setNoteViewerEditable(false);
                return;
        }
    }

    // Based on currentLayout, determines if the targetedDataSubpanel should be visible.
    isTargetedDataSubpanelVisible = (currentLayout) => {
        return true;
    }

    moveTargetedDataPanelToSection = (sectionName) => {
        return this.targetedDataPanel.moveToSection(sectionName);
    }

    moveTargetedDataPanelToSubsection = (sectionName, subsectionName) => {
        return this.targetedDataPanel.moveToSubsection(sectionName, subsectionName);
    }

    insertStructuredPhraseInCurrentNote = (data, source) => {
        return this.notesPanel.insertStructuredPhraseInCurrentNote(data, source);
    }

    render() {
        const targetedDataPanelStyles = {
            "width": '100%',
            "WebkitTransition": "width .5s", /* Safari */
            "transition": "width .5s",
        };

        return (
            <div id="core-cancer-pilot-dashboard-content" style={{display: "flex"}}>
                <div className="right-border-box" style={targetedDataPanelStyles}>
                    <TargetedDataPanel
                        actions={this.props.actions}
                        forceRefresh={this.props.forceRefresh}
                        appState={this.props.appState}
                        isNoteViewerEditable={false}
                        isTargetedDataSubpanelVisible={true}
                        isWide={true}
                        loginUser={this.props.loginUser}
                        summaryMetadata={this.props.summaryMetadata}
                        setForceRefresh={this.props.setForceRefresh}
                        targetedDataPanelSize={'100%'}
                        ref={(tdp) => { this.targetedDataPanel = tdp; }}
                        searchIndex={this.props.searchIndex}
                    />
                </div>
            </div>
        );
    }
}

CoreCancerPilotDashboard.proptypes = {
    actions: PropTypes.array.isRequired,
    appState: PropTypes.object.isRequired,
    dataAccess: PropTypes.object.isRequired,
    forceRefresh: PropTypes.bool,
    loginUser: PropTypes.object.isRequired,
    searchSelectedItem: PropTypes.object,
    setForceRefresh: PropTypes.func.isRequired,
    setFullAppStateWithCallback: PropTypes.func.isRequired,
    setSearchSelectedItem: PropTypes.func.isRequired,
    summaryMetadata: PropTypes.object.isRequired,
    searchIndex: PropTypes.object.isRequired,
};
