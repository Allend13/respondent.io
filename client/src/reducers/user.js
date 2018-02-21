import { SUCCESS, START, FAIL, user } from '../constants';

const initialState = {
  isFetching: false,
  isReady: false,
  data: {}
};

export default (reducerState = initialState, action) => {
  switch (action.type) {
    case user.get_token + START:
      return {
        ...reducerState,
        isFetching: true,
      };
    case user.exchange_to_auth_token + SUCCESS:
      return {
        ...reducerState,
        isFetching: false,
      };
    case user.create_user + START:
      return {
        ...reducerState,
        isFetching: true,
      };
    case user.create_user + SUCCESS:
      return {
        ...reducerState,
        isFetching: false,
        isReady: true,
        data:action.payload.data
      };
    default:
      return {
        ...reducerState
      };
  }
}