import { GET_COMPLETED, MOVE_GAME_FROM_BACKLOG_TO_COMPLETED } from "./types";

const initialState = {
  backlog: [],
  completed: [],
};

export default function completedReducers(state = initialState, action) {
  switch (action.type) {
    case GET_COMPLETED:
      console.log(action.payload);

      return {
        ...state,
        completed: action.payload,
      };
    case MOVE_GAME_FROM_BACKLOG_TO_COMPLETED:
      return {
        ...state,
        completed: [action.payload, ...state.completed],
        backlog: state.backlog.filter((game) => game !== action.payload),
      };
    //save this case for maybe adding previously beaten games?
    // case ADD_COMPLETED_GAME:
    //   console.log(action.payload);
    //   return {
    //     ...state,
    //   };
    default:
      return state;
  }
}
