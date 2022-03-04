import React from 'react';
import Header from "../component/Header";
import WelcomeSection from "../component/sectionComponent/WelcomeSection";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from 'react-router';
import Notice from "./Notice";
import Main from "./Main";
import NoticeEdit from "./NoticeEdit";
import NoticeView from "./NoticeView";
import Footer from "../component/Footer";
import Study from "./Study";
import StudyEdit from "./StudyEdit";
import StudyView from "./StudyView";
import Social from "./Social";
import MyPage from "./MyPage";
import JoinPage from "./JoinPage";
import AboutMe from "./AboutMe";
import NoticeModify from "./NoticeModify";
import StudyModify from "./StudyModify";

const App = () => {

  return(
    <>
      <Router>
        <Header />
        <WelcomeSection />
        <Routes>
          <Route path = "/" exact element={<Main/>}/>
          <Route path = "/notice" element={<Notice/>}/>
          <Route path = "/notice_edit" element={<NoticeEdit/>}/>
          <Route path = "/view/:id" exact element={<NoticeView/>}/>
          <Route path = "/notice_modify/:id" element={<NoticeModify/>}/>
          <Route path = "/study" element={<Study/>}/>
          <Route path = "/study_edit" element={<StudyEdit/>}/>
          <Route path = "/study/:id" exact element={<StudyView/>}/>
          <Route path = "/study_modify/:id" element={<StudyModify/>}/>
          <Route path = "/join" exact element={<JoinPage/>}/>
          <Route path = "/mypage" element={<MyPage/>}/>
          <Route path = "/google" exact element={<Social/>}/>
          <Route path = "/kakao" exact element={<Social/>}/>
          <Route path = "/about" exact element={<AboutMe/>}/>

        </Routes>
        <Footer />
      </Router>
    </>
  )
}



export default App;