import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import StudyHeader from "../component/studyBoardComponent/StudyHeader";
import {getCookie} from "../util/Cookie";
import {backend} from "../util/config";

const StudyView = () => {
  const [studyTitle, setStudyTitle] = useState('');
  const [studyContent, setStudyContent] = useState('');
  const [studySub, setStudySub] = useState('');
  const [roleCheck, setRoleCheck] = useState(false);

  const userInfo = getCookie('loginCookie');
  const navigate = useNavigate();
  const id = useParams().id;

  const returnHistory = () => {
    navigate(-1);
  }

  useEffect(() => {
    if(userInfo !== undefined) {
      axios({
        method: "GET",
        url: `http://${backend}/api/v1/board/${id}`,
      }).then((res) => {
        const item = res.data;
        setStudyTitle(item.title);
        setStudyContent(item.content);
        setStudySub(item.sub);

      }).catch(error => {
        console.log(error);
        throw new Error(error);
      });
    }
    return () => {
    }
  }, [])

  useEffect(() => {
    if (userInfo === undefined) {
      alert("회원가입 후 이용가능한 페이지 입니다.");
      navigate(-1);
    } else if(userInfo.roles[0] === 'ROLE_ADMIN') {
      setRoleCheck(userInfo.name);
    }
  }, []);

  return (
      <>
        <section className="section">
          <div className="container">
            <div className="row justify-content-left text-left mb-5" data-aos="fade-up">
              <h2 className="board-title">게시글 상세</h2>
            </div>
            <div className="row justify-content-center text-center">
              <div className="col-md-12 mb-5 mb-md-0">
               <StudyHeader titleValue={studyTitle}
                            sub={studySub}
               />
              </div>
              <div className="col-md-12 mb-5 mb-md-0">
                <div className="notice-content-wrap">
                  <div dangerouslySetInnerHTML={{__html: studyContent}}/>
                </div>
              </div>
            </div>
            <button className="btn btn-regist small" onClick={returnHistory}>목록</button>
            {roleCheck &&
              <Link to={`/study_modify/${id}`}>
                <button className="btn btn-modify small">수정</button>
              </Link>
            }
          </div>
        </section>
      </>
  );
};

export default StudyView;