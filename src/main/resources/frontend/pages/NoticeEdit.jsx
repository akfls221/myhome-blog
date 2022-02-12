import React, {useEffect, useState} from 'react';
import Header from "../component/Header";
import WelcomeSection from "../component/sectionComponent/WelcomeSection";
import NoticeConfig from "../component/noticeComponent/NoticeConfig";
import NoticeContent from "../component/noticeComponent/NoticeContent";
import RegDeleteBtn from "../component/buttonComponent/RegDeleteBtn";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const NoticeEdit = () => {
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeType, setNoticeType] = useState('N');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeDate, setNoticeDate] = useState('');

  const handleTitleInput = (value) => {
    setNoticeTitle(value);
  }

  const handleNoticeType = (value) => {
    setNoticeType(value)
  }

  const handelNoticeContent = (value) => {
    setNoticeContent(value);
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
    console.log(noticeType);
  }

  const navigate = useNavigate()

  useEffect(() => {
    createNoticeDate();
    return () => {}
  }, []);

  const registStudy = (e) => {
    e.preventDefault();
    if (noticeTitle.length === 0 || noticeContent.length === 0) {
      alert("게시글 제목 또는 내용을 입력해 주세요");
      return;
    }
    axios({
      method: "POST",
      url: 'http://localhost:8080/api/v1/posts',
      data: {
        'title': noticeTitle,
        'created_date': noticeDate,
        'author' : '관리자',
        'content' : noticeContent,
        'type': noticeType,
      }
    }).then((res) => {
      navigate('/notice');
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
              <h2 className="board-title">공지사항 등록</h2>
            </div>
            <div className="row justify-content-center text-center">
              <div className="col-md-12 mb-5 mb-md-0">
                <form method="post" role="form" className="php-email-form" onSubmit={registStudy}>
                  <NoticeConfig
                      titleValue={noticeTitle}
                      titleOnChange={(value) => handleTitleInput(value)}
                      typeValue={noticeType}
                      typeOnChange={(value) => handleNoticeType(value)}
                      dateValue={noticeDate}
                  />
                  <NoticeContent
                      contentValue={noticeContent}
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

export default NoticeEdit;
