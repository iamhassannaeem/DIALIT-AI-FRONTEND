import React from 'react';
import { useState } from 'react';

const CallLogInformation = [
  {
    ID: 1,
    Email: 'muhammadhassannaeem@gmail.com',
    Cardnumber: 'Card Number',
  },
];
const CallLog = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    const regex = /^\d{13,16}$/;

    setCardNumber(value);
    setIsValid(regex.test(value));
  };

  return (
    <div className="h-[326px] gap-2 rounded-xl bg-[#EEEEEE] p-4 shadow-default dark:bg-[#1D2532]	lg:p-5">
      <div>
        {CallLogInformation?.map((CallLogInformation) => (
          <div className="pb-2 md:pb-2 lg:pb-7">
            <div className="flex gap-3 rounded-md">
              <span>
                <h5 className="gap-2.5 text-base	font-semibold text-black dark:text-white">
                  Call Log Details
                </h5>
              </span>
              <span className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#none"
                >
                  <path
                    d="M12 17C12.2833 17 12.5208 16.9042 12.7125 16.7125C12.9042 16.5208 13 16.2833 13 16V12C13 11.7167 12.9042 11.4792 12.7125 11.2875C12.5208 11.0958 12.2833 11 12 11C11.7167 11 11.4792 11.0958 11.2875 11.2875C11.0958 11.4792 11 11.7167 11 12V16C11 16.2833 11.0958 16.5208 11.2875 16.7125C11.4792 16.9042 11.7167 17 12 17ZM12 9C12.2833 9 12.5208 8.90417 12.7125 8.7125C12.9042 8.52083 13 8.28333 13 8C13 7.71667 12.9042 7.47917 12.7125 7.2875C12.5208 7.09583 12.2833 7 12 7C11.7167 7 11.4792 7.09583 11.2875 7.2875C11.0958 7.47917 11 7.71667 11 8C11 8.28333 11.0958 8.52083 11.2875 8.7125C11.4792 8.90417 11.7167 9 12 9ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
                    fill="#8EC3D2"
                  />
                </svg>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-normal dark:text-[#D6D6D5] lg:break-all">
                {CallLogInformation?.Email}
              </span>
              <span className="cursor-pointer text-black dark:text-[#D6D6D5]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <g opacity="0.3">
                    <path
                      d="M4.58333 17.4167H5.88958L14.85 8.45625L13.5437 7.15L4.58333 16.1104V17.4167ZM3.66667 19.25C3.40694 19.25 3.18924 19.1622 3.01354 18.9865C2.83785 18.8108 2.75 18.5931 2.75 18.3333V16.1104C2.75 15.866 2.79583 15.633 2.8875 15.4115C2.97917 15.1899 3.10903 14.9951 3.27708 14.8271L14.85 3.27708C15.0333 3.10903 15.2358 2.97917 15.4573 2.8875C15.6788 2.79583 15.9118 2.75 16.1562 2.75C16.4007 2.75 16.6375 2.79583 16.8667 2.8875C17.0958 2.97917 17.2944 3.11667 17.4625 3.3L18.7229 4.58333C18.9062 4.75139 19.0399 4.95 19.124 5.17917C19.208 5.40833 19.25 5.6375 19.25 5.86667C19.25 6.11111 19.208 6.3441 19.124 6.56563C19.0399 6.78715 18.9062 6.98958 18.7229 7.17292L7.17292 18.7229C7.00486 18.891 6.81007 19.0208 6.58854 19.1125C6.36701 19.2042 6.13403 19.25 5.88958 19.25H3.66667ZM14.1854 7.81458L13.5437 7.15L14.85 8.45625L14.1854 7.81458Z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
              </span>
            </div>

            <div className="pt-2 pb-1 font-semibold text-black dark:text-white md:pt-2 lg:pt-7">
              Call Log Details
            </div>
            <div className="flex flex-col justify-between lg:flex-row">
              <div className="inline-flex w-[100%] items-center justify-between rounded-md border-[1px] border-[#333B48] bg-white p-2 dark:bg-[#242E3E]  xl:p-3">
                <div className="flex flex-row text-black dark:text-[#D6D6D5]">
                  <span>
                    <svg
                      className="pr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6ZM4 8H20V6H4V8ZM4 12V18H20V12H4Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <input
                    className="bg-white text-[12px] font-normal text-black outline-none  dark:bg-[#242E3E] dark:text-[#D6D6D5] md:break-words md:border-0 lg:text-sm"
                    name="number"
                    type="numeric"
                    value={cardNumber}
                    onChange={handleChange}
                    placeholder="Enter Card Number"
                  />
                </div>

                <span className=" text-[12px] font-semibold text-[#1FCD67] xl:text-sm	">
                  Autofill Link
                </span>
              </div>
              <svg
                className="mt-1 gap-1 rounded-md border-[1px] border-[#333B48] text-black dark:bg-[#242E3E]  dark:text-[#D6D6D5] lg:mt-0  lg:ml-1"
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
              >
                <path
                  d="M21.5497 27.15L30.0247 18.675C30.2247 18.475 30.4581 18.375 30.7247 18.375C30.9914 18.375 31.2247 18.475 31.4247 18.675C31.6247 18.875 31.7247 19.1125 31.7247 19.3875C31.7247 19.6625 31.6247 19.9 31.4247 20.1L22.2497 29.3C22.0497 29.5 21.8164 29.6 21.5497 29.6C21.2831 29.6 21.0497 29.5 20.8497 29.3L16.5497 25C16.3497 24.8 16.2539 24.5625 16.2622 24.2875C16.2706 24.0125 16.3747 23.775 16.5747 23.575C16.7747 23.375 17.0122 23.275 17.2872 23.275C17.5622 23.275 17.7997 23.375 17.9997 23.575L21.5497 27.15Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            {cardNumber.length > 0 &&
              (isValid ? (
                <p></p>
              ) : (
                <p className="text-rose-600 text-sm">Not Valid.</p>
              ))}
          </div>
        ))}
        <div className="break-all rounded-md border-[1px] border-[#333B48] p-1 text-[10px] font-semibold dark:bg-[#242E3E] dark:text-[#D6D6D5] md:p-2 lg:text-xs">
          <b className="text-black dark:text-white">Note:</b> Manage your
          subscription, invoices, and card details, via
          <u> Payment Management Portal</u>.This Portal will be accessible only
          after you save your credit card information.
        </div>
      </div>
    </div>
  );
};
export default CallLog;
