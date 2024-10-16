import React from 'react';

const callLogsData = [
  {
    type: 'Web',
    callId: '83796ab...',
    callCost: '$0.14',
    endedReason: 'Customer Ended Call',
    endedReasonColor: '[#1FCD67]',
    assistant: 'Ava',
    phoneNumber: '+1 688 7811927',
    customer: 'Lorem',
    callTimeDuration: '4 Sep 2024, 14:30 - 4 Sep 2024, 15:00',
  },
  {
    type: 'Web',
    callId: '83796ab...',
    callCost: '$0.98',
    endedReason: 'Customer Ended Call',
    endedReasonColor: '[#1FCD67]',
    assistant: 'Ava',
    phoneNumber: '+1 688 7811927',
    customer: 'Ipsum',
    callTimeDuration: '4 Sep 2024, 14:30 - 4 Sep 2024, 15:00',
  },
  {
    type: 'Web',
    callId: '83796ab...',
    callCost: '$0.00',
    endedReason: 'No Microphone Permission',
    endedReasonColor: '[#F23030]',
    assistant: 'Ava',
    phoneNumber: '+1 688 7811927',
    customer: 'Dolor Sit',
    callTimeDuration: '4 Sep 2024, 14:30 - 4 Sep 2024, 15:00',
  },
];

