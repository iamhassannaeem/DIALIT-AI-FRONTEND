import { useState } from "react";

const ResetPassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [oldPasswordError, setOldPasswordError] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");

    const handleResetPassword = () => {
        if (!oldPassword) setOldPasswordError("Old password is required.");
        else setOldPasswordError("");

        if (!newPassword) setNewPasswordError("New password is required.");
        else setNewPasswordError("");
    };

    const handleOldPasswordChange = (e: any) => {
        setOldPassword(e.target.value);
        if (e.target.value) setOldPasswordError("");
    };

    const handleNewPasswordChange = (e: any) => {
        setNewPassword(e.target.value);
        if (e.target.value) setNewPasswordError("");
    };

    return (
        <div className="flex mt-10 items-center justify-center gap-7">
            <div className="w-full bg-[#EEEEEE] dark:bg-[#1D2532] py-9 px-10 rounded-md md:w-[35%]">
                <div className="text-black dark:text-white font-normal text-2xl">Reset Password</div>

                <div className="text-[#75849B] dark:text-white mt-6">
                    <label htmlFor="oldPassword">Old password</label>
                </div>
                <div>
                    <input
                        className="w-full outline-none h-10 rounded-md mt-1 bg-white dark:bg-[#242E3E] pl-2"
                        type="password"
                        id="oldPassword"
                        placeholder="Enter old password"
                        value={oldPassword}
                        onChange={handleOldPasswordChange}
                    />
                    {/* {oldPasswordError && (
            <div className="text-red-500 text-sm mt-1">{oldPasswordError}</div>
          )} */}
                </div>

                <div className="text-[#75849B] dark:text-white mt-3">
                    <label htmlFor="newPassword">New password</label>
                </div>
                <div>
                    <input
                        className="w-full outline-none h-10 rounded-md mt-1 bg-white dark:bg-[#242E3E] pl-2"
                        type="password"
                        id="newPassword"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                    />
                    {/* {newPasswordError && (
            <div className="text-red text-sm mt-1">{newPasswordError}</div>
          )} */}
                </div>

                <div className="text-center">
                    <button
                        onClick={handleResetPassword}
                        disabled={!oldPassword || !newPassword}
                        className={`w-full gap-1 flex items-center justify-center py-2 rounded-md bg-white dark:bg-[#242E3E] text-[#4E5B6F] font-medium dark:text-white mt-6 ${!oldPassword || !newPassword ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        Reset Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
