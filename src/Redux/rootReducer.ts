import { combineReducers } from "redux";
import ActiveChatReducer from "./ActiveChat/reducer";
import AllChatsReducer from "./AllChats/reducer";
import AllRoomsReducer from "./AllRooms/reducer";
import AllUsersReducer from "./AllUsers/reducer";
import UserReducer from "./User/reducer";

const reducers = combineReducers({
  activeChat: ActiveChatReducer,
  allChats: AllChatsReducer,
  allUsers: AllUsersReducer,
  allRooms: AllRoomsReducer,
  user: UserReducer,
});

export default reducers;
