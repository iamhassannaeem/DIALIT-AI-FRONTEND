import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DefaultLayout = () => {
  const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated);
console.log(isAuthenticated);
  const [sidebarOpen, setSidebarOpen] = useState(false);
 

  

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {/* {!userIsLoggedIn && <SignIn/>} */}

      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
      {isAuthenticated &&<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />  }

        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          {isAuthenticated &&<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-10 2xl:p-10">
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
