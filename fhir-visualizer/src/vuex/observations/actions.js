import axios from 'axios';

import { types } from './mutations';

const getObservations = (patient, offset) => axios
  .get('/Observation', { params: { _count: 50, _getpagesoffset: offset, patient }});

export const fetchObservations = ({ commit }, patient) => {
  commit(types.FETCH_OBSERVATIONS_STARTED);
  
  return getObservations(patient, 0)
    .then((res) => {
      if (res.data.entry.length < res.data.total) {
        axios.get(res.data.link[1].url).then((res2) => {
          commit(types.FETCH_OBSERVATIONS_FINISHED, [...res2.data.entry, ...res.data.entry].map(entry => entry.resource));
        })
      } else {
        commit(types.FETCH_OBSERVATIONS_FINISHED, res.data.entry.map(entry => entry.resource));
      }
    })
    .catch((error) => {
      commit(types.FETCH_OBSERVATIONS_FAILED, error);
      return Promise.reject(error);
    });
};

