import useLongPress from '@/hooks/useLongPress';
import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface IMenuItem {
  icon: React.ReactNode;
  label: string;
  destination: string;
  onClick?: () => void;
  replaceDestination?: boolean;
}

const MenuItem = ({
  icon,
  label,
  destination,
  onClick,
  replaceDestination = false,
}: IMenuItem) => {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);
  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
    setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
  };

  const handleClick = () => {
    onClick?.();
    navigate(destination, { replace: replaceDestination });
  };
  const { handlers } = useLongPress(handleClick, toggleTooltip);

  const navRef = useRef<HTMLAnchorElement>(null);

  const handleContextMenu: (event: MouseEvent) => void = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const element = navRef.current;
    const mediaQuery = window.matchMedia('(max-width: 768px)'); // Adjust breakpoint as needed

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        element?.addEventListener('contextmenu', handleContextMenu);
      } else {
        element?.removeEventListener('contextmenu', handleContextMenu);
      }
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);
    // Initial check using the `matches` property of `mediaQuery`
    if (mediaQuery.matches) {
      element?.addEventListener('contextmenu', handleContextMenu);
    } else {
      element?.removeEventListener('contextmenu', handleContextMenu);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
      element?.removeEventListener('contextmenu', handleContextMenu); // Clean up on unmount
    };
  }, []);

  return (
    <NavLink
      to={destination}
      ref={navRef}
      end={true}
      onClick={handleClick}
      className={({ isActive }) =>
        `relative m-2 px-4 py-2 flex  space-x-3 rounded-2xl justify-start items-center text-2xl  hover:text-background hover:bg-foreground transition ease-in duration-100 md:m-5 md:px-6 md:py-2 ${
          isActive ? 'bg-sidebar-primary text-background' : ''
        }`
      }
    >
      <span
        {...handlers}
        id='icon'
        className='w-12 h-12 mx-auto md:mx-0 flex justify-center items-center'
      >
        {icon}
      </span>
      <span id='label' className='hidden md:block'>
        {label}
      </span>
      {/* Tooltip */}
      {showTooltip && (
        <div
          id='tooltip'
          className='absolute left-full top-1/2 transform -translate-y-1/2 transition ease-out duration-100 mb-2 ml-3 px-2 py-1 text-sm text-bold text-primary bg-accent rounded-md shadow-lg border border-primary'
        >
          {label}
        </div>
      )}
    </NavLink>
  );
};

export default MenuItem;
