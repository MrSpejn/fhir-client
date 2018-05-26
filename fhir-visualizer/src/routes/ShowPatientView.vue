<script>
import { mapState, mapActions } from 'vuex';
import PatientContainer from '@/components/single-patient/PatientContainer';

export default {
  name: 'show-patient-view',
  created() {
    this.fetchPatient(this.$route.params.id);
    this.fetchMedicationRequests(this.$route.params.id);
    this.fetchObservations(this.$route.params.id);
    this.fetchEncounters(this.$route.params.id)
  },
  components: {
    'patient-container': PatientContainer,
  },
  computed: {
    ...mapState(['patients', 'observations', 'medicationRequests', 'encounters']),
  },
  methods: {
    ...mapActions(['fetchPatient', 'fetchObservations', 'fetchMedicationRequests', 'fetchEncounters']),
  },
};
</script>

<template>
  <div class="show-patient-view">
    <div v-if="!patients.loadingDetails && !medicationRequests.loading && !observations.loading && !encounters.loading">
      <patient-container
        :encounters="encounters.data"
        :patient="patients.details"
        :observations="observations.data"
        :medicationRequests="medicationRequests.data"
      />
    </div>
  </div>
</template>

<style lang="scss" prescoped>
    .show-patient-view {

    }
</style>
