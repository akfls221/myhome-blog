import React, {useEffect, useState} from 'react';
import SearchForm from "../component/SearchForm";
import NoticeList from "../component/noticeComponent/NoticeList";
import axios from "axios";
import {Link} from "react-router-dom";

const Notice = () => {
  const [noticeList, setNoticeList] = useState([]);

  useEffect(() => {
    axios({
      method: "POST",
      url: 'http://localhost:8080/api/v1/postsList',
    }).then((res) => {
      console.log(res.data);
      setNoticeList(res.data.content);
    }).catch(error => {
      console.log(error);
      throw new Error(error);
    });

    return () => {
    };
  }, []);

  return (
      <>
        <section className="section">
          <div className="container">
            <div className="row justify-content-left text-left mb-5" data-aos="fade-up">
              <h2 className="board-title">공지사항 목록</h2>
            </div>
            <SearchForm />
            {noticeList === null || noticeList.length === 0 &&
              <div className="board-list-none">
                <img src="/static/img/none-notice.png" />
                <div className="board-list-none-text">게시글이 없습니다</div></div>
            }
            {noticeList.map((item) => {
              return (
                <NoticeList key={item.id} value={item}/>
              );
            })}
            <Link to={"/notice_edit"}><button className="btn btn-regist small">글쓰기</button></Link>
          </div>
        </section>
      </>
  );
}
export default Notice;