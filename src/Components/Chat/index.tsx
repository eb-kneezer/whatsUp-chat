import React from "react";
import { VscDeviceCameraVideo, VscSearch } from "react-icons/vsc";
import { IoCallOutline } from "react-icons/io5";
import { RiMoreLine } from "react-icons/ri";
import { MdInsertEmoticon } from "react-icons/md";
import { BsMic, BsPaperclip } from "react-icons/bs";
import "./chat.scss";
import SingleMessage from "./SingleMessage/SingleMessage";

const Chat = () => {
  return (
    <div className='chat'>
      <div className='chat__header'>
        <div className='chat__header--current'>
          <div className='current-img'></div>
          <div className='current-info'>
            <p>Philip Newman</p>
            <p>last seen today at 21:02</p>
          </div>
        </div>
        <div className='chat__header--options'>
          <div>
            <span>
              <VscDeviceCameraVideo />
            </span>
            <span>
              <IoCallOutline />
            </span>
          </div>
          <div>
            <span>
              <VscSearch />
            </span>
            <span>
              <RiMoreLine />
            </span>
          </div>
        </div>
      </div>

      <div className='chat__body'>
        <div className='chat__body--messages'>
          <SingleMessage />
          <SingleMessage />
          <SingleMessage />
          <SingleMessage />
          <SingleMessage />
          <SingleMessage />
        </div>
      </div>
      <div className='chat__input'>
        <div className='chat__input--container'>
          <span>
            <MdInsertEmoticon />
          </span>
          <span>
            <BsPaperclip />
          </span>
          <div className='textInput'>
            <input type='text' placeholder='Type a message' />
          </div>
          <span>
            <BsMic />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Chat;
