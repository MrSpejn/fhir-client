<script>
import { mapState, mapActions } from 'vuex';
import debounce from 'lodash.debounce';

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
    ...mapActions(['fetchPatients', 'fetchOrganizations']),
    search: debounce(function (query) {
      this.fetchPatients(query);
    }, 500),
  },

};
</script>

<template>
  <div class="index-view">
    <div class="index-view__controls">
      <v-text-field
        name="search"
        label="Patient name"
        single-line
        v-on:input="this.search"
        prepend-icon="search"
        class="search"
        autocomplete="off"
      ></v-text-field>
    </div>
    <patients-list v-if="!patients.loading && !organizations.loading" :patients="patientsWithOrganizations" />
  </div>
</template>

<style lang="scss" prescoped>
  .search {
    box-shadow: inset 0 0 500 #fff;
  }
  .index-view {
    padding: 0 100px;

    @media screen and (max-width: 1024px) {
      padding: 0 16px;
      margin: 0 auto;
    }

    &__controls {
      max-width: 900px;
      margin: 24px auto 0;
      padding: 24px;
      background-color: #fff;
    }
  }
</style>
