import React, {useEffect, useState} from 'react';
import NoticeConfig from "../component/noticeComponent/NoticeConfig";
import NoticeContent from "../component/noticeComponent/NoticeContent";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {getCookie} from "../util/Cookie";
import {useParams} from "react-router";
import {backend} from "../util/config";
import {toast} from "react-toastify";

const NoticeModify = () => {
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeType, setNoticeType] = useState('N');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeDate, setNoticeDate] = useState('');
  const [author, setAuthor] = useState('');
  const userInfo = getCookie('loginCookie');

  const id = useParams().id;

  useEffect(() => {
    if(userInfo !== undefined && userInfo.roles[0] === 'ROLE_ADMIN') {
      axios({
        method: "GET",
        url: `http://${backend}/api/v1/posts/${id}`,
      }).then((res) => {
        const item = res.data;
        console.log(item);
        setNoticeType(item.type);
        setNoticeContent(item.content);
        setNoticeTitle(item.title)

      }).catch(error => {
        console.log(error);
        throw new Error(error);
      });
    }

    return () => {
    }
  }, [])


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
    navigate(-1);
  }

  const navigate = useNavigate()

  useEffect(() => {
    createNoticeDate();
    return () => {}
  }, []);

  const modifyNotice = (e) => {
    e.preventDefault();
    if (noticeTitle.length === 0 || noticeContent.length === 0) {
      toast.error('게시글 제목 또는 내용을 입력해 주세요.', {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
    axios({
      method: "POST",
      url: `http://${backend}/api/v1/postsUpdate/${id}`,
      headers: {Authorization: userInfo.accessToken},
      data: {
        title: noticeTitle,
        author : author,
        content : noticeContent,
        type: noticeType,
      }
    }).then((res) => {
      const resData = res.data;
      if (resData.message !== undefined) {
        toast.error(resData.message, {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER
        });
      }else {
        toast.success('수정이 완료되었습니다.', {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER
        });
        navigate(-1);
      }
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
              <h2 className="board-title">공지사항 수정</h2>
            </div>
            <div className="row justify-content-center text-center">
              <div className="col-md-12 mb-5 mb-md-0">
                <form method="post" role="form" className="php-email-form" >
                  <NoticeConfig
                      titleValue={noticeTitle}
                      titleOnChange={(value) => handleTitleInput(value)}
                      typeValue={noticeType}
                      typeOnChange={(value) => handleNoticeType(value)}
                      dateValue={noticeDate}
                      author={author}
                  />
                  <NoticeContent
                      contentValue={noticeContent}
                      contentOnChange={(value) => handelNoticeContent(value)}
                  />
                  <button onClick={handleDeleteBtn} className="btn btn-delete small">취소</button>
                  <button className="btn btn-regist small" onClick={modifyNotice}>등록</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
  )
}

export default NoticeModify;
