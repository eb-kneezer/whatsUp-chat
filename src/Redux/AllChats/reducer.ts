import { ChatType } from "../../chatUtility";
import { AllChatActionType } from "./actionTypes";

const INIT_STATE: ChatType[] = [];

const AllChatsReducer = (state = INIT_STATE, action: AllChatActionType) => {
  if (action.type === "SET_ALL_CHATS") {
    return [...action.payload];
  } else {
    return state;
  }
};

export default AllChatsReducer;
