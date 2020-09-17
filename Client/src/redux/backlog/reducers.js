import {
  GET_BACKLOG,
  ADD_BACKLOG_GAME,
  DELETE_BACKLOG_GAME_STATE,
  DELETE_BACKLOG_GAME_DB,
  MOVE_GAME_FROM_WISHLIST_TO_BACKLOG,
} from "./types";

const initialState = {
  backlog: [],
  wishlist: [],
};

export default function backlogReducers(state = initialState, action) {
  switch (action.type) {
    case GET_BACKLOG:
      console.log(action.payload);

      return {
        ...state,
        backlog: action.payload,
      };
    //adding a game to db and state
    case ADD_BACKLOG_GAME:
      return {
        ...state,
        backlog: [action.payload, ...state.backlog],
      };
    case DELETE_BACKLOG_GAME_STATE:
      return {
        ...state,
        backlog: state.backlog.filter((game) => game !== action.payload),
      };
    case DELETE_BACKLOG_GAME_DB:
      return {
        ...state,
      };
    case MOVE_GAME_FROM_WISHLIST_TO_BACKLOG:
      return {
        ...state,
        backlog: [action.payload, ...state.backlog],
        wishlist: state.wishlist.filter((game) => game !== action.payload),
      };
    default:
      return state;
  }
}
