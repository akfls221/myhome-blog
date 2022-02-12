import React from 'react';

const SearchForm = () => {

  return(
      <>
        <div className="row justify-content-center text-center">
          <div className="col-md-12 mb-5 mb-md-0">
            <form>
              <fieldset className="content-search-wrap">
                <select className="search-select">
                  <option>제목</option>
                  <option>내용</option>
                  <option>제목 + 내용</option>
                </select>
                <input type="text" className="search-input"/>
                <button className="button-search"></button>
              </fieldset>
            </form>
          </div>
        </div>
      </>
  )
}

export default SearchForm;