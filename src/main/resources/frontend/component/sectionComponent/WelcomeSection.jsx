import React, {memo, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {getCookie, removeCookie} from "../../util/Cookie";
import Modal from "../../pages/Modal";
import {backend} from "../../util/config";

const WelcomeSection = memo(() => {
  const [welcomeTitle, setWelcomeTitle] = useState("엄태권의 개발 블로그입니다");
  const [welcomeSub, setWelcomeSub] = useState("안녕하세요! 저의 사이트에 방문해 주셔서 감사합니다!");
  const [btnState, setBtnState] = useState("LogIn");
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const userInfo = getCookie('loginCookie');

  const handleLogOut = (e) => {
    const social = userInfo.socialType;
    if (social === 'kakao') {
      location.href = `http://${backend}/social/kakao/logout`;
      removeCookie('loginCookie');
    } else if (social === 'google') {
      location.href = `https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://${backend}`;
      removeCookie('loginCookie');
    } else {
      removeCookie('loginCookie');
      navigate("/")
      // location.reload();
    }
    // removeCookie('loginCookie');
    // navigate("/")
    // location.reload();
  }

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  useEffect(() => {
    if (userInfo !== undefined) {
      setWelcomeSub(`안녕하세요! ${userInfo.nickName} 님!!`);
      setBtnState('LogOut');
    } else {
      setWelcomeSub("안녕하세요! 저의 사이트에 방문해 주셔서 감사 합니다!");
      setBtnState('LogIn');
    }
  }, [userInfo]);

  return (
      <>
        <section className="hero-section" id="hero">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 hero-text-image">
                <div className="row">
                  <div className="col-lg-8 text-center text-lg-start">
                    <h1 data-aos="fade-right">{welcomeTitle}</h1>
                    <p className="mb-5" data-aos="fade-right" data-aos-delay="100">{welcomeSub}</p>
                    <p data-aos="fade-right" data-aos-delay="200" data-aos-offset="-500">
                      {btnState === 'LogIn' ?
                          <a onClick={openModal} className="btn btn-outline-white">{btnState}</a>
                          :
                          <a className="btn btn-outline-white" onClick={handleLogOut}>{btnState}</a>
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Modal open={modalOpen} close={closeModal} header="로그인"/>
      </>
  );
});

export default WelcomeSection;