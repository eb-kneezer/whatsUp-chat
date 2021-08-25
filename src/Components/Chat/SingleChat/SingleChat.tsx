import React from "react";
import "./singlechat.scss";
import { ChatType, deleteChat, formatTime } from "../../../chatUtility";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { setActiveChat } from "../../../Redux/ActiveChat/actions";
import { AiOutlineClear } from "react-icons/ai";

const SingleChat = ({ chat }: { chat: ChatType }) => {
  const dispatch = useAppDispatch();
  const { user, allUsers, activeChat } = useAppSelector(store => ({
    ...store,
  }));

  const id = Object.keys(chat)[0];

  const currentUser = allUsers.find(user => user.uid === id);

  const numOfMessages = chat[id].messages?.length;

  if (currentUser) {
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
            {numOfMessages ? (
              <p>
                {formatTime(chat[id].messages[numOfMessages - 1].timestamp)}
              </p>
            ) : (
              <p></p>
            )}
          </div>
          <div className='sidechat__info--bottom'>
            {numOfMessages ? (
              <p>{chat[id].messages[numOfMessages - 1].text}</p>
            ) : (
              <i style={{ fontSize: "14px" }}>draft</i>
            )}
            {/* <span>2</span> */}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='nochat'>
        <div className='nochat__message'>
          <span>{chat[id].name} has deactivated their WhatsUp account</span>
        </div>
        <div
          onClick={() => {
            deleteChat(user.uid, id);
            dispatch(setActiveChat(""));
          }}
          className='nochat__action'>
          <AiOutlineClear style={{ color: "white" }} />
        </div>
      </div>
    );
  }
};

export default SingleChat;
