import TNMClinicalStageGroup from './TNMClinicalStageGroup';
import PanelMembers from '../shr/base/PanelMembers';
import FluxTNMStageGroup from './FluxTNMStageGroup';
import moment from 'moment';

class FluxTNMClinicalStageGroup extends FluxTNMStageGroup {
    constructor(json, patientRecord) {
        super();
        this._entry = this._tnmStageGroup = TNMClinicalStageGroup.fromJSON(json);
        if (!this._tnmStageGroup.entryInfo) {
            this._tnmStageGroup.entryInfo = this._constructEntry('http://standardhealthrecord.org/spec/oncocore/TNMClinicalStageGroup');
            this._tnmStageGroup.panelMembers = new PanelMembers();
            this._tnmStageGroup.panelMembers.observation = [];
        }
        if (!this._tnmStageGroup.relevantTime) {
            const today = new moment().format('D MMM YYYY');
            this.relevantTime = today;
        }
        this._patientRecord = patientRecord;
    }
}

export default FluxTNMClinicalStageGroup;
