import { ChatType } from "../../chatUtility";

export type ActiveChatAction = {
  type: "SET_ACTIVE_CHAT";
  payload: ChatType;
};
