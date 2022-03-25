import React, {memo} from 'react';

const NotFount = memo(() => {

  return (
      <>
        <div className="no-auth-wrapper">
          <img className="no-auth-img" src="../static/img/not_found.png"/>
        </div>
      </>
  )
});

export default NotFount;