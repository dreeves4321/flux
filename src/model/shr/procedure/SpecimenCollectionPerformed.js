// GENERATED CODE
// Manual modification is NOT RECOMMENDED as changes will be overwritten the next time the class is generated.

import { setPropertiesFromJSON, uuid, FHIRHelper } from '../../json-helper';

import ClassRegistry from '../../ClassRegistry';

import ProcedurePerformed from './ProcedurePerformed';

/**
 * Generated class for shr.procedure.SpecimenCollectionPerformed.
 * @extends ProcedurePerformed
 */
class SpecimenCollectionPerformed extends ProcedurePerformed {

  /**
   * Get the AnatomicalLocation array.
   * @returns {Array<AnatomicalLocation>} The shr.core.AnatomicalLocation array
   */
  get anatomicalLocation() {
    return this._anatomicalLocation;
  }

  /**
   * Set the AnatomicalLocation array.
   * @param {Array<AnatomicalLocation>} anatomicalLocation - The shr.core.AnatomicalLocation array
   */
  set anatomicalLocation(anatomicalLocation) {
    this._anatomicalLocation = anatomicalLocation;
  }

  /**
   * Set the AnatomicalLocation array and return 'this' for chaining.
   * @param {Array<AnatomicalLocation>} anatomicalLocation - The shr.core.AnatomicalLocation array
   * @returns {SpecimenCollectionPerformed} this.
   */
  withAnatomicalLocation(anatomicalLocation) {
    this.anatomicalLocation = anatomicalLocation; return this;
  }

  /**
   * Get the AmountOrSize array.
   * @returns {Array<AmountOrSize>} The shr.procedure.AmountOrSize array
   */
  get amountOrSize() {
    return this._amountOrSize;
  }

  /**
   * Set the AmountOrSize array.
   * @param {Array<AmountOrSize>} amountOrSize - The shr.procedure.AmountOrSize array
   */
  set amountOrSize(amountOrSize) {
    this._amountOrSize = amountOrSize;
  }

  /**
   * Set the AmountOrSize array and return 'this' for chaining.
   * @param {Array<AmountOrSize>} amountOrSize - The shr.procedure.AmountOrSize array
   * @returns {SpecimenCollectionPerformed} this.
   */
  withAmountOrSize(amountOrSize) {
    this.amountOrSize = amountOrSize; return this;
  }

  /**
   * Deserializes JSON data to an instance of the SpecimenCollectionPerformed class.
   * The JSON must be valid against the SpecimenCollectionPerformed JSON schema, although this is not validated by the function.
   * @param {object} json - the JSON data to deserialize
   * @returns {SpecimenCollectionPerformed} An instance of SpecimenCollectionPerformed populated with the JSON data
   */
  static fromJSON(json={}) {
    const klass = ClassRegistry.get('shr.procedure', 'SpecimenCollectionPerformed');
    const inst = new klass();
    setPropertiesFromJSON(inst, json);
    return inst;
  }

