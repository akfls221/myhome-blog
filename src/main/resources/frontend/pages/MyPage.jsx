import React, {useEffect, useState} from 'react';
import {getCookie} from "../util/Cookie";
import {Link, useNavigate} from "react-router-dom";

const MyPage = () => {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userNickName, setUserNickName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAuth, setUserAuth] = useState('');
  const [userLoginType, setUserLoginType] = useState('');
  const [userProfile, setUserProfile] = useState('');
  const [profileChange, setProfileChange] = useState(false);

  const userInfo = getCookie('loginCookie');
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo !== undefined) {
      setUserProfile(userInfo.picture);
      setUserId(userInfo.uid);
      setUserName(userInfo.name);
      setUserAuth(userInfo.roles[0]);
      setUserLoginType(userInfo.socialType.toUpperCase());
      setUserNickName(userInfo.nickName);
      setUserEmail(userInfo.email);
    } else {
      navigate("/noAuth");
    }
  }, [userInfo]);

  return (
      <>
        <section className="section">
          <div className="container">
            <div className="row justify-content-left text-left mb-5" data-aos="fade-up">
              <h2 className="board-title">마이페이지</h2>
            </div>
            <div className="row justify-content-center text-center">
              <div className="col-md-12 mb-5 mb-md-0">
                <form method="post" role="form" className="php-email-form">
                  <div className="col-md-12 mb-5 mb-md-0">
                    <div className="profile-wrapper">
                      <div className="profile-img-wrapper">
                        <img className="profile-img" src={userProfile} />
                        {profileChange === true &&
                          <>
                            <label className="input-file-button" htmlFor="inputFile">프로필 업로드</label>
                            <input className="input-file" type="file" id="inputFile" multiple="multiple"  />
                          </>
                        }
                      </div>
                      <div className="profile-info">
                        <div className="profile-detail">
                          <div className="profile-subtitle">USER_ID</div>
                          <div className="board-sub-content">{userId}</div>
                        </div>
                        <div className="profile-detail">
                          <div className="profile-subtitle">USER_NAME</div>
                          <div className="board-sub-content">{userName}</div>
                        </div>
                        <div className="profile-detail">
                          <div className="profile-subtitle">USER_NICKNAME</div>
                          <div className="board-sub-content">{userNickName}</div>
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
                </form>
              </div>
              <Link to={"/profile_edit"}><button className="btn btn-join" >변경</button></Link>
            </div>
          </div>
        </section>
      </>
  );
}

export default MyPage;