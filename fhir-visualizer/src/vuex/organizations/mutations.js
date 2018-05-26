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
    FETCH_ORGANIZATIONS_FAILED: 'FETCH_ORGANIZATIONS_FAILED',
    FETCH_ORGANIZATIONS_FINISHED: 'FETCH_ORGANIZATIONS_FINISHED',
    FETCH_ORGANIZATIONS_STARTED: 'FETCH_ORGANIZATIONS_STARTED',
};

/* eslint-disable no-param-reassign */
export const mutations = {
    [types.FETCH_ORGANIZATIONS_STARTED](state) {
        state.organizations.loading = true;
    },
    [types.FETCH_ORGANIZATIONS_FINISHED](state, organizations) {
        state.organizations.loading = false;
        state.organizations.data = organizations;
    },
    [types.FETCH_ORGANIZATIONS_FAILED](state) {
        state.organizations.loading = false;
    },
};
/* eslint-enable no-param-reassign */
  