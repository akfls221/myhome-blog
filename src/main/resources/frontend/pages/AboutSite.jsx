import React from "react";
import {Link} from "react-router-dom";

const AboutSite = () => {



    return (
        <>
            <section className="section">
                <div className="container">
                    <div className="row justify-content-left text-left mb-5" data-aos="fade-up">
                        <h2 className="board-title">ABOUT SITE</h2>
                    </div>
                    <div className="row justify-content-center text-center">
                        <div className="history">
                            <div>
                                <h2>Site development period</h2>
                                <ol>
                                    <li>초기 배포 : 2022 년 01월 06일 ~ 2022년 03월 31일</li>
                                    <li>현재 진행형 단계로 지속적으로 사이트 개선 작업을 진행 계획입니다.</li>
                                </ol>
                            </div>
                            <div>
                                <h2>Site developer</h2>
                                <ol>
                                    <li>Front-End : 엄태권</li>
                                    <li>Back-End : 엄태권</li>
                                </ol>
                            </div>
                            <div>
                                <h2>Purpose of site</h2>
                                <ol>
                                    <li>학습하고 있는 개발 지식에 대한 기록/공유</li>
                                    <li>Client 단계의 사용자 FeedBack 수용</li>
                                    <li>학습한 기술에 대한 적용</li>
                                    <li>소소한 일상 공유</li>
                                </ol>
                            </div>
                            <div>
                                <h2>Site Specification</h2>
                                <ol>
                                    <li>Front-End : React.js</li>
                                    <li>Back-End : SpringBoot</li>
                                    <li>DataBase : MySQL 8.0</li>
                                    <li>JDBC : Spring Data JPA</li>
                                    <li>Server : AWS EC2 Free Tier</li>
                                    <li>Login : Spring Security-OAUTH 2.0</li>
                                    <li>Auth : JWT-TOKEN</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AboutSite;