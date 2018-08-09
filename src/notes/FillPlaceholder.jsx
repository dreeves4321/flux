import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import ExpansionPanel, { ExpansionPanelSummary, ExpansionPanelDetails } from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import FontAwesome from 'react-fontawesome';
import ButtonSetFillFieldForPlaceholder from './fillFieldComponents/ButtonSetFillFieldForPlaceholder';
import MultiButtonSetFillFieldForPlaceholder from './fillFieldComponents/MultiButtonSetFillFieldForPlaceholder';
import Calendar from 'rc-calendar';
import Button from '../elements/Button';
import 'rc-calendar/assets/index.css';
import moment from 'moment';
import Lang from 'lodash';

import './FillPlaceholder.css';
import SearchableListForPlaceholder from './fillFieldComponents/SearchableListForPlaceholder';

export default class FillPlaceholder extends Component {
    constructor(props) {
        super(props);
        const { placeholder } = props;

        this.onDone = this.onDone.bind(this);
        this.calendarDom = null;

        const firstUnfilledFields = placeholder.entryShortcuts.map((entryShortcut, i) => {
            // Determine the first field with no data entered for it; this field will be displayed upon startup.
            let firstUnfilledField = placeholder.metadata.formSpec.attributes.findIndex((attribute) => {
                return !this.isValidAttribute(placeholder.getAttributeValue(attribute.name, i));
            });

            return firstUnfilledField;
        });
        let done = false;
        let currentField;
        if (firstUnfilledFields.length === 1 && placeholder.multiplicity !== 'many') {
            if (firstUnfilledFields[0] === -1) {
                done = true;
                currentField = [0];
            } else {
                currentField = [firstUnfilledFields[0]];
            }
        } else {
            const finishedFields = firstUnfilledFields.map(firstUnfilledField => firstUnfilledField === -1);
            currentField = finishedFields.map((d, i) => {
                return !d ? firstUnfilledFields[i] : 0;
            });
        }

        if (placeholder.done) done = true;

        this.state = {
            currentField,
            done,
            expanded: false,
            error: null,
        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
    }

    handleClick = (event) => {
        if (this.calendarDom && !this.calendarDom.contains(event.target)) this.setState({ showCalendar: false });
    }

    onDone = (event, index = 0) => {
        let { done } = this.state;
        const { placeholder } = this.props;

        done = event.target.checked;
        placeholder.done = event.target.checked;
        this.setState({ done });
    };

    onExpand = (event) => {
        this.setState({ expanded: !this.state.expanded });
    };

    onClickOnField = (index, entryIndex = 0, event) => {
        let { currentField } = this.state;

        currentField[entryIndex] = index;
        this.setState({ currentField });
    };

    nextField = (index = 0) => {
        let { currentField, done } = this.state;
        const { placeholder } = this.props;

        if (currentField[index] + 1 === placeholder.metadata.formSpec.attributes.length) {
            // User has entered final attribute, so mark row as done
            if (placeholder.multiplicity !== 'many') {
                done = true;
                this.props.placeholder.done = true;
                this.setState({ done });
            } else {
                currentField[index] = 0;
                this.setState({ currentField });
            }
        } else {
            currentField[index] += 1;
            this.setState({ currentField });
        }
    };

    onSetValue = (attributeSpec, index, newValue) => {
        const attributes = this.props.placeholder.getAttributeValue(attributeSpec.name, index);
        let error;
        if (Lang.isArray(attributes) && Lang.includes(attributes, newValue)) {
            Lang.remove(attributes, (attr) => {
                return attr === newValue;
            });
            error = this.props.placeholder.setAttributeValue(attributeSpec.name, attributes, index);
        } else {
            error = this.props.placeholder.setAttributeValue(attributeSpec.name, newValue, index);

            // We only want to increment the field if we are working on a non-expanded and non-multiselect attribute
            // This might only be a temporary workaround, we have to see how it goes as the other fields get implemented
            if (Lang.isNull(error) && !(this.state.expanded || Lang.isArray(attributes))) {
                this.nextField(index);
            }
        }
        this.setState({ error });
    };

    setCalendarTrue = (attributeSpec) => {
        this.setState({ showCalendar: true });
        this.setState({ calendarAttributeSpec: attributeSpec.name });
    }

    handleCalendarSelect = (attributeSpec, index = 0, date) => {
        const dateSelected = date.format("D MMM YYYY");
        this.onSetValue(attributeSpec, index, dateSelected);
        this.setState({ showCalendar: false });
    }

    createFillFieldForPlaceholder = (attributeSpec, value, index = 0) => {
        if (attributeSpec.type === 'radioButtons') {
            return <ButtonSetFillFieldForPlaceholder attributeSpec={attributeSpec} value={value} updateValue={this.onSetValue.bind(this, attributeSpec, index)} />;
        } else if (attributeSpec.type === 'checkboxes') {
            return <MultiButtonSetFillFieldForPlaceholder attributeSpec={attributeSpec} value={value} updateValue={this.onSetValue.bind(this, attributeSpec, index)} nextField={this.state.expanded ? null : this.nextField.bind(this, index)} />;
        } else if (attributeSpec.type === 'searchableList') {
            return <SearchableListForPlaceholder attributeSpec={attributeSpec} backgroundColor={this.props.backgroundColor} value={value} updateValue={this.onSetValue.bind(this, attributeSpec, index)} />;
        }
        if (attributeSpec.type === 'date') {
            let date = new Date(this.props.placeholder.getAttributeValue(attributeSpec.name));
            date = moment(date).format('MM/DD/YYYY');

            return (
                <div>
                    <button className='date-picker-button' onClick={this.setCalendarTrue.bind(this, attributeSpec)}>
                        {(this.props.placeholder.getAttributeValue(attributeSpec.name)) ? date : 'MM/DD/YYYY'}
                        <div className="arrow-container"><i className="arrow-down"></i></div>
                    </button>
                    {(this.state.showCalendar && (attributeSpec.name === this.state.calendarAttributeSpec))
                        ?
                        <div className='date-picker-container' ref={(calendarDom) => this.calendarDom = calendarDom}>
                            <Calendar
                                showDateInput={false}
                                onSelect={this.handleCalendarSelect.bind(this, attributeSpec, index)}
                                style={{ position: 'absolute', top: '0px', left: '0px' }}
                            />
                        </div>
                        :
                        null
                    }
                </div>
            )
        }
        return <div>Unknown component type: {attributeSpec.type}</div>;
    };

    createCurrentFieldRowInSummary = (attribute, index = 0) => {
        let currentFieldRowInSummary = "";
        const value = this.props.placeholder.getAttributeValue(attribute.name, index);
        if (this.state.expanded || !this.state.done) {
            currentFieldRowInSummary = (
                <Grid container key={attribute.name}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}><span>{attribute.title}</span></Grid>
                    <Grid item xs={9}><span>{this.createFillFieldForPlaceholder(attribute, value, index)}</span></Grid>
                </Grid>
            );
        }
        return currentFieldRowInSummary;
    };

