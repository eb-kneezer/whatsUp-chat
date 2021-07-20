import { ChatType } from "../../chatUtility";
import { AllChatActionType } from "./actionTypes";

type SetAllChatType = (allChat: ChatType[]) => AllChatActionType;

export const setAllChats: SetAllChatType = allChat => ({
  type: "SET_ALL_CHATS",
  payload: allChat,
});
