import React from "react";
import { formatTime, roomColour } from "../../../chatUtility";
import { useAppSelector } from "../../../Redux/hooks";
import { MessageType } from "../index";
import "./singlemessage.scss";

interface SingleMessageProps {
  message: MessageType;
  prev: boolean;
}

const SingleMessage = ({ message, prev }: SingleMessageProps) => {
  const { uid } = useAppSelector(store => store.user);

  return (
    <div
      className={`message ${uid === message.uid ? "right" : ""} ${
        prev ? "same" : ""
      }`}>
      {uid !== message.uid && message.name && !prev && (
        <div
          className='message__sender'
          style={{ color: roomColour(message.uid) }}>
          {message.name}
        </div>
      )}

      <div className='message__content'>
        <p className='message__content--body'>{message.text}</p>
        <span className='message__content--filler'></span>
        <span className='message__content--timestamp'>
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
};

export default SingleMessage;
