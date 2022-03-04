import React from 'react';

const StudyBoardConfig = ({titleValue, titleOnChange, subOnChange, subValue, dateValue, author}) => {

  const handleOnChangeTitle = (e) => {
    titleOnChange(e.target.value);
  }

  const handleOnChangeSub = (e) => {
    subOnChange(e.target.value);
  }

  return(
      <>
        <div className="row-cols-md-auto">
          <div className="board-wrapper">
            <div className="board-detail">
              <div className="board-subtitle">게시글 제목</div>
              <input className="board-input" value={titleValue} onChange={handleOnChangeTitle} name="title"/>
            </div>
            <div className="board-detail">
              <div className="board-subtitle">게시글 설명</div>
              <input className="board-input" value={subValue} onChange={handleOnChangeSub} name="title"/>
            </div>
            <div className="board-detail">
              <div className="board-subtitle">게시글 작성자</div>
              <div className="board-sub-content">{author}</div>
              <div className="board-subtitle">작성일</div>
              <div className="board-sub-content">{dateValue}</div>
            </div>
          </div>
        </div>
      </>
  )
}

export default StudyBoardConfig;