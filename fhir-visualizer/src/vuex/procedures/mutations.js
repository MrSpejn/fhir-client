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
    FETCH_PROCEDURES_FAILED: 'FETCH_PROCEDURES_FAILED',
    FETCH_PROCEDURES_FINISHED: 'FETCH_PROCEDURES_FINISHED',
    FETCH_PROCEDURES_STARTED: 'FETCH_PROCEDURES_STARTED',
};

/* eslint-disable no-param-reassign */
export const mutations = {
    [types.FETCH_PROCEDURES_STARTED](state) {
        state.procedures.loading = true;
    },
    [types.FETCH_PROCEDURES_FINISHED](state, procedures) {
        state.procedures.loading = false;
        state.procedures.data = procedures;
    },
    [types.FETCH_PROCEDURES_FAILED](state) {
        state.procedures.loading = false;
    },
};
/* eslint-enable no-param-reassign */
  