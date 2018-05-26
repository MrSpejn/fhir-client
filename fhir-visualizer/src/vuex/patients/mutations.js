export const initialState = {
    loading: false,
    data: [],
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
};
/* eslint-enable no-param-reassign */
  