import React, { useEffect } from "react";
import "./Home.scss";

import SideBar from "../../Components/SideBar";
import Chat from "../../Components/Chat";
import { getAllChats } from "../../chatUtility";
import { CgCloseR } from "react-icons/cg";
import { auth } from "../../Firebase/firebase";
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
      dispatch(setAllChats(getAllChats(uid)));
    }
  }, []);

  const doSignOut = () => {
    auth.signOut();
  };

  return (
    <main className='container'>
      <div className='container__ribbon'>
        <span className='container__ribbon--text'>Chat</span>
        <span onClick={doSignOut}>
          <CgCloseR color='white' />
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
