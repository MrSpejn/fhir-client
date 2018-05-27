import axios from 'axios';

import { types } from './mutations';

export const fetchProcedures = ({ commit }, patient) => {
  commit(types.FETCH_PROCEDURES_STARTED);
  
  return axios
    .get('/Procedure', { params: { _count: 1000, subject: patient } }, )
    .then((res) => {
      commit(types.FETCH_PROCEDURES_FINISHED, res.data.entry ? res.data.entry.map(entry => entry.resource) : []);
    })
    .catch((error) => {
      commit(types.FETCH_PROCEDURES_FAILED, error);
      return Promise.reject(error);
    });
};