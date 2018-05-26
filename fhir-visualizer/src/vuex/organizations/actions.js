import axios from 'axios';

import { types } from './mutations';

export const fetchOrganizations = ({ commit }) => {
  commit(types.FETCH_ORGANIZATIONS_STARTED);
  
  return axios
    .get('/Organization', { params: { _count: 1000 } })
    .then((res) => {
      commit(types.FETCH_ORGANIZATIONS_FINISHED, res.data.entry.map(entry => entry.resource));
    })
    .catch((error) => {
      commit(types.FETCH_ORGANIZATIONS_FAILED, error);
      return Promise.reject(error);
    });
};