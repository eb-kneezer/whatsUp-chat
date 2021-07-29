import React, { useEffect, useState } from "react";
import "./Home.scss";

import SideBar from "../../Components/SideBar";
import Chat from "../../Components/Chat";
import { ChatArrayType } from "../../chatUtility";
import { CgCloseR } from "react-icons/cg";
import { auth, chatDb } from "../../Firebase/firebase";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { setAllChats } from "../../Redux/AllChats/actions";
import { FiMenu } from "react-icons/fi";
import { VscChromeClose } from "react-icons/vsc";
import { setAllRooms } from "../../Redux/AllRooms/action";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state);
  const history = useHistory();

  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);

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

      let rooms: ChatArrayType = [];
      chatDb.collection("rooms").onSnapshot(query => {
        query.forEach(doc => {
          rooms.push({ [doc.id]: doc.data() });
        });
        dispatch(setAllRooms(rooms));
        rooms = [];
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
        <span
          onClick={() => setIsSideNavOpen(!isSideNavOpen)}
          className='container__ribbon--openmenu'>
          {isSideNavOpen ? (
            <VscChromeClose style={{ color: "white" }} />
          ) : (
            <FiMenu style={{ color: "white" }} />
          )}
        </span>
        <span className='container__ribbon--text'>WhatsUp</span>

        <span onClick={doSignOut}>
          logout
          <CgCloseR style={{ color: "white" }} />
        </span>
      </div>
      <div className={`container-sidenav ${isSideNavOpen ? "active" : ""}`}>
        <SideBar />
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
