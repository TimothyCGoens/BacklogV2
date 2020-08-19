import {
  LOG_IN,
  LOG_OUT,
  LOADING,
  GET_BACKLOG,
  GET_USER,
  GET_WISHLIST,
  ADD_BACKLOG_GAME,
  DELETE_BACKLOG_GAME,
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  userId: null,
  loading: false,
  user: {},
  backlog: [],
  wishlist: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
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
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case GET_BACKLOG:
      return {
        ...state,
        backlog: action.payload,
        loading: false,
      };
    case GET_WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
        loading: false,
      };
    case ADD_BACKLOG_GAME:
      return {
        ...state,
        backlog: [action.payload, ...state.backlog],
      };
    case DELETE_BACKLOG_GAME:
      return {
        ...state,
        backlog: state.backlog.filter((game) => game.id !== action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
