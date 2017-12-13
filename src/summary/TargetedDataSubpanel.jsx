import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TabularNameValuePairsVisualizer from './TabularNameValuePairsVisualizer';
import NarrativeNameValuePairsVisualizer from './NarrativeNameValuePairsVisualizer';
import TimelineEventsVisualizer from '../timeline/TimelineEventsVisualizer';
import 'font-awesome/css/font-awesome.min.css';
import './TargetedDataSubpanel.css';

class TargetedDataSubpanel extends Component {

    getConditionMetadata() {
        const {condition} = this.props;

        let codeSystem, code, conditionMetadata = null;
        if (condition != null) {
            codeSystem = condition.specificType.value.coding[0].codeSystem.value;
            code = condition.specificType.value.coding[0].value;
            conditionMetadata = this.props.summaryMetadata[codeSystem + "/" + code];
        }

        if (condition == null || conditionMetadata == null) {
            conditionMetadata = this.props.summaryMetadata["default"];
        }

        return conditionMetadata;
    }

    // renderedSection checks the type of data that is being passed and chooses the correct component to render the data
    // TODO: Render other types of data. also change how it decides which visualization component to use when
    //       multiple (e.g., NameValuePairs)
    // TODO: Add a List type and a tabular renderer for it for Procedures section. case where left column is data
    //       and not just a label
    renderSection(section) {
        const {patient, condition, onItemClicked, allowItemClick, isWide} = this.props;

        if (section.type === 'NameValuePairs' && !section.narrative) {
            return (
                <TabularNameValuePairsVisualizer
                    patient={patient}
                    condition={condition}
                    conditionSection={section}
                    onItemClicked={onItemClicked}
                    allowItemClick={allowItemClick}
                    isWide={isWide}
                />
            );
        } else if (section.type === 'NameValuePairs' && section.narrative) {
            return (
                <NarrativeNameValuePairsVisualizer
                    patient={patient}
                    condition={condition}
                    conditionSection={section}
                    onItemClicked={onItemClicked}
                    allowItemClick={allowItemClick}
                    isWide={isWide}
                />
            );
        } else if (section.type === 'Events') {
            return (
                <TimelineEventsVisualizer
                    patient={patient}
                    condition={condition}
                    section={section}
                    isWide={isWide}
                />
            );
        }
    }

    renderSections() {
        const conditionMetadata = this.getConditionMetadata();
        if (conditionMetadata == null) {
            return null;
        }

        return conditionMetadata.sections.map((section, i) => {
            return (
                <div key={i} data-test-summary-section={section.name}>
                    <h2 className="section-header">{section.name}</h2>
                    {this.renderSection(section)}
                </div>
            );
        });
    }

    renderSummaryList() {
        return (
            <div id="summary-list">
                {this.renderSections()}
            </div>
        );
    }

    render() {
        return (
            <div 
                id="condition-summary-section" 
                className={this.props.className}
            >
                {this.renderSummaryList()}
            </div>
        );
    }
}

TargetedDataSubpanel.propTypes = {
    className: PropTypes.string,
    isWide: PropTypes.bool.isRequired,
    patient: PropTypes.object,
    condition: PropTypes.object,
    summaryMetadata: PropTypes.object,
    allowItemClick: PropTypes.bool,
    onItemClicked: PropTypes.func
};

export default TargetedDataSubpanel;