import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import {getCookie} from "../util/Cookie";
import axios from "axios";
import Modal from "./Modal";
import EmailCheckModal from "./EmailCheckModal";

const JoinPage = () => {
  const [userId, setUserId] = useState('');
  const [existCheck, setExistCheck] = useState(false);
  const [userPw, setUserPw] = useState('');
  const [userPwCheck, setUserPwCheck] = useState('');
  const [pwCheckResult, setPwCheckResult] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userNickName, setUserNickName] = useState('');
  const [userProfile, setUserProfile] = useState('');
  const [datePath, setDatePath] = useState('');
  const [uuidFilename, setUuidFilename] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [emailCheckResult, setEmailCheckResult] = useState(false);
  const [joinBtn, setJoinBtn] = useState(true);
  const navigate = useNavigate();

  const uIdHandle = (e) => {
    setUserId(e.target.value);
  }

  const uPwHandle = (e) => {
    setUserPw(e.target.value);
  }

  const uPwCheckHandle = (e) => {
    setUserPwCheck(e.target.value);
  }

  const uEmailHandle = (e) => {
    setUserEmail(e.target.value);
  }

  const uNameHandle = (e) => {
    setUserName(e.target.value);
  }

  const uNickHandle = (e) => {
    setUserNickName(e.target.value);
  }

  const mailCheckHandle = (e) => {
    e.preventDefault();

    if(userEmail.length <= 0){
      alert("이메일 입력은 필수 입니다.");
      return;
    }

    axios({
      method: "GET",
      url: 'http://localhost:8080/api/v1/email?email=' + userEmail,
    }).then((res) => {
        setModalOpen(true);
    }).catch(error => {
      console.log(error);
      alert("존재하지 않는 이메일이거나 이메일 형식이 잘못 되었습니다.");
    });
  }

  const uploadProfile = (e) => {
    const profile = e.target.files[0]
    if (profile !== undefined) {
      const formData = new FormData();
      formData.append("multipartFile", profile);
      console.log(e.target.files[0]);

      if (uuidFilename !== '') {
        axios({
          method: "POST",
          url: "http://localhost:8080/api/v1/deleteProfile",
          data: {deletePath : datePath + "\\" + uuidFilename},
        }).then((res) => {
          if (res.data.error) {
            alert(res.data.message);
            return;
          }
          setDatePath('');
          setUuidFilename('');
          setUserProfile('');

        }).catch(error => {
          console.log(error);
          alert("파일 업로드에 문제가 있습니다. 관리자에게 문의해주세요");
        });
      }

      axios({
        method: "POST",
        url: "http://localhost:8080/api/v1/profile",
        data: formData,
      }).then((res) => {
        if (res.data.error) {
          alert(res.data.message);
          return;
        }
        setDatePath(res.data.datePath);
        setUuidFilename(res.data.uuidFilename);

        setUserProfile("http://localhost:8080/api/v1/getProfile/" + res.data.requestPath);

      }).catch(error => {
        console.log(error);
        alert("파일 업로드에 실패 했습니다. 관리자에게 문의해주세요.");
      });
    }
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const idCheckHandle = (e) => {
    e.preventDefault()
    if (userId.length <= 0) {
      alert("아이디는 필수 입력값입니다.");
      return;
    }

    axios({
      method: "POST",
      url: 'http://localhost:8080/api/v1/idCheck',
      data: {
        uid: userId
      }
    }).then((res) => {
      if (res.data) {
        alert("사용 가능한 아이디 입니다.");
        setExistCheck(true);
      } else {
        alert("아이디가 중복되었습니다. 다식 확인 부탁 드립니다.");
        setExistCheck(false);
      }
    }).catch(error => {
      console.log(error);
      throw new Error(error);
    });
  }

  const joinSite = (e) => {
    e.preventDefault();

    axios({
      method: "POST",
      url: 'http://localhost:8080/api/v1/join',
      data: {
        uid: userId,
        password: userPw,
        name: userName,
        nickName: userNickName,
        email: userEmail
      }
    }).then((res) => {
      const userInfo = res.data;
      alert("가입을 환영합니다." + userInfo.name + "님");
      navigate("/");
    }).catch(error => {
      console.log(error);
      throw new Error(error);
    });
  }

  useEffect(() => {
    if (userId.length <= 0) {
      setExistCheck(false);
    }
  }, [userId, emailCheckResult]);

  useEffect(() => {
    if (userPw === userPwCheck && userPw.length > 0 && userPwCheck.length > 0) {
      setPwCheckResult(true);
    } else {
      setPwCheckResult(false);
    }
  }, [userPwCheck, userPw ]);

  useEffect(() => {
    if (existCheck === true && pwCheckResult === true && emailCheckResult === true) {
      setJoinBtn(false);
    }
  }, [existCheck, pwCheckResult, emailCheckResult])

  // useEffect(() => {
  //   getProfileImage();
  // }, [requestProfile])

  return (
      <>
        <section className="section">
          <div className="container">
            <div className="row justify-content-left text-left mb-5" data-aos="fade-up">
              <h2 className="board-title">회원가입</h2>
            </div>
            <div className="row justify-content-center text-center">
              <div className="col-md-12 mb-5 mb-md-0">
                <form method="post" role="form" className="php-email-form">
                  <div className="col-md-12 mb-5 mb-md-0">
                    <div className="profile-wrapper">
                      <div className="profile-img-wrapper">
                      <img className="profile-img" src={userProfile} />
                        <label className="input-file-button" htmlFor="inputFile">프로필 업로드</label>
                        <input className="input-file" type="file" id="inputFile" multiple="multiple" onChange={uploadProfile} />
                      </div>
                      <div className="profile-info">
                        <div className="join-detail">
                          <div className="profile-subtitle">사용자 ID</div>
                          <input className="join-input" value={userId} onChange={uIdHandle} />
                          {existCheck === true ?
                              <img className="check-result" src='../static/img/check-icon.png' />
                              :
                              <button className="non-exist-check" onClick={idCheckHandle}>중복체크</button>
                          }
                        </div>
                        <div className="join-detail">
                          <div className="profile-subtitle">비밀번호</div>
                          <input className="join-input" type="password" value={userPw} onChange={uPwHandle} />
                        </div>
                        <div className="join-detail">
                          <div className="profile-subtitle">비밀번호 확인</div>
                          <input className="join-input" type="password" value={userPwCheck} onChange={uPwCheckHandle} />
                          {pwCheckResult === true ?
                              <img className="check-result" src='/static/img/check-icon.png' />
                              :
                              <img className="check-result" src='/static/img/non-icon.png' />
                          }
                        </div>
                        <div className="join-detail">
                          <div className="profile-subtitle">E-Mail</div>
                          <input className="join-input" type="email" readOnly={emailCheckResult === true && 'readOnly'} value={userEmail} onChange={uEmailHandle} />
                          {emailCheckResult === true ?
                              <img className="check-result" src='/static/img/check-icon.png' />
                              :
                              <button className="non-exist-check" onClick={mailCheckHandle}>메일인증</button>
                          }
                        </div>
                        <div className="join-detail">
                          <div className="profile-subtitle">사용자 이름</div>
                          <input className="join-input" value={userName} onChange={uNameHandle} />
                        </div>
                        <div className="join-detail">
                          <div className="profile-subtitle">사용자 닉네임</div>
                          <input className="join-input" value={userNickName} onChange={uNickHandle} />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <button className="btn btn-join" disabled={joinBtn} onClick={joinSite}>가입</button>
            </div>
          </div>
        </section>
        <EmailCheckModal open={modalOpen}
                         close={closeModal}
                         userEmail={userEmail}
                         setEmailCheckResult={setEmailCheckResult}
                         setModalOpen={setModalOpen}
                         header="이메일 인증"
        />
      </>
  );
}

export default JoinPage;