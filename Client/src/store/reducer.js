const initialState = {
  isAuthenticated: false,
  userId: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        isAuthenticated: action.token != null ? true : false,
        userId: action.userId,
      };

    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        userId: null,
      };
    default:
      return state;
  }
};

export default reducer;
