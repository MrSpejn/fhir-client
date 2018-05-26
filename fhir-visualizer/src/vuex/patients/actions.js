import axios from 'axios';

import { types } from './mutations';

export const fetchPatients = ({ commit }, name) => {
  commit(types.FETCH_PATIENTS_STARTED);
  
  return axios
    .get('/Patient', { params: { _count: 1000, name } })
    .then((res) => {
      commit(types.FETCH_PATIENTS_FINISHED, res.data.entry.map(entry => entry.resource));
    })
    .catch((error) => {
      commit(types.FETCH_PATIENTS_FAILED, error);
      return Promise.reject(error);
    });
};

export const fetchPatient = ({ commit }, id) => {
  commit(types.FETCH_PATIENT_STARTED);

  return axios
    .get(`/Patient/${id}/$everything`)
    .then((res) => {
      commit(types.FETCH_PATIENT_FINISHED, res.data.entry.map(entry => entry.resource));
    })
    .catch((error) => {
      commit(types.FETCH_PATIENT_FAILED, error);
      return Promise.reject(error);
    });
}