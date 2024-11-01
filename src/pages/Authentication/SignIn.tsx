import { useState } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/modules/Swiftsync.class';
import { BeatLoader } from 'react-spinners';
import Toaster from '../../components/Toast/Toast';

const SignIn = () => {
  const [showPasswd, setShowPasswd] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
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

  const isFormValid = email && password && !emailError && !passwordError;

  const navigate = useNavigate();


  const handleLogIn = async () => {

    setLoading(true);
    try {
      const res = await login({
        email: email,
        password: password,
      });
      console.log(res);
      if (res?.status === 200) {
        setError({ error: '', success: res?.data?.message });
        setTimeout(() => {
          navigate('/2fa', {
            state: {
              email: email,
            },
          });
        }, 3000);


      } else {
        setError({
          error: 'Invalid Credentials',
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
      <div className="mt-2 flex items-center justify-center gap-7 md:mt-5">
        {/* First Div - Full Width on Small Screens */}
        <div className="w-full md:w-[45%]">
          <div className="text-2xl font-normal text-black dark:text-white">
            Login to your account
          </div>
          <div className="text-[#75849B] dark:text-white">
            Welcome back! Enter your credentials to access your account
          </div>

          <div className="mt-6 text-[#75849B] dark:text-white">
            <label htmlFor="email">Email</label>
          </div>
          <div>
            <input
              className="mt-1 h-10 w-full rounded-md border border-stroke bg-[#EEEEEE] pl-2 outline-none dark:bg-[#1D2532]"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter Your Email"
            />
            {emailError && <p className="mt-1 text-sm text-red">{emailError}</p>}
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
              className="h-10 w-full rounded-md border border-stroke bg-[#EEEEEE] pl-2 outline-none dark:bg-[#1D2532]"
            />


            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-2 top-2 cursor-pointer text-black dark:text-white"
              onClick={() => setShowPasswd(!showPasswd)}
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


            {passwordError && (
              <p className="mt-1 text-sm text-red">{passwordError}</p>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-1">
              <input className="rounded-md" type="checkbox" />
              <span className="text-[#8491A6]">Remember me</span>
            </div>
            <div
              className="cursor-pointer font-thin hover:underline"
              onClick={() => navigate('/ForgetPassword')} // Add onClick to navigate
            >
              Forgot password?
            </div>
          </div>

          <button
            className={`mt-9 w-full rounded-md py-2 ${isFormValid
              ? 'cursor-pointer bg-[#1D2532] text-white hover:bg-[#2C3E50]' // Enabled styles
              : 'cursor-not-allowed bg-[#EEEEEE]' // Disabled styles
              }`}
            disabled={!isFormValid}
            onClick={handleLogIn}
          >
            {loading ? <BeatLoader color="white" /> : 'Continue'}
          </button>

          <button className="mt-3 flex w-full items-center justify-center gap-1 rounded-md bg-[#EEEEEE] py-2 font-medium text-[#4E5B6F] dark:bg-[#1D2532] dark:text-white">
            Continue with Google
          </button>
          <div className="mt-3 text-center text-[#8A92A0] dark:text-white">
            Don't have an account?{' '}
            <span
              className="cursor-pointer text-[#647477] hover:underline dark:text-[#647477]"
              onClick={() => navigate('/SignUp')}
            >
              Sign up
            </span>
          </div>
        </div>

        {/* Carousel - Visible on Medium Screens and Up */}
        <div className="hidden h-full w-[55%] md:block">
          <Carousel />
        </div>
      </div>
    </>
  );
};

export default SignIn;
