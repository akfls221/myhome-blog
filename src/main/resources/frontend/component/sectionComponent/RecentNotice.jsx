import React, {useEffect, useState} from 'react';
import axios from "axios";

const RecentNotice = () => {
  const [recentNotice, setRecentNotice] = useState([]);

  useEffect(() => {
    axios({
      method: "POST",
      url: `http://localhost:8080/api/v1/recentPostList`,
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
              {recentNotice.length <= 0 ?
                <div className="board-list-none">
                  <img src="/static/img/none-notice.png"/>
                  <div className="board-list-none-text">최근 공지사항이 없습니다</div>
                </div>
                :
                <>
                  {recentNotice.map((item, index) => {
                    return (
                      <div className="col-md-4">
                        <div className="step">
                          {item.type === 'M' ?
                            <span className="number">{'0' + (index + 1)}<img className="must-recent-img" src="/static/img/must.png"/></span>
                            :
                            <span className="number">{'0' + (index + 1)}</span>
                          }
                          <h4>{item.title.substring(0,25) + "..."}</h4>
                          <p>{item.content.substring(3, 40) + "..."}</p>
                        </div>
                      </div>
                    )
                  })}
                </>
              }

            </div>
          </div>
        </section>
      </>
  );
}

export default RecentNotice;