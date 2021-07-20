import { ActiveChatAction } from "./actionTypes";
import { ChatType } from "../../chatUtility";

type SetActiveChat = (chat: ChatType) => ActiveChatAction;

export const setActiveChat: SetActiveChat = chat => ({
  type: "SET_ACTIVE_CHAT",
  payload: chat,
});
