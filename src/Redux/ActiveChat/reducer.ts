import { ChatType } from "../../chatUtility";
import { ActiveChatAction } from "./actionTypes";

const INIT_STATE: ChatType = {};

const ActiveChatReducer = (state = INIT_STATE, action: ActiveChatAction) => {
  if (action.type === "SET_ACTIVE_CHAT") {
    return action.payload;
  } else {
    return state;
  }
};

export default ActiveChatReducer;
