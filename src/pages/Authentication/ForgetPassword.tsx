import { useState } from "react";


const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const validateEmail = (value: any) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            setEmailError("Please enter a valid email address");
        } else {
            setEmailError("");
        }
    };

    const handleEmailChange = (e: any) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
    };

    const isEmailValid = email && !emailError;

    return (
        <div className="flex  mt-10 items-center justify-center gap-7">
            {/* First Div - Full Width on Small Screens */}
            <div className="w-full bg-[#EEEEEE] dark:bg-[#1D2532] py-9 px-10 rounded-md md:w-[35%]">
                <div className="text-black dark:text-white font-normal text-2xl">Reset Password</div>
                <div className="text-[#75849B] dark:text-white">
                    Enter the email address associated with your account, and we'll email you a link to reset your password.
                </div>

                <div className="text-[#75849B] dark:text-white mt-6">
                    <label htmlFor="email">Email</label>
                </div>
                <div>
                    <input
                        className="w-full outline outline-none h-10 rounded-md mt-1 bg-white dark:bg-[#242E3E] pl-2"
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="name@company.com"
                    />
                    {emailError && <p className="text-red text-sm mt-1">{emailError}</p>}
                </div>

                <button
                    className={`w-full py-2 rounded-md mt-9 ${isEmailValid
                        ? "bg-white text-black font-semibold cursor-pointer" // Enabled styles with no blur
                        : "bg-white bg-opacity-60 backdrop-blur-md text-gray-400 cursor-not-allowed" // Blurred background for disabled state
                        }`}
                    disabled={!isEmailValid}
                >
                    Reset Password
                </button>


                <button className="w-full gap-1 flex items-center justify-center py-2 rounded-md bg-white dark:bg-[#242E3E] text-[#4E5B6F] font-medium dark:text-white mt-3">
                    Cancel
                </button>
            </div>


        </div>
    );
};

export default ForgetPassword;
