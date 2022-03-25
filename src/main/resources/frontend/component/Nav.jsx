import React, {memo, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {getCookie} from "../util/Cookie";


const Nav = memo(() => {
  const [menu, setMenu] = useState([
    {menu: 'HOME', url: "/"},
    {menu: 'NOTICE', url: "/notice"},
    {menu: 'STUDY', url: "/study"},
    {menu: 'ABOUT ME', url: "/about"},
    {menu: 'FEED_BACK', url: "/feedBack"},
  ]);
  const [selectMenu, setSelectMenu] = useState("");
  const navigate = useNavigate();

  const onClickLi = (item) => {
    setSelectMenu(item);

    if (item === 'STUDY') {
      const access = getCookie('loginCookie');
      if (access === undefined) {
        alert("회원가입이 필요한 메뉴입니다.");
        navigate("/join")
      }
    }
  }

  return (
      <>
        <ul>
          {menu.map(item => {
            return (
                <li onClick={() => onClickLi(item.menu)} key={item.menu}>
                  <Link className={selectMenu === item.menu ? 'active' : ''} to={item.url}>{item.menu}</Link>
                </li>
            )
          })}
        </ul>
        <i className="bi bi-list mobile-nav-toggle"/>
      </>
  )
});

export default Nav;