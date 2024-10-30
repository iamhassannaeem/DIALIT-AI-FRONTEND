import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';

const DefaultLayout = () => {
  // const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated);
  const isAuthenticated = false;
  const [sidebarOpen, setSidebarOpen] = useState(false);




  return (
    <div>
      {/* {!userIsLoggedIn && <SignIn/>} */}

      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden bg-white dark:bg-[#242E3E] ">
        {/* <!-- ===== Sidebar Start ===== --> */}
        {isAuthenticated && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
        {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-white dark:bg-[#242E3E]">
          {/* <!-- ===== Header Start ===== --> */}
          {isAuthenticated && <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
          {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl md:p-8 2xl:p-8 p-4" >
              <Outlet />


            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;
