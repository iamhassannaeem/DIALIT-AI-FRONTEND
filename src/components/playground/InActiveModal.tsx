import React, { useState } from 'react';
import './modal.css';
import {
  getPhoneNumber,
  inactivePhoneNumber,
} from '../../api/modules/Swiftsync.class';

const InActiveModal = ({
  isOpen,
  openModal,
  closeModal,
  setError,
  id,
  status,
  setData,
}: {
  id: number;
  isOpen: any;
  setIsOpen: any;
  closeModal: any;
  openModal: any;
  status: string;
  setData: any;
  setError: (error: string | null) => void;
}) => {
  const handleInActive = async () => {
    const resp = await inactivePhoneNumber(id, {
      status: status == 'inactive' ? 'active' : 'inactive',
    });
    if (resp?.status === 200) {
      closeModal();
      setError({ success: resp?.data?.status, error: '' });
    }else{
      closeModal();
      setError({ success: '', error: 'Unable to mark it as Inactive' });
    }

    const res = await getPhoneNumber();
    setData(res);
  };
  return (
    <div>
      <button
        onClick={openModal}
        type="submit"
        className="flex items-center justify-center gap-[6px] rounded-[4px] bg-[#2691B6] p-3 text-xs font-semibold text-white"
      >
        <span>Change Status</span>
      </button>

      {isOpen && (
        <div className=" fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/95 ">
          <div className="flex w-full max-w-142.5 flex-col gap-6 rounded-lg bg-[#EEEEEE]  p-8 dark:bg-[#222e42] ">
            <div className=" flex items-center justify-between ">
              <h2 className="text-lg font-semibold text-[#1D2532] dark:text-white">
                Are You sure to {status == 'inactive' ? 'Active' : 'InActive'}{' '}
                the Phone Number ?
              </h2>

              <svg
                className="cursor-pointer h-8 w-8 sm:h-6 sm:w-6"
                onClick={closeModal}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                
              >
                <path
                  className="fill-[#1D2532] dark:fill-white "
                  d="M11.9998 13.4L7.0998 18.3C6.91647 18.4834 6.68314 18.575 6.3998 18.575C6.11647 18.575 5.88314 18.4834 5.6998 18.3C5.51647 18.1167 5.4248 17.8834 5.4248 17.6C5.4248 17.3167 5.51647 17.0834 5.6998 16.9L10.5998 12L5.6998 7.10005C5.51647 6.91672 5.4248 6.68338 5.4248 6.40005C5.4248 6.11672 5.51647 5.88338 5.6998 5.70005C5.88314 5.51672 6.11647 5.42505 6.3998 5.42505C6.68314 5.42505 6.91647 5.51672 7.0998 5.70005L11.9998 10.6L16.8998 5.70005C17.0831 5.51672 17.3165 5.42505 17.5998 5.42505C17.8831 5.42505 18.1165 5.51672 18.2998 5.70005C18.4831 5.88338 18.5748 6.11672 18.5748 6.40005C18.5748 6.68338 18.4831 6.91672 18.2998 7.10005L13.3998 12L18.2998 16.9C18.4831 17.0834 18.5748 17.3167 18.5748 17.6C18.5748 17.8834 18.4831 18.1167 18.2998 18.3C18.1165 18.4834 17.8831 18.575 17.5998 18.575C17.3165 18.575 17.0831 18.4834 16.8998 18.3L11.9998 13.4Z"
                  fill="#D6D6D5"
                />
              </svg>
            </div>

            <div className="flex justify-between gap-[8px]">
              <button
                type="button"
                onClick={closeModal}
                className="flex w-full items-center justify-center gap-2 rounded-[6px] bg-[#2691B6] p-[12px] text-sm font-semibold text-white"
              >
                <span>Close</span>
              </button>
              <button
                type="button"
                onClick={handleInActive}
                className="flex w-full items-center justify-center gap-2 rounded-[6px] bg-[#2691B6] p-[12px] text-sm font-semibold text-white"
              >
                <span>{status == 'inactive' ? 'Active' : 'InActive'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InActiveModal;
