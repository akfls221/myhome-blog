import React, {useEffect, useState} from 'react';
import axios from "axios";

const RecentBoard = () => {
  const [recentBoard, setRecentBoard] = useState([]);

  useEffect(() => {
    axios({
      method: "POST",
      url: `http://localhost:8080/api/v1/board/recentBoardList`,
    }).then((res) => {
      const item = res.data;
      setRecentBoard(item);

    }).catch(error => {
      console.log(error);
      throw new Error(error);
    });
  }, []);

  return(
      <>
        <section className="section">
          <div className="container">

            <div className="row justify-content-center text-center mb-5">
              <div className="col-md-5" data-aos="fade-up">
                <h2 className="section-heading">최근 게시글</h2>
              </div>
            </div>

            <div className="row">
              {recentBoard.length <= 0 ?
                <div className="board-list-none">
                  <img src="/static/img/none-notice.png"/>
                  <div className="board-list-none-text">최근 게시글이 없습니다</div>
                </div>
                :
                <>
                <div className="col-md-4" data-aos="fade-up" data-aos-delay="">
                  <div className="feature-1 text-center">
                    <div className="wrap-icon icon-1">
                      <i className="bi bi-people"></i>
                    </div>
                    <h3 className="mb-3">Explore Your Team</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, optio.</p>
                  </div>
                </div>
                <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
                  <div className="feature-1 text-center">
                    <div className="wrap-icon icon-1">
                      <i className="bi bi-brightness-high"></i>
                    </div>
                    <h3 className="mb-3">Digital Whiteboard</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, optio.</p>
                  </div>
                </div>
                <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
                  <div className="feature-1 text-center">
                    <div className="wrap-icon icon-1">
                      <i className="bi bi-bar-chart"></i>
                    </div>
                    <h3 className="mb-3">Design To Development</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, optio.</p>
                  </div>
                </div>
                </>
              }
            </div>
          </div>
        </section>
      </>
  )
}

export default RecentBoard;