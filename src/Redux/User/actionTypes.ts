import { UserType } from "../../chatUtility";

export type UserActionType = {
  type: "SET_USER";
  payload: UserType;
};
