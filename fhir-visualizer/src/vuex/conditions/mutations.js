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
    FETCH_CONDITIONS_FAILED: 'FETCH_CONDITIONS_FAILED',
    FETCH_CONDITIONS_FINISHED: 'FETCH_CONDITIONS_FINISHED',
    FETCH_CONDITIONS_STARTED: 'FETCH_CONDITIONS_STARTED',
};

/* eslint-disable no-param-reassign */
export const mutations = {
    [types.FETCH_CONDITIONS_STARTED](state) {
        state.conditions.loading = true;
    },
    [types.FETCH_CONDITIONS_FINISHED](state, conditions) {
        state.conditions.loading = false;
        state.conditions.data = conditions;
    },
    [types.FETCH_CONDITIONS_FAILED](state) {
        state.conditions.loading = false;
    },
};
/* eslint-enable no-param-reassign */
  