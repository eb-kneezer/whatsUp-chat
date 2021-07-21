import { ActiveChatAction } from "./actionTypes";

type SetActiveChat = (chatID: string) => ActiveChatAction;

export const setActiveChat: SetActiveChat = chatID => ({
  type: "SET_ACTIVE_CHAT",
  payload: chatID,
});
