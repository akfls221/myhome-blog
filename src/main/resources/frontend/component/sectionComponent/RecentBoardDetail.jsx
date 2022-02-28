import React, {useEffect, useMemo, useState} from 'react';
import {Link} from "react-router-dom";

const RecentBoardDetail = ({value}) => {
  const [thumbNail, setThumbNail] = useState('');

  const CreateThumbnail = () => {
    const content = value.content;
    const startImg = "src=";
    const endImg = `"`;
    let viewThumbNail = '';

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

  return(
    <div className="col-md-4">
      <div className="feature-1 text-center">
        <div className="post-entry-thumb">
          <Link to={`/study/${value.id}`}>
            <img className="recent-board-thumb" src={thumbNail}/>
          </Link>
        </div>
        <Link to={`/study/${value.id}`}>
          <h4 className="mb-2">{value.title.slice(0, 20)}</h4>
        </Link>
        <p>{value.sub}</p>
      </div>
    </div>
  )

}
export default RecentBoardDetail;