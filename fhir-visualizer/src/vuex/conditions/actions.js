import axios from 'axios';

import { types } from './mutations';

export const fetchConditions = ({ commit }, patient) => {
  commit(types.FETCH_CONDITIONS_STARTED);
  
  return axios
    .get('/Condition', { params: { _count: 1000, subject: patient } }, )
    .then((res) => {
      commit(types.FETCH_CONDITIONS_FINISHED, res.data.entry.map(entry => entry.resource));
    })
    .catch((error) => {
      commit(types.FETCH_CONDITIONS_FAILED, error);
      return Promise.reject(error);
    });
};