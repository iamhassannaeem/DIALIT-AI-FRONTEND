import React, { useState } from 'react';
import {
  compaignsList,
  stopCampaigns,
} from '../../api/modules/Swiftsync.class';
import { BeatLoader } from 'react-spinners';

const CompaignToggle = ({
  isModalOpen,
  setIsModalOpen,
  item,
  setError,
  setCampaigns,
}) => {
  const [loading, setLoading] = useState(false);

  const handleStartCampaign = async () => {
    setLoading(true);
    const res = await stopCampaigns(item);
    console.log(res);
    if (res?.status === 200) {
      const res = await compaignsList();

      setCampaigns(res?.data);
    }
    setError({ error: '', success: res?.data?.message });
    setLoading(false);

    setIsModalOpen(false);
  };

  return (
    isModalOpen && (
      <div className="fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4">
        <div className="w-full max-w-lg rounded-lg bg-white py-7 px-8 text-center dark:bg-boxdark">
          <p className="text-xl font-bold text-black dark:text-white">
            Are you certain you want to stop this campaign? This action cannot
            be undone.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleStartCampaign}
              className="mt-8 rounded bg-red px-4 py-2 font-semibold text-white"
            >
              {loading ? <BeatLoader color="white" /> : 'Stop Campaign'}
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="ml-2 mt-8 rounded bg-[#1F2937] px-4 py-2 font-semibold text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default CompaignToggle;
