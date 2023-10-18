import { lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import ECommerce from './pages/Dashboard/ECommerce';
import Profile from './pages/Profile';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Tables from './pages/Organisations';
import ErrorPage from './pages/Pages/ErrorPage';
import ResetPassword from './pages/Authentication/ResetPassword';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Packages from './pages/Packages'

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));


function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route
            index
            element={
              <>
                <PageTitle title="Dashboard" />
                <ECommerce />
              </>
            }
          />
          
          <Route
            path="/profile"
            element={
              <>
                <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Profile />
              </>
            }
          />
          <Route
            path="/organisations"
            element={
              <>
                <PageTitle title="Organisations" />
                <Tables />
              </>
            }
          />
          <Route
            path="/Packages"
            element={
              <>
                <PageTitle title="Packages" />
                <Packages />
              </>
            }
          />
          <Route
            path="/Setup/users"
            element={
              <>
                <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <FormElements />
              </>
            }
          />
          <Route
            path="/Setup/roles"
            element={
              <>
                <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <FormLayout />
              </>
            }
          />
           <Route
            path="/Setup/permissions"
            element={
              <>
                <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <FormLayout />
              </>
            }
          />
          
          <Route
            path="/pages/error-page"
            element={
              <>
                <PageTitle title="Error Page | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <ErrorPage />
              </>
            }
          />
          
          <Route
            path="/auth/signin"
            element={
              <>
                <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <SignIn />
              </>
            }
          />
          <Route
            path="/auth/signup"
            element={
              <>
                <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <SignUp />
              </>
            }
          />
          <Route
            path="/auth/reset-password"
            element={
              <>
                <PageTitle title="Reset Password | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <ResetPassword />
              </>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
