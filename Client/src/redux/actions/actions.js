import axios from "axios";
// import reducers from "../reducers/reducers";
import {
  GET_PLATFORM_COUNT_BY_FAMILY,
  GET_USER,
  LOG_IN,
  LOG_OUT,
  GET_BACKLOG,
  GET_PLAYING,
  GET_FEED,
  GET_GENRES,
  GET_PLATFORM_COUNT,
  GET_PLATFORMS_BY_DATE,
  GET_SONY_COUNTS,
  GET_XBOX_COUNTS,
  GET_NES_COUNTS,
  GET_PC_COUNTS,
  ADD_BACKLOG_GAME,
  ADD_TO_FEED,
  START_PLAYING_GAME,
  DELETE_BACKLOG_GAME_STATE,
  DELETE_BACKLOG_GAME_DB,
  DELETE_WISHLIST_GAME_STATE,
  DELETE_WISHLIST_GAME_DB,
  ADD_WISHLIST_GAME,
  GET_WISHLIST,
  GET_COMPLETED,
  ADD_COMPLETED_GAME,
  STOP_PLAYING_GAME,
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

export const getPlatformCount = (userId) => async (dispatch) => {
  await axios.get(`http://localhost:8080/api/games/all/${userId}`).then((res) =>
    dispatch({
      type: GET_PLATFORM_COUNT,
      payload: res.data,
    })
  );
};

export const getPlatformCountByFamily = (userId) => async (dispatch) => {
  await axios
    .get(`http://localhost:8080/api/games/platformfamily/${userId}`)
    .then((res) => {
      dispatch({
        type: GET_PLATFORM_COUNT_BY_FAMILY,
        payload: res.data,
      });
    });
};

export const getSonyCounts = (userId) => async (dispatch) => {
  await axios
    .get(`http://localhost:8080/api/games/sonycounts/${userId}`)
    .then((res) => {
      dispatch({
        type: GET_SONY_COUNTS,
        payload: res.data,
      });
    });
};

export const getXboxCounts = (userId) => async (dispatch) => {
  await axios
    .get(`http://localhost:8080/api/games/xboxcounts/${userId}`)
    .then((res) => {
      dispatch({
        type: GET_XBOX_COUNTS,
        payload: res.data,
      });
    });
};

export const getNesCounts = (userId) => async (dispatch) => {
  await axios
    .get(`http://localhost:8080/api/games/nescounts/${userId}`)
    .then((res) => {
      dispatch({
        type: GET_NES_COUNTS,
        payload: res.data,
      });
    });
};

export const getPcCounts = (userId) => async (dispatch) => {
  await axios
    .get(`http://localhost:8080/api/games/pccounts/${userId}`)
    .then((res) => {
      dispatch({
        type: GET_PC_COUNTS,
        payload: res.data,
      });
    });
};

export const getPlatformsByDate = (userId) => async (dispatch) => {
  await axios
    .get(`http://localhost:8080/api/games/platformbydate/${userId}`)
    .then((res) => {
      dispatch({
        type: GET_PLATFORMS_BY_DATE,
        payload: res.data,
      });
    });
};

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
export const getGenres = (userId) => async (dispatch) => {
  await axios
    .get(`http://localhost:8080/api/games/genres/${userId}`)
    .then((res) =>
      dispatch({
        type: GET_GENRES,
        payload: res.data,
      })
    );
};

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

export const addBacklogGame = (game) => async (dispatch) => {
  await axios.post("http://localhost:8080/api/backlog/add", game);
  dispatch({
    type: ADD_BACKLOG_GAME,
    payload: game,
  });
};

export const addToFeed = (game) => async (dispatch) => {
  await axios.post("http://localhost:8080/api/feed/add", game);
  dispatch({
    type: ADD_TO_FEED,
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

export const addWishlistGame = (game) => async (dispatch) => {
  await axios.post("http://localhost:8080/api/wishlist/add", game);
  dispatch({
    type: ADD_WISHLIST_GAME,
    payload: game,
  });
};

export const addCompletedGame = (game) => async (dispatch) => {
  await axios.post("http://localhost:8080/api/completed/add", game);
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

export const moveGameFromBacklogToCompleted = (game) => async (dispatch) => {
  await axios.post("http://localhost:8080/api/completed/finish", game);
  dispatch({
    type: MOVE_GAME_FROM_BACKLOG_TO_COMPLETED,
    payload: game,
  });
};
