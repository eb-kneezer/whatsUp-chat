import { UserType } from "../../chatUtility";

export type SetAllUsersActionType = {
  type: "SET_ALL_USERS";
  payload: UserType[];
};
