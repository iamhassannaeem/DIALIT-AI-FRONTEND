import { useState } from 'react';
import Toaster from '../../components/Toast/Toast';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../api/modules/Swiftsync.class';

const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ success: '', error: '' });
  const navigate = useNavigate();
  const handleResetPassword =async () => {
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
    <>
      <Toaster message={error} />
      <div className="w-full rounded-md bg-[#EEEEEE] py-9 px-10 dark:bg-[#1D2532] md:w-[40%]">
        <div className="text-2xl font-normal text-black dark:text-white">
          Reset Password
        </div>

        <div className="mt-6 text-[#75849B] dark:text-white">
          <label htmlFor="oldPassword">Old password</label>
        </div>
        <div>
          <input
            className="mt-1 h-10 w-full rounded-md bg-white pl-2 outline-none dark:bg-[#242E3E]"
            type="password"
            id="oldPassword"
            placeholder="Enter old password"
            value={oldPassword}
            onChange={handleOldPasswordChange}
          />
        </div>

        <div className="mt-3 text-[#75849B] dark:text-white">
          <label htmlFor="newPassword">New password</label>
        </div>
        <div>
          <input
            className="mt-1 h-10 w-full rounded-md bg-white pl-2 outline-none dark:bg-[#242E3E]"
            type="password"
            id="newPassword"
            placeholder="Enter new password"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
          {newPasswordError && (
            <div className="mt-1 text-sm text-red">{newPasswordError}</div>
          )}
        </div>

        <div className="text-center">
          <button
            onClick={handleResetPassword}
            disabled={!oldPassword || !newPassword}
            className={`mt-6 flex w-full items-center justify-center gap-1 rounded-md bg-white py-2 font-medium text-[#4E5B6F] dark:bg-[#242E3E] dark:text-white ${
              !oldPassword || !newPassword
                ? 'cursor-not-allowed opacity-50'
                : ''
            }`}
          >
            Reset Password
          </button>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
