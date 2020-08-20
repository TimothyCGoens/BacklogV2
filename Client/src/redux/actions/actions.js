import axios from "axios";
import {
  GET_USER,
  LOG_IN,
  LOG_OUT,
  GET_BACKLOG,
  ADD_BACKLOG_GAME,
  DELETE_BACKLOG_GAME,
  GET_WISHLIST,
} from "./types";

export const getUser = (userId) => (dispatch) => {
  axios.get(`http://localhost:8080/api/profile/list/${userId}`).then((res) =>
    dispatch({
      type: GET_USER,
      payload: res.data,
    })
  );
};

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

export const getBacklog = (userId) => (dispatch) => {
  axios.get(`http://localhost:8080/api/backlog/list/${userId}`).then((res) =>
    dispatch({
      type: GET_BACKLOG,
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

export const deleteBacklogGame = (id) => async (dispatch) => {
  await axios.post(`http://localhost:8080/api/backlog/delete/${id}`);
  dispatch({
    type: DELETE_BACKLOG_GAME,
    payload: id,
  });
};

export const getWishlist = (userId) => (dispatch) => {
  axios.get(`http://localhost:8080/api/wishlist/list/${userId}`).then((res) =>
    dispatch({
      type: GET_WISHLIST,
      payload: res.data,
    })
  );
};
