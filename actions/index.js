import { RECEIVE_ENTRIES, ADD_ENTRIES } from './constants';

export const receiveEntry  = (entries) => {
  return {
    type: RECEIVE_ENTRIES,
    entries,
  }
}


export const addEntry = (entry) => {
  return {
    type: ADD_ENTRIES,
    entry,
  }
}