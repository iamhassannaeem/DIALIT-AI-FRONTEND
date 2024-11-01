import { useState } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/modules/Swiftsync.class';
import { BeatLoader } from 'react-spinners';
import Toaster from '../../components/Toast/Toast';

const Signup = () => {
  const [showPasswd, setShowPasswd] = useState(false);
  const [showConfirmPasswd, setShowConfirmPasswd] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ success: '', error: '' });
  const validateEmail = (value: any) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (value: any) => {
    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };
  const isFormValid =
    email && password && !emailError && !passwordError && !confirmPasswordError;

  const navigate = useNavigate();
  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await register({
        email: email,
        password: password,
        name: user,
      });
      console.log(res);
      if (res?.status === 201) {
        setError({ error: '', success: res?.data?.message });
      } else {
        setError({
          error:
            JSON.parse(res?.message?.request?.response)?.message ||
            'An error occurred',
          success: '',
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toaster message={error} />
      <div className="mt-2 flex items-center justify-center gap-7 p-2 sm:mt-15 sm:p-10">
        <div className="w-full md:w-[52%]">
          <div className="text-2xl font-normal text-black dark:text-white">
            Create account
          </div>
          <div className="text-[#75849B] dark:text-white">
            Sign up for an account to get started
          </div>

          <div className="mt-6 text-[#75849B] dark:text-white">
            <label htmlFor="email">Email</label>
          </div>
          <div>
            <input
              className="mt-1 box-border h-10 w-full rounded-md border border-stroke bg-[#EEEEEE] pl-2 transition-all duration-200 dark:bg-[#1D2532]"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter Your Email"
            />
            {emailError && (
              <p className="mt-1 text-sm text-red">{emailError}</p>
            )}
          </div>

          <div className="mt-6 text-[#75849B] dark:text-white">
            <label htmlFor="password">Password</label>
          </div>
          <div className="relative mt-1">
            <input
              id="password"
              name="password"
              type={showPasswd ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter Your Password"
              className="box-border h-10 w-full rounded-md border border-stroke bg-[#EEEEEE] pl-2 outline-none outline transition-all duration-200 dark:bg-[#1D2532]"
            />
            <div
              className="absolute right-2 top-2 cursor-pointer text-black dark:text-white"
              onClick={() => setShowPasswd(!showPasswd)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1476_228)">
                  <path
                    d="M12 5.25C4.5 5.25 1.5 12 1.5 12C1.5 12 4.5 18.75 12 18.75C19.5 18.75 22.5 12 22.5 12C22.5 12 19.5 5.25 12 5.25Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1476_228">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            {passwordError && (
              <p className="mt-1 text-sm text-red">{passwordError}</p>
            )}
          </div>

          <div className="mt-6 text-[#75849B] dark:text-white">
            <label htmlFor="user">User Name</label>
          </div>
          <div className="relative mt-1">
            <input
              id="user"
              name="Enter your username"
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Enter your username"
              className="box-border h-10 w-full rounded-md border border-stroke bg-[#EEEEEE] pl-2 outline-none outline transition-all duration-200 dark:bg-[#1D2532]"
            />
            <div
              className="absolute right-2 top-2 cursor-pointer text-black dark:text-white"
              onClick={() => setShowConfirmPasswd(!showConfirmPasswd)}
            ></div>
            {confirmPasswordError && (
              <p className="mt-1 text-sm text-red">{confirmPasswordError}</p>
            )}
          </div>

          <button
            className={`mt-9 w-full rounded-md py-2 ${
              isFormValid
                ? 'cursor-pointer bg-[#1D2532] text-white hover:bg-[#2C3E50]' // Enabled styles
                : 'cursor-not-allowed bg-[#EEEEEE]' // Disabled styles
            }`}
            disabled={!isFormValid}
            onClick={handleRegister}
          >
            {loading ? <BeatLoader color="white" /> : 'Register'}
          </button>

          <button className="mt-3 flex w-full items-center justify-center gap-1 rounded-md bg-[#EEEEEE] py-2 font-medium text-[#4E5B6F] dark:bg-[#1D2532] dark:text-white">
            <span> Continue with Google</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="24px"
              height="24px"
            >
              <path
                fill="#fbc02d"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#e53935"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4caf50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1565c0"
                d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
          </button>
          <div className="mt-3 text-center text-[#8A92A0] dark:text-white">
            By signing up you agree to the{' '}
            <span className="cursor-pointer text-[#647477] hover:underline dark:text-[#647477]">
              Terms of services <span>&</span> <span>Privacy Policy</span>
            </span>
          </div>
          <div className="mt-3 text-center text-[#8A92A0] dark:text-white">
            Already have an account?{' '}
            <span
              className="cursor-pointer text-[#647477] hover:underline dark:text-[#647477]"
              onClick={() => navigate('/signin')}
            >
              Sign In
            </span>
          </div>
        </div>

        <div className="hidden h-full w-[48%] md:block">
          <Carousel />
        </div>
      </div>
    </>
  );
};

export default Signup;
