import React, {memo, useEffect, useState} from 'react';
import SearchForm from "../component/SearchForm";
import StudyList from "../component/studyBoardComponent/StudyList";
import axios from "axios";
import {Link} from "react-router-dom";
import {getCookie} from "../util/Cookie";
import Page from "../component/Page";

const Study = memo(() => {
  const [boardList, setBoardList] = useState([]);
  const [roleCheck, setRoleCheck] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [nowPage, setNowPage] = useState(1);
  const [searchType, setSearchType] = useState('T');
  const [searchValue, setSearchValue] = useState('');

  const userInfo = getCookie('loginCookie');

  const movePage = (value) => {
    setNowPage(value);
  }

  const searchBoard = () => {
    axios({
      method: "POST",
      url: `http://localhost:8080/api/v1/board/boardList?page=${nowPage}&type=${searchType}&searchValue=${searchValue}`,
    }).then((res) => {
      console.log(res.data);
      setBoardList(res.data.content);
      setTotalPage(res.data.totalPages);
    }).catch(error => {
      console.log(error);
      throw new Error(error);
    });
  }

  useEffect(() => {
    if (userInfo !== undefined) {
      searchBoard();
      if (userInfo.roles[0] === 'ROLE_ADMIN') {
        setRoleCheck(true);
      }
    } else {
      setRoleCheck(false);
    }
    return () => {
    };
  }, [nowPage]);

  return (
      <>
        <section className="section">
          <div className="container">
            <div className="row justify-content-left text-left mb-5" data-aos="fade-up">
              <h2 className="board-title">게시글 목록</h2>
            </div>
            <SearchForm
                searchList={searchBoard}
                setSearchType={setSearchType}
                setSearchValue={setSearchValue}
            />
            <div className="container">
            </div>
            {boardList === null || boardList.length === 0 &&
            <div className="board-list-none">
              <img src="/static/img/none-notice.png"/>
              <div className="board-list-none-text">게시글이 없습니다</div>
            </div>
            }
            <div className="row mb-5">
              {boardList.map((item) => {
                return (
                    <StudyList key={item.id} value={item}/>
                );
              })}
            </div>
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
              roleCheck === true && <Link to={"/study_edit"}>
                <button className="btn btn-regist small">글쓰기</button>
              </Link>
            }
          </div>
        </section>
      </>
  );
});
export default Study;