  /**
   * Serializes an instance of the SpecimenCollectionPerformed class to a JSON object.
   * The JSON is expected to be valid against the SpecimenCollectionPerformed JSON schema, but no validation checks are performed.
   * @returns {object} a JSON object populated with the data from the element
   */
  toJSON() {
    const inst = { 'EntryType': { 'Value' : 'http://standardhealthrecord.org/spec/shr/procedure/SpecimenCollectionPerformed' } };
    if (this.narrative != null) {
      inst['Narrative'] = typeof this.narrative.toJSON === 'function' ? this.narrative.toJSON() : this.narrative;
    }
    if (this.language != null) {
      inst['Language'] = typeof this.language.toJSON === 'function' ? this.language.toJSON() : this.language;
    }
    if (this.metadata != null) {
      inst['Metadata'] = typeof this.metadata.toJSON === 'function' ? this.metadata.toJSON() : this.metadata;
    }
    if (this.category != null) {
      inst['Category'] = typeof this.category.toJSON === 'function' ? this.category.toJSON() : this.category;
    }
    if (this.patient != null) {
      inst['Patient'] = typeof this.patient.toJSON === 'function' ? this.patient.toJSON() : this.patient;
    }
    if (this.encounter != null) {
      inst['Encounter'] = typeof this.encounter.toJSON === 'function' ? this.encounter.toJSON() : this.encounter;
    }
    if (this.reason != null) {
      inst['Reason'] = this.reason.map(f => f.toJSON());
    }
    if (this.occurrenceTimeOrPeriod != null) {
      inst['OccurrenceTimeOrPeriod'] = typeof this.occurrenceTimeOrPeriod.toJSON === 'function' ? this.occurrenceTimeOrPeriod.toJSON() : this.occurrenceTimeOrPeriod;
    }
    if (this.participation != null) {
      inst['Participation'] = this.participation.map(f => f.toJSON());
    }
    if (this.status != null) {
      inst['Status'] = typeof this.status.toJSON === 'function' ? this.status.toJSON() : this.status;
    }
    if (this.method != null) {
      inst['Method'] = typeof this.method.toJSON === 'function' ? this.method.toJSON() : this.method;
    }
    if (this.relatedRequest != null) {
      inst['RelatedRequest'] = typeof this.relatedRequest.toJSON === 'function' ? this.relatedRequest.toJSON() : this.relatedRequest;
    }
    if (this.facility != null) {
      inst['Facility'] = typeof this.facility.toJSON === 'function' ? this.facility.toJSON() : this.facility;
    }
    if (this.outcome != null) {
      inst['Outcome'] = typeof this.outcome.toJSON === 'function' ? this.outcome.toJSON() : this.outcome;
    }
    if (this.procedureCode != null) {
      inst['ProcedureCode'] = typeof this.procedureCode.toJSON === 'function' ? this.procedureCode.toJSON() : this.procedureCode;
    }
    if (this.anatomicalLocation != null) {
      inst['AnatomicalLocation'] = this.anatomicalLocation.map(f => f.toJSON());
    }
    if (this.partOf != null) {
      inst['PartOf'] = typeof this.partOf.toJSON === 'function' ? this.partOf.toJSON() : this.partOf;
    }
    if (this.annotation != null) {
      inst['Annotation'] = this.annotation.map(f => f.toJSON());
    }
    if (this.device != null) {
      inst['Device'] = this.device.map(f => f.toJSON());
    }
    if (this.amountOrSize != null) {
      inst['AmountOrSize'] = this.amountOrSize.map(f => f.toJSON());
    }
    return inst;
  }

