import { useState } from 'react';


import { resetPassword } from '../api/modules/Swiftsync.class'

const ResetPassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [oldPasswordError, setOldPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ success: '', error: '' });


    const handleResetPassword = async () => {
        if (!oldPassword) setOldPasswordError('Old password is required.');
        else setOldPasswordError('');

        if (!newPassword) setNewPasswordError('New password is required.');
        else setNewPasswordError('');

        setLoading(true);
        const res = await resetPassword({
            old_password: oldPassword,
            new_password: newPassword,
        });
        console.log(res);
        if (res?.status === 200) {
            setLoading(true);
            setError({ error: '', success: res?.data?.message });
            //   setTimeout(() => {
            //     navigate('signin');
            //   }, 3000);
        } else {
            setError({
                error: res?.message?.response?.data?.error,
                success: '',
            });
        }
        setLoading(false);
    };

    const handleOldPasswordChange = (e: any) => {
        setOldPassword(e.target.value);
        if (e.target.value) setOldPasswordError('');
    };

    const handleNewPasswordChange = (e: any) => {
        setNewPassword(e.target.value);
        if (e.target.value) setNewPasswordError('');
    };

    return (
        <div className=" rounded-md bg-[#EEEEEE]  py-9 px-10 dark:bg-[#1D2532]">
            <div className="text-2xl font-normal mb-4 text-black dark:text-white">
                Reset Password
            </div>


            {/* Input Fields in Flex Row Layout */}
            <div className="flex flex-wrap mb-3 justify-start w-full gap-9">
                {/* Old Password */}
                <div className="w-full ">
                    <label htmlFor="oldPassword" className="text-[#75849B] dark:text-white">Old password</label>
                    <input
                        className="mt-1 h-10 w-full rounded-md bg-white pl-2 outline-none dark:bg-[#242E3E]"
                        type="password"
                        id="oldPassword"
                        placeholder="Enter old password"
                        value={oldPassword}
                        onChange={handleOldPasswordChange}
                    />
                </div>

                {/* New Password */}
                <div className="w-full ">
                    <label htmlFor="newPassword" className="text-[#75849B] dark:text-white">New password</label>
                    <input
                        className="mt-1 h-10 pl-2 w-full rounded-md bg-white outline-none dark:bg-[#242E3E]"
                        type="password"
                        id="newPassword"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                    />
                    {newPasswordError && (
                        <div className="mt-1 text-sm text-red-500">{newPasswordError}</div>
                    )}
                </div>
            </div>



            {/* Reset Button */}
            <div className="w-full text-center">
                <button
                    onClick={handleResetPassword}
                    disabled={!oldPassword || !newPassword}
                    className={`mt-6 w-full py-2 rounded-md bg-white font-medium text-[#4E5B6F] dark:bg-[#242E3E] dark:text-white ${!oldPassword || !newPassword ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                    Reset Password
                </button>
            </div>
        </div>



    );
};

export default ResetPassword;
