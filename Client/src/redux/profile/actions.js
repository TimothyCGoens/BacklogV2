import axios from "axios";

import {
  GET_PLAYING,
  START_PLAYING_GAME,
  STOP_PLAYING_GAME,
  GET_FEED,
  ADD_TO_FEED,
  GET_PLATFORM_COUNT,
} from "./types";

export const getPlaying = (userId) => async (dispatch) => {
  await axios
    .get(`http://localhost:8080/api/games/playing/${userId}`)
    .then((res) =>
      dispatch({
        type: GET_PLAYING,
        payload: res.data,
      })
    );
};

export const startPlayingGame = (game) => async (dispatch) => {
  await axios.post("http://localhost:8080/api/backlog/start-playing", game);
  dispatch({
    type: START_PLAYING_GAME,
    payload: game,
  });
};

export const stopPlayingGame = (game) => async (dispatch) => {
  await axios.post("http://localhost:8080/api/backlog/stop-playing", game);
  dispatch({
    type: STOP_PLAYING_GAME,
    payload: game,
  });
};

export const getFeed = (userId) => async (dispatch) => {
  await axios.get(`http://localhost:8080/api/feed/list/${userId}`).then((res) =>
    dispatch({
      type: GET_FEED,
      payload: res.data,
    })
  );
};

export const addToFeed = (game) => async (dispatch) => {
  await axios.post("http://localhost:8080/api/feed/add", game);
  dispatch({
    type: ADD_TO_FEED,
    payload: game,
  });
};

export const getPlatformCount = (userId) => async (dispatch) => {
  await axios.get(`http://localhost:8080/api/games/all/${userId}`).then((res) =>
    dispatch({
      type: GET_PLATFORM_COUNT,
      payload: res.data,
    })
  );
};
