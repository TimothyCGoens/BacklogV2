import { GET_USER, LOG_IN, LOG_OUT } from "./types";

const initialState = {
  isAuthenticated: false,
  userId: null,
  user: {},
};

export default function userReducers(state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
      console.log(action.payload);
      return {
        ...state,
        isAuthenticated: action.token != null ? true : false,
        userId: action.userId,
      };
    case LOG_OUT:
      return {
        ...state,
        isAuthenticated: false,
        userId: null,
      };
    case GET_USER:
      console.log(action.payload);

      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
