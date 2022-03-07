import React, {memo} from 'react';
import {Link} from "react-router-dom";

const RecentNoticeDetail = memo(({value, index}) => {

  return (
      <div className="col-md-4" key={value.id}>
        <div className="step">
          {value.type === 'M' ?
              <span className="number">{'0' + (index + 1)}<img className="must-recent-img" src="/static/img/must.png"/></span>
              :
              <span className="number">{'0' + (index + 1)}</span>
          }
          <Link to={`/view/${value.id}`}>
            <h4>{value.title.substring(0, 25)}</h4>
          </Link>
          <p>{value.content.substring(3, 40) + "..."}</p>
        </div>
      </div>
  )
});
export default RecentNoticeDetail;