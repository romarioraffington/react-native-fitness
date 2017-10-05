import { RECEIVE_ENTRIES, ADD_ENTRIES } from './constants';

export const receiveEntries = (entries) => {
  return {
    type: RECEIVE_ENTRIES,
    payload: entries,
  }
}

export const addEntry = (entry) => {
  return {
    type: ADD_ENTRIES,
    payload: entry,
  }
}