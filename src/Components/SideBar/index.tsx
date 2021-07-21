import React, { useState } from "react";
import "./sidebar.scss";

import { VscAdd } from "react-icons/vsc";
import { RiMoreLine, RiDonutChartLine } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import SingleChat from "../Chat/SingleChat/SingleChat";
import { chatDb } from "../../Firebase/firebase";
import { useAppSelector } from "../../Redux/hooks";

const SideBar = () => {
  const { user, allChats, allUsers } = useAppSelector(state => state);

  const [isSideModalOpen, setIsSideModalOpen] = useState<boolean>(false);
  const { uid, photo } = user;

  const initChat = (recieverId: string, displayname: string) => {
    chatDb
      .collection("users")
      .doc(uid)
      .collection("chats")
      .doc(recieverId)
      .set({
        name: displayname,
      });

    setIsSideModalOpen(!isSideModalOpen);
  };

  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <div className='sidebar__header--img'>
          {photo ? <img src={photo} alt='user' /> : null}
        </div>
        <div className='sidebar__header--actions'>
          <span>
            <RiDonutChartLine />
          </span>
          <span
            className={isSideModalOpen ? "active" : ""}
            onClick={() => setIsSideModalOpen(!isSideModalOpen)}>
            <VscAdd />
          </span>
          <span>
            <RiMoreLine />
          </span>
        </div>
      </div>
      <div className='sidebar__search'>
        <div className='sidebar__search--container'>
          <IoMdSearch size='12px' />
          <input type='text' placeholder='Search or start a new chat' />
        </div>
      </div>
      <div className='sidebar__container'>
        {allChats
          ? allChats.map(chat => (
              <SingleChat key={Object.keys(chat)[0]} chat={chat} />
            ))
          : "end"}
      </div>

      <div className={`sidebar__modal ${isSideModalOpen ? `active` : ``}`}>
        {allUsers ? (
          allUsers.map(user => (
            <div key={user.uid}>
              <div
                onClick={() => user.name && initChat(user.uid, user.name)}
                className='sidebar__modal--photo'>
                <img
                  src={`${user.photo && user.photo}`}
                  alt={`${user.name && user.name}`}
                />
              </div>
              <div className='sidebar__modal--username'>{`${
                user.uid === uid ? "You" : `${user.name && user.name}`
              }`}</div>
            </div>
          ))
        ) : (
          <div>it's awfully empty in here...</div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
