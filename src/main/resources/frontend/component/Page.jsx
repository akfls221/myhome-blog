import React, {memo, useEffect, useState} from 'react';

const Page = memo(({totalPage, setNowPage, nowPage, movePage}) => {
  const [page, setPage] = useState([]);
  const [blockNum, setBlockNum] = useState(0);
  const [limitPage, setLimitPage] = useState(5);
  const [lastPage, setLastPage] = useState(5);
  const [prevBtn, setPrevBtn] = useState(false);
  const [nextBtn, setNextBtn] = useState(false);

  let showPage = page.slice(blockNum, lastPage);

  const createArr = (n) => {
    const iArr = new Array(n);
    for (let i = 0; i < n; i++) {
      iArr[i] = i + 1;
    }
    setPage(iArr);
  }

  const movePrevent = () => {
    setNowPage(prevState => {
      setNowPage(prevState - 1);
    });
    console.log(nowPage);
    console.log(blockNum);
    console.log(lastPage)

    if (nowPage - 1 === blockNum) {
      setLastPage(prevState => prevState - limitPage);
      setBlockNum(nowPage - (limitPage + 1));
      showPage = page.slice(blockNum, lastPage);
    }
  }

  const moveNext = () => {
    if (nowPage === lastPage) {
      setLastPage(prevState => prevState + limitPage);
      setBlockNum(nowPage);
      showPage = page.slice(blockNum, lastPage);
    }

    setNowPage(prevState => {
      setNowPage(prevState + 1);
    });
  }


  useEffect(() => {
    createArr(totalPage);
  }, [totalPage])

  useEffect(() => {
    if (nowPage === 1) {
      setPrevBtn(false);
    } else {
      setPrevBtn(true);
    }

    if (nowPage === totalPage) {
      setNextBtn(false);
    } else {
      setNextBtn(true);
    }
  }, [nowPage])

  return (
      <>
        {prevBtn == true && <button className="btn-prev" onClick={movePrevent}>.</button>}
        {showPage.map(value =>
            <button key={value} onClick={(e) => movePage(value)}
                    className={nowPage === value ? "btn-page active" : "btn-page"}
            >{value}</button>
        )}
        {nextBtn === true && <button className="btn-next" onClick={moveNext}>.</button>}
      </>
  )
});

export default Page;