    addEntry = () => {
        const { placeholder } = this.props;
        const { currentField } = this.state;

        currentField.push(0);
        placeholder.addEntry();
        this.setState({ currentField });
    }

    deleteEntry = (index) => {
        const { placeholder } = this.props;
        const { currentField, done } = this.state;

        currentField.splice(index, 1);
        done.splice(index, 1);
        placeholder.deleteEntry(index);
        this.setState({
            currentField,
            done,
        });
    }

    createAllRows = () => {
        const { placeholder } = this.props;

        return placeholder.metadata.formSpec.attributes.map(attr => {
            return this.createCurrentFieldRowInSummary(attr);
        });
    };

    isValidAttribute = (value) => {
        return !(Lang.isNull(value) || Lang.isUndefined(value) || value === '' || (Lang.isArray(value) && value.length === 0));
    }

    renderSingleEntryPlaceholder = () => {
        const { done, error, expanded } = this.state;
        const { backgroundColor, placeholder } = this.props;

        let columns = [];
        placeholder.metadata.formSpec.attributes.forEach((attribute, index) => {
            const value = placeholder.getAttributeValue(attribute.name);
            columns.push(<span className="shortcut-field-title" key={`${index}-label`}>{`${attribute.title}: `}</span>);
            if (!this.isValidAttribute(value)) {
                columns.push(<span onClick={this.onClickOnField.bind(this, index, 0)} className="missing-data" key={`${index}-value`}>No Data</span>);
            } else {
                columns.push(<span onClick={this.onClickOnField.bind(this, index, 0)} className="structured-data" key={`${index}-value`}>{Lang.isArray(value) ? value.join(', ') : value}</span>);
            }
        });
        let currentFieldRowInSummary = "";
        if (!this.state.expanded) {
            const attribute = placeholder.metadata.formSpec.attributes[this.state.currentField[0]];
            currentFieldRowInSummary = this.createCurrentFieldRowInSummary(attribute);
        }
        let errorString = "";
        if (!Lang.isNull(error)) {
            errorString = <span className="error-message">{this.state.error}</span>
        }

        return (
            <ExpansionPanel expanded={expanded} className='expanded-style'>
                <ExpansionPanelSummary style={{ backgroundColor, cursor: 'default' }} expandIcon={<ExpandMoreIcon onClick={this.onExpand} />}>
                    <Grid container>
                        <Grid item xs={3}>
                            <span className="done-checkbox"><Checkbox style={{ width: 26, height: 26 }} checked={done} value="done" onChange={this.onDone} color="primary" /></span>
                            <span className="shortcut-name" key="0">{placeholder.shortcutName}</span>
                        </Grid>
                        <Grid item xs={9}>
                            {columns}
                        </Grid>
                        {errorString}
                        {currentFieldRowInSummary}
                    </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{ backgroundColor }}>
                    <Grid container>
                        {expanded ? this.createAllRows() : null}
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }

