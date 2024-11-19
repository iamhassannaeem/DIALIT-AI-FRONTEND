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
        <div >
            {/* Sidebar */}
            <aside
                ref={sidebar}
                className={`flex-shrink-0 w-full p-4 bg-[#EEEEEE] dark:bg-[#1D2532]  duration-300 ease-linear 
                    `}
            >
                <nav>
                    <div className="ml-4 pt-4 mb-5 text-black dark:text-white font-bold text-lg">
                        My Workspace
                    </div>

                    <ul className=" flex flex-wrap py-5 justify-between mx-3 ">
                        <Link
                            to="#"
                            className={`py-3 px-4 text-black dark:text-white text-sm  ${tab === 1 ? 'font-extrabold bg-white dark:bg-[#242E3E]' : ''
                                }`}
                            onClick={() => setTab(1)}
                        >
                            General
                        </Link>
                        <Link
                            to="#"
                            className={`py-3 px-4 text-sm text-black dark:text-white ${tab === 2 ? 'font-extrabold bg-white dark:bg-[#242E3E]' : ''
                                }`}
                            onClick={() => setTab(2)}
                        >
                            Members
                        </Link>
                        <Link
                            to="#"
                            className={`py-3 px-4 text-sm text-black dark:text-white ${tab === 3 ? 'font-extrabold bg-white dark:bg-[#242E3E]' : ''
                                }`}
                            onClick={() => setTab(3)}
                        >
                            Plan & Billing
                        </Link>
                        <Link
                            to="#"
                            className={`py-3 px-4 text-sm text-black dark:text-white ${tab === 4 ? 'font-extrabold bg-white dark:bg-[#242E3E]' : ''
                                }`}
                            onClick={() => setTab(4)}
                        >
                            Log in Credential
                        </Link>
                        <Link
                            to="#"
                            className={`py-3 px-4 text-sm text-black dark:text-white ${tab === 5 ? 'font-extrabold bg-white dark:bg-[#242E3E]' : ''
                                }`}
                            onClick={() => setTab(5)}
                        >
                            Notifications
                        </Link>
                    </ul>
                </nav>

            </aside>
            <main className="flex-1 pl-4 mt-6 bg-[#EEEEEE] dark:bg-[#1D2532]  overflow-y-auto">
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
