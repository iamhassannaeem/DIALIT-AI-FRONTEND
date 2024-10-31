import { useState } from 'react';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
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

    const navigate=useNavigate()
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
        navigate('/signin')
      } else {
        setError({ 
            error: JSON.parse(res?.message?.request?.response)?.message || 'An error occurred', 
            success: '' 
          });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <Toaster message={error}/>
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
          Continue with Google
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
    </div></>
  );
};

export default Signup;
