import React from "react";
import "./sidebar.scss";

import { VscAdd } from "react-icons/vsc";
import { RiMoreLine, RiDonutChartLine } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import SingleChat from "../Chat/SingleChat/SingleChat";

const SideBar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <div className='sidebar__header--img'>
          {/* <img src="" alt="" /> */}
        </div>
        <div className='sidebar__header--actions'>
          <span>
            <RiDonutChartLine />
          </span>
          <span>
            <VscAdd />
          </span>
          <span>
            <RiMoreLine />
          </span>
        </div>
      </div>
      <div className='sidebar__search'>
        <div className='sidebar__search--container'>
          <IoMdSearch size='12px' />
          <input type='text' placeholder='Search or start a new chat' />
        </div>
      </div>
      <div className='sidebar__container'>
        <SingleChat />
        <SingleChat />
        <SingleChat />
        <SingleChat />
        <SingleChat />
        <SingleChat />
        <SingleChat />
        <SingleChat />
        <SingleChat />
        <SingleChat />
        <SingleChat />
        <SingleChat />
      </div>
    </div>
  );
};

export default SideBar;
