import React from 'react';

const AboutMe = () => {

  return (
    <>
      <section className="about-section">
        <div className="profile-container">
          <div className="row justify-content-left text-left mb-5" data-aos="fade-up">
            <h2 className="about-title">ABOUT ME</h2>
          </div>
        </div>
        <div className="profile-container">
          <img className="cmd-img" src="../static/img/cmd-toolbar.png"/>
          <div className="about-wrapper">
            <div className="about-profile-txt">
              <div className="profile-detail">
                <div className="about-profile-subtitle">C:￦Name></div>
                <div className="about-profile-content">엄태권</div>
              </div>
              <div className="profile-detail">
                <div className="about-profile-subtitle">C:￦Age></div>
                <div className="about-profile-content">만 27세(1994년 09월 17일)</div>
              </div>
              <div className="profile-detail">
                <div className="about-profile-subtitle">C:￦Career></div>
                <div className="about-profile-content">2014.12 ~ 2018.11 > 센티널테크놀로지[솔루션 엔지니어]</div>
                <div className="about-profile-content">2018.11 ~ 2019.11 > 센티널테크놀로지[솔루션(PHP) 개발자]</div>
                <div className="about-profile-content">2020.02 ~ 현재 > 리얼아이브이[기업부설연구소 연구원]</div>
              </div>
              <div className="profile-detail">
                <div className="about-profile-subtitle">C:￦Technic></div>
                <div className="about-profile-content">Front-End > JavaScript, React</div>
                <div className="about-profile-content">Back-End > SpringBoot(with JPA), Spring-MVC(with MyBatis)</div>
                <div className="about-profile-content">experienced > Ext.JS, Python, Rabbit-MQ
                  <div className="about-profile-deco">_</div>
                </div>
              </div>
            </div>
            <img className="about-profile-img" src="../static/img/profile.jpg"/>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutMe;