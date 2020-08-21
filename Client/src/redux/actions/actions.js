import axios from "axios";
import {
  GET_USER,
  LOG_IN,
  LOG_OUT,
  GET_BACKLOG,
  ADD_BACKLOG_GAME,
  DELETE_BACKLOG_GAME_STATE,
  DELETE_BACKLOG_GAME_DB,
  DELETE_WISHLIST_GAME_STATE,
  DELETE_WISHLIST_GAME_DB,
  ADD_WISHLIST_GAME,
  GET_WISHLIST,
  GET_COMPLETED,
  ADD_COMPLETED_GAME,
  MOVE_GAME_FROM_WISHLIST_TO_BACKLOG,
  MOVE_GAME_FROM_BACKLOG_TO_COMPLETED,
  // MOVE_GAME_FROM_BACKLOG_TO_COMPLETED_DB,
} from "./types";

export const logIn = (userId) => {
  return {
    type: LOG_IN,
    payload: userId,
  };
};
export const logOut = () => {
  return {
    type: LOG_OUT,
  };
};

//getting all the date from these tables
export const getUser = (userId) => (dispatch) => {
  axios.get(`http://localhost:8080/api/profile/list/${userId}`).then((res) =>
    dispatch({
      type: GET_USER,
      payload: res.data,
    })
  );
};
export const getBacklog = (userId) => (dispatch) => {
  axios.get(`http://localhost:8080/api/backlog/list/${userId}`).then((res) =>
    dispatch({
      type: GET_BACKLOG,
      payload: res.data,
    })
  );
};
export const getWishlist = (userId) => (dispatch) => {
  axios.get(`http://localhost:8080/api/wishlist/list/${userId}`).then((res) =>
    dispatch({
      type: GET_WISHLIST,
      payload: res.data,
    })
  );
};
export const getCompleted = (userId) => (dispatch) => {
  axios.get(`http://localhost:8080/api/completed/list/${userId}`).then((res) =>
    dispatch({
      type: GET_COMPLETED,
      payload: res.data,
    })
  );
};

export const addBacklogGame = (game) => async (dispatch) => {
  axios.post("http://localhost:8080/api/backlog/add", game);
  dispatch({
    type: ADD_BACKLOG_GAME,
    payload: game,
  });
};

export const addWishlistGame = (game) => async (dispatch) => {
  axios.post("http://localhost:8080/api/wishlist/add", game);
  dispatch({
    type: ADD_WISHLIST_GAME,
    payload: game,
  });
};

export const addCompletedGame = (game) => async (dispatch) => {
  axios.post("http://localhost:8080/api/completed/add", game);
  dispatch({
    type: ADD_COMPLETED_GAME,
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
export const deleteBacklogGameState = (game) => (dispatch) => {
  dispatch({
    type: DELETE_BACKLOG_GAME_STATE,
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
export const deleteWishlistGameState = (game) => (dispatch) => {
  dispatch({
    type: DELETE_WISHLIST_GAME_STATE,
    payload: game,
  });
};

export const moveGameFromWishlistToBacklog = (game) => async (dispatch) => {
  await axios.post("http://localhost:8080/api/backlog/add", game);
  dispatch({
    type: MOVE_GAME_FROM_WISHLIST_TO_BACKLOG,
    payload: game,
  });
};

export const moveGameFromBacklogToCompleted = (game) => (dispatch) => {
  dispatch({
    type: MOVE_GAME_FROM_BACKLOG_TO_COMPLETED,
    payload: game,
  });
};

// export const moveGameFromBacklogToCompletedDB = (game) => async (dispatch) => {
//   await axios.post("http://localhost:8080/api/completed/add", game);
//   dispatch({
//     type: MOVE_GAME_FROM_BACKLOG_TO_COMPLETED_DB,
//     payload: game,
//   });
// };
