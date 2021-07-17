import React from "react";
import "./singlechat.scss";

const SingleChat = () => {
  return (
    <div className='sidechat'>
      <div className='sidechat__img'></div>
      <div className='sidechat__info'>
        <div className='sidechat__info--top'>
          <p>Dalinar Kholin</p>
          <p>12:12</p>
        </div>
        <div className='sidechat__info--bottom'>
          <p>speak the fifth ideal soldier</p>
          <span>2</span>
        </div>
      </div>
    </div>
  );
};

export default SingleChat;
