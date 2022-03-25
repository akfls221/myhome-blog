import React, {useEffect} from 'react';

const Footer = (props) => {

  return (
      <>
        <footer className="footer" role="contentinfo">
          <div className="container">
            <div className="row">
              <div className="col-md-4 mb-4 mb-md-0">
                <h3>About Blog</h3>
                <p>안녕하세요! 주니어 개발자 엄태권 입니다. 혼자 만의 공간으로 공부했던 기술에 대한 정리 및 일상생활에 대한 블로그를 운영 계획입니다.
                    많이 부족하지만 재미로 즐겁게 봐주시면 좋겠습니다!</p>
                <p>개인적 연락을 원하시는 분은 아래의 아이콘을 눌러주세요!</p>
                <p className="social">
                  <a href="https://open.kakao.com/o/sv5rweGd" target='_blank'><span className="bi bi-chat-dots-fill"></span></a>
                  <a href=""><span className="bi bi-facebook"></span></a>
                  <a href="https://www.instagram.com/tae_kn/" target='_blank'><span className="bi bi-instagram"></span></a>
                </p>
              </div>
              <div className="col-md-7 ms-auto">
                <div className="row site-section pt-0">
                  <div className="col-md-4 mb-4 mb-md-0">
                    <h3>Navigation</h3>
                    <ul className="list-unstyled">
                      <li><a href="#">Pricing</a></li>
                      <li><a href="#">Features</a></li>
                      <li><a href="#">Blog</a></li>
                      <li><a href="#">Contact</a></li>
                    </ul>
                  </div>
                  <div className="col-md-4 mb-4 mb-md-0">
                    <h3>Services</h3>
                    <ul className="list-unstyled">
                      <li><a href="#">Team</a></li>
                      <li><a href="#">Collaboration</a></li>
                      <li><a href="#">Todos</a></li>
                      <li><a href="#">Events</a></li>
                    </ul>
                  </div>
                  <div className="col-md-4 mb-4 mb-md-0">
                    <h3>Downloads</h3>
                    <ul className="list-unstyled">
                      <li><a href="#">Get from the App Store</a></li>
                      <li><a href="#">Get from the Play Store</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="row justify-content-center text-center">
              <div className="col-md-7">
                <p className="copyright">&copy; Copyright SoftLand. All Rights Reserved</p>
                <div className="credits">
                  Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </>
  );
}

export default Footer;