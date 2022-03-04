import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {getCookie} from "../../util/Cookie";

const RecentBoardDetail = ({value}) => {
  const [thumbNail, setThumbNail] = useState('');

  const userInfo = getCookie('loginCookie');
  const navigate = useNavigate();

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

  const checkLogin = () => {
    if (userInfo === undefined) {
      alert("회원 가입후 이용 가능한 페이지 입니다.");
    } else {
      navigate(`/study/${value.id}`);
    }
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
          <img className="recent-board-thumb" src={thumbNail} onClick={checkLogin}/>
        </div>
        <h4 className="mb-2" onClick={checkLogin}>{value.title.slice(0, 20)}</h4>
          <p>{value.sub}</p>
      </div>
    </div>
  )

}
export default RecentBoardDetail;