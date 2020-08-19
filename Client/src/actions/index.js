import axios from "axios";
import {
  LOG_IN,
  LOG_OUT,
  GET_BACKLOG,
  GET_WISHLIST,
  GET_USER,
  LOADING,
  ADD_BACKLOG_GAME,
  DELETE_BACKLOG_GAME,
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

export const loading = () => {
  return {
    type: LOADING,
  };
};

export const getUser = (userId) => (dispatch) => {
  axios.get(`http://localhost:8080/api/profile/list/${userId}`).then((res) =>
    dispatch({
      type: GET_USER,
      payload: res.data,
    })
  );
};

export const getBacklog = (userId) => (dispatch) => {
  dispatch(loading());
  axios.get(`http://localhost:8080/api/backlog/list/${userId}`).then((res) =>
    dispatch({
      type: GET_BACKLOG,
      payload: res.data,
    })
  );
};

export const getWishlist = (userId) => (dispatch) => {
  dispatch(loading());
  axios.get(`http://localhost:8080/api/wishlist/list/${userId}`).then((res) =>
    dispatch({
      type: GET_WISHLIST,
      payload: res.data,
    })
  );
};

export const addBacklogGame = (game) => (dispatch) => {
  axios.post("http://localhost:8080/api/backlog/add", game).then((res) =>
    dispatch({
      type: ADD_BACKLOG_GAME,
      payload: res.data,
    })
  );
};

export const deleteBacklogGame = (id) => (dispatch) => {
  axios.post(`http://localhost:8080/api/backlog/delete/${id}`).then((res) =>
    dispatch({
      type: DELETE_BACKLOG_GAME,
      payload: id,
    })
  );
};
