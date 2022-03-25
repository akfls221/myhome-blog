import React, {memo, useState} from 'react';

const SearchForm = memo(({searchList, setSearchType, setSearchValue, menuType}) => {

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    searchList();
  }

  const handleOnChange = (e) => {
    setSearchType(e.target.value);
  }

  return (
      <>
        <div className="row justify-content-center text-center">
          <div className="col-md-12 mb-5 mb-md-0">
            <form onSubmit={handleSearch}>
              <fieldset className="content-search-wrap">
                <select className="search-select" onChange={handleOnChange}>
                  <option value="T">제목</option>
                  <option value="C">내용</option>
                  {menuType === 'feedBack' &&
                  <option value="A">작성자</option>
                  }
                </select>
                <input type="text" className="search-input" onChange={handleInputChange}/>
                <button className="button-search" onClick={handleSearch}/>
              </fieldset>
            </form>
          </div>
        </div>
      </>
  )
});

export default SearchForm;