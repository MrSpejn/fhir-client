export const initialState = {
    loading: false,
    data: [],
  };
  
export const types = {
    FETCH_OBSERVATIONS_FAILED: 'FETCH_OBSERVATIONS_FAILED',
    FETCH_OBSERVATIONS_FINISHED: 'FETCH_OBSERVATIONS_FINISHED',
    FETCH_OBSERVATIONS_STARTED: 'FETCH_OBSERVATIONS_STARTED',
};

/* eslint-disable no-param-reassign */
export const mutations = {
    [types.FETCH_OBSERVATIONS_STARTED](state) {
        state.observations.loading = true;
    },
    [types.FETCH_OBSERVATIONS_FINISHED](state, observations) {
        state.observations.loading = false;
        state.observations.data = observations;
    },
    [types.FETCH_OBSERVATIONS_FAILED](state) {
        state.observations.loading = false;
    },
};
/* eslint-enable no-param-reassign */
  