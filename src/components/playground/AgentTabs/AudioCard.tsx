import React from 'react';
import audio from '../../../images/agenttabsimages/audio.svg';

const AudioCard = () => {
  return (
    <div className="flex items-center justify-center rounded-xl bg-[#c0bfbf] p-4 dark:bg-[#242E3E] sm:p-6">
      <div className="flex w-full flex-col gap-4 rounded-lg shadow-lg">
        <div className="flex flex-col items-start gap-[6px]">
          <div className="flex items-center justify-start gap-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-black dark:fill-white"
                d="M7 17V7C7 6.71667 7.09583 6.47917 7.2875 6.2875C7.47917 6.09583 7.71667 6 8 6C8.28333 6 8.52083 6.09583 8.7125 6.2875C8.90417 6.47917 9 6.71667 9 7V17C9 17.2833 8.90417 17.5208 8.7125 17.7125C8.52083 17.9042 8.28333 18 8 18C7.71667 18 7.47917 17.9042 7.2875 17.7125C7.09583 17.5208 7 17.2833 7 17ZM11 21V3C11 2.71667 11.0958 2.47917 11.2875 2.2875C11.4792 2.09583 11.7167 2 12 2C12.2833 2 12.5208 2.09583 12.7125 2.2875C12.9042 2.47917 13 2.71667 13 3V21C13 21.2833 12.9042 21.5208 12.7125 21.7125C12.5208 21.9042 12.2833 22 12 22C11.7167 22 11.4792 21.9042 11.2875 21.7125C11.0958 21.5208 11 21.2833 11 21ZM3 13V11C3 10.7167 3.09583 10.4792 3.2875 10.2875C3.47917 10.0958 3.71667 10 4 10C4.28333 10 4.52083 10.0958 4.7125 10.2875C4.90417 10.4792 5 10.7167 5 11V13C5 13.2833 4.90417 13.5208 4.7125 13.7125C4.52083 13.9042 4.28333 14 4 14C3.71667 14 3.47917 13.9042 3.2875 13.7125C3.09583 13.5208 3 13.2833 3 13ZM15 17V7C15 6.71667 15.0958 6.47917 15.2875 6.2875C15.4792 6.09583 15.7167 6 16 6C16.2833 6 16.5208 6.09583 16.7125 6.2875C16.9042 6.47917 17 6.71667 17 7V17C17 17.2833 16.9042 17.5208 16.7125 17.7125C16.5208 17.9042 16.2833 18 16 18C15.7167 18 15.4792 17.9042 15.2875 17.7125C15.0958 17.5208 15 17.2833 15 17ZM19 13V11C19 10.7167 19.0958 10.4792 19.2875 10.2875C19.4792 10.0958 19.7167 10 20 10C20.2833 10 20.5208 10.0958 20.7125 10.2875C20.9042 10.4792 21 10.7167 21 11V13C21 13.2833 20.9042 13.5208 20.7125 13.7125C20.5208 13.9042 20.2833 14 20 14C19.7167 14 19.4792 13.9042 19.2875 13.7125C19.0958 13.5208 19 13.2833 19 13Z"
                fill="#333B48"
              />
            </svg>

            <h5 className="text-base font-semibold text-[#1D2532] dark:text-white">
              Audio
            </h5>
          </div>
          <span className="text-sm font-normal text-[#7E7E7E] dark:text-[#D6D6D5]">
            This section allows you to configure audio settings for the
            assistant.
          </span>
        </div>

        {/* Text to Speech Section */}
        <div className="rounded-lg bg-[#EEEEEE]  p-4 dark:bg-[#1D2532]">
          <h6 className="mb-2 font-semibold text-[#1D2532] dark:text-white">
            Text to Speech
          </h6>
          <p className="mb-2 text-sm text-[#7E7E7E] dark:text-[#D6D6D5]">
            Lorem ipsum dolor sit amet
          </p>
          <div className="flex w-full flex-wrap items-center justify-between  gap-2">
            <div className="flex w-full flex-col justify-start md:w-[32%]">
              <label className="text-sm font-normal text-[#9AAAB9]">
                Provider
              </label>
              <select className="w-full cursor-pointer rounded-md border-2 border-[#333B48] bg-[#EEEEEE] p-3 text-sm font-normal text-[#1D2532] focus:outline-none focus:ring dark:bg-[#242E3E]  dark:text-white">
                <option value="OpenAI">OpenAI</option>
                <option value="Amazon">Amazon</option>
                <option value="Google">Google</option>
              </select>
            </div>
            <div className="flex w-full flex-col justify-start md:w-[32%]">
              <label className="text-sm font-normal text-[#9AAAB9]">
                Gender
              </label>
              <select className="w-full cursor-pointer rounded-md border-2 border-[#333B48] bg-[#EEEEEE] p-3 text-sm font-normal text-[#1D2532] focus:outline-none focus:ring dark:bg-[#242E3E]  dark:text-white">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="flex w-full flex-col justify-start md:w-[32%]">
              <label className="text-sm font-normal text-[#9AAAB9]">
                Audio
              </label>
              <select className="w-full cursor-pointer rounded-md border-2 border-[#333B48] bg-[#EEEEEE] p-3 text-sm font-normal text-[#1D2532] focus:outline-none focus:ring dark:bg-[#242E3E]  dark:text-white">
                <option value="Voice1">Wise Guide Man</option>
                <option value="Voice2">Gentlewoman</option>
              </select>
            </div>
          </div>
        </div>

        {/* Speech to Text Section */}
        <div className="rounded-lg bg-[#EEEEEE]  p-4 dark:bg-[#1D2532]">
          <h6 className="mb-2 font-semibold text-[#1D2532] dark:text-white">
            Speech to Text
          </h6>
          <p className="mb-2 text-sm text-[#7E7E7E] dark:text-[#D6D6D5]">
            Lorem ipsum dolor sit amet
          </p>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-normal text-[#9AAAB9]">
              Provider
            </label>
            <select className=" w-[70%] cursor-pointer rounded-md border-2 border-[#333B48] bg-[#EEEEEE]  p-3 text-sm font-normal text-[#1D2532] focus:outline-none focus:ring dark:bg-[#242E3E]  dark:text-white">
              <option value="OpenAI">OpenAI</option>
              <option value="Amazon">Amazon</option>
              <option value="Google">Google</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioCard;
