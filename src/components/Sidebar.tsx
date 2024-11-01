import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../images/logo/logo.png';
import SidebarLinkGroup from './SidebarLinkGroup';
import organisation from '../images/organisation/sitemap.svg';
import packages from '../images/packages/packages.svg';
import setup from '../images/setup/setup.svg';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../images/logo/logo.png';
import dashboardicon from '../images/dashboard.png';
import member from '../images/member.png';
import billing from '../images/billing.png';
import playground from '../images/playground/playground.png';
import agent from '../images/playground/agent.png';
import library from '../images/playground/library.png';
import phone from '../images/playground/phone.png';
import reports from '../images/reports/reports.png';
import call from '../images/reports/call.png';
import { setTitle } from '../redux/slices/titleSlice';
import { useAppDispatch } from '../hooks/hooks'; // Import your custom hook
import dashboardDark from '../images/dadhboard-dark.svg';
import { logout } from '../redux/slices/authSlice';
import { logOut } from '../api/modules/Swiftsync.class';
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;
  const [darkMode, setDarkMode] = useState(true);
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  // const isAdmin = useSelector((state) => state.isAdmin?.isAdmin?.is_admin);
  // const perm = useSelector((state) => state.isAdmin?.isAdmin?.group);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );
  const refresh = useSelector((state) => state?.auth?.refresh);
  const navigate=useNavigate()
  const handleLogOut = async () => {
   
    logOut({refresh: refresh});
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/signin')
    dispatch(logout())
  };
  useEffect(() => {
    setDarkMode(localStorage.getItem('color-theme') === 'dark');
  }, [darkMode]);
  console.log(darkMode);
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);
  const dispatch = useAppDispatch();
  const handleLinkClick = (title: string) => {
    dispatch(setTitle(title));
  };
  
  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-54.5 flex-col overflow-y-hidden rounded-tr-[40px] bg-[#EEEEEE] duration-300 ease-linear dark:bg-[#1D2532] lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-5  p-[24px] text-center">
        <NavLink to="/  ">
          <img src={logo} alt="" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block text-black lg:hidden"
        >
          <svg
            className="fill-black dark:fill-white"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="py-4 px-2 lg:px-2">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li onClick={() => handleLinkClick('Dashboard')}>
                <NavLink
                  to="/dashboard"
                  className={`group relative flex items-center gap-[14px] rounded-sm py-3 px-4 text-sm font-semibold  text-[#1D2532] duration-100 ease-in-out dark:text-white   ${
                    pathname.includes('/dashboard') &&
                    'border-l-2 border-[#1D2532] text-black dark:border-white'
                  }`}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="fill-black dark:fill-white"
                      d="M13 8V4C13 3.71667 13.0958 3.47917 13.2875 3.2875C13.4792 3.09583 13.7167 3 14 3H20C20.2833 3 20.5208 3.09583 20.7125 3.2875C20.9042 3.47917 21 3.71667 21 4V8C21 8.28333 20.9042 8.52083 20.7125 8.7125C20.5208 8.90417 20.2833 9 20 9H14C13.7167 9 13.4792 8.90417 13.2875 8.7125C13.0958 8.52083 13 8.28333 13 8ZM3 12V4C3 3.71667 3.09583 3.47917 3.2875 3.2875C3.47917 3.09583 3.71667 3 4 3H10C10.2833 3 10.5208 3.09583 10.7125 3.2875C10.9042 3.47917 11 3.71667 11 4V12C11 12.2833 10.9042 12.5208 10.7125 12.7125C10.5208 12.9042 10.2833 13 10 13H4C3.71667 13 3.47917 12.9042 3.2875 12.7125C3.09583 12.5208 3 12.2833 3 12ZM13 20V12C13 11.7167 13.0958 11.4792 13.2875 11.2875C13.4792 11.0958 13.7167 11 14 11H20C20.2833 11 20.5208 11.0958 20.7125 11.2875C20.9042 11.4792 21 11.7167 21 12V20C21 20.2833 20.9042 20.5208 20.7125 20.7125C20.5208 20.9042 20.2833 21 20 21H14C13.7167 21 13.4792 20.9042 13.2875 20.7125C13.0958 20.5208 13 20.2833 13 20ZM3 20V16C3 15.7167 3.09583 15.4792 3.2875 15.2875C3.47917 15.0958 3.71667 15 4 15H10C10.2833 15 10.5208 15.0958 10.7125 15.2875C10.9042 15.4792 11 15.7167 11 16V20C11 20.2833 10.9042 20.5208 10.7125 20.7125C10.5208 20.9042 10.2833 21 10 21H4C3.71667 21 3.47917 20.9042 3.2875 20.7125C3.09583 20.5208 3 20.2833 3 20ZM5 11H9V5H5V11ZM15 19H19V13H15V19ZM15 7H19V5H15V7ZM5 19H9V17H5V19Z"
                      fill="#333B48"
                    />
                  </svg>
                  Dashboard
                </NavLink>
              </li>

              {/* <!-- Menu Item Dashboard --> */}
              {/* <!-- Playground --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/playground' || pathname.includes('playground')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-[#1D2532]  duration-100 ease-in-out  dark:text-white  ${
                          (pathname === '/playgroung/agent' ||
                            pathname.includes('playgroung/agent')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            className="fill-black dark:fill-white"
                            d="M4.02509 14.85C3.75842 14.65 3.62925 14.3875 3.63759 14.0625C3.64592 13.7375 3.78342 13.475 4.05009 13.275C4.23342 13.1417 4.43342 13.075 4.65009 13.075C4.86675 13.075 5.06675 13.1417 5.25009 13.275L12.0001 18.5L18.7501 13.275C18.9334 13.1417 19.1334 13.075 19.3501 13.075C19.5668 13.075 19.7668 13.1417 19.9501 13.275C20.2168 13.475 20.3543 13.7375 20.3626 14.0625C20.3709 14.3875 20.2418 14.65 19.9751 14.85L13.2251 20.1C12.8584 20.3834 12.4501 20.525 12.0001 20.525C11.5501 20.525 11.1418 20.3834 10.7751 20.1L4.02509 14.85ZM10.7751 15.05L5.02509 10.575C4.50842 10.175 4.25009 9.65002 4.25009 9.00002C4.25009 8.35002 4.50842 7.82502 5.02509 7.42502L10.7751 2.95002C11.1418 2.66669 11.5501 2.52502 12.0001 2.52502C12.4501 2.52502 12.8584 2.66669 13.2251 2.95002L18.9751 7.42502C19.4918 7.82502 19.7501 8.35002 19.7501 9.00002C19.7501 9.65002 19.4918 10.175 18.9751 10.575L13.2251 15.05C12.8584 15.3334 12.4501 15.475 12.0001 15.475C11.5501 15.475 11.1418 15.3334 10.7751 15.05ZM12.0001 13.45L17.7501 9.00002L12.0001 4.55002L6.25009 9.00002L12.0001 13.45Z"
                            fill="#333B48"
                          />
                        </svg>
                        Playground
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li onClick={() => handleLinkClick('Agent')}>
                            <NavLink
                              to="/playground/agent"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-[14px] rounded-sm py-3 px-4 text-sm font-semibold  text-[#1D2532] duration-100  ease-in-out  dark:text-white  ' +
                                (isActive &&
                                  '!dark:text-[#1D2532] border-l-2 border-[#1D2532] text-[#1D2532] dark:border-white dark:text-white')
                              }
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="fill-black dark:fill-white"
                                  d="M12 21C11.7167 21 11.4792 20.9042 11.2875 20.7125C11.0958 20.5208 11 20.2833 11 20C11 19.7167 11.0958 19.4792 11.2875 19.2875C11.4792 19.0958 11.7167 19 12 19H19V11.9C19 9.95 18.3208 8.29583 16.9625 6.9375C15.6042 5.57917 13.95 4.9 12 4.9C10.05 4.9 8.39583 5.57917 7.0375 6.9375C5.67917 8.29583 5 9.95 5 11.9V17C5 17.2833 4.90417 17.5208 4.7125 17.7125C4.52083 17.9042 4.28333 18 4 18C3.45 18 2.97917 17.8042 2.5875 17.4125C2.19583 17.0208 2 16.55 2 16V14C2 13.65 2.0875 13.3208 2.2625 13.0125C2.4375 12.7042 2.68333 12.4583 3 12.275L3.075 10.95C3.20833 9.81667 3.5375 8.76667 4.0625 7.8C4.5875 6.83333 5.24583 5.99167 6.0375 5.275C6.82917 4.55833 7.7375 4 8.7625 3.6C9.7875 3.2 10.8667 3 12 3C13.1333 3 14.2083 3.2 15.225 3.6C16.2417 4 17.15 4.55417 17.95 5.2625C18.75 5.97083 19.4083 6.80833 19.925 7.775C20.4417 8.74167 20.775 9.79167 20.925 10.925L21 12.225C21.3167 12.375 21.5625 12.6 21.7375 12.9C21.9125 13.2 22 13.5167 22 13.85V16.15C22 16.4833 21.9125 16.8 21.7375 17.1C21.5625 17.4 21.3167 17.625 21 17.775V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H12ZM9 14C8.71667 14 8.47917 13.9042 8.2875 13.7125C8.09583 13.5208 8 13.2833 8 13C8 12.7167 8.09583 12.4792 8.2875 12.2875C8.47917 12.0958 8.71667 12 9 12C9.28333 12 9.52083 12.0958 9.7125 12.2875C9.90417 12.4792 10 12.7167 10 13C10 13.2833 9.90417 13.5208 9.7125 13.7125C9.52083 13.9042 9.28333 14 9 14ZM15 14C14.7167 14 14.4792 13.9042 14.2875 13.7125C14.0958 13.5208 14 13.2833 14 13C14 12.7167 14.0958 12.4792 14.2875 12.2875C14.4792 12.0958 14.7167 12 15 12C15.2833 12 15.5208 12.0958 15.7125 12.2875C15.9042 12.4792 16 12.7167 16 13C16 13.2833 15.9042 13.5208 15.7125 13.7125C15.5208 13.9042 15.2833 14 15 14ZM6.025 12.45C5.90833 10.6833 6.44167 9.16667 7.625 7.9C8.80833 6.63333 10.2833 6 12.05 6C13.5333 6 14.8375 6.47083 15.9625 7.4125C17.0875 8.35417 17.7667 9.55833 18 11.025C16.4833 11.0083 15.0875 10.6 13.8125 9.8C12.5375 9 11.5583 7.91667 10.875 6.55C10.6083 7.88333 10.0458 9.07083 9.1875 10.1125C8.32917 11.1542 7.275 11.9333 6.025 12.45Z"
                                  fill="#333B48"
                                />
                              </svg>
                              Agent
                            </NavLink>
                          </li>
                          <li onClick={() => handleLinkClick('Phone Numbers')}>
                            <NavLink
                              to="/playground/phone"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-[14px] rounded-sm py-3 px-4 text-sm font-semibold  text-[#1D2532] duration-100  ease-in-out  dark:text-white  ' +
                                (isActive &&
                                  '!dark:text-[#1D2532] border-l-2 border-[#1D2532] text-[#1D2532] dark:border-white dark:text-white')
                              }
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="fill-black dark:fill-white"
                                  d="M19.95 21C17.8667 21 15.8083 20.5458 13.775 19.6375C11.7417 18.7292 9.89167 17.4417 8.225 15.775C6.55833 14.1083 5.27083 12.2583 4.3625 10.225C3.45417 8.19167 3 6.13333 3 4.05C3 3.75 3.1 3.5 3.3 3.3C3.5 3.1 3.75 3 4.05 3H8.1C8.33333 3 8.54167 3.07917 8.725 3.2375C8.90833 3.39583 9.01667 3.58333 9.05 3.8L9.7 7.3C9.73333 7.56667 9.725 7.79167 9.675 7.975C9.625 8.15833 9.53333 8.31667 9.4 8.45L6.975 10.9C7.30833 11.5167 7.70417 12.1125 8.1625 12.6875C8.62083 13.2625 9.125 13.8167 9.675 14.35C10.1917 14.8667 10.7333 15.3458 11.3 15.7875C11.8667 16.2292 12.4667 16.6333 13.1 17L15.45 14.65C15.6 14.5 15.7958 14.3875 16.0375 14.3125C16.2792 14.2375 16.5167 14.2167 16.75 14.25L20.2 14.95C20.4333 15.0167 20.625 15.1375 20.775 15.3125C20.925 15.4875 21 15.6833 21 15.9V19.95C21 20.25 20.9 20.5 20.7 20.7C20.5 20.9 20.25 21 19.95 21ZM6.025 9L7.675 7.35L7.25 5H5.025C5.10833 5.68333 5.225 6.35833 5.375 7.025C5.525 7.69167 5.74167 8.35 6.025 9ZM14.975 17.95C15.625 18.2333 16.2875 18.4583 16.9625 18.625C17.6375 18.7917 18.3167 18.9 19 18.95V16.75L16.65 16.275L14.975 17.95Z"
                                  fill="#333B48"
                                />
                              </svg>
                              Phone #
                            </NavLink>
                          </li>
                          <li onClick={() => handleLinkClick('Library')}>
                            <NavLink
                              to="/playground/library"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-[14px] rounded-sm py-3 px-4 text-sm font-semibold  text-[#1D2532] duration-100  ease-in-out  dark:text-white  ' +
                                (isActive &&
                                  '!dark:text-[#1D2532] border-l-2 border-[#1D2532] text-[#1D2532] dark:border-white dark:text-white')
                              }
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="fill-black dark:fill-white"
                                  d="M9 18H15C15.2833 18 15.5208 17.9042 15.7125 17.7125C15.9042 17.5208 16 17.2833 16 17C16 16.7167 15.9042 16.4792 15.7125 16.2875C15.5208 16.0958 15.2833 16 15 16H9C8.71667 16 8.47917 16.0958 8.2875 16.2875C8.09583 16.4792 8 16.7167 8 17C8 17.2833 8.09583 17.5208 8.2875 17.7125C8.47917 17.9042 8.71667 18 9 18ZM9 14H15C15.2833 14 15.5208 13.9042 15.7125 13.7125C15.9042 13.5208 16 13.2833 16 13C16 12.7167 15.9042 12.4792 15.7125 12.2875C15.5208 12.0958 15.2833 12 15 12H9C8.71667 12 8.47917 12.0958 8.2875 12.2875C8.09583 12.4792 8 12.7167 8 13C8 13.2833 8.09583 13.5208 8.2875 13.7125C8.47917 13.9042 8.71667 14 9 14ZM6 22C5.45 22 4.97917 21.8042 4.5875 21.4125C4.19583 21.0208 4 20.55 4 20V4C4 3.45 4.19583 2.97917 4.5875 2.5875C4.97917 2.19583 5.45 2 6 2H13.175C13.4417 2 13.6958 2.05 13.9375 2.15C14.1792 2.25 14.3917 2.39167 14.575 2.575L19.425 7.425C19.6083 7.60833 19.75 7.82083 19.85 8.0625C19.95 8.30417 20 8.55833 20 8.825V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22H6ZM13 8V4H6V20H18V9H14C13.7167 9 13.4792 8.90417 13.2875 8.7125C13.0958 8.52083 13 8.28333 13 8Z"
                                  fill="#333B48"
                                />
                              </svg>
                              Library
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Playground --> */}
              {/* <!-- Reports --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/reports' || pathname.includes('reports')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-[#1D2532]  duration-100 ease-in-out  dark:text-white  ${
                          (pathname === '/reports/call' ||
                            pathname.includes('reports/call')) &&
                          ''
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            className="fill-black dark:fill-white"
                            d="M9 12C8.71667 12 8.47917 11.9042 8.2875 11.7125C8.09583 11.5208 8 11.2833 8 11C8 10.7167 8.09583 10.4792 8.2875 10.2875C8.47917 10.0958 8.71667 10 9 10H15C15.2833 10 15.5208 10.0958 15.7125 10.2875C15.9042 10.4792 16 10.7167 16 11C16 11.2833 15.9042 11.5208 15.7125 11.7125C15.5208 11.9042 15.2833 12 15 12H9ZM9 8C8.71667 8 8.47917 7.90417 8.2875 7.7125C8.09583 7.52083 8 7.28333 8 7C8 6.71667 8.09583 6.47917 8.2875 6.2875C8.47917 6.09583 8.71667 6 9 6H15C15.2833 6 15.5208 6.09583 15.7125 6.2875C15.9042 6.47917 16 6.71667 16 7C16 7.28333 15.9042 7.52083 15.7125 7.7125C15.5208 7.90417 15.2833 8 15 8H9ZM6 14H13.5C13.9833 14 14.4333 14.1042 14.85 14.3125C15.2667 14.5208 15.6167 14.8167 15.9 15.2L18 17.95V4H6V14ZM6 20H17.05L14.325 16.425C14.225 16.2917 14.1042 16.1875 13.9625 16.1125C13.8208 16.0375 13.6667 16 13.5 16H6V20ZM18 22H6C5.45 22 4.97917 21.8042 4.5875 21.4125C4.19583 21.0208 4 20.55 4 20V4C4 3.45 4.19583 2.97917 4.5875 2.5875C4.97917 2.19583 5.45 2 6 2H18C18.55 2 19.0208 2.19583 19.4125 2.5875C19.8042 2.97917 20 3.45 20 4V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22Z"
                            fill="#333B48"
                          />
                        </svg>
                        Reports
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li onClick={() => handleLinkClick('Call Logs')}>
                            <NavLink
                              to="/reports/call"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-[14px] rounded-sm py-3 px-4 text-sm font-semibold  text-[#1D2532] duration-100  ease-in-out  dark:text-white  ' +
                                (isActive &&
                                  '!dark:text-[#1D2532] border-l-2 border-[#1D2532] text-[#1D2532] dark:border-white dark:text-white')
                              }
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="fill-black dark:fill-white"
                                  d="M18.95 22C16.8667 22 14.8083 21.5458 12.775 20.6375C10.7417 19.7292 8.89167 18.4417 7.225 16.775C5.55833 15.1083 4.27083 13.2583 3.3625 11.225C2.45417 9.19167 2 7.13333 2 5.05C2 4.75 2.1 4.5 2.3 4.3C2.5 4.1 2.75 4 3.05 4H7.1C7.33333 4 7.54167 4.07917 7.725 4.2375C7.90833 4.39583 8.01667 4.58333 8.05 4.8L8.7 8.3C8.73333 8.56667 8.725 8.79167 8.675 8.975C8.625 9.15833 8.53333 9.31667 8.4 9.45L5.975 11.9C6.30833 12.5167 6.70417 13.1125 7.1625 13.6875C7.62083 14.2625 8.125 14.8167 8.675 15.35C9.19167 15.8667 9.73333 16.3458 10.3 16.7875C10.8667 17.2292 11.4667 17.6333 12.1 18L14.45 15.65C14.6 15.5 14.7958 15.3875 15.0375 15.3125C15.2792 15.2375 15.5167 15.2167 15.75 15.25L19.2 15.95C19.4333 16.0167 19.625 16.1375 19.775 16.3125C19.925 16.4875 20 16.6833 20 16.9V20.95C20 21.25 19.9 21.5 19.7 21.7C19.5 21.9 19.25 22 18.95 22ZM5.025 10L6.675 8.35L6.25 6H4.025C4.10833 6.68333 4.225 7.35833 4.375 8.025C4.525 8.69167 4.74167 9.35 5.025 10ZM13.975 18.95C14.625 19.2333 15.2875 19.4583 15.9625 19.625C16.6375 19.7917 17.3167 19.9 18 19.95V17.75L15.65 17.275L13.975 18.95ZM13 4C12.7167 4 12.4792 3.90417 12.2875 3.7125C12.0958 3.52083 12 3.28333 12 3C12 2.71667 12.0958 2.47917 12.2875 2.2875C12.4792 2.09583 12.7167 2 13 2H21C21.2833 2 21.5208 2.09583 21.7125 2.2875C21.9042 2.47917 22 2.71667 22 3C22 3.28333 21.9042 3.52083 21.7125 3.7125C21.5208 3.90417 21.2833 4 21 4H13ZM13 8C12.7167 8 12.4792 7.90417 12.2875 7.7125C12.0958 7.52083 12 7.28333 12 7C12 6.71667 12.0958 6.47917 12.2875 6.2875C12.4792 6.09583 12.7167 6 13 6H21C21.2833 6 21.5208 6.09583 21.7125 6.2875C21.9042 6.47917 22 6.71667 22 7C22 7.28333 21.9042 7.52083 21.7125 7.7125C21.5208 7.90417 21.2833 8 21 8H13ZM13 12C12.7167 12 12.4792 11.9042 12.2875 11.7125C12.0958 11.5208 12 11.2833 12 11C12 10.7167 12.0958 10.4792 12.2875 10.2875C12.4792 10.0958 12.7167 10 13 10H21C21.2833 10 21.5208 10.0958 21.7125 10.2875C21.9042 10.4792 22 10.7167 22 11C22 11.2833 21.9042 11.5208 21.7125 11.7125C21.5208 11.9042 21.2833 12 21 12H13Z"
                                  fill="#333B48"
                                />
                              </svg>
                              Call Logs
                            </NavLink>
                          </li>
                          <li onClick={() => handleLinkClick('Compaign')}>
                            <NavLink
                              to="/reports/Compaign"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-[14px] rounded-sm py-3 px-4 text-sm font-semibold  text-[#1D2532] duration-100  ease-in-out dark:text-[#1D2532] dark:text-white  ' +
                                (isActive &&
                                  '!dark:text-[#1D2532] border-l-2 border-[#1D2532] text-[#1D2532] dark:border-white dark:text-white')
                              }
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="fill-black dark:fill-white"
                                  d="M18.95 22C16.8667 22 14.8083 21.5458 12.775 20.6375C10.7417 19.7292 8.89167 18.4417 7.225 16.775C5.55833 15.1083 4.27083 13.2583 3.3625 11.225C2.45417 9.19167 2 7.13333 2 5.05C2 4.75 2.1 4.5 2.3 4.3C2.5 4.1 2.75 4 3.05 4H7.1C7.33333 4 7.54167 4.07917 7.725 4.2375C7.90833 4.39583 8.01667 4.58333 8.05 4.8L8.7 8.3C8.73333 8.56667 8.725 8.79167 8.675 8.975C8.625 9.15833 8.53333 9.31667 8.4 9.45L5.975 11.9C6.30833 12.5167 6.70417 13.1125 7.1625 13.6875C7.62083 14.2625 8.125 14.8167 8.675 15.35C9.19167 15.8667 9.73333 16.3458 10.3 16.7875C10.8667 17.2292 11.4667 17.6333 12.1 18L14.45 15.65C14.6 15.5 14.7958 15.3875 15.0375 15.3125C15.2792 15.2375 15.5167 15.2167 15.75 15.25L19.2 15.95C19.4333 16.0167 19.625 16.1375 19.775 16.3125C19.925 16.4875 20 16.6833 20 16.9V20.95C20 21.25 19.9 21.5 19.7 21.7C19.5 21.9 19.25 22 18.95 22ZM5.025 10L6.675 8.35L6.25 6H4.025C4.10833 6.68333 4.225 7.35833 4.375 8.025C4.525 8.69167 4.74167 9.35 5.025 10ZM13.975 18.95C14.625 19.2333 15.2875 19.4583 15.9625 19.625C16.6375 19.7917 17.3167 19.9 18 19.95V17.75L15.65 17.275L13.975 18.95ZM13 4C12.7167 4 12.4792 3.90417 12.2875 3.7125C12.0958 3.52083 12 3.28333 12 3C12 2.71667 12.0958 2.47917 12.2875 2.2875C12.4792 2.09583 12.7167 2 13 2H21C21.2833 2 21.5208 2.09583 21.7125 2.2875C21.9042 2.47917 22 2.71667 22 3C22 3.28333 21.9042 3.52083 21.7125 3.7125C21.5208 3.90417 21.2833 4 21 4H13ZM13 8C12.7167 8 12.4792 7.90417 12.2875 7.7125C12.0958 7.52083 12 7.28333 12 7C12 6.71667 12.0958 6.47917 12.2875 6.2875C12.4792 6.09583 12.7167 6 13 6H21C21.2833 6 21.5208 6.09583 21.7125 6.2875C21.9042 6.47917 22 6.71667 22 7C22 7.28333 21.9042 7.52083 21.7125 7.7125C21.5208 7.90417 21.2833 8 21 8H13ZM13 12C12.7167 12 12.4792 11.9042 12.2875 11.7125C12.0958 11.5208 12 11.2833 12 11C12 10.7167 12.0958 10.4792 12.2875 10.2875C12.4792 10.0958 12.7167 10 13 10H21C21.2833 10 21.5208 10.0958 21.7125 10.2875C21.9042 10.4792 22 10.7167 22 11C22 11.2833 21.9042 11.5208 21.7125 11.7125C21.5208 11.9042 21.2833 12 21 12H13Z"
                                  fill="#333B48"
                                />
                              </svg>
                              Compaign
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Reports --> */}
              <li onClick={() => handleLinkClick('Billing')}>
                <NavLink
                  to="/billing"
                  className={`group relative flex items-center gap-[14px] rounded-sm py-3 px-4 text-sm font-semibold  text-[#1D2532] duration-100  ease-in-out  dark:text-white  ${
                    pathname.includes('/billing') &&
                    'border-l-2 border-[#1D2532] text-black dark:border-white'
                  }`}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="fill-black dark:fill-white"
                      d="M6 22C5.45 22 4.97917 21.8042 4.5875 21.4125C4.19583 21.0208 4 20.55 4 20V10C4 9.45 4.19583 8.97917 4.5875 8.5875C4.97917 8.19583 5.45 8 6 8H7V6C7 4.61667 7.4875 3.4375 8.4625 2.4625C9.4375 1.4875 10.6167 1 12 1C13.3833 1 14.5625 1.4875 15.5375 2.4625C16.5125 3.4375 17 4.61667 17 6V8H18C18.55 8 19.0208 8.19583 19.4125 8.5875C19.8042 8.97917 20 9.45 20 10V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22H6ZM6 20H18V10H6V20ZM12 17C12.55 17 13.0208 16.8042 13.4125 16.4125C13.8042 16.0208 14 15.55 14 15C14 14.45 13.8042 13.9792 13.4125 13.5875C13.0208 13.1958 12.55 13 12 13C11.45 13 10.9792 13.1958 10.5875 13.5875C10.1958 13.9792 10 14.45 10 15C10 15.55 10.1958 16.0208 10.5875 16.4125C10.9792 16.8042 11.45 17 12 17ZM9 8H15V6C15 5.16667 14.7083 4.45833 14.125 3.875C13.5417 3.29167 12.8333 3 12 3C11.1667 3 10.4583 3.29167 9.875 3.875C9.29167 4.45833 9 5.16667 9 6V8Z"
                      fill="#333B48"
                    />
                  </svg>
                  Billing
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/member"
                  className={`group relative flex items-center gap-[14px] rounded-sm py-3 px-4 text-sm font-semibold  text-[#1D2532] duration-100  ease-in-out dark:text-[#1D2532] dark:text-white  ${
                    pathname.includes('/member') &&
                    'border-l-2 border-[#1D2532] text-black dark:border-white'
                  }`}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="fill-black dark:fill-white"
                      d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V7.5H19V5H5V19H19V16.5H21V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM13 17C12.45 17 11.9792 16.8042 11.5875 16.4125C11.1958 16.0208 11 15.55 11 15V9C11 8.45 11.1958 7.97917 11.5875 7.5875C11.9792 7.19583 12.45 7 13 7H20C20.55 7 21.0208 7.19583 21.4125 7.5875C21.8042 7.97917 22 8.45 22 9V15C22 15.55 21.8042 16.0208 21.4125 16.4125C21.0208 16.8042 20.55 17 20 17H13ZM20 15V9H13V15H20ZM16 13.5C16.4167 13.5 16.7708 13.3542 17.0625 13.0625C17.3542 12.7708 17.5 12.4167 17.5 12C17.5 11.5833 17.3542 11.2292 17.0625 10.9375C16.7708 10.6458 16.4167 10.5 16 10.5C15.5833 10.5 15.2292 10.6458 14.9375 10.9375C14.6458 11.2292 14.5 11.5833 14.5 12C14.5 12.4167 14.6458 12.7708 14.9375 13.0625C15.2292 13.3542 15.5833 13.5 16 13.5Z"
                      fill="#333B48"
                    />
                  </svg>
                  Members
                </NavLink>
              </li>
              <li
                className="absolute bottom-6 w-[80%] cursor-pointer  bg-white p-3 dark:bg-[#242E3E]"
                onClick={handleLogOut}
              >
                <button className="group flex items-center gap-[14px] rounded-sm text-sm font-semibold  text-[#1D2532]  duration-100 ease-in-out dark:text-white">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="fill-black dark:fill-white"
                      d="M4.77778 19C4.28889 19 3.87037 18.8259 3.52222 18.4778C3.17407 18.1296 3 17.7111 3 17.2222V4.77778C3 4.28889 3.17407 3.87037 3.52222 3.52222C3.87037 3.17407 4.28889 3 4.77778 3H10.1111C10.363 3 10.5741 3.08519 10.7444 3.25556C10.9148 3.42593 11 3.63704 11 3.88889C11 4.14074 10.9148 4.35185 10.7444 4.52222C10.5741 4.69259 10.363 4.77778 10.1111 4.77778H4.77778V17.2222H10.1111C10.363 17.2222 10.5741 17.3074 10.7444 17.4778C10.9148 17.6481 11 17.8593 11 18.1111C11 18.363 10.9148 18.5741 10.7444 18.7444C10.5741 18.9148 10.363 19 10.1111 19H4.77778ZM15.6 11.8889H9.22222C8.97037 11.8889 8.75926 11.8037 8.58889 11.6333C8.41852 11.463 8.33333 11.2519 8.33333 11C8.33333 10.7481 8.41852 10.537 8.58889 10.3667C8.75926 10.1963 8.97037 10.1111 9.22222 10.1111H15.6L13.9333 8.44444C13.7704 8.28148 13.6889 8.08148 13.6889 7.84444C13.6889 7.60741 13.7704 7.4 13.9333 7.22222C14.0963 7.04444 14.3037 6.95185 14.5556 6.94444C14.8074 6.93704 15.0222 7.02222 15.2 7.2L18.3778 10.3778C18.5556 10.5556 18.6444 10.763 18.6444 11C18.6444 11.237 18.5556 11.4444 18.3778 11.6222L15.2 14.8C15.0222 14.9778 14.8111 15.063 14.5667 15.0556C14.3222 15.0481 14.1111 14.9556 13.9333 14.7778C13.7704 14.6 13.6926 14.3889 13.7 14.1444C13.7074 13.9 13.7926 13.6963 13.9556 13.5333L15.6 11.8889Z"
                      fill="white"
                    />
                  </svg>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
