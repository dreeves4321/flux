import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './TableLegend.css';

export default class TableLegend extends Component {
    render() {
        const { compareRow } = this.props;

        let message;
        if (!compareRow) {
            message = "survived with treatment";
        } else {
            const name = compareRow.displayName;
            const noTreatment = name === 'none (actively monitoring)';
            const hasAnd = name.indexOf('&') > -1;
            message = `survived with ${noTreatment ? 'no treatment' : name} ${hasAnd || noTreatment ? "" : " alone"}`;
        }

        return (
            <div className="table-legend">
                <div className="wrapper">
                    <div className="legend-entry">
                        <div className="prog-fill-container">
                            <div className="prog-fill main" />
                        </div>
                        <span className="legend-text">{message}</span>
                    </div>

                    {compareRow &&
                        <div className="legend-entry">
                            <div className="prog-fill-container">
                                <div className="prog-fill treatment-increase" />
                            </div>
                            <span className="legend-text">increase in survival rate</span>
                        </div>
                    }

                    {compareRow &&
                        <div className="legend-entry">
                            <div className="prog-fill-container">
                                <div className="prog-fill treatment-decrease" />
                            </div>
                            <span className="legend-text">decrease in survival rate</span>
                        </div>
                    }

                    <div className="legend-entry">
                        <div className="prog-fill-container">
                            <div className="progress-bar cancer" />
                        </div>
                        <span className="legend-text">all deaths</span>
                    </div>
                </div>
            </div>
        );
    }
}

TableLegend.propTypes = {
    compareRow: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
};
