import React, {memo} from 'react';
import EmailCheckModal from "../../pages/EmailCheckModal";
import {Link} from "react-router-dom";

const FeedBackSection = memo(() => {

  return (
      <>
        <section className="section">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-4 me-auto">
                <h2 className="mb-4">피드백 요청사항</h2>
                <p className="mb-4">아직 부족한 점이 많은 블로그입니다. 피드백을 주어 도움을 주세요</p>
                <p><Link to={"/feedBack"} className="btn btn-primary">FeedBack 하러가기!</Link></p>
              </div>
              <div className="col-md-6" data-aos="fade-left">
                <img src="/static/img/feedback.png" alt="Image" className="img-fluid"/>
              </div>
            </div>
          </div>
        </section>
      </>
  )
});

export default FeedBackSection;