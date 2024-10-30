import { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import Carousel from "../../components/Carousel/Carousel";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [showPasswd, setShowPasswd] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (value: any) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (value: any) => {
    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
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

  return (
    <div className="flex mt-3 items-center justify-center gap-7">
      {/* First Div - Full Width on Small Screens */}
      <div className="w-full md:w-[50%]">
        <div className="text-black dark:text-white font-normal text-2xl">Login to your account</div>
        <div className="text-[#75849B] dark:text-white">Welcome back! Enter your credentials to access your account</div>

        <div className="text-[#75849B] dark:text-white mt-6">
          <label htmlFor="email">Email</label>
        </div>
        <div>
          <input
            className="w-full outline-none h-10 rounded-md mt-1 border border-stroke bg-[#EEEEEE] dark:bg-[#1D2532] pl-2"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="name@company.com"
          />
          {emailError && <p className="text-red text-sm mt-1">{emailError}</p>}
        </div>

        <div className="text-[#75849B] dark:text-white mt-6">
          <label htmlFor="password">Password</label>
        </div>
        <div className="relative mt-1">
          <input
            id="password"
            name="password"
            type={showPasswd ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            className="w-full outline-none h-10 rounded-md border border-stroke bg-[#EEEEEE] dark:bg-[#1D2532] pl-2"
          />
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer"
            onClick={() => setShowPasswd(!showPasswd)}
          >
            {showPasswd ? (
              <VscEye className="text-black dark:text-white" />
            ) : (
              <VscEyeClosed className="text-black dark:text-white" />
            )}
          </div>
          {passwordError && <p className="text-red text-sm mt-1">{passwordError}</p>}
        </div>

        <div className="flex mt-4 items-center justify-between">
          <div className="flex gap-1">
            <input className="rounded-md" type="checkbox" />
            <span className="text-[#8491A6]">Remember me</span>
          </div>
          <div
            className="font-thin hover:underline cursor-pointer"
            onClick={() => navigate('/Authentication/ForgetPassword')} // Add onClick to navigate
          >
            Forgot password?
          </div>
        </div>

        <button
          className={`w-full py-2 rounded-md mt-9 ${isFormValid
            ? "bg-[#1D2532] text-white hover:bg-[#2C3E50] cursor-pointer" // Enabled styles
            : "bg-[#EEEEEE] cursor-not-allowed" // Disabled styles
            }`}
          disabled={!isFormValid}
        >
          Continue
        </button>

        <button className="w-full gap-1 flex items-center justify-center py-2 rounded-md bg-[#EEEEEE] dark:bg-[#1D2532] text-[#4E5B6F] font-medium dark:text-white mt-3">
          <FcGoogle />
          Continue with Google
        </button>
        <div className="text-center text-[#8A92A0] dark:text-white mt-3">
          Don't have an account? <span className="text-[#647477] dark:text-[#647477] hover:underline cursor-pointer" onClick={() => navigate('/Authentication/SignUp')}>Sign up</span>
        </div>
      </div>

      {/* Carousel - Visible on Medium Screens and Up */}
      <div className="hidden md:block w-[50%] h-full">
        <Carousel />
      </div>
    </div>
  );
};

export default SignIn;
