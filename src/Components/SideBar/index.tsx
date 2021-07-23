import React, { useEffect, useState } from "react";
import "./sidebar.scss";

import { VscAdd } from "react-icons/vsc";
import { RiMoreLine, RiDonutChartLine } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import SingleChat from "../Chat/SingleChat/SingleChat";
import { chatDb } from "../../Firebase/firebase";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { setActiveChat } from "../../Redux/ActiveChat/actions";
import { deleteUser } from "../../chatUtility";
import { useHistory } from "react-router-dom";

const SideBar = () => {
  const { user, allChats, allUsers } = useAppSelector(state => state);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [isSideModalOpen, setIsSideModalOpen] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const { uid, photo, name } = user;

  const initChat = (recieverId: string, displayname: string) => {
    chatDb
      .collection("users")
      .doc(uid)
      .collection("chats")
      .doc(recieverId)
      .set({
        name: displayname,
      });

    chatDb
      .collection("users")
      .doc(recieverId)
      .collection("chats")
      .doc(uid)
      .set({
        name: name,
      });

    setIsSideModalOpen(!isSideModalOpen);
  };

  useEffect(() => {
    if (allChats.length === 1) {
      dispatch(setActiveChat(Object.keys(allChats[0])[0]));
    }
    if (!allUsers) {
      history.push("/");
    }
  }, [allChats, allUsers, dispatch, history]);

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
          <span onClick={() => setIsDeleteModal(!isDeleteModal)}>
            <RiMoreLine />
          </span>

          <div className={`sideheader-more ${isDeleteModal ? "open" : ""}`}>
            <p
              onClick={() => {
                history.push("/");
                deleteUser(user.uid);
              }}>
              Delete account
            </p>
          </div>
        </div>
      </div>
      <div className='sidebar__search'>
        <div className='sidebar__search--container'>
          <IoMdSearch size='12px' />
          <input type='text' placeholder='Search or start a new chat' />
        </div>
      </div>
      <div className='sidebar__container'>
        {allChats.length
          ? allChats.map(chat => (
              <SingleChat key={Object.keys(chat)[0]} chat={chat} />
            ))
          : (function () {
              dispatch(setActiveChat(""));
              return (
                <div className='sidebar__container--empty'>
                  <p>
                    Oops! looks like you have no active chats.
                    <br /> Click the{" "}
                    <span>
                      <VscAdd
                        style={{
                          background: "#f0f0f0",
                          borderRadius: "50%",
                          height: "25px",
                          width: "25px",
                          border: "1px solid #e6e6e6",
                          position: "absolute",
                          top: "-16px",
                          left: "4px",
                        }}
                      />{" "}
                    </span>
                    above to find a fellow WhatsUpper.
                  </p>
                </div>
              );
            })()}
      </div>

      <div className={`sidebar__modal ${isSideModalOpen ? `active` : ``}`}>
        {allUsers.length ? (
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
