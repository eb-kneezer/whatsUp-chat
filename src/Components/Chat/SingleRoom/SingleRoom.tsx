import React from "react";
import { ChatType, formatTime } from "../../../chatUtility";
import { setActiveChat } from "../../../Redux/ActiveChat/actions";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import "./singleroom.scss";

const SingleRoom = ({ room }: { room: ChatType }) => {
  const dispatch = useAppDispatch();
  const id = Object.keys(room)[0];
  const numOfMessages = room[id].messages?.length;

  const { activeChat } = useAppSelector(store => ({ ...store }));

  return (
    <div
      onClick={() => {
        console.log("active before", activeChat);
        dispatch(setActiveChat(id));
        console.log(typeof id);
        console.log("active after", activeChat);
      }}
      className={`singleroom ${activeChat === id && "active"}`}>
      <div className='singleroom__img'>
        <img
          src={`https://eu.ui-avatars.com/api/?name=${room[id].name}`}
          alt='test'
        />
      </div>
      <div className='singleroom__info'>
        <div className='singleroom__info--top'>
          <p>{room[id].name}</p>
          {numOfMessages ? (
            <p>{formatTime(room[id].messages[numOfMessages - 1].timestamp)}</p>
          ) : (
            <p></p>
          )}
        </div>
        <div className='singleroom__info--bottom'>
          {numOfMessages ? (
            <p>{room[id].messages[numOfMessages - 1].text}</p>
          ) : (
            <i style={{ fontSize: "14px" }}>draft</i>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleRoom;
