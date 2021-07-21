import React from "react";
import { formatTime } from "../../../chatUtility";
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
      <p className='message__body'>{message.text}</p>
      <span className='message__filler'></span>
      <span className='message__timestamp'>
        {formatTime(message.timestamp)}
      </span>
    </div>
  );
};

export default SingleMessage;
