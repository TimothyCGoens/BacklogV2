import axios from "axios";
import {
  GET_BACKLOG,
  ADD_BACKLOG_GAME,
  DELETE_BACKLOG_GAME_STATE,
  DELETE_BACKLOG_GAME_DB,
  MOVE_GAME_FROM_WISHLIST_TO_BACKLOG,
} from "./types";

export const getBacklog = (userId) => async (dispatch) => {
  await axios
    .get(`http://localhost:8080/api/backlog/list/${userId}`)
    .then((res) =>
      dispatch({
        type: GET_BACKLOG,
        payload: res.data,
      })
    );
};

export const addBacklogGame = (game) => async (dispatch) => {
  await axios.post("http://localhost:8080/api/backlog/add", game);
  dispatch({
    type: ADD_BACKLOG_GAME,
    payload: game,
  });
};

export const deleteBacklogGameState = (game) => (dispatch) => {
  dispatch({
    type: DELETE_BACKLOG_GAME_STATE,
    payload: game,
  });
};

export const deleteBacklogGameDB = (id) => async (dispatch) => {
  await axios.post(`http://localhost:8080/api/backlog/delete/${id}`);
  dispatch({
    type: DELETE_BACKLOG_GAME_DB,
    payload: id,
  });
};

export const moveGameFromWishlistToBacklog = (game) => async (dispatch) => {
  await axios.post("http://localhost:8080/api/backlog/add", game);
  dispatch({
    type: MOVE_GAME_FROM_WISHLIST_TO_BACKLOG,
    payload: game,
  });
};
