export const initialState = {
    loading: false,
    loadingDetails: false,
    data: [],
    details: {},
    pageLoading: false,
    page: {
      count: 0,
      results: [],
    },
  };
  
export const types = {
    FETCH_PATIENTS_FAILED: 'FETCH_PATIENTS_FAILED',
    FETCH_PATIENTS_FINISHED: 'FETCH_PATIENTS_FINISHED',
    FETCH_PATIENTS_STARTED: 'FETCH_PATIENTS_STARTED',

    FETCH_PATIENT_FAILED: 'FETCH_PATIENT_FAILED',
    FETCH_PATIENT_FINISHED: 'FETCH_PATIENT_FINISHED',
    FETCH_PATIENT_STARTED: 'FETCH_PATIENT_STARTED',
};

/* eslint-disable no-param-reassign */
export const mutations = {
    [types.FETCH_PATIENTS_STARTED](state) {
        state.patients.loading = true;
    },
    [types.FETCH_PATIENTS_FINISHED](state, patients) {
        state.patients.loading = false;
        state.patients.data = patients;
    },
    [types.FETCH_PATIENTS_FAILED](state) {
        state.patients.loading = false;
    },

    [types.FETCH_PATIENT_STARTED](state) {
        state.patients.loadingDetails = true;
    },
    [types.FETCH_PATIENT_FINISHED](state, patient) {
        state.patients.loadingDetails = false;
        state.patients.details = patient;
    },
    [types.FETCH_PATIENT_FAILED](state) {
        state.patients.loadingDetails = false;
    },
};
/* eslint-enable no-param-reassign */
  