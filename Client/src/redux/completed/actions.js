import axios from "axios";
import {
  GET_COMPLETED,
  ADD_COMPLETED_GAME,
  MOVE_GAME_FROM_BACKLOG_TO_COMPLETED,
} from "./types";

export const getCompleted = (userId) => async (dispatch) => {
  await axios
    .get(`http://localhost:8080/api/completed/list/${userId}`)
    .then((res) =>
      dispatch({
        type: GET_COMPLETED,
        payload: res.data,
      })
    );
};

export const addCompletedGame = (game) => async (dispatch) => {
  await axios.post("http://localhost:8080/api/completed/add", game);
  dispatch({
    type: ADD_COMPLETED_GAME,
    payload: game,
  });
};

export const moveGameFromBacklogToCompleted = (game) => async (dispatch) => {
  await axios.post("http://localhost:8080/api/completed/finish", game);
  dispatch({
    type: MOVE_GAME_FROM_BACKLOG_TO_COMPLETED,
    payload: game,
  });
};
