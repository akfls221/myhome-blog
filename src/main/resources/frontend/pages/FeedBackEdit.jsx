import React, {memo, useEffect, useState} from 'react';

import NoticeConfig from "../component/noticeComponent/NoticeConfig";
import NoticeContent from "../component/noticeComponent/NoticeContent";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {getCookie} from "../util/Cookie";
import FeedBackConfig from "../component/feedBackComponent/FeedBackConfig";
import {backend} from "../util/config";

const FeedBackEdit = memo(() => {
  const [feedBackTitle, setFeedBackTitle] = useState('');
  const [feedBackType, setFeedBackType] = useState('E');
  const [feedBackContent, setFeedBackContent] = useState('');
  const [feedBackPw, setFeedBackPw] = useState('');
  const [noticeDate, setNoticeDate] = useState('');
  const [author, setAuthor] = useState('');
  const userInfo = getCookie('loginCookie');

  const handleTitleInput = (value) => {
    setFeedBackTitle(value);
  }

  const handlePwInput = (value) => {
    setFeedBackPw(value);
  }

  const handleFeedBackType = (value) => {
    setFeedBackType(value)
  }

  const handelNoticeContent = (value) => {
    setFeedBackContent(value);
  }

  const createNoticeDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (1 + date.getMonth())).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const time = date.toLocaleTimeString();
    const totalDate = `${year}-${month}-${day} .${time}`;

    setNoticeDate(totalDate);
  }

  const handleDeleteBtn = (e) => {
    e.preventDefault();
    navigate(-1);
  }

  const navigate = useNavigate()

  useEffect(() => {
    createNoticeDate();
    return () => {
    }
  }, []);

  const registFeedBack = (e) => {
    e.preventDefault();
    if (feedBackTitle.length === 0 || feedBackContent.length === 0) {
      alert("게시글 제목 또는 내용을 입력해 주세요");
      return;
    }

    axios({
      method: "POST",
      url: `http://${backend}/api/v1/feedBack`,
      headers: {Authorization: userInfo.accessToken},
      data: {
        userId: userInfo.id,
        title: feedBackTitle,
        feedBackType: feedBackType,
        password: feedBackPw,
        content: feedBackContent,
      }
    }).then((res) => {
      alert("피드백 등록이 완료되었습니다.");
      navigate('/feedback');
    }).catch(error => {
      throw new Error(error);
    });
  }

  useEffect(() => {
    if (userInfo === undefined) {
      alert("회원가입 후 이용가능한 페이지 입니다.");
      navigate("/join");
    } else {
      setAuthor(userInfo.name);
    }
  }, [userInfo]);

  return (
      <>
        <section className="section">
          <div className="container">
            <div className="row justify-content-left text-left mb-5" data-aos="fade-up">
              <h2 className="board-title">피드백 등록</h2>
            </div>
            <div className="row justify-content-center text-center">
              <div className="col-md-12 mb-5 mb-md-0">
                <form method="post" role="form" className="php-email-form" onSubmit={registFeedBack}>
                  <FeedBackConfig
                      titleValue={feedBackTitle}
                      titleOnChange={(value) => handleTitleInput(value)}
                      passValue={feedBackPw}
                      pwOnChange={(value) => handlePwInput(value)}
                      typeOnChange={(value) => handleFeedBackType(value)}
                      dateValue={noticeDate}
                      author={author}
                  />
                  <NoticeContent
                      contentValue={feedBackContent}
                      contentOnChange={(value) => handelNoticeContent(value)}
                  />
                  <button onClick={handleDeleteBtn} className="btn btn-delete small">취소</button>
                  <button className="btn btn-regist small" onClick={registFeedBack}>등록</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
  )
});

export default FeedBackEdit;
