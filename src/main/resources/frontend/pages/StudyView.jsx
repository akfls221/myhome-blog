import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import StudyHeader from "../component/studyBoardComponent/StudyHeader";

const StudyView = () => {
  const param = useParams().id;

  const [studyTitle, setStudyTitle] = useState('');
  const [studyContent, setStudyContent] = useState('');

  const navigate = useNavigate();

  const setTitleContent = (item) => {
    setStudyTitle(item.title);
    setStudyContent(item.content);
  }

  const returnHistory = () => {
    navigate(-1);
  }

  useEffect(() => {

      axios({
        method: "GET",
        url: `http://localhost:8080/api/v1/board/${param}`,
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
              <h2 className="board-title">게시글 상세</h2>
            </div>
            <div className="row justify-content-center text-center">
              <div className="col-md-12 mb-5 mb-md-0">
               <StudyHeader titleValue={studyTitle}/>
              </div>
              <div className="col-md-12 mb-5 mb-md-0">
                <div className="notice-content-wrap">
                  <div dangerouslySetInnerHTML={{__html: studyContent}}></div>
                </div>
              </div>
            </div>
            <button className="btn btn-regist small" onClick={returnHistory}>목록</button>
          </div>
        </section>
      </>
  );
};

export default StudyView;