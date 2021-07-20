import { UserType } from "../../chatUtility";
import { SetAllUsersActionType } from "./actionTypes";

type SetAllUsers = (users: UserType[]) => SetAllUsersActionType;

export const setAllUsers: SetAllUsers = allUsers => ({
  type: "SET_ALL_USERS",
  payload: allUsers,
});
