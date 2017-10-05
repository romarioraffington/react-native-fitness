import { RECEIVE_ENTRIES, ADD_ENTRIES } from '../actions/constants';

export default entries = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_ENTRIES :
      return {
        ...state,
        ...action.entries
      }
    case ADD_ENTRIES :
      return {
        ...state,
        ...action.entry
      }
    return state
  }
}
