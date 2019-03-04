import { setPropertiesFromJSON, uuid, FHIRHelper } from '../../json-helper';

import PossibleCause from './PossibleCause';

/**
 * Generated class for shr.adverse.PossibleDrugCause.
 * @extends PossibleCause
 */
class PossibleDrugCause extends PossibleCause {

  /**
   * Get the choice value; one of: shr.entity.Medication reference, shr.medication.MedicationAdministered reference, shr.medication.MedicationStatement reference.
   * @returns {Reference} The choice value; one of: shr.entity.Medication reference, shr.medication.MedicationAdministered reference, shr.medication.MedicationStatement reference
   */
  get value() {
    return this._value;
  }

  /**
   * Set the choice value; one of: shr.entity.Medication reference, shr.medication.MedicationAdministered reference, shr.medication.MedicationStatement reference.
   * This field/value is required.
   * @param {Reference} value - The choice value; one of: shr.entity.Medication reference, shr.medication.MedicationAdministered reference, shr.medication.MedicationStatement reference
   */
  set value(value) {
    this._value = value;
  }

  /**
   * Set the choice value; one of: shr.entity.Medication reference, shr.medication.MedicationAdministered reference, shr.medication.MedicationStatement reference and return 'this' for chaining.
   * This field/value is required.
   * @param {Reference} value - The choice value; one of: shr.entity.Medication reference, shr.medication.MedicationAdministered reference, shr.medication.MedicationStatement reference
   * @returns {PossibleDrugCause} this.
   */
  withValue(value) {
    this.value = value; return this;
  }

  /**
   * Deserializes JSON data to an instance of the PossibleDrugCause class.
   * The JSON must be valid against the PossibleDrugCause JSON schema, although this is not validated by the function.
   * @param {object} json - the JSON data to deserialize
   * @returns {PossibleDrugCause} An instance of PossibleDrugCause populated with the JSON data
   */
  static fromJSON(json={}) {
    const inst = new PossibleDrugCause();
    setPropertiesFromJSON(inst, json);
    return inst;
  }

  /**
   * Serializes an instance of the PossibleDrugCause class to a JSON object.
   * The JSON is expected to be valid against the PossibleDrugCause JSON schema, but no validation checks are performed.
   * @returns {object} a JSON object populated with the data from the element
   */
  toJSON() {
    const inst = { 'EntryType': { 'Value' : 'http://standardhealthrecord.org/spec/shr/adverse/PossibleDrugCause' } };
    if (this.value != null) {
      inst['Value'] = typeof this.value.toJSON === 'function' ? this.value.toJSON() : this.value;
    }
    return inst;
  }

  /**
   * Deserializes FHIR JSON data to an instance of the PossibleDrugCause class.
   * The FHIR must be valid against the PossibleDrugCause FHIR profile, although this is not validated by the function.
   * @param {object} fhir - the FHIR JSON data to deserialize
   * @param {string} shrId - a unique, persistent, permanent identifier for the overall health record belonging to the Patient; will be auto-generated if not provided
   * @param {Array} allEntries - the list of all entries that references in 'fhir' refer to
   * @param {object} mappedResources - any resources that have already been mapped to SHR objects. Format is { fhir_key: {shr_obj} }
   * @param {Array} referencesOut - list of all SHR ref() targets that were instantiated during this function call
   * @param {boolean} asExtension - Whether the provided instance is an extension
   * @returns {PossibleDrugCause} An instance of PossibleDrugCause populated with the FHIR data
   */
  static fromFHIR(fhir, shrId=uuid(), allEntries=[], mappedResources={}, referencesOut=[], asExtension=false) {
    const inst = new PossibleDrugCause();
    if (!asExtension && fhir != null) {
      inst.value = FHIRHelper.createInstanceFromFHIR(null, fhir, shrId, allEntries, mappedResources, referencesOut);
    }
    return inst;
  }

}
export default PossibleDrugCause;