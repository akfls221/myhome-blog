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

  const loginSubmit = (e) => {
    e.preventDefault();

    axios({
      method: "POST",
      url: 'http://localhost:8080/api/v1/sign',
      data : {
        'uid' : userId,
        'password': userPw
      }
    }).then((res) => {
      const resData = res.data
      setCookie('loginCookie', resData, {
        // httpOnly: true,
      });
      navigate("/");
      location.reload();

    }).catch(error => {
      throw new Error(error);
    });
  }

  useEffect(() => {
  }, []);


  return (
      <>
      <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
            <section>
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
                  <div className="login-input-form">
                    <input className="login-input" value={userId} onChange={handleInputChangeId}/>
                  </div>
                  <div className="login-input-form">
                    <input type="password" className="login-input" value={userPw} onChange={handleInputChangePw} />
                  </div>
                  <div className="login-btn-form">
                    <button className="btn btn-login" onClick={loginSubmit}>LogIn</button>
                  </div>
                  <div className="ask-sign-up">계정이 없으신 가요?  Join!</div>
                  <div className="social-sign-up"></div>
                  <div className="bordert"></div>
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