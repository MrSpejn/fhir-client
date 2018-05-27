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

import * as proceduresActions from './procedures/actions';
import {
    initialState as procedures,
    mutations as proceduresMutations,
} from './procedures/mutations';

import * as diagnosticReportsActions from './diagnosticReports/actions';
import {
    initialState as diagnosticReports,
    mutations as diagnosticReportsMutations,
} from './diagnosticReports/mutations';

import * as conditionsActions from './conditions/actions';
import {
    initialState as conditions,
    mutations as conditionsMutations,
} from './conditions/mutations';

Vue.use(Vuex);

const state = {
    patients,
    organizations,
    medicationRequests,
    observations,
    encounters,
    procedures,
    diagnosticReports,
    conditions,
};

export default new Vuex.Store({
    state,
    mutations: {
        ...patientsMutations,
        ...organizationsMutations,
        ...medicationRequestsMutations,
        ...observationsMutations,
        ...encountersMutations,
        ...proceduresMutations,
        ...diagnosticReportsMutations,
        ...conditionsMutations,
    },
    actions: {
        ...patientsActions,
        ...organizationsActions,
        ...observationsActions,
        ...medicationRequestsActions,
        ...encountersActions,
        ...proceduresActions,
        ...diagnosticReportsActions,
        ...conditionsActions,
    },
  });
  