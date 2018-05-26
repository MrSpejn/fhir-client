<script>
import { mapState, mapActions } from 'vuex';

import PatientsList from '@/components/patients/PatientsList';

export default {
  name: 'IndexView',
  created() {
    this.fetchPatients();
    this.fetchOrganizations();
  },
  components: {
    'patients-list': PatientsList
  },
  computed: {
    ...mapState(['patients', 'organizations']),
    patientsWithOrganizations() {
      return this.patients.data.map(patient => ({
        ...patient,
        generalPractitioner: patient.generalPractitioner.map(pract => {
          const organization = this.organizations.data.find(org => pract.reference.split('/')[1] === org.id);
          return organization || null;
        }),
      }));
    },
  },
  methods: {
    ...mapActions(['fetchPatients', 'fetchOrganizations'])
  },

};
</script>

<template>
  <div class="index-view">
    <patients-list v-if="!patients.loading && !organizations.loading" :patients="patientsWithOrganizations" />
  </div>
</template>

<style lang="scss" prescoped>
  .index-view {
    padding-left: 100px;
  }
</style>
