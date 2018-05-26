import axios from 'axios';

import { types } from './mutations';

export const fetchPatients = ({ commit }) => {
  commit(types.FETCH_PATIENTS_STARTED);
  
  return axios
    .get('/Patient', { params: { _count: 1000 } })
    .then((res) => {
      commit(types.FETCH_PATIENTS_FINISHED, res.data.entry.map(entry => entry.resource));
    })
    .catch((error) => {
      commit(types.FETCH_PATIENTS_FAILED, error);
      return Promise.reject(error);
    });
};