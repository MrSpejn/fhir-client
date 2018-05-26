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
    FETCH_MEDICATION_REQUESTS_FAILED: 'FETCH_MEDICATION_REQUESTS_FAILED',
    FETCH_MEDICATION_REQUESTS_FINISHED: 'FETCH_MEDICATION_REQUESTS_FINISHED',
    FETCH_MEDICATION_REQUESTS_STARTED: 'FETCH_MEDICATION_REQUESTS_STARTED',
};

/* eslint-disable no-param-reassign */
export const mutations = {
    [types.FETCH_MEDICATION_REQUESTS_STARTED](state) {
        state.medicationRequests.loading = true;
    },
    [types.FETCH_MEDICATION_REQUESTS_FINISHED](state, medicationRequests) {
        state.medicationRequests.loading = false;
        state.medicationRequests.data = medicationRequests;
    },
    [types.FETCH_MEDICATION_REQUESTS_FAILED](state) {
        state.medicationRequests.loading = false;
    },
};
/* eslint-enable no-param-reassign */
  