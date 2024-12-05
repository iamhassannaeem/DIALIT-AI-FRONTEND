import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import General from './General';
import Members from './Members';
import PlanBilling from './PlanBilling';
import LoginCred from './LoginCred';
import Notifications from './Notifications';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const [tab, setTab] = useState(1);
  const sidebar = useRef<any>(null);

  return (
    <div>
      {/* Sidebar */}
      <aside
        ref={sidebar}
        className={`w-full flex-shrink-0 bg-[#EEEEEE] p-4 duration-300  ease-linear dark:bg-[#1D2532] 
                    `}
      >
        <nav>
          <div className=" text-lg font-bold text-black dark:text-white">
            My Workspace
          </div>

          <ul className="mx-3 flex flex-wrap justify-between gap-3 py-4">
            <li>
              <button
                className={`rounded-md py-2 px-6 text-sm font-medium transition-all duration-300 
                ${
                  tab === 1
                    ? 'bg-white text-black shadow-lg dark:bg-[#242E3E] dark:text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 bg-transparent dark:hover:bg-[#2E3A4E]'
                }`}
                onClick={() => setTab(1)}
              >
                General
              </button>
            </li>
            <li>
              <button
                className={`rounded-md py-2 px-6 text-sm font-medium transition-all duration-300 
                ${
                  tab === 2
                    ? 'bg-white text-black shadow-lg dark:bg-[#242E3E] dark:text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 bg-transparent dark:hover:bg-[#2E3A4E]'
                }`}
                onClick={() => setTab(2)}
              >
                Members
              </button>
            </li>
            <li>
              <button
                className={`rounded-md py-2 px-6 text-sm font-medium transition-all duration-300 
                ${
                  tab === 3
                    ? 'bg-white text-black shadow-lg dark:bg-[#242E3E] dark:text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 bg-transparent dark:hover:bg-[#2E3A4E]'
                }`}
                onClick={() => setTab(3)}
              >
                Plan & Billing
              </button>
            </li>
            <li>
              <button
                className={`rounded-md py-2 px-6 text-sm font-medium transition-all duration-300 
                ${
                  tab === 4
                    ? 'bg-white text-black shadow-lg dark:bg-[#242E3E] dark:text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 bg-transparent dark:hover:bg-[#2E3A4E]'
                }`}
                onClick={() => setTab(4)}
              >
                Reset Password
              </button>
            </li>
            <li>
              <button
                className={`rounded-md py-2 px-6 text-sm font-medium transition-all duration-300 
                ${
                  tab === 5
                    ? 'bg-white text-black shadow-lg dark:bg-[#242E3E] dark:text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray bg-transparent dark:hover:bg-[#2E3A4E]'
                }`}
                onClick={() => setTab(5)}
              >
                Notifications
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="mt-6 flex-1 overflow-y-auto bg-[#EEEEEE] pl-4  dark:bg-[#1D2532]">
        <div className={`${tab === 1 ? 'block' : 'hidden'}`}>
          <General />
        </div>
        <div className={`${tab === 2 ? 'block' : 'hidden'}`}>
          <Members />
        </div>
        <div className={`${tab === 3 ? 'block' : 'hidden'}`}>
          <PlanBilling />
        </div>
        <div className={`${tab === 4 ? 'block' : 'hidden'}`}>
          <LoginCred />
        </div>
        <div className={`${tab === 5 ? 'block' : 'hidden'}`}>
          <Notifications />
        </div>
      </main>
      {/* Main Content */}
    </div>
  );
};

export default Sidebar;
