import React from "react";
import "./singlechat.scss";
import { ChatType, formatTime } from "../../../chatUtility";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { setActiveChat } from "../../../Redux/ActiveChat/actions";

const SingleChat = ({ chat }: { chat: ChatType }) => {
  const dispatch = useAppDispatch();
  const { allUsers, activeChat } = useAppSelector(store => ({ ...store }));

  const id = Object.keys(chat)[0];

  const currentUser = allUsers.find(user => user.uid === id);

  const numOfMessages = chat[id].messages?.length;
  return (
    <div
      onClick={() => dispatch(setActiveChat(id))}
      className={`sidechat ${activeChat === id && "active"}`}>
      <div className='sidechat__img'>
        <img
          src={`${currentUser && currentUser?.photo}`}
          alt={`${currentUser && currentUser?.name}`}
        />
      </div>
      <div className='sidechat__info'>
        <div className='sidechat__info--top'>
          <p>{chat[id].name}</p>
          {numOfMessages && (
            <p>{formatTime(chat[id].messages[numOfMessages - 1].timestamp)}</p>
          )}
        </div>
        <div className='sidechat__info--bottom'>
          {numOfMessages ? (
            <p>{chat[id].messages[numOfMessages - 1].text}</p>
          ) : (
            <i style={{ fontSize: "14px" }}>empty here...</i>
          )}
          <span>2</span>
        </div>
      </div>
    </div>
  );
};

export default SingleChat;
