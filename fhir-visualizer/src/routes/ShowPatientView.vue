<script>
import { mapState, mapActions } from 'vuex';
import PatientContainer from '@/components/single-patient/PatientContainer';
import { processEvents } from '@/utils';
export default {
  name: 'show-patient-view',
  created() {
    this.fetchPatient(this.$route.params.id);
    this.fetchMedicationRequests(this.$route.params.id);
    this.fetchObservations(this.$route.params.id);
    this.fetchEncounters(this.$route.params.id)
    this.fetchProcedures(this.$route.params.id);
    this.fetchDiagnosticReports(this.$route.params.id);
    this.fetchConditions(this.$route.params.id);

  },
  components: {
    'patient-container': PatientContainer,
  },
  computed: {
    ...mapState([
      'patients',
      'observations',
      'medicationRequests',
      'encounters',
      'procedures',
      'diagnosticReports',
      'conditions',
    ]),
    events() {
      if (
        this.medicationRequests.loading || 
        this.observations.loading ||
        this.encounters.loading ||
        this.procedures.loading ||
        this.diagnosticReports.laoding ||
        this.conditions.laoding
      ) {
        return [];
      }

      return processEvents({
        encounters: this.encounters.data,
        observations: this.observations.data,
        procedures: this.procedures.data,
        diagnosticReports: this.diagnosticReports.data,
        conditions: this.conditions.data,
        medicationRequests: this.medicationRequests.data,
      });
    },
  },
  methods: {
    ...mapActions([
      'fetchPatient',
      'fetchObservations',
      'fetchMedicationRequests',
      'fetchEncounters',
      'fetchDiagnosticReports',
      'fetchConditions',
      'fetchProcedures',
    ]),
  },
};
</script>

<template>
  <div class="show-patient-view">
    <div>
      <patient-container
        :events="events"
        :patient="patients.details"
        :observations="observations.data"
      />
    </div>
  </div>
</template>

<style lang="scss" prescoped>
    .show-patient-view {

    }
</style>
