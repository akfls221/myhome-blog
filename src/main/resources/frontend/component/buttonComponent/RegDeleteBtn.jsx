import React from 'react';

const RegDeleteBtn = ({onClick}) => {

  const handleDeleteBtn = (e) => {
    onClick(e);
  }

  return(
      <>
          <button onClick={handleDeleteBtn} className="btn btn-delete small">취소</button>
          <button className="btn btn-regist small">등록</button>
      </>
  )
}

export default RegDeleteBtn;