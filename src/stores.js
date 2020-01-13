import { writable } from 'svelte/store'
import { storage } from './storage'

export const createTokenStore = ()  => {
  const localTokenStore = storage.getItem('token');

  const {subscribe, set, update} = writable(localTokenStore);

  return {
    subscribe,
    set: token => {
      storage.setItem('token', token);
      set(token);
    },
    unset: () => {
      storage.removeItem('token');
      set(null);
    },
    update: token => { 
      storage.setItem('token', token);
      update(token);
    }
  };
};

export const token = createTokenStore();

export const events = writable([]);
export const newCreation = writable(false)