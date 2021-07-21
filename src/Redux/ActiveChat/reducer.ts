import { ActiveChatAction } from "./actionTypes";

const INIT_STATE: string = "";

const ActiveChatReducer = (state = INIT_STATE, action: ActiveChatAction) => {
  if (action.type === "SET_ACTIVE_CHAT") {
    return action.payload;
  } else {
    return state;
  }
};

export default ActiveChatReducer;
