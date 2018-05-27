import axios from 'axios';

import { types } from './mutations';

export const fetchDiagnosticReports = ({ commit }, patient) => {
  commit(types.FETCH_DIAGNOSTIC_REPORTS_STARTED);
  
  return axios
    .get('/DiagnosticReport', { params: { _count: 1000, subject: patient } }, )
    .then((res) => {
      commit(types.FETCH_DIAGNOSTIC_REPORTS_FINISHED, res.data.entry ? res.data.entry.map(entry => entry.resource) : []);
    })
    .catch((error) => {
      commit(types.FETCH_DIAGNOSTIC_REPORTS_FAILED, error);
      return Promise.reject(error);
    });
};