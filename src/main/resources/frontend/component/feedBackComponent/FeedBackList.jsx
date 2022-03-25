import React, {memo, useState} from 'react';
import PwCheckModal from "../PwCheckModal";
import {useNavigate} from "react-router";
import {getCookie} from "../../util/Cookie";

const FeedBackList = memo(({value, index}) => {

  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();
  const userInfo = getCookie('loginCookie');

  const handelModalOpen = () => {
    if (userInfo.roles[0] === 'ROLE_ADMIN') {
      navigate(`/feedBackView/${value.id}`);
    }
    setModalOpen(true);
  }

  const handelModalClose = () => {
    setModalOpen(false);
  }

  return (
      <>
        <div className="row justify-content-center text-center">
          <div className="col-md-12 mb-5 mb-md-0">
            <div className="board-list-content-wrap">
              <div className="board-list-content-title">
                {value.type === "M" && <img className="must-notice-img" src="/static/img/must.png"/>}
                <a onClick={handelModalOpen}>{value.title}</a>
              </div>
              <div className="board-list-content-sub">
                <div className="board-content-detail">No.{(index + 1)}</div>
                <div className="board-content-detail">{value.author}</div>
                <div className="board-content-detail">{'2020-01-02'}</div>
                <div className="board-content-detail">조회수 {''}</div>
              </div>
            </div>
          </div>
        </div>
        <PwCheckModal open={modalOpen}
                      close={handelModalClose}
                      boardId={value.id}
                      header="피드백 비밀번호 체크"
        />
      </>
  );
});

export default FeedBackList;