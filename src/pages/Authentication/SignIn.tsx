import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoDark from '../../images/logo/logo-dark.svg';
// import { login } from '../../api/modules/Swiftsync.className';
// import { loginUser } from '../../redux/slice/authSlice';
import { AuthService } from '../../services/authService';
import Toaster from '../../components/Toast/Toast';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/slices/authSlice';
import { BeatLoader } from 'react-spinners';
// import Breadcrumb from '../../components/Breadcrumb';
import signinImg from '../../images/signin-img.jpg';
const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState({ success: '', error: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loadings, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    let isValid = true;
    let errorMessage = '';

    if (name === 'email') {
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      errorMessage = 'Enter a valid username';
      setEmailError(isValid ? '' : errorMessage);
    } else if (name === 'password') {
      isValid = /^.{0,24}$/.test(value);
      errorMessage = 'Password should be between 0 and 24 characters';
      setPasswordError(isValid ? '' : errorMessage);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await AuthService.login(formData.email, formData.password);
      const { access, refresh } = res?.data;
      dispatch(loginSuccess({ access, refresh }));
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);

      navigate('/home');
      window.location.reload();
    } catch (error) {
      const user = error?.response?.data;
      const errorMessages = [];
      for (const key in user) {
        const errorMessage = `${key}: ${user[key]}`;
        errorMessages.push(errorMessage);
      }
      const userFriendlyErrors = mapServerErrors(user);
      setError({ success: '', error: userFriendlyErrors.join('\n') });

      console.error('Login error:', error);
    }
    setLoading(false);
  };

  const mapServerErrors = (serverErrors) => {
    const userFriendlyErrors = [];

    for (const key in serverErrors) {
      switch (key) {
        case 'email':
          userFriendlyErrors.push('Email field is required.');
          break;
        case 'password':
          userFriendlyErrors.push('Password field is required.');
          break;
        case 'detail':
          userFriendlyErrors.push(
            'No active account found with the given credentials.'
          );
          break;
        default:
          userFriendlyErrors.push(`${key}: ${serverErrors[key]}`);
      }
    }

    return userFriendlyErrors;
  };
  return (
    <>
      <Toaster message={error} />

      <div className="bg-gray-100 flex min-h-screen flex-col justify-center py-6 sm:py-12">
        <div className="relative py-3 sm:mx-auto sm:max-w-xl">
          <div className="dark:bg-white bg-[#1D2532] absolute inset-0 -skew-y-6 transform bg-gradient-to-r shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl"></div>
          <div className="relative bg-[#1D2532] px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20">
            <div className="mx-auto max-w-md">
              <div>
                <h1 className="text-2xl font-semibold">Login</h1>
              </div>
              <div className="divide-gray-200 divide-y">
                <div className="text-gray-700 space-y-4 py-8 text-base leading-6 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autocomplete="off"
                      id="email"
                      name="email"
                      type="text"
                      className="border-gray-300 text-gray-900 focus:borer-rose-600 peer h-10 w-full border-b-2 placeholder-transparent focus:outline-none"
                      placeholder="Email address"
                    />
                    <label
                      for="email"
                      className="text-gray-600 peer-placeholder-shown:text-gray-440 peer-focus:text-gray-600 absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autocomplete="off"
                      id="password"
                      name="password"
                      type="password"
                      className="border-gray-300 text-gray-900 focus:borer-rose-600 peer h-10 w-full border-b-2 placeholder-transparent focus:outline-none"
                      placeholder="Password"
                    />
                    <label
                      for="password"
                      className="text-gray-600 peer-placeholder-shown:text-gray-440 peer-focus:text-gray-600 absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <button className="bg-cyan-500 rounded-md px-2 py-1 text-white">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-full justify-center">
              <button className="border-gray-300 text-gray-800 hover:bg-gray-200 focus:ring-gray-500 flex items-center rounded-lg border bg-white px-6 py-2 text-sm font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2">
                <svg
                  className="mr-2 h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="800px"
                  height="800px"
                  viewBox="-0.5 0 48 48"
                  version="1.1"
                >
                  {' '}
                  <title>Google-color</title> <desc>Created with Sketch.</desc>{' '}
                  <defs> </defs>{' '}
                  <g
                    id="Icons"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    {' '}
                    <g
                      id="Color-"
                      transform="translate(-401.000000, -860.000000)"
                    >
                      {' '}
                      <g
                        id="Google"
                        transform="translate(401.000000, 860.000000)"
                      >
                        {' '}
                        <path
                          d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                          id="Fill-1"
                          fill="#FBBC05"
                        >
                          {' '}
                        </path>{' '}
                        <path
                          d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                          id="Fill-2"
                          fill="#EB4335"
                        >
                          {' '}
                        </path>{' '}
                        <path
                          d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                          id="Fill-3"
                          fill="#34A853"
                        >
                          {' '}
                        </path>{' '}
                        <path
                          d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                          id="Fill-4"
                          fill="#4285F4"
                        >
                          {' '}
                        </path>{' '}
                      </g>{' '}
                    </g>{' '}
                  </g>{' '}
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
