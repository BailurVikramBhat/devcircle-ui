// import { useParams } from 'react-router-dom';

import HomePageSidebar from '@/components/HomepageSidebar';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './sub-pages/Dashboard';
import Posts from './sub-pages/Posts';
import Settings from './Settings';
import Notifications from './sub-pages/Notifications';
import Profile from './sub-pages/Profile';

const LandingPage = () => {
  // const { userId } = useParams<{ userId: string }>();
  return (
    <>
      <div className='flex flex-col h-screen w-screen bg-accent'>
        {/* content area */}
        <div className='flex h-full '>
          {/* sidebar */}
          <HomePageSidebar />
          {/* main */}
          <div className='flex-1 mt-4 mr-2 flex justify-center rounded-3xl bg-card'>
            <Routes>
              <Route path='' element={<Dashboard />} />
              <Route path='posts' element={<Posts />} />
              <Route path='notifications' element={<Notifications />} />
              <Route path='profile' element={<Profile />} />
              <Route path='settings' element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};
export default LandingPage;
