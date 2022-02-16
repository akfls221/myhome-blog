import React from 'react';

const StudyHeader = ({titleValue}) => {

  return (
      <>
        <div className="row-cols-md-auto">
          <div className="board-wrapper">
            <div className="board-detail">
              <div className="board-subtitle">게시글 제목</div>
              <div className="board-sub-content">{titleValue}</div>
            </div>
            <div className="board-detail">
              <div className="board-subtitle">게시글 작성자</div>
              <div className="board-sub-content">수정필요</div>
              <div className="board-subtitle">작성일</div>
              <div className="board-sub-content">수정필요</div>
            </div>
          </div>
        </div>
      </>
  );
}

export default StudyHeader;