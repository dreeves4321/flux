/*
  Interface spec for OutcomesService implementations.
  Initial version of the spec is dervived from the functionality currently in
  use by the TreatmentOptionsOutcomes container and supporting views.
*/
export default class IOutcomesService {

    /*
    Function to process similar patient outcomes.
    @param {Object} similarPatientProps -- The filtering criteria used to define the cohort
        of patients used to calculate outcome data
    @return {Object} returns the calculated outcome data
        similarPatientTreatments -- treatments that matched the similar patients [{key: String, name: String}]
        similarPatientTreatmentsData -- the outcomes for the similar patient treatments
        totalPatients -- total number of patients in the
        totalSimilarPatients -- total number of patients that match the cohort filtering criteria
  */
    processSimilarPatientOutcomes(similarPatientProps) {
        throw new Error("processSimilarPatientOutcomes not implemented by " + this.constructor.name);
    }
}
