/*==================================================
HomePageContainer.js
It renders the home page. 
================================================== */
import Header from './Header';
import HomePageView from '../views/HomePageView';

const HomePageContainer = () => {
  return (
    <div>
      <Header />
      <HomePageView />
    </div>
    
  );
};

export default HomePageContainer;