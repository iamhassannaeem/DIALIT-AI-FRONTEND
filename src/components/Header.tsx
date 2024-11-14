import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import LogoIcon from '../images/logo/logo-icon.svg'
// import DarkModeSwitcher from './DarkModeSwitcher';
// import DropdownMessage from './DropdownMessage';
// import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import { useDispatch, useSelector } from 'react-redux';
import { setTitle } from '../redux/slices/titleSlice';
import { RootState, AppDispatch } from '../redux/store';

const Header = (props: {

  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  // Declare state variable for viewportWidth
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  
  const title = useSelector((state: RootState) => state.title.title);
  
  const dispatch: AppDispatch = useDispatch();

  // Map your pathnames to the titles you want
  const getTitleFromPathname = (pathname: string) => {
    switch (pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/playground/agent':
        return 'Agent';
      case '/playground/phone':
        return 'Phone Numbers';
      case '/playground/library':
        return 'Library';
      case '/reports/call':
        return 'Call Logs';
      case '/billing':
        return 'Billing';
      case '/member':
        return 'Members';
      case '/settings':
          return 'Settings';
      case '/reports/Compaign':
          return 'Compaign';
      case '/reports/feedback/report':
            return 'Feedback Report'; 
      default:
        return 'Home'; // default title
    }
  };

  // Set the title based on the current pathname on initial load
  useEffect(() => {
    const currentPath = window.location.pathname;
    const pageTitle = getTitleFromPathname(currentPath);
    dispatch(setTitle(pageTitle));
  }, [dispatch]);


  // Function to update the viewport width when the window is resized
  const updateViewportWidth = () => {
    setViewportWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateViewportWidth);

    return () => {
      window.removeEventListener('resize', updateViewportWidth);
    };
  }, []);


  return (
    <header className="sticky top-0 z-999 flex w-full dark:bg-[#242E3E]  border-b bg-white dark:border-[#333B48] border-[#EDEDED]">
      <div className="flex flex-grow items-center justify-between py-[24px] shadow-2 md:px-6 px-4 2xl:px-11 ">
        <div className="flex items-center flex-wrap gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
         
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border  p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden items-center"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm dark:bg-white bg-black delay-[0] duration-200 ease-in-out  ${
                    !props.sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm dark:bg-white bg-black delay-150 duration-200 ease-in-out  ${
                    !props.sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm dark:bg-white bg-black delay-200 duration-200 ease-in-out  ${
                    !props.sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm dark:bg-white bg-black  delay-300 duration-200 ease-in-out  ${
                    !props.sidebarOpen && '!h-0 !delay-[0]'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white  ${
                    !props.sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>
          

          <h4 className='text-lg dark:text-[#1D2532] dark:text-white text-[#1D2532] text-[24px] font-semibold leading-[32px] block lg:hidden'>{title}</h4>
          
        </div>
        
        <h4 className='text-lg dark:text-[#1D2532] dark:text-white text-[#1D2532] text-[24px] font-semibold leading-[32px]  lg:block hidden'>{title}</h4>

        <div className="flex items-center gap-3 2xsm:gap-7">
          
          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
