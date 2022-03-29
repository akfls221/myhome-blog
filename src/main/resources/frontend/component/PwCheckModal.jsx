import React, {useState} from 'react';
import axios from "axios";
import {getCookie} from "../util/Cookie";
import {useNavigate} from "react-router";
import {backend} from "../util/config";
import {toast} from "react-toastify";

const pwCheckModal = ({ open, close, boardId }) => {
  const [checkPw, setCheckPw] = useState('');

  const userInfo = getCookie('loginCookie');
  const navigate = useNavigate();

  const pwHandleChange = (e) => {
    e.preventDefault();
    setCheckPw(e.target.value);
  }

  const handleCloseModal =() => {
    setCheckPw('');
    close();
  }

  const boardPwCheck = () => {
    if (checkPw.length <= 0) {
      toast.error('패스워드는 필수 입력값입니다.', {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER
      });
      return;
    } else if (userInfo === undefined) {
      toast.error('로그인후 실행 부탁드립니다.', {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }

    axios({
      method: "POST",
      url: `http://${backend}/api/v1/checkPw`,
      data: {
        boardId: boardId,
        userId: userInfo.id,
        password: checkPw
      }
    }).then((res) => {
      if(res.data.error) {
        toast.error(res.data.message, {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER
        });
      } else {
        navigate(`/feedBackView/${boardId}`);
      }
    }).catch(error => {
      console.log(error);
      throw new Error(error);
    });
  }

  return (
      <>
        <div className={open ? 'openModal modal' : 'modal'}>
          {open ? (
              <section className="checkId-section">
                <header>
                  게시글 비밀번호 체크
                  <button className="close" onClick={handleCloseModal}>
                    {' '}
                    &times;
                  </button>
                </header>
                <div className="email-form-wrapper">
                  <p></p>
                  <p>해당 게시글의 패스워드를 입력해 주세요.</p>
                  <div>
                    <input className="email-input" type="password" value={checkPw} onChange={pwHandleChange}/>
                    <button className="non-exist-check" onClick={boardPwCheck} >체크</button>
                  </div>
                </div>
              </section>
          ) : null}
        </div>
      </>
  );
};

export default pwCheckModal;