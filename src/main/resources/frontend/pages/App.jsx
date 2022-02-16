import React from 'react';
import Header from "../component/Header";
import WelcomeSection from "../component/sectionComponent/WelcomeSection";
import {HashRouter as Router, Route} from "react-router-dom";
import { Routes } from 'react-router';
import Notice from "./Notice";
import Main from "./Main";
import NoticeEdit from "./NoticeEdit";
import NoticeView from "./NoticeView";
import Footer from "../component/Footer";
import Study from "./Study";
import StudyEdit from "./StudyEdit";
import StudyView from "./StudyView";

const App = () => {

  return(
    <>
      <Router>
        <Header />
        <WelcomeSection />
        <Routes>
          <Route path = "/" exact element={<Main />}></Route>
          <Route path = "/notice" element={<Notice />}></Route>
          <Route path = "/notice_edit" element={<NoticeEdit />}></Route>
          <Route path = "/view/:id" exact element={<NoticeView />}></Route>
          <Route path = "/study" element={<Study />}></Route>
          <Route path = "/study_edit" element={<StudyEdit />}></Route>
          <Route path = "/study/:id" exact element={<StudyView />}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  )
}



export default App;