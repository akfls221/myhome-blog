import React from 'react';

const WaitingModal = ({ open, close }) => {
  return (
      <>
        <div className={open ? 'openModal modal' : 'modal'}>
          {open ? (
              <section className="loading-section">
                <div className="loading-form-wrapper">
                  <img className="loading-image" src="../static/img/loading.gif"/>
                  <p className="loading-form-message" >인증코드를 보내는 중입니다....</p>
                </div>
              </section>
          ) : null}
        </div>
      </>
  );
};

export default WaitingModal;