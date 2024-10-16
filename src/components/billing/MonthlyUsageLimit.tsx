import { useState } from "react";
import React from "react";

const MonthlyUsageData = [
  {
    ID: 1,
    Amount: 10,
    DailyUsage: "$0.00",
    MonthlyUsage: "$0.30",
  },
];

const MonthlyUsageLimit = () => {
  const [number, setNumber] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const regex = /^[0-9]*$/;
    if (regex.test(e.target.value)) {
      setNumber(e.target.value);
      setError(false);
    } else {
      setError(true);
    }
  };
  return (
    <div>
      {MonthlyUsageData?.map((MonthlyUsageData) => (
        <div className="h-[326px] p-6 gap-6 rounded-xl	bg-[#1D2532]">
          <div className="flex pb-2.5 gap-2.5">
            <span>
              <h5 className="text-white font-semibold	text-base gap-2.5">
                Monthly Usage Limit
              </h5>
            </span>
            <span className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 17C12.2833 17 12.5208 16.9042 12.7125 16.7125C12.9042 16.5208 13 16.2833 13 16V12C13 11.7167 12.9042 11.4792 12.7125 11.2875C12.5208 11.0958 12.2833 11 12 11C11.7167 11 11.4792 11.0958 11.2875 11.2875C11.0958 11.4792 11 11.7167 11 12V16C11 16.2833 11.0958 16.5208 11.2875 16.7125C11.4792 16.9042 11.7167 17 12 17ZM12 9C12.2833 9 12.5208 8.90417 12.7125 8.7125C12.9042 8.52083 13 8.28333 13 8C13 7.71667 12.9042 7.47917 12.7125 7.2875C12.5208 7.09583 12.2833 7 12 7C11.7167 7 11.4792 7.09583 11.2875 7.2875C11.0958 7.47917 11 7.71667 11 8C11 8.28333 11.0958 8.52083 11.2875 8.7125C11.4792 8.90417 11.7167 9 12 9ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
                  fill="#8EC3D2"
                />
              </svg>
            </span>
          </div>
          <div className="pb-14">
            <div className="bg-[#242E3E] p-3 gap-3 border-[1px] border-[#333B48] rounded-md	flex">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12.0247 21C11.7414 21 11.5039 20.9042 11.3122 20.7125C11.1206 20.5208 11.0247 20.2833 11.0247 20V18.85C10.2747 18.6833 9.61639 18.3917 9.04973 17.975C8.48306 17.5583 8.02473 16.975 7.67473 16.225C7.55806 15.9917 7.55389 15.7458 7.66223 15.4875C7.77056 15.2292 7.96639 15.0417 8.24973 14.925C8.48306 14.825 8.72473 14.8292 8.97473 14.9375C9.22473 15.0458 9.41639 15.225 9.54973 15.475C9.83306 15.975 10.1914 16.3542 10.6247 16.6125C11.0581 16.8708 11.5914 17 12.2247 17C12.9081 17 13.4872 16.8458 13.9622 16.5375C14.4372 16.2292 14.6747 15.75 14.6747 15.1C14.6747 14.5167 14.4914 14.0542 14.1247 13.7125C13.7581 13.3708 12.9081 12.9833 11.5747 12.55C10.1414 12.1 9.15806 11.5625 8.62473 10.9375C8.09139 10.3125 7.82473 9.55 7.82473 8.65C7.82473 7.56667 8.17473 6.725 8.87473 6.125C9.57473 5.525 10.2914 5.18333 11.0247 5.1V4C11.0247 3.71667 11.1206 3.47917 11.3122 3.2875C11.5039 3.09583 11.7414 3 12.0247 3C12.3081 3 12.5456 3.09583 12.7372 3.2875C12.9289 3.47917 13.0247 3.71667 13.0247 4V5.1C13.6581 5.2 14.2081 5.40417 14.6747 5.7125C15.1414 6.02083 15.5247 6.4 15.8247 6.85C15.9747 7.06667 16.0039 7.30833 15.9122 7.575C15.8206 7.84167 15.6331 8.03333 15.3497 8.15C15.1164 8.25 14.8747 8.25417 14.6247 8.1625C14.3747 8.07083 14.1414 7.90833 13.9247 7.675C13.7081 7.44167 13.4539 7.2625 13.1622 7.1375C12.8706 7.0125 12.5081 6.95 12.0747 6.95C11.3414 6.95 10.7831 7.1125 10.3997 7.4375C10.0164 7.7625 9.82473 8.16667 9.82473 8.65C9.82473 9.2 10.0747 9.63333 10.5747 9.95C11.0747 10.2667 11.9414 10.6 13.1747 10.95C14.3247 11.2833 15.1956 11.8125 15.7872 12.5375C16.3789 13.2625 16.6747 14.1 16.6747 15.05C16.6747 16.2333 16.3247 17.1333 15.6247 17.75C14.9247 18.3667 14.0581 18.75 13.0247 18.9V20C13.0247 20.2833 12.9289 20.5208 12.7372 20.7125C12.5456 20.9042 12.3081 21 12.0247 21Z"
                    fill="#D6D6D5"
                  />
                </svg>
              </span>
              <input
                className="font-normal bg-[#242E3E]  text-[#D6D6D5]/30 border-0 outline-none text-sm"
                name="number"
                type="numeric"
                value={number}
                onChange={handleChange}
                placeholder="Enter Amount Here"
              />

              {/* <span className="font-normal text-[#D6D6D5]/30 text-sm">
                {MonthlyUsageData?.Amount}
              </span> */}
            </div>
            <div>
              {error && (
                <p className="text-rose-600 text-sm">
                  Invalid input. Please enter numbers only.
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2 justify-between">
            <div className="w-1/2 p-4 gap-3 border-[1px] rounded-lg bg-[#1D2532] border-[#333B48]">
              <div className="text-white font-semibold text-3xl md:text-5xl">
                {MonthlyUsageData?.DailyUsage}
              </div>
              <div className="flex justify-between pt-4">
                <h6 className="font-semibold text-[#D6D6D5] text-xs	">
                  Daily Usage
                </h6>
                <h6 className="font-normal text-[#D6D6D5] text-xs">Today</h6>
              </div>
            </div>
            <div className="w-1/2 p-3 gap-3 border-[1px] rounded-lg bg-[#1D2532] border-[#333B48]">
              <div className="text-white font-semibold text-3xl md:text-5xl">
                {MonthlyUsageData?.MonthlyUsage}
              </div>
              <div className="flex justify-between pt-4">
                <h6 className="font-semibold text-[#D6D6D5] text-xs	">
                  Monthly Usage
                </h6>
                <h6 className="font-normal text-[#D6D6D5] text-xs">
                  Aug 14 - Sep 15
                </h6>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default MonthlyUsageLimit;
