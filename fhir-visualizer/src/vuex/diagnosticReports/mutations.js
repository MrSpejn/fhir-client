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
    FETCH_DIAGNOSTIC_REPORTS_FAILED: 'FETCH_DIAGNOSTIC_REPORTS_FAILED',
    FETCH_DIAGNOSTIC_REPORTS_FINISHED: 'FETCH_DIAGNOSTIC_REPORTS_FINISHED',
    FETCH_DIAGNOSTIC_REPORTS_STARTED: 'FETCH_DIAGNOSTIC_REPORTS_STARTED',
};

/* eslint-disable no-param-reassign */
export const mutations = {
    [types.FETCH_DIAGNOSTIC_REPORTS_STARTED](state) {
        state.diagnosticReports.loading = true;
    },
    [types.FETCH_DIAGNOSTIC_REPORTS_FINISHED](state, diagnosticReports) {
        state.diagnosticReports.loading = false;
        state.diagnosticReports.data = diagnosticReports;
    },
    [types.FETCH_DIAGNOSTIC_REPORTS_FAILED](state) {
        state.diagnosticReports.loading = false;
    },
};
/* eslint-enable no-param-reassign */
  