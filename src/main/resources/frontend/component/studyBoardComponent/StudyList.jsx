import React, {useEffect, useMemo, useState} from 'react';
import { Link } from "react-router-dom";
import toArray from "@babel/runtime/helpers/esm/toArray";

const StudyList = ({value}) => {
  const [thumbNail, setThumbNail] = useState('');

  const CreateThumbnail = () => {
    const content = value.content;
    const startImg = "src=";
    const endImg = `"`;
    let viewThumbNail = '';
    console.log(content.indexOf(startImg))
    if(content.indexOf(startImg) !== -1) {
      const startIndex = content.indexOf(startImg, 0) + 5;
      const endIndex = content.indexOf(endImg, startIndex);
      viewThumbNail = content.substring(startIndex, endIndex);
    }
    return viewThumbNail;
  }

  useEffect(() => {
    const result = CreateThumbnail();
    if (result.length <= 0) {
      setThumbNail("../static/img/background.jpg");
    } else {
      setThumbNail(result);
    }
  }, [])

  return (
    <>
      <div className="study-notice-wrapper">
        <div className="post-entry">
          <Link to={`/study/${value.id}`}>
            <img src={thumbNail} alt="Image" className="study-thumbnail" />
          </Link>
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