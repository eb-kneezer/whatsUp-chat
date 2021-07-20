import React from "react";
import "./singlechat.scss";
import { ChatType } from "../../../chatUtility";

const SingleChat = ({ chat }: { chat: ChatType }) => {
  const id = Object.keys(chat)[0];

  const numOfMessages = chat[id].messages?.length;
  return (
    <div className='sidechat'>
      <div className='sidechat__img'></div>
      <div className='sidechat__info'>
        <div className='sidechat__info--top'>
          <p>{chat[id].name}</p>
          <p>12:12</p>
        </div>
        <div className='sidechat__info--bottom'>
          <p>
            {numOfMessages
              ? chat[id].messages[numOfMessages - 1].text
              : "empty here"}
          </p>
          <span>2</span>
        </div>
      </div>
    </div>
  );
};

export default SingleChat;
