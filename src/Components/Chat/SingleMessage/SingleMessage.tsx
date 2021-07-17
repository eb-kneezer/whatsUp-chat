import React from "react";
import "./singlemessage.scss";

const SingleMessage = () => {
  return (
    <>
      <div className='message'>
        <p className='message__body'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum qui
          maiores vitae ad nesciunt, saepe iste.
        </p>
        <span className='message__filler'></span>
        <span className='message__timestamp'>21:21</span>
      </div>
      <div className='message right'>
        <p className='message__body'>
          Lorem ipsum dolor sit amet consectetur, elit. Quia, suscipit!
        </p>
        <span className='message__filler'></span>
        <span className='message__timestamp'>21:21</span>
      </div>
    </>
  );
};

export default SingleMessage;
