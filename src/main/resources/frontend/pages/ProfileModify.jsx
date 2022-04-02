import React, {useEffect, useState} from 'react';
import {getCookie, setCookie} from "../util/Cookie";
import axios from "axios";
import CheckIdModal from "../component/CheckIdModal";
import {useNavigate} from "react-router";
import {backend} from "../util/config";
import {toast} from "react-toastify";

const ProfileModify = () => {
  const [userId, setUserId] = useState('');
  const [changeId, setChangeId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [userName, setUserName] = useState('');
  const [userNickName, setUserNickName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [idCheckResult, setIdCheckResult] = useState(true);
  const [userPwCheck, setUserPwCheck] = useState('');
  const [pwCheckResult, setPwCheckResult] = useState(false);
  const [userAuth, setUserAuth] = useState('');
  const [userLoginType, setUserLoginType] = useState('');
  const [userProfile, setUserProfile] = useState('');
  const [socialType, setSocialType] = useState('');
  const [datePath, setDatePath] = useState('');
  const [uuidFilename, setUuidFilename] = useState('');

  const userInfo = getCookie('loginCookie');
  const navigate = useNavigate();

  const uPwHandle = (e) => {
    setUserPw(e.target.value);
  }

  const idCheckHandle = (e) => {
    e.preventDefault();
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const uPwCheckHandle = (e) => {
    setUserPwCheck(e.target.value);
  }

  const uNameHandle = (e) => {
    setUserName(e.target.value);
  }

  const uNickHandle = (e) => {
    setUserNickName(e.target.value);
  }

  const handleDeleteProfile =(e) => {
    e.preventDefault();
    deleteProfile();
  }

  const deleteProfile = () => {
    if (userProfile !== '../static/img/user_icon.png') {
      let splitPath = userProfile.split('getProfile/');
      axios({
        method: "POST",
        url: `http://${backend}/api/v1/deleteProfile`,
        data: {deletePath : splitPath[1]},
      }).then((res) => {
        if (res.data.error) {
          toast.error(res.data.message, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER
          });
          return;
        }
        setUserProfile('../static/img/user_icon.png');

      }).catch(error => {
        console.log(error);
        toast.error('파일삭제에 문제가있습니다. 관리자에게 문의해주세요.', {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER
        });
      });
    }
  }

  const uploadProfile = (e) => {
    const profile = e.target.files[0]
    if (profile !== undefined) {
      const formData = new FormData();
      formData.append("multipartFile", profile);

      deleteProfile();

      axios({
        method: "POST",
        url: `http://${backend}/api/v1/profile`,
        data: formData,
      }).then((res) => {
        if (res.data.error) {
          toast.error(res.data.message, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER
          });
          return;
        }
        setDatePath(res.data.datePath);
        setUuidFilename(res.data.uuidFilename);

        setUserProfile(`http://${backend}/api/v1/getProfile/${res.data.requestPath}`);

      }).catch(error => {
        console.log(error);
        toast.error('파일업로드에 실패했습니다. 관리자에게 문의해주세요.', {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER
        });
      });
    }
  }

  const changeInfo = (e) => {
    e.preventDefault();

    if (!idCheckResult){
      toast.error('ID중복체크를 진행해주세요.', {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }

    if (userPw !== '' && pwCheckResult === false) {
      toast.error('PW확인후 재시도해주세요.', {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }


    axios({
      method: "POST",
      url: `http://${backend}/api/v1/manage/userEdit`,
      headers: {Authorization: userInfo.accessToken},
      data: {
        id: userInfo.id,
        uid: userId,
        password: userPw,
        name: userName,
        nickName: userNickName,
        email: userEmail,
        profileImageUrl: userProfile
      }
    }).then((res) => {
      if (res.data.error) {
        toast.error(res.data.message, {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER
        });
      } else {
        const userInfo = res.data;
        setCookie('loginCookie', userInfo, {
          expires: new Date(Date.parse(new Date()) + 1000 * 60 * 60)
        });
        toast.success('회원정보 변경을 완료했습니다.', {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER
        });
        navigate("/");
      }
    }).catch(error => {
      navigate("/noAuth");
    });
  }

  useEffect(() => {
    if (userPw === userPwCheck && userPw.length > 0 && userPwCheck.length > 0) {
      setPwCheckResult(true);
    } else {
      setPwCheckResult(false);
    }
  }, [userPwCheck, userPw ]);

  useEffect(() => {
    if (userInfo !== undefined) {
      setUserProfile(userInfo.picture);
      setUserId(userInfo.uid);
      setUserName(userInfo.name);
      setUserAuth(userInfo.roles[0]);
      setUserLoginType(userInfo.socialType.toUpperCase());
      setUserNickName(userInfo.nickName);
      setSocialType(userInfo.socialType);
      setUserEmail(userInfo.email);
    } else {
      navigate('/noAuth');
    }
  }, []);


    return (
      <>
        <section className="section">
          <div className="container">
            <div className="row justify-content-left text-left mb-5" data-aos="fade-up">
              <h2 className="board-title">회원정보 수정</h2>
            </div>
            <div className="row justify-content-center text-center">
              <div className="col-md-12 mb-5 mb-md-0">
                <div className="col-md-12 mb-5 mb-md-0">
                  <div className="profile-wrapper">
                    <div className="profile-img-wrapper">
                      {socialType === 'blog' &&
                        <button className="profile-delete" onClick={handleDeleteProfile}>
                          {' '}
                          &times;
                        </button>
                      }
                      <img className="profile-img" src={userProfile} />
                      {socialType === 'blog' &&
                        <>
                          <label className="input-file-button" htmlFor="inputFile">프로필 업로드</label>
                          <input className="input-file" type="file" id="inputFile" multiple="multiple" onChange={uploadProfile} />
                        </>
                      }
                    </div>
                    <div className="profile-info">
                      <div className="join-detail">
                        <div className="profile-subtitle">USER_ID</div>
                        <div>
                          <div className="profile-sub-content">{userId}</div>
                          {socialType === 'blog' &&
                            <button className="change-id-btn" onClick={idCheckHandle}>ID 변경</button>
                          }
                        </div>
                      </div>
                      {socialType === 'blog' &&
                      <>
                        <div className="join-detail">
                          <div className="profile-subtitle">비밀번호</div>
                          <input className="join-input" type="password" value={userPw} onChange={uPwHandle} />
                        </div>
                        <div className="join-detail">
                          <div className="profile-subtitle">비밀번호 확인</div>
                          <input className="join-input" type="password" value={userPwCheck} onChange={uPwCheckHandle}/>
                          {pwCheckResult === true ?
                              <img className="check-result" src='/static/img/check-icon.png'/>
                              :
                              <img className="check-result" src='/static/img/non-icon.png'/>
                          }
                        </div>
                      </>
                      }
                      {socialType === 'blog' ?
                        <div className="join-detail">
                          <div className="profile-subtitle">사용자 이름</div>
                          <input className="join-input" value={userName} onChange={uNameHandle}/>
                        </div>
                        :
                        <div className="profile-detail">
                          <div className="profile-subtitle">사용자 이름</div>
                          <div className="board-sub-content">{userName}</div>
                        </div>
                      }
                      <div className="join-detail">
                        <div className="profile-subtitle">사용자 닉네임</div>
                        <input className="join-input" value={userNickName || ''} onChange={uNickHandle} />
                      </div>
                      <div className="profile-detail">
                        <div className="profile-subtitle">USER_E-mail</div>
                        <div className="board-sub-content">{userEmail}</div>
                      </div>
                      <div className="profile-detail">
                        <div className="profile-subtitle">USER_AUTH</div>
                        {userAuth === 'ROLE_ADMIN' ?
                            <div className="board-sub-content">관리자</div>
                            :
                            <div className="board-sub-content">일반 사용자</div>
                        }

                      </div>
                      <div className="profile-detail">
                        <div className="profile-subtitle">USER_LOGIN_TYPE</div>
                        <div className="board-sub-content">{userLoginType}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn btn-join" onClick={changeInfo}>변경</button>
            </div>
          </div>
        </section>
        <CheckIdModal open={modalOpen}
                      close={closeModal}
                      setChangeId={setChangeId}
                      setUserId={setUserId}
                      changeId={changeId}
                      setIdCheckResult={setIdCheckResult}
                      setModalOpen={setModalOpen}
                      header="ID 중복확인"
        />
      </>
  );
}
export default ProfileModify;