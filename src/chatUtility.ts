import { chatDb } from "./Firebase/firebase";
import firebase from "firebase";

export type ChatType = {
  [key: string]: firebase.firestore.DocumentData;
};

export type ChatArrayType = ChatType[];

export type UserType = {
  uid: string;
  name: string | null;
  email: string | null;
  photo: string | null;
};

export const formatTime = (time: string) => {
  const timestamp = new Date(time);

  const formattedTime = `${timestamp.getHours()}:${
    timestamp.getMinutes() < 10
      ? "0" + timestamp.getMinutes()
      : timestamp.getMinutes()
  }`;
  return formattedTime;
};

export const sendMessages = (
  user: UserType,
  text: string,
  activeChat: ChatType
) => {
  const prevChatState = { ...activeChat };
  const recieverID = Object.keys(activeChat)[0];
  const reciever = activeChat[recieverID];
  const time = new Date().toISOString();

  if (reciever.messages) {
    chatDb
      .collection("users")
      .doc(user.uid)
      .collection("chats")
      .doc(recieverID)
      .set({
        ...prevChatState[recieverID],
        messages: [
          ...reciever.messages,
          { text: text, uid: user.uid, timestamp: time },
        ],
      });

    chatDb
      .collection("users")
      .doc(recieverID)
      .collection("chats")
      .doc(user.uid)
      .set({
        name: user.name,
        messages: [
          ...reciever.messages,
          { text: text, uid: user.uid, timestamp: time },
        ],
      });
  } else {
    chatDb
      .collection("users")
      .doc(user.uid)
      .collection("chats")
      .doc(recieverID)
      .set({
        ...prevChatState[recieverID],
        messages: [{ text: text, uid: user.uid, timestamp: time }],
      });

    chatDb
      .collection("users")
      .doc(recieverID)
      .collection("chats")
      .doc(user.uid)
      .set({
        name: user.name,
        messages: [{ text: text, uid: user.uid, timestamp: time }],
      });
  }
};
