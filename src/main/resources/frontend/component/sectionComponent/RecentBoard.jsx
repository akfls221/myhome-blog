import React, {memo, useEffect, useMemo, useState} from 'react';
import axios from "axios";
import RecentBoardDetail from "./RecentBoardDetail";
import {backend} from "../../util/config";

const RecentBoard = memo(() => {
  const [recentBoard, setRecentBoard] = useState([]);

  useEffect(() => {
    axios({
      method: "POST",
      url: `http://${backend}/api/v1/board/recentBoardList`,
    }).then((res) => {
      const item = res.data;
      setRecentBoard(item);

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
                <h2 className="section-heading">최근 게시글</h2>
              </div>
            </div>

            <div className="row">
              {recentBoard.length <= 0 &&
              <div className="board-list-none">
                <img src="/static/img/none-notice.png"/>
                <div className="board-list-none-text">최근 게시글이 없습니다</div>
              </div>
              }
              {recentBoard.map(item => {
                return (
                    <RecentBoardDetail key={"board_" + item.id} value={item}/>
                )
              })}
            </div>
          </div>
        </section>
      </>
  );
});

export default RecentBoard;