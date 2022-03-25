import React, {memo} from 'react';

const FeedBackConfig = memo(({titleValue, titleOnChange, typeOnChange, dateValue, author, pwOnChange, passValue}) => {

  const handleOnChange = (e) => {
    titleOnChange(e.target.value);
  }

  const handlePwOnChange = (e) => {
    pwOnChange(e.target.value);
  }

  const handleInputChange = (e) => {
    typeOnChange(e.target.value)
  }

  return (
      <>
        <div className="row-cols-md-auto">
          <div className="board-wrapper">
            <div className="board-detail">
              <div className="board-subtitle">게시글 제목</div>
              <input className="board-input" value={titleValue} onChange={handleOnChange} name="title"/>
            </div>
            <div className="board-detail">
              <div className="board-subtitle">피드백 유형</div>
              <div className="feedback-sub-content">
                <select className="feedback-type-select" onChange={handleInputChange}>
                  <option value="E">페이지 에러</option>
                  <option value="R">건의/요청 사항</option>
                  <option value="O">기타 사항</option>
                </select>
              </div>
            </div>
            <div className="board-detail">
              <div className="board-subtitle">게시글 비밀번호</div>
              <input className="board-input" type="password" value={passValue} onChange={handlePwOnChange}/>
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
});
export default FeedBackConfig;