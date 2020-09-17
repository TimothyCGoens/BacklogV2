import {
  GET_WISHLIST,
  ADD_WISHLIST_GAME,
  DELETE_WISHLIST_GAME_STATE,
  DELETE_WISHLIST_GAME_DB,
} from "./types";

const initialState = {
  wishlist: [],
};

export default function wishlistReducers(state = initialState, action) {
  switch (action.type) {
    case GET_WISHLIST:
      console.log(action.payload);

      return {
        ...state,
        wishlist: action.payload,
      };
    case ADD_WISHLIST_GAME:
      return {
        ...state,
        wishlist: [action.payload, ...state.wishlist],
      };
    case DELETE_WISHLIST_GAME_STATE:
      return {
        ...state,
        wishlist: state.wishlist.filter((game) => game !== action.payload),
      };
    case DELETE_WISHLIST_GAME_DB:
      return {
        ...state,
      };
    default:
      return state;
  }
}
