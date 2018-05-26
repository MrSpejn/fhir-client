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
    FETCH_ENCOUNTERS_FAILED: 'FETCH_ENCOUNTERS_FAILED',
    FETCH_ENCOUNTERS_FINISHED: 'FETCH_ENCOUNTERS_FINISHED',
    FETCH_ENCOUNTERS_STARTED: 'FETCH_ENCOUNTERS_STARTED',
};

/* eslint-disable no-param-reassign */
export const mutations = {
    [types.FETCH_ENCOUNTERS_STARTED](state) {
        state.encounters.loading = true;
    },
    [types.FETCH_ENCOUNTERS_FINISHED](state, encounters) {
        state.encounters.loading = false;
        state.encounters.data = encounters;
    },
    [types.FETCH_ENCOUNTERS_FAILED](state) {
        state.encounters.loading = false;
    },
};
/* eslint-enable no-param-reassign */
  