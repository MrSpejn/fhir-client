import axios from 'axios';

import { types } from './mutations';

export const fetchEncounters = ({ commit }, patient) => {
  commit(types.FETCH_ENCOUNTERS_STARTED);
  
  return axios
    .get('/Encounter', { params: { _count: 1000, subject: patient } }, )
    .then((res) => {
      commit(types.FETCH_ENCOUNTERS_FINISHED, res.data.entry.map(entry => entry.resource));
    })
    .catch((error) => {
      commit(types.FETCH_ENCOUNTERS_FAILED, error);
      return Promise.reject(error);
    });
};