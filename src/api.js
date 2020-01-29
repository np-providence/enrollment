import { token } from './stores';
import { get } from 'svelte/store';

let headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${get(token)}`
};

const paths = {
  enrol: 'api/enrol',
  features: 'api/features'
};

const request = (method, path, payload) => fetch(process.env.API_URL + path, {
  method,
  headers,
  body: JSON.stringify(payload)
});

export const postEnrol = (payload) => request('POST', paths.enrol, payload);
export const postFeatures = (payload) => request('POST', paths.features, payload);

export const userLogin = (email, password) => fetch(process.env.API_URL + `user/login?email=${email}&password=${password}`);
