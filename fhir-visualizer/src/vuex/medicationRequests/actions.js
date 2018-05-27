import axios from 'axios';

import { types } from './mutations';

export const fetchMedicationRequests = ({ commit }, patient) => {
  commit(types.FETCH_MEDICATION_REQUESTS_STARTED);
  
  return axios
    .get('/MedicationRequest', { params: { _count: 1000, patient } })
    .then((res) => {
      commit(types.FETCH_MEDICATION_REQUESTS_FINISHED, res.data.entry ? res.data.entry.map(entry => entry.resource) : []);
    })
    .catch((error) => {
      commit(types.FETCH_MEDICATION_REQUESTS_FAILED, error);
      return Promise.reject(error);
    });
};