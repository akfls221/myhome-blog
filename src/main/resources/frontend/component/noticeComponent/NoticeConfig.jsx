import React from 'react';

const NoticeConfig = ({titleValue, titleOnChange, typeOnChange, typeValue, dateValue, author}) => {

  const handleOnChange = (e) => {
    titleOnChange(e.target.value);
  }

  const handleRadioClick = (e) => {
    typeOnChange(e.target.value)
  }

  return(
      <>
        <div className="row-cols-md-auto">
          <div className="board-wrapper">
            <div className="board-detail">
              <div className="board-subtitle">게시글 제목</div>
              <input className="board-input" value={titleValue} onChange={handleOnChange} name="title"/>
            </div>
            <div className="board-detail">
              <div className="board-subtitle">공지 유형</div>
              <div className="board-sub-content">
                <input type="radio" id="normal" name="drone" value="N"
                       onChange={(e) => handleRadioClick(e)}
                       defaultChecked={typeValue === 'N'}
                />
                <label htmlFor="huey">일반 공지</label>
                <input type="radio" id="must" name="drone" value="M"
                       onChange={(e) => handleRadioClick(e)}
                       checked={typeValue === 'M'}
                />
                <label htmlFor="dewey">필독 공지</label>
              </div>
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

export default NoticeConfig;