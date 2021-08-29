import React, { useEffect, useState } from "react";
import "./sidebar.scss";

import { VscAdd } from "react-icons/vsc";
import { RiMoreLine, RiDonutChartLine } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import SingleChat from "../Chat/SingleChat/SingleChat";
import { chatDb } from "../../Firebase/firebase";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { setActiveChat } from "../../Redux/ActiveChat/actions";
import { addNewRoom, ChatArrayType, deleteUser } from "../../chatUtility";
import { useHistory } from "react-router-dom";
import SingleRoom from "../Chat/SingleRoom/SingleRoom";

const SideBar = () => {
  const { user, allChats, allUsers, allRooms } = useAppSelector(state => state);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [isSideModalOpen, setIsSideModalOpen] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [isRoomInputOpen, setIsNewRoomInput] = useState(false);

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

  const sortChatsByTime = (chatArray: ChatArrayType) => {
    function getTimeInSeconds(ISOString: string) {
      const chatTime = new Date(ISOString);
      return chatTime.getTime();
    }
    return chatArray.sort((chat1, chat2) => {
      if (
        chat1[Object.keys(chat1)[0]].messages &&
        chat2[Object.keys(chat2)[0]].messages
      ) {
        return (
          getTimeInSeconds(
            chat2[Object.keys(chat2)[0]].messages[
              chat2[Object.keys(chat2)[0]].messages.length - 1
            ].timestamp
          ) -
          getTimeInSeconds(
            chat1[Object.keys(chat1)[0]].messages[
              chat1[Object.keys(chat1)[0]].messages.length - 1
            ].timestamp
          )
        );
      } else if (!chat1[Object.keys(chat1)[0]].messages) {
        return -1;
      } else {
        return 1;
      }
    });
  };

  useEffect(() => {
    if (allChats.length === 1) {
      dispatch(setActiveChat(Object.keys(allChats[0])[0]));
    }
    if (allChats.length === 0) {
      dispatch(setActiveChat(""));
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
          <span
            className={isDeleteModal ? "active" : ""}
            onClick={() => setIsDeleteModal(!isDeleteModal)}>
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
        <div className='sidebar__container--chats'>
          <p className='sidebar__container--names'>CHATS</p>
          {allChats.length ? (
            sortChatsByTime(allChats).map(chat => (
              <SingleChat key={Object.keys(chat)[0]} chat={chat} />
            ))
          ) : (
            // function () {
            // dispatch(setActiveChat(""));
            // return (
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
                button above to find a fellow WhatsUpper.
                <br />
                you can start with me, Ebenezer.
              </p>
            </div>
            // );
            // })(
          )}
        </div>
        <div className='sidebar__container--rooms'>
          <p className='sidebar__container--names'>ROOMS</p>
          {allRooms.length
            ? allRooms.map(room => (
                <SingleRoom key={Object.keys(room)[0]} room={room} />
              ))
            : (function () {
                dispatch(setActiveChat(""));
                return (
                  <div className='sidebar__container--empty'>
                    <p>
                      Oops! looks like there are no active rooms.
                      <br /> Click the button below to create one.
                    </p>
                  </div>
                );
              })()}
          <div className='addRoom'>
            <button
              onClick={() => {
                setIsNewRoomInput(!isRoomInputOpen);
                setNewRoomName("");
              }}>
              {`${isRoomInputOpen ? "cancel" : "add new room"}`}
            </button>
            <form
              className={isRoomInputOpen ? `inputOpen` : ""}
              onSubmit={e => {
                e.preventDefault();
                newRoomName.trim() && addNewRoom(newRoomName, user.uid);
                setNewRoomName("");
              }}>
              <input
                type='text'
                placeholder='enter room name'
                value={newRoomName}
                onChange={e => {
                  setNewRoomName(e.target.value);
                }}
              />
            </form>
          </div>
        </div>
      </div>

      <div className={`sidebar__modal ${isSideModalOpen ? `active` : ``}`}>
        {allUsers.length ? (
          allUsers
            .sort((a, b) => {
              if (a.name && b.name) {
                return a.name.localeCompare(b.name);
              } else {
                return -1;
              }
            })
            .map(user => (
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
