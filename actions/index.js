import { RECEIVE_ENTRIES, ADD_ENTRIES } from './constants';

export const receiveEntries  = (entries) => {
  return {
    type: RECEIVE_ENTRIES,
    entries,
  }
}


export const addEntries = (entry) => {
  return {
    type: ADD_ENTRIES,
    entry,
  }
}