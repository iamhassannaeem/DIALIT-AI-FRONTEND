import { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import Carousel from "../../components/Carousel/Carousel";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [showPasswd, setShowPasswd] = useState(false);
    const [showConfirmPasswd, setShowConfirmPasswd] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

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
        validateConfirmPassword(confirmPassword, e.target.value);
    };

    const handleConfirmPasswordChange = (e: any) => {
        setConfirmPassword(e.target.value);
        validateConfirmPassword(e.target.value, password);
    };

    const validateConfirmPassword = (confirmValue, passwordValue) => {
        if (confirmValue && confirmValue !== passwordValue) {
            setConfirmPasswordError("Passwords do not match");
        } else {
            setConfirmPasswordError("");
        }
    };

    const isFormValid = email && password && confirmPassword && !emailError && !passwordError && !confirmPasswordError;

    return (
        <div className="flex items-center  justify-center gap-7">
            {/* First Div - Full Width on Small Screens */}
            <div className="w-full md:w-[52%]">
                <div className="text-black dark:text-white font-normal text-2xl">Create account</div>
                <div className="text-[#75849B] dark:text-white">Sign up for an account to get started</div>

                <div className="text-[#75849B] dark:text-white mt-6">
                    <label htmlFor="email">Email</label>
                </div>
                <div>
                    <input
                        className="w-full h-10 rounded-md mt-1 border border-stroke bg-[#EEEEEE] dark:bg-[#1D2532] pl-2 transition-all duration-200 box-border"
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
                        className="w-full h-10 rounded-md outline outline-none border border-stroke bg-[#EEEEEE] dark:bg-[#1D2532] pl-2 transition-all duration-200 box-border"
                    />
                    <div
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer"
                        onClick={() => setShowPasswd(!showPasswd)}
                    >
                        <div className="text-black dark:text-white">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    </div>
                    {passwordError && <p className="text-red text-sm mt-1">{passwordError}</p>}
                </div>

                <div className="text-[#75849B] dark:text-white mt-6">
                    <label htmlFor="confirmPassword">Confirm your password</label>
                </div>
                <div className="relative mt-1">
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPasswd ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        placeholder="Confirm Password"
                        className="w-full outline outline-none h-10 rounded-md border border-stroke bg-[#EEEEEE] dark:bg-[#1D2532] pl-2 transition-all duration-200 box-border"
                    />
                    <div
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer"
                        onClick={() => setShowConfirmPasswd(!showConfirmPasswd)}
                    >
                        <div className="text-black dark:text-white">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    </div>
                    {confirmPasswordError && <p className="text-red text-sm mt-1">{confirmPasswordError}</p>}
                </div>

                <button
                    className={`w-full py-2 rounded-md mt-9 ${isFormValid
                        ? "bg-[#1D2532] text-white hover:bg-[#2C3E50] cursor-pointer" // Enabled styles
                        : "bg-[#EEEEEE] cursor-not-allowed" // Disabled styles
                        }`}
                    disabled={!isFormValid}
                >
                    Continue with email
                </button>

                <button className="w-full gap-1 flex items-center justify-center py-2 rounded-md bg-[#EEEEEE] dark:bg-[#1D2532] text-[#4E5B6F] font-medium dark:text-white mt-3">
                    <FcGoogle />
                    Continue with Google
                </button>
                <div className="text-center text-[#8A92A0] dark:text-white mt-3">
                    By signing up you agree to the <span className="text-[#647477] dark:text-[#647477] hover:underline cursor-pointer">Terms of services <span>&</span> <span>Privacy Policy</span></span>
                </div>
            </div>

            {/* Carousel - Visible on Medium Screens and Up */}
            <div className="hidden md:block w-[48%] h-full">
                <Carousel />
            </div>
        </div>
    );
};

export default Signup;
