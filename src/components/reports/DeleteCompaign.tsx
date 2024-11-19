import React, { useRef, useState } from 'react';
import {
  compaignsList,
  deleteCompaign,
} from '../../api/modules/Swiftsync.class';
import { BeatLoader } from 'react-spinners';

export const DeleteCompaign = ({
  modalOpenDelete,
  setModalOpenDelete,
  item,
  setCampaigns,
  setError
}) => {
  const delmodal = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await deleteCompaign(item?.id);
      console.log(res?.status===204);
      const resp = await compaignsList();
      if (res?.status===204) {
        setError({ error: '', success: 'Compaign deleted successfully' });
        setModalOpenDelete(false);
        setCampaigns(resp?.data);
      }
      else
      {
        setError({ error: 'Issue in deleting the compaign', success: '' });
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <div
      className={`fixed top-0 left-0 z-999999 flex h-screen min-h-screen w-full items-center justify-center  px-4 ${
        modalOpenDelete ? 'block' : 'hidden'
      }`}
    >
      <div
        ref={delmodal}
        className="w-full max-w-142.5 rounded-lg  bg-[#EEEEEE] p-8 dark:bg-[#222e42]"
      >
        <div className="text-center ">
          <svg
            className="mx-auto mb-4 h-10 w-10 text-black dark:text-gray"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 className="mb-5 text-center text-lg font-normal text-[#1d2532] dark:text-white">
            Are you sure you want to delete this entry?
          </h3>
          <div className="items flex justify-center gap-x-3">
            <button
              type="button"
              onClick={handleDelete}
              data-modal-hide="popup-modal"
              className="inline-flex items-center rounded-lg bg-[#E02424] px-5 py-2.5 text-center text-base font-bold text-white outline-none"
            >
              {loading ? <BeatLoader color="white" /> : "Yes, I'm sure"}
            </button>
            <button
              data-modal-hide="popup-modal"
              onClick={() => setModalOpenDelete(false)}
              className="inline-flex items-center rounded-lg bg-[#1F2937] px-5 py-2.5 text-center text-base font-bold text-white outline-none"
            >
              No, Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
