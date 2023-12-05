import React, { useState, useEffect, useRef } from 'react';
import {
  DelRole,
  GetUserList,
  PlatformDel,
  PostUser,
  activeUser,
} from '../api/modules/Swiftsync.class';
import Toaster from './Toast/Toast';
import ban from '../images/organisation/ban.svg';
import { useNavigate } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
const Inactive: React.FC = ({ id,status ,setUser}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const trigger = useRef<any>(null);
  const modal = useRef<any>(null);
  const [error, setError] = useState({ success: '', error: '' });
  const [loading, setLoading] = useState(false);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!modal.current) return;
      if (
        !modalOpen ||
        modal.current.contains(target) ||
        trigger.current.contains(target) ||
        (target instanceof Node &&
          target.parentElement &&
          (target.parentElement.closest('form') ||
            target.parentElement.querySelector('.next-button')))
      )
        return;
      setModalOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  const handleDelete = async () => {
    const onNavigate = (path: To) => {
      navigate(path);
    };
    try {
      setLoading(true);
      await activeUser({ id: id }, onNavigate);
       const res = await GetUserList(onNavigate);
      setUser(res)
      setModalOpen(false);
      setLoading(false);

      setError({ success: `User ${status?"Inactive":"Activated"} Succesfully`, error: '' });
      
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Toaster message={error} />

      <a
        style={{ cursor: 'pointer' }}
        ref={trigger}
        onClick={() => setModalOpen(!modalOpen)}
      >
        <img src={ban} alt="" />
      </a>
      <div
        className={`fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 ${
          modalOpen ? 'block' : 'hidden'
        }`}
      >
        <div ref={modal} className="w-full max-w-142.5 rounded-lg">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex flex-wrap items-center">
                <div className="w-full border-stroke dark:border-strokedark  xl:border-l-2">
                  <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                    <h1 className="font-size-60 text-center font-bold">
                      Are you sure to want to {status?"Inactive":"Active"}?
                    </h1>
                    <div className="mt-7 flex justify-between gap-6">
                      <button
                        type="submit"
                        onClick={handleDelete}
                        className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                      >
                        {loading ? <BeatLoader color="white" /> : `${status?"Inactive":"Active"}`}
                      </button>

                      <button
                        onClick={() => setModalOpen(false)}
                        className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inactive;
