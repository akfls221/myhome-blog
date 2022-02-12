import React, {memo, useEffect, useState} from 'react';
import {Link} from "react-router-dom";


const Nav = memo(() => {
  const [menu, setMenu] = useState([
    {menu: 'HOME', url: "/"},
    {menu: 'NOTICE', url: "/notice"},
    {menu: 'STUDY', url: "/study"},
    {menu: 'ABOUT ME', url: "/about"},
    {menu: 'CONTACT ME', url: "/contact"},
  ]);
  const [selectMenu, setSelectMenu] = useState("");

  const onClickLi = (item) => {
    setSelectMenu(item);
  }

  useEffect(() => {

  }, [selectMenu])

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