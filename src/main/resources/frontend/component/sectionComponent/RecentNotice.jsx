import React, {memo, useEffect, useState} from 'react';
import axios from "axios";
import RecentNoticeDetail from "./RecentNoticeDetail";
import {backend} from "../../util/config";

const RecentNotice = memo(() => {
  const [recentNotice, setRecentNotice] = useState([]);

  useEffect(() => {
    axios({
      method: "POST",
      url: `http://${backend}/api/v1/recentPostList`,
    }).then((res) => {
      const item = res.data;
      setRecentNotice(item);

    }).catch(error => {
      console.log(error);
      throw new Error(error);
    });
  }, []);

  return (
      <>
        <section className="section">
          <div className="container">
            <div className="row justify-content-center text-center mb-5">
              <div className="col-md-5" data-aos="fade-up">
                <h2 className="section-heading">최근 공지사항</h2>
              </div>
            </div>
            <div className="row">
              {recentNotice.length <= 0 &&
              <div className="board-list-none">
                <img src="/static/img/none-notice.png"/>
                <div className="board-list-none-text">최근 공지사항이 없습니다</div>
              </div>
              }
              {recentNotice.map((item, index) => {
                return (
                    <RecentNoticeDetail value={item} key={"notice_" + item.id} index={index}/>
                )
              })}
            </div>
          </div>
        </section>
      </>
  );
});

export default RecentNotice;