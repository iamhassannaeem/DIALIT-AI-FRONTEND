import { useState } from 'react';
import { forgetPassword } from '../../api/modules/Swiftsync.class';
import { useNavigate } from 'react-router-dom';
import Toaster from '../../components/Toast/Toast';
import { BeatLoader } from 'react-spinners';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
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

  const handleEmailChange = (e: any) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };
  const isEmailValid = email && !emailError;
  const navigate = useNavigate();
  const handleForget = async () => {
    setLoading(true);
    const res = await forgetPassword({ email: email });
    console.log(res);
    if (res?.status === 200) {
      setLoading(true);
      setError({ error: '', success: res?.data?.message });
    } else {
      setError({
        error: res?.message?.response?.data?.error,
        success: '',
      });
    }
    setLoading(false);
  };

  return (
    <>
    <Toaster message={error}/>
    <div className="mt-10  flex items-center justify-center gap-7">
      {/* First Div - Full Width on Small Screens */}
      <div className="w-full rounded-md bg-[#EEEEEE] py-9 px-10 dark:bg-[#1D2532] md:w-[35%]">
        <div className="text-2xl font-normal text-black dark:text-white">
          Forget Password
        </div>
        <div className="text-[#75849B] dark:text-white">
          Enter the email address associated with your account, and we'll email
          you a link to reset your password.
        </div>

        <div className="mt-6 text-[#75849B] dark:text-white">
          <label htmlFor="email">Email</label>
        </div>
        <div>
          <input
            className="mt-1 h-10 w-full rounded-md bg-white pl-2 outline-none outline dark:bg-[#242E3E]"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter Your Email"
          />
          {emailError && <p className="mt-1 text-sm text-red">{emailError}</p>}
        </div>

        <button
          className={`mt-9 w-full rounded-md py-2 ${
            isEmailValid
              ? 'cursor-pointer bg-white font-semibold text-black' // Enabled styles with no blur
              : 'text-gray-400 cursor-not-allowed bg-white bg-opacity-60 backdrop-blur-md' // Blurred background for disabled state
          }`}
          disabled={!isEmailValid}
          onClick={handleForget}
        >
         {loading? <BeatLoader/>:"Forget Password"} 
        </button>

        <button onClick={()=>navigate(-1)} className="mt-3 flex w-full items-center justify-center gap-1 rounded-md bg-white py-2 font-medium text-[#4E5B6F] dark:bg-[#242E3E] dark:text-white">
          Cancel
        </button>
      </div>
    </div></>
  );
};

export default ForgetPassword;
