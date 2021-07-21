import React, { useEffect, useRef, useState } from "react";
import { VscDeviceCameraVideo, VscSearch } from "react-icons/vsc";
import { IoCallOutline } from "react-icons/io5";
import { RiMoreLine } from "react-icons/ri";
import { MdInsertEmoticon } from "react-icons/md";
import { BsMic, BsPaperclip, BsUnlockFill } from "react-icons/bs";
import "./chat.scss";
import SingleMessage from "./SingleMessage/SingleMessage";
import { useAppSelector } from "../../Redux/hooks";
import { sendMessages } from "../../chatUtility";

export type MessageType = {
  text: string;
  uid: string;
  timestamp: string;
};

const Chat = () => {
  const { activeChat, allUsers, allChats, user } = useAppSelector(
    store => store
  );
  const [chatInput, setChatInput] = useState("");
  const [scroll, setScroll] = useState(0);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const activeUserObject = allUsers.find(user => user.uid === activeChat);

  const currentChat = [...allChats].find(
    chat => Object.keys(chat)[0] === activeChat
  );
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [scroll]);

  return (
    <div className='chat'>
      <div className='chat__header'>
        <div className='chat__header--current'>
          <div className='current-img'>
            <img
              src={`${activeUserObject && activeUserObject?.photo}`}
              alt={`${activeUserObject && activeUserObject?.name}`}
            />
          </div>
          <div className='current-info'>
            <p>{activeUserObject?.name}</p>
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
          <p className='chat__body--encryption'>
            <BsUnlockFill
              style={{ height: "10px", width: "10px", marginRight: "5px" }}
            />
            Messages are not end-to-end encrypted. people outside of this chat,
            even WhatsUp, can read them. Do not click to learn more.
          </p>
          {currentChat && currentChat[activeChat].messages ? (
            currentChat[activeChat].messages.map(
              (
                message: MessageType,
                index: number,
                messages: MessageType[]
              ) => {
                let prev: boolean = false;
                if (index > 0 && message.uid === messages[index - 1].uid) {
                  prev = true;
                } else {
                  prev = false;
                }
                return (
                  <SingleMessage key={index} message={message} prev={prev} />
                );
              }
            )
          ) : (
            <div className='noMessage'>its empty here</div>
          )}
          <div className='transparent' ref={messagesEndRef}></div>
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
            <form
              onSubmit={e => {
                e.preventDefault();
                currentChat && sendMessages(user, chatInput, currentChat);
                setChatInput("");
                setScroll(scroll + 1);
              }}>
              <input
                onChange={e => {
                  setChatInput(e.target.value);
                }}
                type='text'
                value={chatInput}
                placeholder='Type a message'
              />
            </form>
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
