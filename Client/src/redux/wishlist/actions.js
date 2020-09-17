import axios from "axios";
import {
  GET_WISHLIST,
  ADD_WISHLIST_GAME,
  DELETE_WISHLIST_GAME_STATE,
  DELETE_WISHLIST_GAME_DB,
} from "./types";

export const getWishlist = (userId) => async (dispatch) => {
  await axios
    .get(`http://localhost:8080/api/wishlist/list/${userId}`)
    .then((res) =>
      dispatch({
        type: GET_WISHLIST,
        payload: res.data,
      })
    );
};

export const addWishlistGame = (game) => async (dispatch) => {
  await axios.post("http://localhost:8080/api/wishlist/add", game);
  dispatch({
    type: ADD_WISHLIST_GAME,
    payload: game,
  });
};

export const deleteWishlistGameState = (game) => (dispatch) => {
  dispatch({
    type: DELETE_WISHLIST_GAME_STATE,
    payload: game,
  });
};

export const deleteWishlistGameDB = (id) => async (dispatch) => {
  await axios.post(`http://localhost:8080/api/wishlist/delete/${id}`);
  dispatch({
    type: DELETE_WISHLIST_GAME_DB,
    payload: id,
  });
};
