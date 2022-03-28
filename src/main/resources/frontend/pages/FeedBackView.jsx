import React, {memo, useEffect, useState} from 'react';
import {useParams} from "react-router";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import {getCookie} from "../util/Cookie";
import FeedBackHeader from "../component/feedBackComponent/FeedBackHeader";

import 'emoji-mart/css/emoji-mart.css';
import CommentWrite from "../component/CommetWrite";
import CommentList from "../component/CommentList";
import {backend} from "../util/config";

const FeedBackView = memo(() => {
  const id = useParams().id;
  const [feedBackTitle, setFeedBackTitle] = useState('');
  const [feedBackType, setFeedBackType] = useState('');
  const [feedBackContent, setFeedBackContent] = useState('');
  const [feedBackAuth, setFeedBackAuth] = useState('');
  const [commentList, setCommentList] = useState([]);

  const userInfo = getCookie('loginCookie');
  const navigate = useNavigate();

  const setTitleContent = (item) => {
    console.log(item)
    setFeedBackTitle(item.title);
    setFeedBackContent(item.content);
    setFeedBackAuth(item.auth);
    setFeedBackType(transType(item.feedbackType));
  }

  const transType = (type) => {
    if (type === 'E') {
      return "페이지 에러";
    } else if (type === 'R') {
      return "건의/요청 사항";
    } else if (type === 'O') {
      return "기타 사항";
    }
  }

  const returnHistory = () => {
    navigate(-1);
  }

  const getFeedBackView = () => {
    axios({
      method: "GET",
      url: `http://${backend}/api/v1/feedBack/${id}`,
    }).then((res) => {
      if (res.data.error) {
        alert(res.data.message);
        return;
      }
      const item = res.data;
      setTitleContent(item);
      setCommentList(item.comments);

    }).catch(error => {
      console.log(error);
      throw new Error(error);
    });
  }

  useEffect(() => {
    getFeedBackView();
  }, []);

  return (
      <>
        <section className="section">
          <div className="container">
            <div className="row justify-content-left text-left mb-5" data-aos="fade-up">
              <h2 className="board-title">피드백 상세</h2>
            </div>
            <div className="row justify-content-center text-center">
              <div className="col-md-12 mb-5 mb-md-0">
                <FeedBackHeader typeValue={feedBackType} titleValue={feedBackTitle} authorValue={feedBackAuth}/>
              </div>
              <div className="col-md-12 mb-5 mb-md-0">
                <div className="notice-content-wrap">
                  <div dangerouslySetInnerHTML={{__html: feedBackContent}}/>
                </div>
              </div>
            </div>
            <button className="btn btn-regist small" onClick={returnHistory}>목록</button>
            {userInfo !== undefined && userInfo.roles[0] === 'ROLE_ADMIN' &&
            <Link to={`/notice_modify/${id}`}>
              <button className="btn btn-modify small">수정</button>
            </Link>
            }
          </div>
        </section>
        <div className="container">
          <div className="comment-wrapper">
            {commentList.map((comment, index) => {
              return (
                  <CommentList value={comment} key={'comment_' + comment.id} getFeedBackView={getFeedBackView}/>
              );
            })}
          </div>
          <div className="comment-wrapper">
            <CommentWrite feedBackId={id} getFeedBackView={getFeedBackView}/>
          </div>
        </div>
      </>
  );
});

export default FeedBackView;