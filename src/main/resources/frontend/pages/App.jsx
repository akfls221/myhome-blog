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
import NotFound from "../component/NotFound";

const App = () => {

  return(
    <>
      <Router>
        <Header />
        <WelcomeSection />
        <Routes>
          <Route exact path = "/" element={<Main/>}/>
          <Route exact path = "/notice" element={<Notice/>}/>
          <Route exact path = "/notice_edit" element={<NoticeEdit/>}/>
          <Route exact path = "/view/:id" element={<NoticeView/>}/>
          <Route exact path = "/notice_modify/:id" element={<NoticeModify/>}/>
          <Route exact path = "/study" element={<Study/>}/>
          <Route exact path = "/study_edit" element={<StudyEdit/>}/>
          <Route exact path = "/study/:id" element={<StudyView/>}/>
          <Route exact path = "/study_modify/:id" element={<StudyModify/>}/>
          <Route exact path = "/join" element={<JoinPage/>}/>
          <Route exact path = "/mypage" element={<MyPage/>}/>
          <Route exact path = "/google" element={<Social/>}/>
          <Route exact path = "/kakao" element={<Social/>}/>
          <Route exact path = "/about" element={<AboutMe/>}/>
          <Route path="*" element={<NotFound />}/>

        </Routes>
        <Footer />
      </Router>
    </>
  )
}



export default App;