import {
  GET_FEED,
  ADD_TO_FEED,
  GET_PLAYING,
  START_PLAYING_GAME,
  STOP_PLAYING_GAME,
  GET_PLATFORM_COUNT,
} from "./types";

const initialState = {
  platforms: [],
  platformGamesCount: [],
  playing: [],
  feed: [],
};

export default function profileReducers(state = initialState, action) {
  switch (action.type) {
    case GET_FEED:
      console.log(action.payload);

      return {
        ...state,
        feed: action.payload,
      };
    case ADD_TO_FEED:
      console.log(action.payload);
      return {
        ...state,
        feed: [action.payload, ...state.feed],
      };
    case GET_PLAYING:
      console.log(action.payload);
      return {
        ...state,
        playing: action.payload,
      };
    case START_PLAYING_GAME:
      return {
        ...state,
        playing: [action.payload, ...state.playing],
      };
    case STOP_PLAYING_GAME:
      return {
        ...state,
        playing: state.playing.filter(
          (game) => game.gameId !== action.payload.gameId
        ),
      };
    case GET_PLATFORM_COUNT:
      console.log(action.payload);
      return {
        ...state,
        platforms: action.payload.platform,
        platformGamesCount: action.payload.games,
      };
    default:
      return state;
  }
}
