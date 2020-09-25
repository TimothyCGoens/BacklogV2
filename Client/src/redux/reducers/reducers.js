import {
  GET_BACKLOG,
  GET_GENRES,
  ADD_TO_FEED,
  GET_PLATFORM_COUNT,
  GET_PLATFORMS_BY_DATE,
  GET_OTHER_COUNTS,
  ADD_BACKLOG_GAME,
  DELETE_BACKLOG_GAME_DB,
  DELETE_BACKLOG_GAME_STATE,
  DELETE_WISHLIST_GAME_STATE,
  DELETE_WISHLIST_GAME_DB,
  GET_SONY_COUNTS,
  GET_XBOX_COUNTS,
  GET_NES_COUNTS,
  GET_PC_COUNTS,
  GET_WISHLIST,
  GET_USER,
  GET_FEED,
  GET_PLAYING,
  LOG_IN,
  LOG_OUT,
  ADD_WISHLIST_GAME,
  START_PLAYING_GAME,
  STOP_PLAYING_GAME,
  // ADD_COMPLETED_GAME,
  GET_COMPLETED,
  MOVE_GAME_FROM_WISHLIST_TO_BACKLOG,
  MOVE_GAME_FROM_BACKLOG_TO_COMPLETED,
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  userId: null,
  user: {},
  backlog: [],
  wishlist: [],
  completed: [],
  platforms: [],
  platformGamesCount: [],
  playing: [],
  recent: [],
  feed: [],
  genres: [],
  genreGamesCount: [],
  sonyCounts: [],
  xboxCounts: [],
  nesCounts: [],
  pcCounts: [],
  platformsByDate: [],
  otherCounts: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isAuthenticated: action.token != null ? true : false,
        userId: action.userId,
      };
    case LOG_OUT:
      return {
        ...state,
        isAuthenticated: false,
        userId: null,
      };

    //reducers to get all data from that table
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case GET_WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
      };
    case GET_COMPLETED:
      return {
        ...state,
        completed: action.payload,
      };
    case GET_BACKLOG:
      return {
        ...state,
        backlog: action.payload,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload.genre,
        genreGamesCount: action.payload.games,
      };

    case GET_PLAYING:
      return {
        ...state,
        playing: action.payload,
      };
    case GET_FEED:
      return {
        ...state,
        feed: action.payload,
      };

    case GET_PLATFORM_COUNT:
      return {
        ...state,
        platforms: action.payload.platform,
        platformGamesCount: action.payload.games,
      };

    case GET_PLATFORMS_BY_DATE:
      console.log(action.payload);
      return {
        ...state,
        platformsByDate: action.payload,
      };

    case GET_SONY_COUNTS:
      return {
        ...state,
        sonyCounts: action.payload,
      };

    case GET_XBOX_COUNTS:
      return {
        ...state,
        xboxCounts: action.payload,
      };
    case GET_NES_COUNTS:
      return {
        ...state,
        nesCounts: action.payload,
      };
    case GET_PC_COUNTS:
      return {
        ...state,
        pcCounts: action.payload,
      };
    case GET_OTHER_COUNTS:
      return {
        ...state,
        otherCounts: action.payload,
      };

    //adding a game to db and state
    case ADD_BACKLOG_GAME:
      return {
        ...state,
        backlog: [action.payload, ...state.backlog],
      };

    case ADD_TO_FEED:
      return {
        ...state,
        feed: [action.payload, ...state.feed],
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

    case ADD_WISHLIST_GAME:
      console.log(action.payload);
      return {
        ...state,
        wishlist: [action.payload, ...state.wishlist],
      };
    //save this case for maybe adding previously beaten games?
    // case ADD_COMPLETED_GAME:
    //   console.log(action.payload);
    //   return {
    //     ...state,
    //   };

    case DELETE_BACKLOG_GAME_STATE:
      return {
        ...state,
        backlog: state.backlog.filter((game) => game !== action.payload),
      };
    case DELETE_BACKLOG_GAME_DB:
      return {
        ...state,
      };
    case DELETE_WISHLIST_GAME_STATE:
      return {
        ...state,
        wishlist: state.wishlist.filter((game) => game !== action.payload),
      };
    case DELETE_WISHLIST_GAME_DB:
      return {
        ...state,
      };

    case MOVE_GAME_FROM_WISHLIST_TO_BACKLOG:
      return {
        ...state,
        backlog: [action.payload, ...state.backlog],
        wishlist: state.wishlist.filter((game) => game !== action.payload),
      };

    case MOVE_GAME_FROM_BACKLOG_TO_COMPLETED:
      // console.log(action.payload);
      return {
        ...state,
        completed: [action.payload, ...state.completed],
        backlog: state.backlog.filter((game) => game !== action.payload),
      };

    default:
      return state;
  }
}
