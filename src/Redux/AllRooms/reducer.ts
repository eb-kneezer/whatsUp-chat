import { ChatType } from "../../chatUtility";
import { AllRoomsActionType } from "./actionTypes";

const INIT_STATE: ChatType[] = [];

const AllRoomsReducer = (state = INIT_STATE, action: AllRoomsActionType) => {
  if (action.type === "SET_ALL_ROOMS") {
    return [...action.payload];
  } else {
    return state;
  }
};

export default AllRoomsReducer;
