import React from 'react';
import { Link } from "react-router-dom";

const StudyList = ({value}) => {

  return (
    <>
      <div className="study-notice-wrapper">
        <div className="post-entry">
          <a href="blog-single.html" className="d-block mb-4">
            <img src="/static/img/img_1.jpg" alt="Image" className="img-fluid" />
          </a>
          <div className="post-text">
            <span className="post-meta">December 13, 2019  By Admin</span>
            <h3><a href="#">{value.title}</a></h3>
            <p>{value.sub}</p>
            <p><a href="#" className="readmore">Read more</a></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudyList;