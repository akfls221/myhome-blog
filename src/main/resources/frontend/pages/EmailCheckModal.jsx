import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import axios from "axios";
import {backend} from "../util/config";

const EmailCheckModal = ({ open, close, setModalOpen, userEmail, setEmailCheckResult }) => {
  const [code, setCode] = useState('');

  const codeHandleChange = (e) => {
    setCode(e.target.value)
  }

  const reTryEmailCheck = (e) => {
    e.preventDefault()
  }

  const emailCheck = (e) => {
    e.preventDefault();

    axios({
      method: "GET",
      url: `http://${backend}/api/v1/emailCheck?email=${userEmail}&code=${code}`,
    }).then((res) => {
      if (res.data.error) {
        alert(res.data.message);
      } else if(res.data === false) {
        alert("인증코드가 잘못되었습니다. 다시 확인해 주세요");
      } else{
        alert("정상적으로 인증되었습니다.");
        setEmailCheckResult(true);
        setModalOpen(false);
      }
    }).catch(error => {
      console.log(error);
      throw new Error(error);
    });
  }

  useEffect(() => {
  }, []);

  return (
      <>
        <div className={open ? 'openModal modal' : 'modal'}>
          {open ? (
              <section className="email-section">
                <header>
                  이메일 체크
                  <button className="close" onClick={close}>
                    {' '}
                    &times;
                  </button>
                </header>
                <div className="login-head-img">
                  <img src="../static/img/email-check.png"/>
                </div>
                <div className="email-form-wrapper">
                  <p></p>
                  <p>작성해 주신 {userEmail} 로 인증코드를 보내드렸습니다.</p>
                  <p>인증 코드를 학인하여 인증을 완료해 주세요</p>
                  <div>
                    <input className="email-input" value={code} onChange={codeHandleChange}/>
                    <button className="non-exist-check" onClick={reTryEmailCheck}>재전송</button>
                  </div>
                  <button className="btn btn-login" onClick={emailCheck}>인증</button>
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

export default EmailCheckModal;