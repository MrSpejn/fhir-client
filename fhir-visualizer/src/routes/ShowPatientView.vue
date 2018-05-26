<script>
import { mapState, mapActions } from 'vuex';
import PatientContainer from '@/components/single-patient/PatientContainer';

export default {
  name: 'show-patient-view',
  created() {
    this.fetchPatient(this.$route.params.id);
  },
  components: {
    'patient-container': PatientContainer,
  },
  computed: {
    ...mapState(['patients']),
  },
  methods: {
    ...mapActions(['fetchPatient']),
  },
};
</script>

<template>
  <div class="show-patient-view">
    <div v-if="!patients.loadingDetails">
      <patient-container
        :patient="patients.details[0]"
        :refs="patients.details.slice(1)"
      />
    </div>
  </div>
</template>

<style lang="scss" prescoped>
    .show-patient-view {

    }
</style>