    renderMultipleEntriesPlaceholder = () => {
        const { done, error, expanded } = this.state;
        const { backgroundColor, placeholder } = this.props;
        const shortcutNameWithoutPrefix = placeholder.shortcutName.slice(1);

        const entries = placeholder.entryShortcuts.map((_, i) => {
            let columns = [];
            placeholder.metadata.formSpec.attributes.forEach((attribute, index) => {
                const value = placeholder.getAttributeValue(attribute.name, i);
                columns.push(<span className="shortcut-field-title" key={`${i}-${index}-label`}>{`${attribute.title}: `}</span>);
                if (Lang.isNull(value) || Lang.isUndefined(value) || value === '' || (Lang.isArray(value) && value.length === 0)) {
                    columns.push(<span onClick={this.onClickOnField.bind(this, index, i)} className="missing-data" key={`${i}-${index}-value`}>No Data</span>);
                } else {
                    columns.push(<span onClick={this.onClickOnField.bind(this, index, i)} className="structured-data" key={`${i}-${index}-value`}>{value}</span>);
                }
            });
            let currentFieldRowInSummary = "";
            if (!this.state.expanded) {
                const attribute = placeholder.metadata.formSpec.attributes[this.state.currentField[i]];
                currentFieldRowInSummary = this.createCurrentFieldRowInSummary(attribute, i);
            }
            let deleteButton = "";
            if (!done) {
                deleteButton = (
                    <Button
                        onClick={this.deleteEntry.bind(this, i)}
                        style={{ float: "right" }}
                    >
                        <FontAwesome
                            name="times"
                            style={{
                                color: "red",
                                marginRight: "5px",
                            }}
                        />
                        <span>{`Delete ${shortcutNameWithoutPrefix}`}</span>
                    </Button>
                );
            }
            return (
                <Grid container key={`${i}-container`}>
                    {i === 0 ?
                        (
                            <Grid item xs={3}>
                                <span className="done-checkbox"><Checkbox style={{ width: 26, height: 26 }} checked={done} value="done" onChange={this.onDone} color="primary" /></span>
                                <span className="shortcut-name" key="0">{placeholder.shortcutName}</span>
                            </Grid>
                        ) : <Grid item xs={3} />
                    }
                    <Grid item xs={9}>
                        {columns}
                        {deleteButton}
                    </Grid>
                    {""}
                    {currentFieldRowInSummary}
                    <Divider className="divider" />
                </Grid>
            );
        });

        let errorString = "";
        if (!Lang.isNull(error)) {
            errorString = <span className="error-message">{error}</span>
        }

        let addButton = "";
        if (!done) {
            addButton = (
                <Button
                    onClick={this.addEntry}
                    style={{ float: "right" }}
                >
                    <FontAwesome
                        name="plus"
                        style={{
                            color: "rgb(26, 143, 221)",
                            marginRight: "5px",
                        }}
                    />
                    <span>{`Add ${shortcutNameWithoutPrefix}`}</span>
                </Button>
            );
        }

        return (
            <ExpansionPanel expanded={expanded} className='expanded-style'>
                <ExpansionPanelSummary style={{ backgroundColor, cursor: 'default' }} expandIcon={<ExpandMoreIcon onClick={this.onExpand} />}>
                    <Grid container>
                        {errorString}
                        {entries}
                        <div style={{ width: "100%" }}>
                            {addButton}
                        </div>
                    </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{ backgroundColor }}>
                    <Grid container>
                        {expanded ? this.createAllRows() : null}
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }

    render() {
        /*
        "formSpec": {   "title": "Disease Status",
                    "attributes": [ {   "title":"Status", "type":"radioButtons", "values": {"category":"progression", "valueSet":"status"} },
                                    {   "title":"Rationale for status", "type":"checkboxes", "values": {"category":"progression", "valueSet":"reason"}}
                                  ]
                },*/
        const { placeholder } = this.props;

        return !placeholder.multiplicity ? this.renderSingleEntryPlaceholder() : this.renderMultipleEntriesPlaceholder();
    }
}

FillPlaceholder.propTypes = {
    placeholder: PropTypes.object.isRequired,
    backgroundColor: PropTypes.string.isRequired,
};