import { auth, chatDb, userDb } from "./Firebase/firebase";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";

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

export const sendMessageToRoom = (
  user: UserType,
  activeChat: string,
  text: string
) => {
  const time = new Date().toISOString();

  chatDb
    .collection("rooms")
    .doc(activeChat)
    .update({
      messages: firebase.firestore.FieldValue.arrayUnion({
        text: text,
        uid: user.uid,
        timestamp: time,
        name: user.name,
      }),
    });
};

export const sendMessages = (
  user: UserType,
  text: string,
  currentChat: ChatType
) => {
  const prevChatState = { ...currentChat };
  const recieverID = Object.keys(prevChatState)[0];
  const time = new Date().toISOString();

  chatDb
    .collection("users")
    .doc(user.uid)
    .collection("chats")
    .doc(recieverID)
    .update({
      messages: firebase.firestore.FieldValue.arrayUnion({
        text: text,
        uid: user.uid,
        timestamp: time,
      }),
    });

  chatDb
    .collection("users")
    .doc(recieverID)
    .collection("chats")
    .doc(user.uid)
    .update({
      messages: firebase.firestore.FieldValue.arrayUnion({
        text: text,
        uid: user.uid,
        timestamp: time,
      }),
    })
    .catch(() => {
      alert(
        `error sending message. ${prevChatState[recieverID].name} has probably deleted his chat with you. (you didn't hear that from me...)`
      );
    });
};

export const deleteChat = (myId: string, recieverId: string) => {
  chatDb
    .collection("users")
    .doc(myId)
    .collection("chats")
    .doc(recieverId)
    .delete()
    .catch(() => {
      alert("nothing to delete");
    });
};

export const clearChat = (myId: string, recieverId: string) => {
  chatDb
    .collection("users")
    .doc(myId)
    .collection("chats")
    .doc(recieverId)
    .update({
      messages: firebase.firestore.FieldValue.delete(),
    });
};

export const clearChatForEveryone = (myId: string, recieverId: string) => {
  chatDb
    .collection("users")
    .doc(myId)
    .collection("chats")
    .doc(recieverId)
    .update({
      messages: firebase.firestore.FieldValue.delete(),
    });

  chatDb
    .collection("users")
    .doc(recieverId)
    .collection("chats")
    .doc(myId)
    .update({
      messages: firebase.firestore.FieldValue.delete(),
    });
};

export const deleteUser = (userId: string) => {
  auth.signOut();

  auth.currentUser
    ?.delete()
    .then(() => alert("account deleted"))
    .catch(() => {
      alert("failed to delete");
    });
  chatDb.collection("users").doc(userId).delete();
  userDb.ref("users/" + userId).remove();
};

export const addNewRoom = (roomName: string) => {
  chatDb.collection("rooms").add({
    name: roomName,
    messages: [],
  });
};
