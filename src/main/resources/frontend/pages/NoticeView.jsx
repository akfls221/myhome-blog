import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import NoticeHeader from "../component/noticeComponent/NoticeHeader";

const NoticeView = () => {
  const param = useParams().id;

  document.cookie = "safeCookie1=foo; SameSite=Lax";
  document.cookie = "safeCookie2=foo";
  document.cookie = "crossCookie=bar; SameSite=None; Secure";

  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeType, setNoticeType] = useState('N');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeDate, setNoticeDate] = useState('');

  const navigate = useNavigate();

  const setTitleContent = (item) => {
    setNoticeTitle(item.title);
    setNoticeContent(item.content);
    setNoticeType(item.type);
  }

  const returnHistory = () => {
    navigate(-1);
  }



  useEffect(() => {
    sessionStorage.setItem("id", param);
    const id = sessionStorage.getItem("id");
    axios({
      method: "GET",
      url: `http://localhost:8080/api/v1/posts/${id}`,
    }).then((res) => {
      const item = res.data;
      setTitleContent(item);

    }).catch(error => {
      console.log(error);
      throw new Error(error);
    });

    return () => {
    }
  }, [])

  return (
      <>
        <section className="section">
          <div className="container">
            <div className="row justify-content-left text-left mb-5" data-aos="fade-up">
              <h2 className="board-title">공지사항 상세</h2>
            </div>
            <div className="row justify-content-center text-center">
              <div className="col-md-12 mb-5 mb-md-0">
               <NoticeHeader typeValue={noticeType} titleValue={noticeTitle}/>
              </div>
              <div className="col-md-12 mb-5 mb-md-0">
                <div dangerouslySetInnerHTML={{__html: noticeContent}}></div>
              </div>
            </div>
            <button className="btn btn-regist small" onClick={returnHistory}>목록</button>
          </div>
        </section>
      </>
  );
};

export default NoticeView;