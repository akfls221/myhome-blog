import React, {memo} from 'react';
import Nav from "./Nav";

const Header = memo(() => {
  return (
      <>
        <header id="header" className="fixed-top d-flex align-items-center">
          <div className="container d-flex justify-content-between align-items-center">
            <div className="logo">
              <h1><a href="/">KwonBlog</a></h1>
            </div>
            <nav id="navbar" className="navbar">
              <Nav/>
            </nav>
          </div>
        </header>
      </>
  );
});
export default Header;