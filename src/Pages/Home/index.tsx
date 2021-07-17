import React from "react";
import "./Home.scss";

import SideBar from "../../Components/SideBar";
import Chat from "../../Components/Chat";

const HomePage = () => {
  return (
    <main className='container'>
      <div className='container__ribbon'>
        <span className='container__ribbon--text'>Chat</span>
      </div>
      <div className='container__chat'>
        <SideBar />
        <Chat />
      </div>
    </main>
  );
};

export default HomePage;
