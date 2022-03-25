import React, {useEffect, useState} from 'react';
import SearchForm from "../component/SearchForm";
import NoticeList from "../component/noticeComponent/NoticeList";
import axios from "axios";
import {Link} from "react-router-dom";
import {getCookie} from "../util/Cookie";
import Page from "../component/Page";
import FeedBackList from "../component/feedBackComponent/FeedBackList";

const FeedBack = () => {
  const [feedBackList, setFeedBackList] = useState([]);
  const [roleCheck, setRoleCheck] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [nowPage, setNowPage] = useState(1);
  const [searchType, setSearchType] = useState('T');
  const [searchValue, setSearchValue] = useState('');

  const userInfo = getCookie('loginCookie');

  const movePage = (value) => {
    setNowPage(value);
  }

  const searchPosts = () => {
    axios({
      method: "POST",
      url: `http://localhost:8080/api/v1/feedBackList?page=${nowPage}&type=${searchType}&searchValue=${searchValue}` ,
      data: {

      }
    }).then((res) => {
      console.log(res.data);
      setFeedBackList(res.data.content);
      setTotalPage(res.data.totalPages);
    }).catch(error => {
      console.log(error);
      throw new Error(error);
    });
  }

  useEffect(() => {
    if (userInfo !== undefined && userInfo.roles[0] === 'ROLE_ADMIN') {
      setRoleCheck(true);
    }else{
      setRoleCheck(false);
    }

    searchPosts();

    return () => {
    };
  }, [nowPage]);

  return (
      <>
        <section className="section">
          <div className="container">
            <div className="row justify-content-left text-left mb-5" data-aos="fade-up">
              <h2 className="board-title">피드백 목록</h2>
            </div>
            <SearchForm
                searchList={searchPosts}
                setSearchType={setSearchType}
                setSearchValue={setSearchValue}
                menuType={'feedBack'}
            />
            {feedBackList === null || feedBackList.length === 0 &&
              <div className="board-list-none">
                <img src="/static/img/none-notice.png" />
                <div className="board-list-none-text">게시글이 없습니다</div></div>
            }
            {feedBackList.map((item, index) => {
              return (
                <FeedBackList key={item.id} value={item} index={index}/>
              );
            })}
            <div className="row">
              <div className="page-area">
                <Page
                    totalPage={totalPage}
                    setNowPage={setNowPage}
                    nowPage={nowPage}
                    movePage={value => movePage(value)}
                />
              </div>
            </div>
            {
              userInfo !== undefined &&
              userInfo.roles[0] === 'ROLE_USER' &&
                <Link to={"/feedback_edit"}><button className="btn btn-regist small">피드백 하기</button></Link>
            }
          </div>
        </section>
      </>
  );
}
export default FeedBack;