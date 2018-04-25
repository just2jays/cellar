import {
    SHOW_HAS_ERRORED, SHOW_IS_LOADING, SHOW_FETCH_DATA_SUCCESS
  } from '../constants/index';
  
  const defaultState = {
    show: [],
    isFetching: false,
    isFetched: false,
    error: null
  };
  
  const show = (state = defaultState, action) => {
    switch (action.type) {
      case SHOW_HAS_ERRORED:
        return { ...state, isFetching: true, isFetched: false };
  
      case SHOW_IS_LOADING:
        return { ...state, show: action.show, isFetching: false, isFetched: true };
  
      case SHOW_FETCH_DATA_SUCCESS:
        return { ...state, isFetching: false, isFetched: false, error: action.error };
  
      default:
        return state;
    }
  };
  
  export default show;