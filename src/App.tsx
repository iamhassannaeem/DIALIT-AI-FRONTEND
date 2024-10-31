import { lazy, useEffect, useState } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
  useNavigate,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import SignIn from './pages/Authentication/SignIn';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { isAdminfetchAdminStatus } from './services/authService';
import Agent from './components/playground/Agent';
import Phone from './components/playground/Phone';
import Library from './components/playground/library/Library';
import CallLogs from './components/reports/CallLogs';
import Billing from './components/billing/Billing';
import Member from './components/Member';
import Settings from './pages/settings/Settings';
import ForgetPassword from './pages/Authentication/ForgetPassword';
import SignUp from './pages/Authentication/SignUp';
import TwoFA from './pages/Authentication/TwoFA';
import NewPassword from './pages/Authentication/NewPassword';
import ResetPassword from './pages/Authentication/ResetPassword';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  // const isAdmin = useSelector((state) => state.isAdmin?.isAdmin?.is_admin);
  // const perm = useSelector((state) => state.isAdmin?.isAdmin?.group);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isAdminfetchAdminStatus());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          {isAuthenticated ? (
            <>
              <Route
                path="*"
                element={
                  isAuthenticated ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <SignIn />
                  )
                }
              />
              <Route
                path="/dashboard"
                element={
                  <>
                    <PageTitle title="Dashboard" />
                    <Dashboard />
                  </>
                }
              />
              <Route
                path="/playground/agent"
                element={
                  <>
                    <PageTitle title="Agents" />
                    <Agent />
                  </>
                }
              />
              <Route
                path="/playground/phone"
                element={
                  <>
                    <PageTitle title="Phone No" />
                    <Phone />
                  </>
                }
              />
              <Route
                path="/playground/library"
                element={
                  <>
                    <PageTitle title="Library" />
                    <Library />
                  </>
                }
              />
              <Route
                path="/reports/call"
                element={
                  <>
                    <PageTitle title="Call Logs" />
                    <CallLogs />
                  </>
                }
              />
              <Route
                path="/billing"
                element={
                  <>
                    <PageTitle title="Billing" />
                    <Billing />
                  </>
                }
              />

              <Route
                path="/member"
                element={
                  <>
                    <PageTitle title="Member" />
                    <Member />
                  </>
                }
              />
              <Route
                path="/settings"
                element={
                  <>
                    <PageTitle title="Settings" />
                    <Settings />
                  </>
                }
              />
            </>
          ) : (
            <>
              <Route
                path="/SignUp"
                element={
                  <>
                    <PageTitle title="Signup" />
                    <SignUp />
                  </>
                }
              />
              <Route
                path="/ForgetPassword"
                element={
                  <>
                    <PageTitle title="ForgetPassword" />
                    <ForgetPassword />
                  </>
                }
              />
             <Route
                path="/reset/password"
                element={
                  <>
                    <PageTitle title="ResetPassword" />
                    <ResetPassword />
                  </>
                }
              />
              <Route path="/user/forgot/password/:token" element={<NewPassword />} />

              <Route
                path="/2fa"
                element={
                  <>
                    <PageTitle title="TwoFA" />
                    <TwoFA />
                  </>
                }
              />
              <Route path="*" element={<SignIn to="/signin" replace />} />
            </>
          )}
        </Route>
      </Routes>
    </>
  );
}

export default App;
