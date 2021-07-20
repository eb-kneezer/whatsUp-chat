import { UserType } from "../../chatUtility";
import { UserActionType } from "./actionTypes";

type SetUserType = (user: UserType) => UserActionType;

export const setUser: SetUserType = user => ({
  type: "SET_USER",
  payload: user,
});