  /**
   * Deserializes FHIR JSON data to an instance of the SpecimenCollectionPerformed class.
   * The FHIR must be valid against the SpecimenCollectionPerformed FHIR profile, although this is not validated by the function.
   * @param {object} fhir - the FHIR JSON data to deserialize
   * @param {string} fhirType - the type of the FHIR object that was passed in, in case not otherwise identifiable from the object itself
   * @param {string} shrId - a unique, persistent, permanent identifier for the overall health record belonging to the Patient; will be auto-generated if not provided
   * @param {Array} allEntries - the list of all entries that references in 'fhir' refer to
   * @param {object} mappedResources - any resources that have already been mapped to SHR objects. Format is { fhir_key: {shr_obj} }
   * @param {Array} referencesOut - list of all SHR ref() targets that were instantiated during this function call
   * @param {boolean} asExtension - Whether the provided instance is an extension
   * @returns {SpecimenCollectionPerformed} An instance of SpecimenCollectionPerformed populated with the FHIR data
   */
  static fromFHIR(fhir, fhirType, shrId=uuid(), allEntries=[], mappedResources={}, referencesOut=[], asExtension=false) {
    const klass = ClassRegistry.get('shr.procedure', 'SpecimenCollectionPerformed');
    const inst = new klass();
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
      if (fhir_extension['url'] != null && fhir_extension['url'] === 'http://hl7.org/fhir/StructureDefinition/procedure-targetBodySite') {
        inst.anatomicalLocation = inst.anatomicalLocation || [];
        const inst_anatomicalLocation = FHIRHelper.createInstanceFromFHIR('shr.core.AnatomicalLocation', {}, null, shrId);
        inst.anatomicalLocation.push(inst_anatomicalLocation);
        inst_anatomicalLocation.value = FHIRHelper.createInstanceFromFHIR('shr.core.AnatomicalLocationStructured', fhir_extension, 'Extension', shrId, allEntries, mappedResources, referencesOut, true);
      }
      if (fhir_extension['url'] != null && fhir_extension['url'] === 'http://example.com/fhir/StructureDefinition/shr-base-Method-extension') {
        inst.method = FHIRHelper.createInstanceFromFHIR('shr.base.Method', fhir_extension, 'Extension', shrId, allEntries, mappedResources, referencesOut, true);
      }
      if (fhir_extension['url'] != null && fhir_extension['url'] === 'http://example.com/fhir/StructureDefinition/shr-entity-PartOf-extension' && fhir_extension['url'] != null && fhir_extension['url'] === 'http://example.com/fhir/StructureDefinition/shr-entity-PartOf-extension') {
        inst.partOf = FHIRHelper.createInstanceFromFHIR('shr.entity.PartOf', fhir_extension, 'Extension', shrId, allEntries, mappedResources, referencesOut, true);
        if (fhir_extension['valueReference'] != null) {
          const entryId = fhir_extension['valueReference']['reference'];
          if (!mappedResources[entryId]) {
            const referencedEntry = allEntries.find(e => e.fullUrl === entryId);
            if (referencedEntry) {
              mappedResources[entryId] = FHIRHelper.createInstanceFromFHIR('shr.procedure.ProcedurePerformed', referencedEntry['resource'], 'undefined', shrId, allEntries, mappedResources, referencesOut);
            }
          }
          if (mappedResources[entryId]) {
            inst.partOf.value = FHIRHelper.createReference(mappedResources[entryId], referencesOut);
          }
          else {
            const entryType = 'http://standardhealthrecord.org/spec/shr/procedure/ProcedurePerformed';
            inst.partOf.value = FHIRHelper.createReferenceWithoutObject(shrId, entryId, entryType);
          }
        }
      }
      if (fhir_extension['url'] != null && fhir_extension['url'] === 'http://example.com/fhir/StructureDefinition/shr-entity-Device-extension') {
        inst.device = inst.device || [];
        const inst_device = FHIRHelper.createReference( FHIRHelper.createInstanceFromFHIR('shr.entity.Device', fhir_extension, 'Extension', shrId, allEntries, mappedResources, referencesOut, true), referencesOut);
        inst.device.push(inst_device);
      }
      if (fhir_extension['url'] != null && fhir_extension['url'] === 'http://example.com/fhir/StructureDefinition/shr-procedure-AmountOrSize-extension') {
        inst.amountOrSize = inst.amountOrSize || [];
        const inst_amountOrSize = FHIRHelper.createInstanceFromFHIR('shr.procedure.AmountOrSize', fhir_extension, 'Extension', shrId, allEntries, mappedResources, referencesOut, true);
        inst.amountOrSize.push(inst_amountOrSize);
      }
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
    if (fhir['status'] != null) {
      inst.status = FHIRHelper.createInstanceFromFHIR('shr.core.Status', fhir['status'], 'code', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['category'] != null) {
      inst.category = FHIRHelper.createInstanceFromFHIR('shr.core.Category', fhir['category'], 'CodeableConcept', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['code'] != null) {
      inst.procedureCode = FHIRHelper.createInstanceFromFHIR('shr.procedure.ProcedureCode', fhir['code'], 'CodeableConcept', shrId, allEntries, mappedResources, referencesOut, false);
    }
    for (const fhir_bodySite of fhir['bodySite'] || []) {
      inst.anatomicalLocation = inst.anatomicalLocation || [];
      const inst_anatomicalLocation = FHIRHelper.createInstanceFromFHIR('shr.core.AnatomicalLocation', {}, null, shrId);
      inst.anatomicalLocation.push(inst_anatomicalLocation);
      inst_anatomicalLocation.value = FHIRHelper.createInstanceFromFHIR('shr.core.AnatomicalLocationPrecoordinated', fhir_bodySite, 'CodeableConcept', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['reasonCodeableConcept'] != null) {
      inst.reason = inst.reason || [];
      const inst_reason = FHIRHelper.createInstanceFromFHIR('shr.base.Reason', fhir['reasonCodeableConcept'], 'CodeableConcept', shrId, allEntries, mappedResources, referencesOut, false);
      inst.reason.push(inst_reason);
    }
    for (const fhir_performer of fhir['performer'] || []) {
      inst.participation = inst.participation || [];
      const inst_participation = FHIRHelper.createInstanceFromFHIR('shr.base.Participation', fhir_performer, 'BackboneElement', shrId, allEntries, mappedResources, referencesOut, false);
      inst.participation.push(inst_participation);
      if (fhir_performer['actor'] != null) {
        const entryId = fhir_performer['actor']['reference'];
        if (!mappedResources[entryId]) {
          const referencedEntry = allEntries.find(e => e.fullUrl === entryId);
          if (referencedEntry) {
            mappedResources[entryId] = FHIRHelper.createInstanceFromFHIR('shr.entity.Practitioner', referencedEntry['resource'], 'undefined', shrId, allEntries, mappedResources, referencesOut);
          }
        }
        inst_participation.participant = mappedResources[entryId];
      }
      if (fhir_performer['role'] != null) {
        inst_participation.participationType = FHIRHelper.createInstanceFromFHIR('shr.base.ParticipationType', fhir_performer['role'], 'CodeableConcept', shrId, allEntries, mappedResources, referencesOut, false);
      }
    }
    if (fhir['performedDateTime'] != null) {
      inst.occurrenceTimeOrPeriod = FHIRHelper.createInstanceFromFHIR('shr.core.OccurrenceTimeOrPeriod', fhir['performedDateTime'], 'dateTime', shrId, allEntries, mappedResources, referencesOut, false);
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
    if (fhir['location'] != null) {
      const entryId = fhir['location']['reference'];
      if (!mappedResources[entryId]) {
        const referencedEntry = allEntries.find(e => e.fullUrl === entryId);
        if (referencedEntry) {
          mappedResources[entryId] = FHIRHelper.createInstanceFromFHIR('shr.entity.Facility', referencedEntry['resource'], 'undefined', shrId, allEntries, mappedResources, referencesOut);
        }
      }
      if (mappedResources[entryId]) {
        inst.facility = FHIRHelper.createReference(mappedResources[entryId], referencesOut);
      }
      else {
        const entryType = 'http://standardhealthrecord.org/spec/shr/entity/Facility';
        inst.facility = FHIRHelper.createReferenceWithoutObject(shrId, entryId, entryType);
      }
    }
    if (fhir['outcome'] != null) {
      inst.outcome = FHIRHelper.createInstanceFromFHIR('shr.base.Outcome', fhir['outcome'], 'CodeableConcept', shrId, allEntries, mappedResources, referencesOut, false);
    }
    if (fhir['request'] != null) {
      inst.relatedRequest = inst.relatedRequest || FHIRHelper.createInstanceFromFHIR('shr.base.RelatedRequest', {}, null, shrId);
      const entryId = fhir['request']['reference'];
      if (!mappedResources[entryId]) {
        const referencedEntry = allEntries.find(e => e.fullUrl === entryId);
        if (referencedEntry) {
          mappedResources[entryId] = FHIRHelper.createInstanceFromFHIR('shr.procedure.ProcedureRequested', referencedEntry['resource'], 'undefined', shrId, allEntries, mappedResources, referencesOut);
        }
      }
      if (mappedResources[entryId]) {
        inst.relatedRequest.value = FHIRHelper.createReference(mappedResources[entryId], referencesOut);
      }
      else {
        const entryType = 'http://standardhealthrecord.org/spec/shr/procedure/ProcedureRequested';
        inst.relatedRequest.value = FHIRHelper.createReferenceWithoutObject(shrId, entryId, entryType);
      }
    }
    for (const fhir_notes of fhir['notes'] || []) {
      inst.annotation = inst.annotation || [];
      const inst_annotation = FHIRHelper.createInstanceFromFHIR('shr.core.Annotation', fhir_notes, 'Annotation', shrId, allEntries, mappedResources, referencesOut, false);
      inst.annotation.push(inst_annotation);
    }
    return inst;
  }

}
export default SpecimenCollectionPerformed;
