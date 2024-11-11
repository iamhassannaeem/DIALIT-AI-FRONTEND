import React from 'react';

const CompaignToggle = ({ isModalOpen, setIsModalOpen, handleStartCampaign, item }) => {
    return (
        isModalOpen && (
            <div className="fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4">
                <div
                    className="w-full max-w-lg text-center rounded-lg bg-white py-7 px-8 dark:bg-boxdark"
                >
                    <p className="text-black dark:text-white font-bold text-xl">
                        Are you certain you want to stop this campaign? This action cannot be undone.
                    </p>
                    <div className="flex justify-center gap-3">
                        <button onClick={handleStartCampaign} className="text-white font-semibold bg-red px-4 py-2 rounded mt-8">
                            Stop Campaign
                        </button>
                        <button onClick={() => setIsModalOpen(false)} className="ml-2 bg-[#1F2937] text-white font-semibold px-4 py-2 rounded mt-8">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default CompaignToggle;
