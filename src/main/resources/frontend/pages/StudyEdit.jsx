import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import StudyBoardConfig from "../component/studyBoardComponent/StudyBoardConfig";
import NoticeContent from "../component/noticeComponent/NoticeContent";
import RegDeleteBtn from "../component/buttonComponent/RegDeleteBtn";

const StudyEdit = () => {
  const [studyTitle, setStudyTitle] = useState('');
  const [studySub, setStudySub] = useState('');
  const [studyContent, setStudyContent] = useState('');
  const [studyDate, setStudyDate] = useState('');

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
  }

  const navigate = useNavigate()

  useEffect(() => {
    createNoticeDate();
    return () => {}
  }, []);

  const registNotice = (e) => {
    e.preventDefault();

    if (studyTitle.length === 0 || studyContent.length === 0) {
      alert("게시글 제목 또는 내용을 입력해 주세요");
      return;
    }
    const thumbNail = 'src';
    console.log("썸네일 뽑아보자", studyContent)
    axios({
      method: "POST",
      url: 'http://localhost:8080/api/board',
      data: {
        'title': studyTitle,
        'author' : '관리자',
        'content' : studyContent,
        'sub': studySub,
      }
    }).then((res) => {
      navigate('/study');
    }).catch(error => {
      console.log(error);
      throw new Error(error);
    });
  }
  return(
      <>
        <section className="section">
          <div className="container">
            <div className="row justify-content-left text-left mb-5" data-aos="fade-up">
              <h2 className="board-title">게시글 등록</h2>
            </div>
            <div className="row justify-content-center text-center">
              <div className="col-md-12 mb-5 mb-md-0">
                <form method="post" role="form" className="php-email-form" onSubmit={registNotice}>
                  <StudyBoardConfig
                      titleValue={studyTitle}
                      titleOnChange={(value) => handleTitleInput(value)}
                      subValue={studySub}
                      subOnChange={(value) => handleStudySub(value)}
                      dateValue={studyDate}
                  />
                  <NoticeContent
                      contentValue={studyContent}
                      contentOnChange={(value) => handelNoticeContent(value)}
                  />
                  <RegDeleteBtn onClick={(e) => handleDeleteBtn(e)}/>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
  )
}

export default StudyEdit;
