import React, {memo} from 'react';

const FeedBackHeader = memo(({titleValue, typeValue, authorValue}) => {

  return (
      <>
        <div className="row-cols-md-auto">
          <div className="board-wrapper">
            <div className="board-detail">
              <div className="board-subtitle">피드백 제목</div>
              <div className="board-sub-content">{titleValue}</div>
            </div>
            <div className="board-detail">
              <div className="board-subtitle">피드백 유형</div>
              <div className="board-sub-content">
                {typeValue}
              </div>
            </div>
            <div className="board-detail">
              <div className="board-subtitle">게시글 작성자</div>
              <div className="board-sub-content">{authorValue}</div>
              <div className="board-subtitle">작성일</div>
              <div className="board-sub-content">수정필요</div>
            </div>
          </div>
        </div>
      </>
  );
});

export default FeedBackHeader;