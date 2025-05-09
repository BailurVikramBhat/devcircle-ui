import {
  Bell,
  CodeXml,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  Settings,
  User,
} from 'lucide-react';
import MenuItem from './MenuItem';
import { useAuth } from '@/hooks/useAuth';
import { Link, useParams } from 'react-router-dom';

const HomePageSidebar = () => {
  const { logout } = useAuth();
  const { userId } = useParams<{ userId: string }>();
  return (
    <aside className='w-20 xl:w-1/5 lg:w-1/4  md:w-1/3 bg-accent text-2xl text-sidebar-foreground rounded-tr-2xl'>
      {/* nav bar */}
      <div className='flex mx-auto my-10 w-16 h-16 md:w-full md:h-24 py-3 md:py-6 justify-between items-center bg-foreground md:bg-accent text-primary rounded-full md:rounded-none'>
        <Link
          to={`/${userId}/dashboard`}
          className='flex mx-auto text-3xl font-bold '
        >
          <span className='w-12 text-accent md:text-primary text-3xl font-bold flex justify-center items-center'>
            <CodeXml />
          </span>
          <span className='hidden md:block  '>
            <span className='text-foreground'>Dev</span>Circle
          </span>
        </Link>
      </div>

      <MenuItem
        icon={<LayoutDashboard />}
        label='Dashboard'
        destination={`/${userId}/dashboard`}
      />
      <MenuItem
        icon={<MessageSquareText />}
        label='Posts'
        destination={`/${userId}/dashboard/posts`}
      />
      <MenuItem
        icon={<Bell />}
        label='Notifications'
        destination={`/${userId}/dashboard/notifications`}
      />
      {/* <MenuItem
        icon={<LayoutDashboard />}
        label='Explore'
        destination={`/${userId}/dashboard/Explore`}
      /> */}
      <MenuItem
        icon={<User />}
        label='Profile'
        destination={`/${userId}/dashboard/profile`}
      />
      <MenuItem
        icon={<Settings />}
        label='Settings'
        destination={`/${userId}/settings`}
      />
      <MenuItem
        icon={<LogOut />}
        label='logout'
        destination={`/login`}
        onClick={logout}
        replaceDestination={true}
      />
    </aside>
  );
};

export default HomePageSidebar;
