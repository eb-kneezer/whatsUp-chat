import { ChatType } from "../../chatUtility";

export type AllChatActionType = {
  type: "SET_ALL_CHATS";
  payload: ChatType[];
};
