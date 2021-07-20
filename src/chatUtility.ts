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

export const getAllChats = (myID: string) => {
  const chats: ChatArrayType = [];
  chatDb
    .collection("users")
    .doc(myID)
    .collection("chats")
    .onSnapshot(query => {
      query.forEach(doc => {
        chats.push({ [doc.id]: doc.data() });
      });
    });
  // console.log(chats);
  return chats;
};

export const getMessages = () => {
  // chatDb
  //   .collection("users")
  //   .doc("miw4EhK0IW5jV5ED8c8i")
  //   .collection("chats")
  //   .doc("7MyUDmYgqQvjiJZd0QQq")
  //   .get()
  //   .then(doc => {
  //     doc.exists ? console.log(doc.data()) : console.log("nothing");
  //   });
};

export const sendMessages = (recieverId: string) => {
  chatDb
    .collection("users")
    .doc("senderId")
    .collection("chats")
    .doc(recieverId)
    .set({
      messages: [
        { text: "hello world", timestamp: "9:00" },
        { text: "how are you", timestamp: "9:01" },
        { text: "i'm good my guy", timestamp: "9:04" },
      ],
    });

  chatDb
    .collection("users")
    .doc(recieverId)
    .collection("chats")
    .doc("senderId")
    .set({
      messages: [
        { text: "hello world", timestamp: "9:00" },
        { text: "how are you", timestamp: "9:01" },
        { text: "i'm good my guy", timestamp: "9:04" },
      ],
    });
};
