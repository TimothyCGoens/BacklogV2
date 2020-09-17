import { combineReducers } from "redux";
import backlogReducers from "./backlog/reducers";
import wishlistReducers from "./wishlist/reducers";
import completedReducers from "./completed/reducers";
import userReducers from "./user/reducer";
import profileReducers from "./profile/reducers";

export default combineReducers({
  backlog: backlogReducers,
  wishlist: wishlistReducers,
  completed: completedReducers,
  user: userReducers,
  profile: profileReducers,
});
