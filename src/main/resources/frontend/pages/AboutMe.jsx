import React from 'react';

const AboutMe = () => {

  return(
      <>
        <section className="about-section">
          <div className="profile-container">
            <div className="row justify-content-left text-left mb-5" data-aos="fade-up">
              <h2 className="about-title">About Tae Kwon</h2>
            </div>
          </div>
          <div className="profile-container">
            <img className="cmd-img" src="../static/img/aaa.png" />
            {/*<div className="about-profile-text">*/}
              <div className="test">
                아아아아 인우씨 보여요 ? 존나 안보이죠 이거 보세요 그거 고집이에요~
                asdfasdfasdfasd
                <img className="about-profile-img" src="../static/img/my-profile.jpg" />
              </div>
            {/*</div>*/}
          </div>
        </section>
      </>
  )
}

export default AboutMe;