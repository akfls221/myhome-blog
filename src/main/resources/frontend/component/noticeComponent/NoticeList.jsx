import React, {memo} from 'react';
import { Link } from "react-router-dom";

const NoticeList = memo(({value, index}) => {

  return (
      <>
        <div className="row justify-content-center text-center">
          <div className="col-md-12 mb-5 mb-md-0">
            <div className="board-list-content-wrap">
              <div className="board-list-content-title">
                {value.type === "M" && <img className="must-notice-img" src="/static/img/must.png"/>}
                <Link to={{
                  pathname: `/view/${value.id}`,
                  state: {id: value.id}
                }}
                >
                  {value.title}
                </Link>
              </div>
              <div className="board-list-content-sub">
                <div className="board-content-detail">No.{(index + 1)}</div>
                <div className="board-content-detail">{value.author}</div>
                <div className="board-content-detail">{value.modifiedDate.substring(0, 10)}</div>
                <div className="board-content-detail">조회수 : {value.hitCount}</div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
});

export default NoticeList;