const CallLogs: React.FC = () => {
  const handleCopy = (text:string) => {
    navigator.clipboard.writeText(text);
  };
  return (
    <>
      <div className="flex flex-col gap-6 rounded-xl bg-[#EEEEEE] px-3 py-6 shadow-default dark:bg-[#1D2532]">
        {/* Search and Filter Section */}
        <div className="flex items-center justify-between gap-6">
          <div className="relative">
            <input
              type="text"
              name=""
              id=""
              className="w-[311px] rounded-md border-[1px] bg-white py-3 pl-3 pr-4 text-sm font-normal  text-[#1D2532] dark:border-[#333B48] dark:bg-[#242E3E] dark:text-[#D6D6D5]"
              placeholder="Search all column or enter UUID..."
            />
            <svg
              className="absolute top-3 right-1"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-black dark:fill-white"
                d="M9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L20.3 18.9C20.4833 19.0833 20.575 19.3167 20.575 19.6C20.575 19.8833 20.4833 20.1167 20.3 20.3C20.1167 20.4833 19.8833 20.575 19.6 20.575C19.3167 20.575 19.0833 20.4833 18.9 20.3L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z"
                fill="#D6D6D5"
              />
            </svg>
          </div>

          <div className='flex gap-[6px] dark:bg-[#242E3E] p-[8px] border-[1px] dark:border-[#333B48] rounded-md'>
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
              className="fill-black dark:fill-white"
                d="M10.084 18.3333C9.82425 18.3333 9.60655 18.2455 9.43085 18.0698C9.25516 17.8941 9.16731 17.6764 9.16731 17.4167V11.9167L3.85064 5.13334C3.62148 4.82778 3.5871 4.50695 3.74752 4.17084C3.90794 3.83473 4.18675 3.66667 4.58398 3.66667H17.4173C17.8145 3.66667 18.0934 3.83473 18.2538 4.17084C18.4142 4.50695 18.3798 4.82778 18.1506 5.13334L12.834 11.9167V17.4167C12.834 17.6764 12.7461 17.8941 12.5704 18.0698C12.3947 18.2455 12.177 18.3333 11.9173 18.3333H10.084ZM11.0006 11.275L15.5381 5.50001H6.46314L11.0006 11.275Z"
                fill="#D6D6D5"
              />
            </svg>

            <span className='text-sm font-normal dark:text-[#D6D6D5] text-[#1D2532]'>Web Calls</span>
          </div>
        </div>

        {/* Table Header */}
        <div className="overflow-x-scroll scrollbar">
          <div className="grid min-w-[900px] grid-cols-11 border-t  border-stroke  dark:border-strokedark ">
            <div className=" flex items-center px-3 py-4">
              <p className="text-sm  font-semibold text-[#1D2532] dark:text-[#D6D6D5]">
                Type
              </p>
            </div>
            <div className=" flex items-center px-3 py-4">
              <p className="text-sm  font-semibold text-[#1D2532] dark:text-[#D6D6D5]">
                Call ID
              </p>
            </div>
            <div className=" flex items-center px-3 py-4">
              <p className=" text-sm font-semibold text-[#1D2532] dark:text-[#D6D6D5]">
                Call Cost
              </p>
            </div>
            <div className=" flex items-center px-3 py-4">
              <p className=" text-sm font-semibold text-[#1D2532] dark:text-[#D6D6D5]">
                Ended Reason
              </p>
            </div>
            <div className=" flex items-center px-3 py-4">
              <p className="text-sm  font-semibold text-[#1D2532] dark:text-[#D6D6D5]">
                Assistant
              </p>
            </div>
            <div className=" flex items-center px-3 py-4">
              <p className="text-sm  font-semibold text-[#1D2532] dark:text-[#D6D6D5]">
                Phone Number
              </p>
            </div>
            <div className=" flex items-center px-3 py-4">
              <p className=" text-sm font-semibold text-[#1D2532] dark:text-[#D6D6D5]">
                Customer
              </p>
            </div>

            <div className=" flex items-center px-3 py-4 col-span-3">
              <p className=" text-sm font-semibold text-[#1D2532] dark:text-[#D6D6D5]">
                Call Times & Duration
              </p>
            </div>
            <div className=" flex items-center px-3 py-4">
              <p className=" text-sm font-semibold text-[#1D2532] dark:text-[#D6D6D5]">
                Action
              </p>
            </div>
          </div>

          {/* Mapping JSON Data */}
          {callLogsData?.map((log, index) => (
            <div
              key={index}
              className="grid min-w-[900px] grid-cols-11 border-t  border-stroke  dark:border-strokedark"
            >
              <div className=" flex items-center justify-start px-3 py-4">
                <p className="text-base font-normal text-black dark:text-[#D6D6D5]">
                  {log.type}
                </p>
              </div>
              <div className="flex items-center justify-start">
                <div className="flex items-center gap-1 px-3 py-4">
                  {' '}
                  <p className="text-base font-normal text-black dark:text-[#D6D6D5]">
                    {log.callId}
                  </p>
                  <svg
                    onClick={() => handleCopy(log.callId)}
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="cursor-pointer"
                  >
                    <path
                      className="fill-[#1D2532] dark:fill-[#D6D6D5]"
                      d="M6.75 13.5C6.3375 13.5 5.98438 13.3531 5.69063 13.0594C5.39688 12.7656 5.25 12.4125 5.25 12V3C5.25 2.5875 5.39688 2.23438 5.69063 1.94063C5.98438 1.64687 6.3375 1.5 6.75 1.5H13.5C13.9125 1.5 14.2656 1.64687 14.5594 1.94063C14.8531 2.23438 15 2.5875 15 3V12C15 12.4125 14.8531 12.7656 14.5594 13.0594C14.2656 13.3531 13.9125 13.5 13.5 13.5H6.75ZM6.75 12H13.5V3H6.75V12ZM3.75 16.5C3.3375 16.5 2.98438 16.3531 2.69063 16.0594C2.39687 15.7656 2.25 15.4125 2.25 15V5.25C2.25 5.0375 2.32188 4.85938 2.46563 4.71563C2.60938 4.57188 2.7875 4.5 3 4.5C3.2125 4.5 3.39062 4.57188 3.53438 4.71563C3.67813 4.85938 3.75 5.0375 3.75 5.25V15H11.25C11.4625 15 11.6406 15.0719 11.7844 15.2156C11.9281 15.3594 12 15.5375 12 15.75C12 15.9625 11.9281 16.1406 11.7844 16.2844C11.6406 16.4281 11.4625 16.5 11.25 16.5H3.75Z"
                      fill="#D6D6D5"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-start px-3 py-4 ">
                <p className="text-base font-normal text-black dark:text-[#D6D6D5]">
                  {log.callCost}
                </p>
              </div>

              <div className="flex items-center justify-start px-3 py-4 ">
                <p className={`text-[11px] text-${log.endedReasonColor}`}>
                  {log.endedReason}
                </p>
              </div>
              <div className=" flex items-center justify-start gap-3 px-3 py-4">
                <p className="text-base font-normal text-black dark:text-[#D6D6D5]">
                  {log.assistant}
                </p>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.9996 6.3L5.32461 12.975C5.18711 13.1125 5.01211 13.1812 4.79961 13.1812C4.58711 13.1812 4.41211 13.1125 4.27461 12.975C4.13711 12.8375 4.06836 12.6625 4.06836 12.45C4.06836 12.2375 4.13711 12.0625 4.27461 11.925L10.9496 5.25H5.24961C5.03711 5.25 4.85898 5.17812 4.71523 5.03437C4.57148 4.89062 4.49961 4.7125 4.49961 4.5C4.49961 4.2875 4.57148 4.10937 4.71523 3.96562C4.85898 3.82187 5.03711 3.75 5.24961 3.75H12.7496C12.9621 3.75 13.1402 3.82187 13.284 3.96562C13.4277 4.10937 13.4996 4.2875 13.4996 4.5V12C13.4996 12.2125 13.4277 12.3906 13.284 12.5344C13.1402 12.6781 12.9621 12.75 12.7496 12.75C12.5371 12.75 12.359 12.6781 12.2152 12.5344C12.0715 12.3906 11.9996 12.2125 11.9996 12V6.3Z"
                    fill="#D6D6D5"
                  />
                </svg>
              </div>
              <div className="flex items-center justify-start px-3 py-4">
                <p className="text-base font-normal text-black dark:text-[#D6D6D5]">
                  {log.phoneNumber}
                </p>
              </div>

              <div className=" flex items-center justify-start px-3 py-4">
                <p className="text-base font-normal text-black dark:text-[#D6D6D5]">
                  {log.customer}
                </p>
              </div>
              <div className=" flex items-center justify-start px-3 py-4 col-span-3">
                <p className="text-base font-normal text-black dark:text-[#D6D6D5]">
                  {log.callTimeDuration}
                </p>
              </div>
              <div className=" flex items-center justify-start px-3 py-4">
                <p className="text-base font-normal text-black dark:text-[#D6D6D5]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="cursor-pointer"
                  >
                    <path
                      className="fill-[#1D2532] dark:fill-[#D6D6D5]"
                      d="M12 20C11.45 20 10.9792 19.8042 10.5875 19.4125C10.1958 19.0208 10 18.55 10 18C10 17.45 10.1958 16.9792 10.5875 16.5875C10.9792 16.1958 11.45 16 12 16C12.55 16 13.0208 16.1958 13.4125 16.5875C13.8042 16.9792 14 17.45 14 18C14 18.55 13.8042 19.0208 13.4125 19.4125C13.0208 19.8042 12.55 20 12 20ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.0208 13.8042 12.55 14 12 14ZM12 8C11.45 8 10.9792 7.80417 10.5875 7.4125C10.1958 7.02083 10 6.55 10 6C10 5.45 10.1958 4.97917 10.5875 4.5875C10.9792 4.19583 11.45 4 12 4C12.55 4 13.0208 4.19583 13.4125 4.5875C13.8042 4.97917 14 5.45 14 6C14 6.55 13.8042 7.02083 13.4125 7.4125C13.0208 7.80417 12.55 8 12 8Z"
                      fill="#D6D6D5"
                    />
                  </svg>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CallLogs;
