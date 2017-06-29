// React imports
import React, { Component } from 'react';
// material-ui
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
// Libraries
import staging from '../../lib/progression';
import lookup from '../../lib/progression';
// Styling
import './ProgressionForm.css';

class ProgressionForm extends Component {
  constructor(props) {
      super(props);

      this.state = {
        tumorSizes: lookup.getTsForEdition(7),
        nodes: lookup.getNsForEdition(7),
        metastases: lookup.getMsForEdition(7)
      };
  }

  _handleStatusSelecion = (e, i) => {
    e.preventDefault();
    // console.log("ProgressionForm._handleTumorSizeClick T=" + i);
    this.props.onStagingTUpdate(this.state.tumorSizes[i].name);
  }

  _handleReasonSelection = (e, i) => {
    e.preventDefault();
    // console.log("ProgressionForm._handleNodeClick N=" + i);
    this.props.onStagingNUpdate(this.state.nodes[i].name);
  }

  render() {
    // console.log("in render. t: " + this.props.t);
    return (
        <Paper className="panel-content trio">
            <h1>Patient Progression</h1>
            <Divider className="divider" />

            <h4>Progression Status</h4>
            {this.state.statusOptions.map((t, i) => {
                const buttonClass = (t.description.length > 100) ? "tooltiptext large" : "tooltiptext";
                return (
                  <div key={t.name} className="tooltip">
                     <span id={t.name} className={buttonClass}>{t.description}</span>
                      <RaisedButton
                          className="btn tumor-size"
                          key={i}
                          label={titlecase(t.name)}
                          onClick={(e) => this._handleTumorSizeClick(e, i)}
                          disabled={this._currentlySelected(this.props.tumorSize, this.state.tumorSizes[i].name)}
                      />
                  </div>
                );
            })}

            <h4>Node</h4>
            {this.state.nodes.map((n, i) => {
                const buttonClass = (n.description.length > 100) ? "tooltiptext large" : "tooltiptext";
                return (
                  <div key={n.name} className="tooltip">
                     <span id={n.name} className={buttonClass}>{n.description}</span>
                      <RaisedButton
                          className="btn node"
                          key={i}
                          label={titlecase(n.name)}
                          onClick={(e) => this._handleNodeClick(e, i)}
                          disabled={this._currentlySelected(this.props.nodeSize, this.state.nodes[i].name)}
                      />
                  </div>
                );
            })}

            <h4>Metastasis</h4>
            {this.state.metastases.map((m, i) => {
                const buttonClass = (m.description.length > 100) ? "tooltiptext large" : "tooltiptext";
                return (
                  <div key={m.name} className="tooltip">
                   <span id={m.name} className={buttonClass}>{m.description}</span>
                    <RaisedButton
                        className="btn metastasis"
                        key={i}
                        label={titlecase(m.name)}
                        onClick={(e) => this._handleMetastasisClick(e, i)}
                        disabled={this._currentlySelected(this.props.metastasis, this.state.metastases[i].name)}
                    />
                  </div>
                );
            })}

            <h4>Prognostic Stage</h4>
            <div className="stage">{staging.breastCancerPrognosticStage(this.props.tumorSize, this.props.nodeSize, this.props.metastasis) || 'Undefined'}</div>
        </Paper>
    );
  }
}

export default ProgressionForm;


function titlecase(label) {
  return label.toLowerCase().split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}
