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

import * as medicationRequestsActions from './medicationRequests/actions';
import {
    initialState as medicationRequests,
    mutations as medicationRequestsMutations,
} from './medicationRequests/mutations';

import * as observationsActions from './observations/actions';
import {
    initialState as observations,
    mutations as observationsMutations,
} from './observations/mutations';

import * as encountersActions from './encounters/actions';
import {
    initialState as encounters,
    mutations as encountersMutations,
} from './encounters/mutations';


Vue.use(Vuex);

const state = {
    patients,
    organizations,
    medicationRequests,
    observations,
    encounters,
};

export default new Vuex.Store({
    state,
    mutations: {
        ...patientsMutations,
        ...organizationsMutations,
        ...medicationRequestsMutations,
        ...observationsMutations,
        ...encountersMutations,
    },
    actions: {
        ...patientsActions,
        ...organizationsActions,
        ...observationsActions,
        ...medicationRequestsActions,
        ...encountersActions,
    },
  });
  