import { ChatType } from "../../chatUtility";

export type AllRoomsActionType = {
  type: "SET_ALL_ROOMS";
  payload: ChatType[];
};
