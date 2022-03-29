import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import NoticeHeader from "../component/noticeComponent/NoticeHeader";
import {getCookie} from "../util/Cookie";
import {backend} from "../util/config";

const NoticeView = () => {
  const id = useParams().id;
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeType, setNoticeType] = useState('N');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeAuthor, setNoticeAuthor] = useState('');
  const [noticeDate, setNoticeDate] = useState('');
  const [roleCheck, setRoleCheck] = useState(false);

  const userInfo = getCookie('loginCookie');
  const navigate = useNavigate();

  const setTitleContent = (item) => {
    setNoticeTitle(item.title);
    setNoticeContent(item.content);
    setNoticeType(item.type);
    setNoticeAuthor(item.author);
    setNoticeDate(item.modifiedDate.substring(0, 10));

  }

  const returnHistory = () => {
    navigate(-1);
  }

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://${backend}/api/v1/posts/${id}`,
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

  useEffect(() => {
    if(userInfo !== undefined && userInfo.roles[0] === 'ROLE_ADMIN') {
      setRoleCheck(true);
    }
  }, []);

  return (
      <>
        <section className="section">
          <div className="container">
            <div className="row justify-content-left text-left mb-5" data-aos="fade-up">
              <h2 className="board-title">공지사항 상세</h2>
            </div>
            <div className="row justify-content-center text-center">
              <div className="col-md-12 mb-5 mb-md-0">
               <NoticeHeader typeValue={noticeType}
                             titleValue={noticeTitle}
                             authorValue={noticeAuthor}
                             dateValue={noticeDate}
               />
              </div>
              <div className="col-md-12 mb-5 mb-md-0">
                <div className="notice-content-wrap">
                  <div dangerouslySetInnerHTML={{__html: noticeContent}}/>
                </div>
              </div>
            </div>
            <button className="btn btn-regist small" onClick={returnHistory}>목록</button>
            {roleCheck &&
              <Link to={`/notice_modify/${id}`}>
                <button className="btn btn-modify small">수정</button>
              </Link>
            }
          </div>
        </section>
      </>
  );
};

export default NoticeView;