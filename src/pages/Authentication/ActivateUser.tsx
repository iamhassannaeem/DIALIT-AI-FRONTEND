import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Toaster from '../../components/Toast/Toast';
import { BeatLoader } from 'react-spinners';
import { activate } from '../../api/modules/Swiftsync.class';

const ActivateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ success: '', error: '' });
  const { token } = useParams();
  const navigate = useNavigate();
  const handleActivate = async () => {
    setLoading(true);
    const res = await activate(token);
    console.log(res);
    if (res?.status === 200) {
      setLoading(true);
      setError({ error: '', success: res?.data?.message });
      setTimeout(() => {
        navigate('/signin');
      }, 3000);
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
      <Toaster message={error} />
      <div className="mt-10  flex items-center justify-center gap-7">
        {/* First Div - Full Width on Small Screens */}
        <div className="w-full rounded-md bg-[#EEEEEE] py-9 px-10 dark:bg-[#1D2532] md:w-[35%]">
          <div className="text-2xl font-normal text-black dark:text-white">
            Click Active button to Activate Your Account
          </div>
          <div className="mt-5 flex items-center justify-center">
            <button
              className="cursor-pointer bg-white p-3 font-semibold text-black"
              onClick={handleActivate}
            >
              {loading ? <BeatLoader /> : 'Activate'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivateUser;
