import React, {useEffect, useMemo, useState} from 'react';
import { Link } from "react-router-dom";

const StudyList = ({value}) => {
  const [thumbNail, setThumbNail] = useState('');

  const CreateThumbnail = useMemo(() => {
    const content = value.content;
    const startImg = "src=";
    const endImg = `"`;
    const startIndex = content.indexOf(startImg, 0) + 5;
    const endIndex = content.indexOf(endImg, startIndex);
    const thumbNail = content.substring(startIndex, endIndex);

    return thumbNail;
  }, []);

  useEffect(() => {
    setThumbNail(CreateThumbnail);
    if (thumbNail.length <= 0) {

    }
  }, [])

  return (
    <>
      <div className="study-notice-wrapper">
        <div className="post-entry">
          <a href="blog-single.html" className="d-block mb-4">
            <img src={thumbNail} alt="Image" className="study-thumbnail" />
          </a>
          <div className="post-text">
            <span className="post-meta">December 13, 2019  By Admin</span>
            <h3><Link to={`/study/${value.id}`}>{value.title}</Link></h3>
            <p>{value.sub}</p>
            <p><Link to={`/study/${value.id}`}>Read more</Link></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudyList;