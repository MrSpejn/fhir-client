import Vue from 'vue';
import Vuex from 'vuex';

import * as patientsActions from './patients/actions';
import {
    initialState as patients,
    mutations as patientsMutations,
} from './patients/mutations';

import * as organizationsActions from './organizations/actions';
import {
    initialState as organizations,
    mutations as organizationsMutations,
} from './organizations/mutations';

Vue.use(Vuex);

const state = {
    patients,
    organizations,
};

export default new Vuex.Store({
    state,
    mutations: {
        ...patientsMutations,
        ...organizationsMutations,
    },
    actions: {
        ...patientsActions,
        ...organizationsActions,
    },
  });
  