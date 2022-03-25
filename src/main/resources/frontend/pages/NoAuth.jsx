import React, {memo} from 'react';

const NoAuth = memo(() => {

  return (
      <>
        <div className="no-auth-wrapper">
          <img className="no-auth-img" src="../static/img/no_auth.png"/>
        </div>
      </>
  );
});
export default NoAuth;