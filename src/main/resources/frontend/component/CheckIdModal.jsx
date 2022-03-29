import React, {useState} from 'react';
import axios from "axios";
import {backend} from "../util/config";
import {toast} from "react-toastify";

const CheckIdModal = ({ open, close, setIdCheckResult, setUserId, setModalOpen }) => {
  const [changeId, setChangeId] = useState('');

  const idHandleChange = (e) => {
    e.preventDefault();
    setChangeId(e.target.value);
  }

  const idCheckHandle = (e) => {
    e.preventDefault()
    if (changeId.length <= 0) {
      toast.info('아이디는 필수 입력값입니다.', {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }

    axios({
      method: "POST",
      url: `http://${backend}/api/v1/idCheck`,
      data: {
        uid: changeId
      }
    }).then((res) => {
      if (!res.data) {
        toast.success('사용가능한 ID 입니다.', {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER
        });
        setIdCheckResult(true);
        setUserId(changeId);
        setChangeId('')
        setModalOpen(false);
      } else {
        toast.error('ID가 중복되었습니다.', {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER
        });
        setIdCheckResult(false);
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
                  ID 중복 체크
                  <button className="close" onClick={close}>
                    {' '}
                    &times;
                  </button>
                </header>
                <div className="email-form-wrapper">
                  <p></p>
                  <p>변경할 ID를 입력 및 중복체크 해주세요.</p>
                  <div>
                    <input className="email-input" value={changeId} onChange={idHandleChange}/>
                    <button className="non-exist-check" onClick={idCheckHandle}>중복체크</button>
                  </div>
                </div>
              </section>
          ) : null}
        </div>
      </>
  );
};

export default CheckIdModal;