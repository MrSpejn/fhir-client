import axios from 'axios';


/* eslint-disable import/prefer-default-export */

export function configureRequests() {
  const baseURL = `http://localhost:8080/baseDstu3/`;
  axios.defaults.baseURL = baseURL;

  return Promise.resolve();
}

/* eslint-enable import/prefer-default-export */
