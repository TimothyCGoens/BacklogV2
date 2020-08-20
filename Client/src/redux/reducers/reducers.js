import {
  GET_BACKLOG,
  ADD_BACKLOG_GAME,
  DELETE_BACKLOG_GAME,
  GET_WISHLIST,
  GET_USER,
  LOG_IN,
  LOG_OUT,
  ADD_WISHLIST_GAME,
  MOVE_GAME_FROM_WISHLIST_TO_BACKLOG,
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  userId: null,
  user: {},
  backlog: [],
  wishlist: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
      console.log(action.userId);
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

    case ADD_BACKLOG_GAME:
      return {
        ...state,
        backlog: [action.payload, ...state.backlog],
      };

    case ADD_WISHLIST_GAME:
      return {
        ...state,
        wishlist: [action.payload, ...state.wishlist],
      };

    case DELETE_BACKLOG_GAME:
      console.log(action.payload);
      return {
        ...state,
        backlog: state.backlog.filter((game) => game !== action.payload),
      };

    case GET_WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
        loading: false,
      };

    case MOVE_GAME_FROM_WISHLIST_TO_BACKLOG:
      console.log(action.payload);
      return {
        ...state,
        backlog: [action.payload, ...state.backlog],
        wishlist: state.wishlist.filter((game) => game !== action.payload),
      };

    default:
      return state;
  }
}
