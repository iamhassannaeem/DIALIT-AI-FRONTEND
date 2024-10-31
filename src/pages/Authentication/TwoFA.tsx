import { useState } from 'react';
import { verifyCode } from '../../api/modules/Swiftsync.class';
import { useLocation, useNavigate } from 'react-router-dom';
import Toaster from '../../components/Toast/Toast';
import { BeatLoader } from 'react-spinners';
import { loginSuccess } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { AuthService } from '../../services/authService';

const TwoFA = () => {
  const [code, setCode] = useState('');
  const [verror, setVError] = useState('');
  const [error, setError] = useState({ success: '', error: '' });
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const email = location?.state?.email;
  const navigate = useNavigate();
  const dispatch=useDispatch()
  // Handle button click
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) {
      setVError('Please enter the 6-digit code.');
    } else {
      setVError(''); // Clear any existing error
      // Proceed with verification logic here
    }
    setLoading(true);
    const payload={
        verification_code: code,
        user_email: email,
      }
    await AuthService.verifyCode(payload)
      .then((res) => {
        console.log(res?.data);
        if (res?.status === 200) {
          setError({ error: '', success: res?.data?.message });

        
      const refresh = res?.data?.refresh_token;
      const access = res?.data?.access_token;
      dispatch(loginSuccess({ access, refresh }));
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
      window.location.reload();
        //   setTimeout(() => {
        //     window.location.reload();
        //     navigate('/dashboard');
           
        //   }, 3000);
        } else {
          setError({
            error: 'The Provided Code is Invalid',
            success: '',
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };

  return (
    <>
      <Toaster message={error} />
      <div className="mt-10 flex items-center justify-center gap-7">
        {/* First Div - Full Width on Small Screens */}
        <div className="w-full rounded-md bg-[#EEEEEE] py-9 px-10 dark:bg-[#1D2532] md:w-[40%]">
          <div className="text-2xl font-normal text-black dark:text-white">
            Two Factor Authentication
          </div>
          <div className="text-[#75849B] dark:text-white">
            Open your email to enter the code.
          </div>

          <div>
            <input
              className="mt-4 h-10 w-full rounded-md bg-white pl-2 outline-none dark:bg-[#242E3E]"
              type="number"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          {error && <div className="text-red-500 mt-2">{verror}</div>}

          <button
            onClick={handleVerify}
            disabled={!code}
            className={`mt-4 w-full bg-white py-2 font-medium dark:bg-[#242E3E] ${
              !code ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            {loading ? <BeatLoader color="white" /> : 'Verify'}
          </button>
        </div>
      </div>
    </>
  );
};

export default TwoFA;
