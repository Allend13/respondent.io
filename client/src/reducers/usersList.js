import { SUCCESS, START, FAIL, user } from '../constants';

const initialState = {
  isFetching: false,
  isReady: false,
  data: []
};

export default (reducerState = initialState, action) => {
  switch (action.type) {
    case user.index + START:
      return {
        ...reducerState,
        isFetching: true,
      };
    case user.index + SUCCESS:
      return {
        ...reducerState,
        isFetching: false,
        isReady: true,
        data: action.payload.data
      };
    case user.filter + START:
      return {
        ...reducerState,
        isFetching: true,
      };
    case user.filter + SUCCESS:
      return {
        ...reducerState,
        isFetching: false,
        isReady: true,
        data: action.payload.data
      };
    default:
      return {
        ...reducerState
      };
  }
}