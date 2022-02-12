import React, {useState} from 'react';

const WelcomeSection = () => {
  const [welcomeContent, setWelcomeContent] = useState({title: "엄태권의 개발 블로그입니다", sub: "이인우씨가 쨈 그래서 혼자하는중;"});

    return(
      <>
        <section className="hero-section" id="hero">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 hero-text-image">
                <div className="row">
                  <div className="col-lg-8 text-center text-lg-start">
                    <h1 data-aos="fade-right">{welcomeContent.title}</h1>
                    <p className="mb-5" data-aos="fade-right" data-aos-delay="100">{welcomeContent.sub}</p>
                    <p data-aos="fade-right" data-aos-delay="200" data-aos-offset="-500"><a href="#" className="btn btn-outline-white">About Site</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
}

export default WelcomeSection;