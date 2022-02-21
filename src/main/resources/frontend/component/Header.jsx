import React, {memo, useEffect, useState} from 'react';
import Nav from "./Nav";
import {getCookie} from "../util/Cookie";
import {useNavigate} from "react-router";

const Header = memo(() => {
  const [myPage, setMyPage] = useState(false);
  const navigate = useNavigate();

  const moveMyPage = () => {
    navigate("/mypage");
  }

  useEffect(() => {
    const login = getCookie('loginCookie');
    if (login !== undefined) {
      setMyPage(true);
    } else {
      return;
    }

  }, [])
  return (
      <>
        <header id="header" className="fixed-top d-flex align-items-center">
          <div className="container d-flex justify-content-between align-items-center">
            <div className="logo">
              <h1><a href="/">KwonBlog</a></h1>
            </div>
            <nav id="navbar" className="navbar">
              <Nav/>
            </nav>
          </div>
          { myPage && <div className="user_info_page" onClick={moveMyPage}></div> }
        </header>
      </>
  );
});
export default Header;