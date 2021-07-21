import { UserType } from "../../chatUtility";
import { UserActionType } from "./actionTypes";

const INIT_STATE: UserType = {
  name: "",
  email: "",
  photo: "",
  uid: "",
};

const UserReducer = (state = INIT_STATE, action: UserActionType) => {
  if (action.type === "SET_USER") {
    return { ...action.payload };
  } else {
    return state;
  }
};

export default UserReducer;
