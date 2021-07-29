import { ChatType } from "../../chatUtility";
import { AllRoomsActionType } from "./actionTypes";

type SetAllRoomsType = (allRooms: ChatType[]) => AllRoomsActionType;

export const setAllRooms: SetAllRoomsType = allRooms => ({
  type: "SET_ALL_ROOMS",
  payload: allRooms,
});
