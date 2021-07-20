import { UserType } from "../../chatUtility";
import { SetAllUsersActionType } from "./actionTypes";

const INIT_STATE: UserType[] = [];

const AllUsersReducer = (state = INIT_STATE, action: SetAllUsersActionType) => {
  if (action.type === "SET_ALL_USERS") {
    return action.payload;
  } else {
    return state;
  }
};

export default AllUsersReducer;
