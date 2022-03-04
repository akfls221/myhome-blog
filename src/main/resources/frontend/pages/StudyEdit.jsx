import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import StudyBoardConfig from "../component/studyBoardComponent/StudyBoardConfig";
import NoticeContent from "../component/noticeComponent/NoticeContent";
import {getCookie} from "../util/Cookie";

const StudyEdit = () => {
  const [studyTitle, setStudyTitle] = useState('');
  const [studySub, setStudySub] = useState('');
  const [studyContent, setStudyContent] = useState('');
  const [studyDate, setStudyDate] = useState('');
  const [author, setAuthor] = useState('');
  const userInfo = getCookie('loginCookie');

  const handleTitleInput = (value) => {
    setStudyTitle(value);
  }

  const handleStudySub = (value) => {
    setStudySub(value)
  }

  const handelNoticeContent = (value) => {
    setStudyContent(value);
  }

  const createNoticeDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (1 + date.getMonth())).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const time = date.toLocaleTimeString();
    const totalDate = `${year}-${month}-${day} .${time}`;

    setStudyDate(totalDate);
  }

  const handleDeleteBtn = (e) => {
    e.preventDefault();
    navigate(-1);
  }

  const navigate = useNavigate()

  useEffect(() => {
    createNoticeDate();
    return () => {}
  }, []);

  const registStudy = (e) => {
    e.preventDefault();

    if (studyTitle.length === 0 || studyContent.length === 0) {
      alert("게시글 제목 또는 내용을 입력해 주세요");
      return;
    }

    console.log("썸네일 뽑아보자", studyContent)

    axios({
      method: "POST",
      url: 'http://localhost:8080/api/v1/board',
      headers: {Authorization: userInfo.accessToken},
      data: {
        title: studyTitle,
        author : author,
        content : studyContent,
        sub: studySub,
      }
    }).then((res) => {
      navigate('/study');
    }).catch(error => {
      console.log(error);
      throw new Error(error);
    });
  }

  useEffect(() => {
    if (userInfo === undefined || userInfo.roles[0] !== 'ROLE_ADMIN') {
      navigate(-1);
    } else {
      setAuthor(userInfo.name);
    }
  }, [userInfo]);

  return(
      <>
        <section className="section">
          <div className="container">
            <div className="row justify-content-left text-left mb-5" data-aos="fade-up">
              <h2 className="board-title">게시글 등록</h2>
            </div>
            <div className="row justify-content-center text-center">
              <div className="col-md-12 mb-5 mb-md-0">
                <form method="post" role="form" className="php-email-form" onSubmit={registStudy}>
                  <StudyBoardConfig
                      titleValue={studyTitle}
                      titleOnChange={(value) => handleTitleInput(value)}
                      subValue={studySub}
                      subOnChange={(value) => handleStudySub(value)}
                      dateValue={studyDate}
                      author={author}
                  />
                  <NoticeContent
                      contentValue={studyContent}
                      contentOnChange={(value) => handelNoticeContent(value)}
                  />
                  <button onClick={handleDeleteBtn} className="btn btn-delete small">취소</button>
                  <button className="btn btn-regist small" onClick={registStudy}>등록</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
  )
}

export default StudyEdit;
