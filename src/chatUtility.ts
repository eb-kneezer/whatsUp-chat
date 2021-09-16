import { auth, chatDb, userDb, provider } from "./Firebase/firebase";
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

export const doSignIn = () => {
  auth
    .signInWithPopup(provider)
    .then(result => {
      result.additionalUserInfo?.isNewUser &&
        userDb.ref(`users/${result.user?.uid}`).set({
          name: result.user?.displayName,
          email: result.user?.email,
          photo: result.user?.photoURL,
          uid: result.user?.uid,
        });
    })
    .catch(err => console.log(err));
};

export const doSignOut = () => {
  auth.signOut();
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
  auth.currentUser
    ?.delete()
    .then(() => alert("account deleted"))
    .catch(() => {
      alert("failed to delete");
    });
  auth.signOut();
  chatDb.collection("users").doc(userId).delete();
  userDb.ref("users/" + userId).remove();
};

export const addNewRoom = (roomName: string, createdBy: string) => {
  chatDb.collection("rooms").add({
    name: roomName,
    creator: createdBy,
    messages: [],
  });
};

const colorCache: { [key: string]: string } = {};
export const roomColour = (id: string) => {
  const colours = [
    "#170055",
    "#2D46B9",
    "#FF2442",
    "#AE00FB",
    "#FFE459",
    "#E63E6D",
    "#2E5A1C",
    "#54E346",
    "#FDB827",
  ];

  if (id in colorCache) {
    return colorCache[id];
  } else {
    let newColour = colours[Math.floor(Math.random() * 10)];
    colorCache[id] = newColour;
    return newColour;
  }
};

export const clearRoomMessages = (
  userId: string,
  activeChat: string,
  currentChat: ChatType | undefined
) => {
  const createdBy = currentChat && currentChat[activeChat].creator;

  if (userId === createdBy) {
    chatDb.collection("rooms").doc(activeChat).update({
      messages: firebase.firestore.FieldValue.delete(),
    });
  } else {
    alert("You can only clear messages of rooms you created.");
  }
};

export const deleteRoom = (
  userId: string,
  activeChat: string,
  currentChat: ChatType | undefined
) => {
  const createdBy = currentChat && currentChat[activeChat].creator;

  if (userId === createdBy) {
    chatDb
      .collection("rooms")
      .doc(activeChat)
      .delete()
      .catch(() => alert("nothing to delete"));
  } else {
    alert("You can only delete rooms you created.");
  }
};
