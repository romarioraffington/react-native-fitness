import { RECEIVE_ENTRIES, ADD_ENTRIES } from './constants';

export function receiveEntries (entries) {
  return {
    type: RECEIVE_ENTRIES,
    entries,
  }
}


export function receiveEntries (entry) {
  return {
    type: ADD_ENTRIES,
    entry,
  }
}