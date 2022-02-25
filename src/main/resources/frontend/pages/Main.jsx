import React from 'react';

import RecentNotice from "../component/sectionComponent/RecentNotice";
import FeedBackSection from "../component/sectionComponent/FeedBackSection";
import RecentBoard from "../component/sectionComponent/RecentBoard";


const Main = () => {

  return(
      <>
        <RecentBoard />
        <RecentNotice />
        <FeedBackSection />
      </>
  )
}



export default Main;