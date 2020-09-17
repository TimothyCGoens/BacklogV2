import axios from "axios";
import { GET_USER, LOG_IN, LOG_OUT } from "./types";

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

export const getUser = (userId) => async (dispatch) => {
  await axios
    .get(`http://localhost:8080/api/profile/list/${userId}`)
    .then((res) =>
      dispatch({
        type: GET_USER,
        payload: res.data,
      })
    );
};
