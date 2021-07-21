import React, { useEffect } from "react";
import "./Home.scss";

import SideBar from "../../Components/SideBar";
import Chat from "../../Components/Chat";
import { ChatArrayType } from "../../chatUtility";
import { CgCloseR } from "react-icons/cg";
import { auth, chatDb } from "../../Firebase/firebase";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { setAllChats } from "../../Redux/AllChats/actions";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state);
  const history = useHistory();

  const { uid } = user;

  useEffect(() => {
    if (!uid) {
      history.push("/");
    } else {
      let chats: ChatArrayType = [];
      chatDb
        .collection("users")
        .doc(uid)
        .collection("chats")
        .onSnapshot(query => {
          query.forEach(doc => {
            chats.push({ [doc.id]: doc.data() });
          });
          dispatch(setAllChats(chats));
          chats = [];
        });
    }
  }, [dispatch, history, uid]);

  const doSignOut = () => {
    auth.signOut();
    history.push("/");
  };

  return (
    <main className='container'>
      <div className='container__ribbon'>
        <span className='container__ribbon--text'>WhatsUp</span>

        <span onClick={doSignOut}>
          logout
          <CgCloseR style={{ color: "white" }} />
        </span>
      </div>
      {uid && (
        <div className='container__chat'>
          <SideBar />
          <Chat />
        </div>
      )}
    </main>
  );
};

export default HomePage;
