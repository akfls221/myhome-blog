import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import axios from "axios";
import {setCookie} from "../util/Cookie";

const Modal = ({ open, close }) => {

  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const navigate = useNavigate();

  const handleInputChangeId = (e) => {
    setUserId(e.target.value)
  }

  const handleInputChangePw = (e) => {
    setUserPw(e.target.value)
  }

  const loginGoogle = () => {
    location.href = "http://localhost:8080/social/google";
  }

  const loginKakao =() => {
    location.href = "http://localhost:8080/social/kakao";
  }

  const loginSubmit = (e) => {
    e.preventDefault();

    if (userPw.length === 0 && userId.length === 0) {
      alert("ID 혹은 비밀번호를 입력해주세요");
      return;
    }

    axios({
      method: "POST",
      url: 'http://localhost:8080/api/v1/sign',
      data : {
        'uid' : userId,
        'password': userPw
      }
    }).then((res) => {
      const resData = res.data
      if (resData.message !== undefined) {
        alert(resData.message);
        return;
      } else {
        setCookie('loginCookie', resData, {
          // httpOnly: true,
        });
        navigate("/");
        location.reload();
      }
    }).catch(error => {
      alert(error);
    });
  }

  useEffect(() => {
  }, []);


  return (
      <>
      <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
            <section className="login-section">
              <header>
                로그인
                <button className="close" onClick={close}>
                  {' '}
                  &times;
                </button>
              </header>
              <div className="login-head-img">
                <img src="../static/img/login-icon.png"/>
              </div>
                <div className="login-form-wrapper">
                  <form onSubmit={loginSubmit}>
                    <div className="login-input-form">
                      <input className="login-input" value={userId} onChange={handleInputChangeId}/>
                    </div>
                    <div className="login-input-form">
                      <input type="password" className="login-input" value={userPw} onChange={handleInputChangePw} />
                    </div>
                  <div className="login-btn-form">
                    <button className="btn btn-login" >LogIn</button>
                  </div>
                  </form>
                  <div className="ask-sign-up">계정이 없으신 가요?  <a className="join-link blink" href="/join">Join!</a></div>
                  <div className="social-sign-up"></div>
                  <div className="bordert"></div>
                  <div className="login-btn-form">
                    <img className="logo-zone" src="../static/img/google-btn.png" />
                    <button className="btn btn-google" onClick={loginGoogle}>Google Login 하기</button>
                  </div>
                  <div className="login-btn-form">
                    <img className="logo-zone" src="../static/img/kakao-btn.png" />
                    <button className="btn btn-kakao" onClick={loginKakao}>KaKao Login 하기</button>
                  </div>
                  <div className="login-btn-form">
                    <img className="logo-zone" src="../static/img/naver-btn.png" />
                    <button className="btn btn-naver" onClick={loginGoogle}>Naver Login 하기</button>
                  </div>
                </div>
              <footer>
                <button className="close" onClick={close}>
                  {' '}
                  close{' '}
                </button>
              </footer>
            </section>
        ) : null}
      </div>
        </>
  );
};

export default Modal;