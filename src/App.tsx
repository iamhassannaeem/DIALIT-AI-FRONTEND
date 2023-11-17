import { lazy, useEffect, useState } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from 'react-router-dom';
import ECommerce from './pages/Dashboard/ECommerce';
import Profile from './pages/Profile';
import Users from './pages/Setup/Users'
import Roles from './pages/Setup/Roles'
import Organisations from './pages/organisation/Organisations';
import ErrorPage from './pages/Pages/ErrorPage';
import ResetPassword from './pages/Authentication/ResetPassword';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Packages from './pages/Packages';
import OrganisationsDetail from './pages/OrganisationsDetail';
import ProtectedRoutes from './auth/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import {  isAdminfetchAdminStatus } from './services/authService';
import Noperm from './components/Noperm'

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  const isAdmin = useSelector((state)=>state.isAdmin?.isAdmin?.is_admin); 
  const perm = useSelector((state)=>state.isAdmin?.isAdmin?.group); 

  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isAdminfetchAdminStatus());
  }, [dispatch]);



  return loading ? (
    <Loader />
  ) : (
    <>  
      <Routes>
        <Route element={<DefaultLayout/>}>
  
  <Route path="/signin" element={<SignIn />} />
  {isAuthenticated ? 
  <> 
  <Route
        path="/"
        element={
          isAdmin ?
          <>
            <PageTitle title="Dashboard" />
            <ECommerce />
          </>:<>
          <Noperm />
          </>
        }
      />
      
      <Route
        path="/organisations"
        element={
          isAdmin || perm?.view_organization ?
          <>
            <Organisations />
            <PageTitle title="Organisations" />
          </>:<>
          <Noperm/></>
        }
      />
      <Route
        path="/packages"
        element={
          isAdmin ?
          <>
            <PageTitle title="Packages" />
            <Packages />
          </>:<Noperm/>
        }
      />
      <Route
        path="/organisationsDetail/:id"
        element={
          isAdmin ?
          <>
            <PageTitle title="OrganisationDetails" />
            <OrganisationsDetail />
          </>:<Noperm/>
        }
      />
      <Route
        path="/setup/users"
        element={
          isAdmin ?
          <>
          
            <PageTitle title="Users" />
            <Users />
          </>:<Noperm/>
        }
      />
      <Route
        path="/setup/roles"
        element={
          isAdmin ?
          <>
          
            <PageTitle title="Roles" />
            <Roles />
          </>:<Noperm/>
        }
      />
     
      <Route
        path="/profile"
        element={
          isAdmin ?
          <>
            <PageTitle title="Profile" />
            <Profile />
          </>:<Noperm/>
        }
      />
      </>
     :     
         
     

<Route
      path="*"
      element={<SignIn to="/signin" replace />}
    />
     }
      
    
    </Route>
</Routes>  
    </>
  );
}

export default App;

