import React, { useEffect, useState, useRef } from 'react';
import Analysis from './Analysis';
import CallCost from './CallCost';
import Logs from './Logs';
import Messages from './Messages';
import Transcripts from './Transcripts';
import { callDetails } from '../../api/modules/Swiftsync.class';
import Datepicker from 'react-tailwindcss-datepicker';
import Loader from '../../common/Loader';

const activeClasses =
  'border-b-2 border-[#242E3E] dark:border-white pb-3 text-white';
const inactiveClasses = ' pb-3 text-white';

const textToCopy = '83796abb-580e-4734-9053-f76dd6b312a3';

const CallLogs: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [Tab, setTab] = useState(1);
  const [copied, setCopied] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [calllog, setCallLog] = useState();
  const [loading, setLoading] = useState(false);
  const [filteredFiles, setFilteredFiles] = useState();
  const [selectedFileType, setSelectedFileType] = useState('');
  const [selectedDate, setSelectedDate] = useState({
    startDate: null,
    endDate: null,
  });

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };
  const modal = useRef<any>(null);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        console.log('Text copied to clipboard:', textToCopy);
        setCopied(true);
        setTooltipVisible(true);
        setTimeout(() => {
          setCopied(false);
          setTooltipVisible(false);
        }, 2000); // Hide after 2 seconds
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [modalOpen]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    try {
      const api = async () => {
        setLoading(true);
        const res = await callDetails();
        setCallLog(res?.data);
        setLoading(false);
      };
      api();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleFilter = () => {};

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="flex flex-col gap-6 rounded-xl bg-[#EEEEEE] px-3 py-6 shadow-default dark:bg-[#1D2532]">
        {/* Search and Filter Section */}
        <div className=" flex w-full items-end justify-center gap-4 md:w-[50%]">
          <div className="w-full ">
            <select
              id="model"
              value={selectedFileType}
              onChange={(e) => setSelectedFileType(e.target.value)}
              className="w-full rounded-md border-2 border-[#333B48] bg-[#EEEEEE] p-3 text-sm font-normal text-[#1D2532] focus:outline-none focus:ring dark:bg-[#242E3E] dark:text-white"
            >
              <option value="">Filter on the base Agent type</option>
            </select>
          </div>
          <div className="mx-auto w-full max-w-md">
            <Datepicker
              value={selectedDate}
              onChange={handleDateChange}
              displayFormat="YYYY-MM-DD"
              useRange={true} // Set to `true` if you want a range picker
              placeholder="Select a date range"
            />
          </div>
          <button
            onClick={handleFilter}
            type="button"
            disabled={!selectedFileType}
            className="cursor-pointer rounded border-2 border-[#2691B6] bg-transparent px-4 py-3 text-center text-sm font-semibold text-[#2691B6]"
          >
            Filter
          </button>
        </div>

        {/* Table Header */}
        <div className="scrollbar overflow-x-scroll">
          <div className="grid min-w-[900px] grid-cols-12  border-t  border-stroke  dark:border-strokedark ">
            <div className=" flex items-center px-3 py-4">
              <p className="text-sm  font-semibold text-[#1D2532] dark:text-[#D6D6D5]">
                Type
              </p>
            </div>
            <div className=" flex items-center px-3 py-4">
              <p className=" text-sm  font-semibold text-[#1D2532] dark:text-[#D6D6D5]">
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
                Status
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

            <div className=" col-span-3 flex items-center px-3 py-4">
              <p className="break-words text-sm font-semibold text-[#1D2532] dark:text-[#D6D6D5]">
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
          {calllog?.map((log, index) => (
            <div
              key={index}
              className="grid min-w-[900px] grid-cols-12 border-t  border-stroke  dark:border-strokedark"
            >
              <div className=" flex items-center justify-start px-3 py-4">
                <p className="text-base font-normal text-black dark:text-[#D6D6D5]">
                  {log.type}
                </p>
              </div>
              <div className="flex items-center justify-start">
                <div className="flex items-center gap-1 px-3 py-4">
                  {' '}
                  <p className="break-all text-base font-normal text-black dark:text-[#D6D6D5]">
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
              <div className="flex items-center justify-start">
                <div className="flex items-center gap-1 px-3 py-4">
                  {' '}
                  <p className="break-all text-base font-normal text-black dark:text-[#D6D6D5]">
                    {log.status}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-start px-3 py-4 ">
                <p className="text-base font-normal text-black dark:text-[#D6D6D5]">
                  {log.call_cost}
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
                  {log?.phone_number}
                </p>
              </div>

              <div className=" flex items-center justify-start px-3 py-4">
                <p className="text-base font-normal text-black dark:text-[#D6D6D5]">
                  {log.customer}
                </p>
              </div>
              <div className=" col-span-3 flex items-center justify-start px-3 py-4">
                <p className="text-base font-normal text-black dark:text-[#D6D6D5]">
                  {log.callTimeDuration}
                </p>
              </div>
              {/* Dot icons */}
              <div className=" flex items-center justify-start px-3 py-4">
                <p className="text-base font-normal text-black dark:text-[#D6D6D5]">
                  <svg
                    onClick={() => setModalOpen(true)}
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
              {/* modal will open */}
              {modalOpen && (
                <div
                  className={`fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center overflow-y-scroll bg-[#EEEEEE]/50 px-4  dark:bg-black/90 ${
                    modalOpen ? 'block' : 'hidden'
                  }`}
                >
                  <div
                    ref={modal}
                    className="max-h-[99vh] w-full max-w-180 overflow-auto rounded-lg bg-white py-4 px-8 dark:bg-boxdark lg:max-h-none lg:overflow-visible"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="text-xl font-semibold text-[#242E3E] dark:text-white">
                          Call Log Details
                        </div>
                        <div
                          className="cursor-pointer text-black dark:text-white"
                          onClick={() => setModalOpen(false)}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M7.00078 8.4L2.10078 13.3C1.91745 13.4833 1.68411 13.575 1.40078 13.575C1.11745 13.575 0.884115 13.4833 0.700781 13.3C0.517448 13.1167 0.425781 12.8833 0.425781 12.6C0.425781 12.3167 0.517448 12.0833 0.700781 11.9L5.60078 7L0.700781 2.1C0.517448 1.91667 0.425781 1.68334 0.425781 1.4C0.425781 1.11667 0.517448 0.883336 0.700781 0.700003C0.884115 0.51667 1.11745 0.425003 1.40078 0.425003C1.68411 0.425003 1.91745 0.51667 2.10078 0.700003L7.00078 5.6L11.9008 0.700003C12.0841 0.51667 12.3174 0.425003 12.6008 0.425003C12.8841 0.425003 13.1174 0.51667 13.3008 0.700003C13.4841 0.883336 13.5758 1.11667 13.5758 1.4C13.5758 1.68334 13.4841 1.91667 13.3008 2.1L8.40078 7L13.3008 11.9C13.4841 12.0833 13.5758 12.3167 13.5758 12.6C13.5758 12.8833 13.4841 13.1167 13.3008 13.3C13.1174 13.4833 12.8841 13.575 12.6008 13.575C12.3174 13.575 12.0841 13.4833 11.9008 13.3L7.00078 8.4Z" />
                          </svg>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-4 ">
                        <div className="">
                          <div className="relative flex items-center">
                            <div className="mr-2 text-sm font-light text-black dark:text-white">
                              {textToCopy}
                            </div>
                            {/* Button for copy to clipboard */}
                            <button
                              onClick={copyToClipboard}
                              className="hover:bg-gray-100 dark:hover:bg-gray-800 inline-flex items-center justify-center rounded-lg p-2 text-black dark:text-white"
                            >
                              {/* Default Copy Icon */}
                              <span
                                id="default-icon"
                                className={`${
                                  copied ? 'hidden' : 'inline-flex'
                                }`}
                              >
                                <svg
                                  className="h-4 w-4 text-current text-black dark:text-white"
                                  fill="currentColor"
                                  viewBox="0 0 18 18"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M6.75 13.5C6.3375 13.5 5.98438 13.3531 5.69063 13.0594C5.39688 12.7656 5.25 12.4125 5.25 12V3C5.25 2.5875 5.39688 2.23438 5.69063 1.94063C5.98438 1.64687 6.3375 1.5 6.75 1.5H13.5C13.9125 1.5 14.2656 1.64687 14.5594 1.94063C14.8531 2.23438 15 2.5875 15 3V12C15 12.4125 14.8531 12.7656 14.5594 13.0594C14.2656 13.3531 13.9125 13.5 13.5 13.5H6.75ZM6.75 12H13.5V3H6.75V12ZM3.75 16.5C3.3375 16.5 2.98438 16.3531 2.69063 16.0594C2.39687 15.7656 2.25 15.4125 2.25 15V5.25C2.25 5.0375 2.32188 4.85938 2.46563 4.71563C2.60938 4.57188 2.7875 4.5 3 4.5C3.2125 4.5 3.39062 4.57188 3.53438 4.71563C3.67813 4.85938 3.75 5.0375 3.75 5.25V15H11.25C11.4625 15 11.6406 15.0719 11.7844 15.2156C11.9281 15.3594 12 15.5375 12 15.75C12 15.9625 11.9281 16.1406 11.7844 16.2844C11.6406 16.4281 11.4625 16.5 11.25 16.5H3.75Z" />
                                </svg>
                              </span>
                              {/* Success (Copied) Icon */}
                              <span
                                id="success-icon"
                                className={`${
                                  copied ? 'inline-flex' : 'hidden'
                                } items-center`}
                              >
                                <svg
                                  className="h-4 w-4 text-current text-black dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 16 12"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 5.917 5.724 10.5 15 1.5"
                                  />
                                </svg>
                              </span>
                            </button>
                            {/* Tooltip */}
                            <div
                              role="tooltip"
                              className={`bg-gray-900 absolute z-10 inline-block rounded-lg px-3 py-2 text-sm font-medium shadow-sm transition-opacity duration-300 ${
                                tooltipVisible
                                  ? 'opacity-100'
                                  : 'invisible opacity-0'
                              }`}
                              style={{
                                top: '-2rem',
                                left: '100%',
                                transform: 'translateX(-50%)',
                              }} // Positioning tooltip above the icon
                            >
                              <span className={copied ? 'hidden' : ''}>
                                Copy to clipboard
                              </span>
                              <span className={copied ? '' : 'hidden'}>
                                Copied!
                              </span>
                              <div
                                className="tooltip-arrow"
                                data-popper-arrow
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="">
                          <svg
                            className="cursor-pointer text-black dark:text-white"
                            width="16"
                            height="8"
                            viewBox="0 0 16 8"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M4.25 7.75C3.2125 7.75 2.32813 7.38438 1.59688 6.65313C0.865625 5.92188 0.5 5.0375 0.5 4C0.5 2.9625 0.865625 2.07813 1.59688 1.34688C2.32813 0.615625 3.2125 0.25 4.25 0.25H6.5C6.7125 0.25 6.89063 0.321875 7.03438 0.465625C7.17813 0.609375 7.25 0.7875 7.25 1C7.25 1.2125 7.17813 1.39062 7.03438 1.53438C6.89063 1.67813 6.7125 1.75 6.5 1.75H4.25C3.625 1.75 3.09375 1.96875 2.65625 2.40625C2.21875 2.84375 2 3.375 2 4C2 4.625 2.21875 5.15625 2.65625 5.59375C3.09375 6.03125 3.625 6.25 4.25 6.25H6.5C6.7125 6.25 6.89063 6.32188 7.03438 6.46563C7.17813 6.60938 7.25 6.7875 7.25 7C7.25 7.2125 7.17813 7.39063 7.03438 7.53438C6.89063 7.67813 6.7125 7.75 6.5 7.75H4.25ZM5.75 4.75C5.5375 4.75 5.35938 4.67813 5.21563 4.53438C5.07188 4.39062 5 4.2125 5 4C5 3.7875 5.07188 3.60938 5.21563 3.46563C5.35938 3.32188 5.5375 3.25 5.75 3.25H10.25C10.4625 3.25 10.6406 3.32188 10.7844 3.46563C10.9281 3.60938 11 3.7875 11 4C11 4.2125 10.9281 4.39062 10.7844 4.53438C10.6406 4.67813 10.4625 4.75 10.25 4.75H5.75ZM9.5 7.75C9.2875 7.75 9.10938 7.67813 8.96563 7.53438C8.82188 7.39063 8.75 7.2125 8.75 7C8.75 6.7875 8.82188 6.60938 8.96563 6.46563C9.10938 6.32188 9.2875 6.25 9.5 6.25H11.75C12.375 6.25 12.9063 6.03125 13.3438 5.59375C13.7813 5.15625 14 4.625 14 4C14 3.375 13.7813 2.84375 13.3438 2.40625C12.9063 1.96875 12.375 1.75 11.75 1.75H9.5C9.2875 1.75 9.10938 1.67813 8.96563 1.53438C8.82188 1.39062 8.75 1.2125 8.75 1C8.75 0.7875 8.82188 0.609375 8.96563 0.465625C9.10938 0.321875 9.2875 0.25 9.5 0.25H11.75C12.7875 0.25 13.6719 0.615625 14.4031 1.34688C15.1344 2.07813 15.5 2.9625 15.5 4C15.5 5.0375 15.1344 5.92188 14.4031 6.65313C13.6719 7.38438 12.7875 7.75 11.75 7.75H9.5Z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="border-graystroke mt-8 flex  flex-wrap items-center justify-start gap-10 border-b ">
                      <button
                        className={` ${
                          Tab === 1 ? activeClasses : inactiveClasses
                        }`}
                        onClick={() => setTab(1)}
                      >
                        <div className="flex items-center gap-3">
                          <div>
                            <svg
                              className="text-black dark:text-white"
                              width="19"
                              height="15"
                              viewBox="0 0 19 15"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.4882 11.8271L16.7423 8.57291C16.9257 8.38958 17.1395 8.30173 17.384 8.30937C17.6284 8.31701 17.8423 8.4125 18.0257 8.59583C18.1937 8.77916 18.2777 8.99305 18.2777 9.2375C18.2777 9.48194 18.1937 9.69583 18.0257 9.87916L14.1527 13.775C13.9694 13.9583 13.7555 14.05 13.5111 14.05C13.2666 14.05 13.0527 13.9583 12.8694 13.775L10.8986 11.8042C10.7305 11.6361 10.6465 11.4222 10.6465 11.1625C10.6465 10.9028 10.7305 10.6889 10.8986 10.5208C11.0666 10.3528 11.2805 10.2687 11.5402 10.2687C11.8 10.2687 12.0138 10.3528 12.1819 10.5208L13.4882 11.8271ZM13.4882 4.49375L16.7423 1.23958C16.9257 1.05625 17.1395 0.968402 17.384 0.97604C17.6284 0.983679 17.8423 1.07917 18.0257 1.2625C18.1937 1.44583 18.2777 1.65972 18.2777 1.90417C18.2777 2.14861 18.1937 2.3625 18.0257 2.54583L14.1527 6.44167C13.9694 6.625 13.7555 6.71667 13.5111 6.71667C13.2666 6.71667 13.0527 6.625 12.8694 6.44167L10.8986 4.47083C10.7305 4.30278 10.6465 4.08889 10.6465 3.82917C10.6465 3.56944 10.7305 3.35555 10.8986 3.1875C11.0666 3.01944 11.2805 2.93542 11.5402 2.93542C11.8 2.93542 12.0138 3.01944 12.1819 3.1875L13.4882 4.49375ZM1.25065 12.5833C0.990929 12.5833 0.77322 12.4955 0.597526 12.3198C0.421832 12.1441 0.333984 11.9264 0.333984 11.6667C0.333984 11.4069 0.421832 11.1892 0.597526 11.0135C0.77322 10.8378 0.990929 10.75 1.25065 10.75H7.66732C7.92704 10.75 8.14475 10.8378 8.32044 11.0135C8.49614 11.1892 8.58398 11.4069 8.58398 11.6667C8.58398 11.9264 8.49614 12.1441 8.32044 12.3198C8.14475 12.4955 7.92704 12.5833 7.66732 12.5833H1.25065ZM1.25065 5.25C0.990929 5.25 0.77322 5.16215 0.597526 4.98646C0.421832 4.81076 0.333984 4.59305 0.333984 4.33333C0.333984 4.07361 0.421832 3.8559 0.597526 3.68021C0.77322 3.50451 0.990929 3.41667 1.25065 3.41667H7.66732C7.92704 3.41667 8.14475 3.50451 8.32044 3.68021C8.49614 3.8559 8.58398 4.07361 8.58398 4.33333C8.58398 4.59305 8.49614 4.81076 8.32044 4.98646C8.14475 5.16215 7.92704 5.25 7.66732 5.25H1.25065Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>

                          <div className="text-black dark:text-white">Logs</div>
                        </div>
                      </button>
                      <button
                        className={` ${
                          Tab === 2 ? activeClasses : inactiveClasses
                        }`}
                        onClick={() => setTab(2)}
                      >
                        {' '}
                        <div className="flex items-center gap-3 text-black dark:text-white">
                          <div>
                            <svg
                              className="text-black dark:text-white"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill="currentColor"
                                d="M2.58333 15.4167H15.4167V7.00625L10.9938 2.58333H2.58333V15.4167ZM2.58333 17.25C2.07917 17.25 1.64757 17.0705 1.28854 16.7115C0.929514 16.3524 0.75 15.9208 0.75 15.4167V2.58333C0.75 2.07917 0.929514 1.64757 1.28854 1.28854C1.64757 0.929514 2.07917 0.75 2.58333 0.75H10.9938C11.2382 0.75 11.4712 0.795833 11.6927 0.8875C11.9142 0.979167 12.109 1.10903 12.2771 1.27708L16.7229 5.72292C16.891 5.89097 17.0208 6.08576 17.1125 6.30729C17.2042 6.52882 17.25 6.76181 17.25 7.00625V15.4167C17.25 15.9208 17.0705 16.3524 16.7115 16.7115C16.3524 17.0705 15.9208 17.25 15.4167 17.25H2.58333ZM5.33333 13.5833H12.6667C12.9264 13.5833 13.1441 13.4955 13.3198 13.3198C13.4955 13.1441 13.5833 12.9264 13.5833 12.6667C13.5833 12.4069 13.4955 12.1892 13.3198 12.0135C13.1441 11.8378 12.9264 11.75 12.6667 11.75H5.33333C5.07361 11.75 4.8559 11.8378 4.68021 12.0135C4.50451 12.1892 4.41667 12.4069 4.41667 12.6667C4.41667 12.9264 4.50451 13.1441 4.68021 13.3198C4.8559 13.4955 5.07361 13.5833 5.33333 13.5833ZM5.33333 9.91667H12.6667C12.9264 9.91667 13.1441 9.82882 13.3198 9.65312C13.4955 9.47743 13.5833 9.25972 13.5833 9C13.5833 8.74028 13.4955 8.52257 13.3198 8.34688C13.1441 8.17118 12.9264 8.08333 12.6667 8.08333H5.33333C5.07361 8.08333 4.8559 8.17118 4.68021 8.34688C4.50451 8.52257 4.41667 8.74028 4.41667 9C4.41667 9.25972 4.50451 9.47743 4.68021 9.65312C4.8559 9.82882 5.07361 9.91667 5.33333 9.91667ZM5.33333 6.25H9.91667C10.1764 6.25 10.3941 6.16215 10.5698 5.98646C10.7455 5.81076 10.8333 5.59306 10.8333 5.33333C10.8333 5.07361 10.7455 4.8559 10.5698 4.68021C10.3941 4.50451 10.1764 4.41667 9.91667 4.41667H5.33333C5.07361 4.41667 4.8559 4.50451 4.68021 4.68021C4.50451 4.8559 4.41667 5.07361 4.41667 5.33333C4.41667 5.59306 4.50451 5.81076 4.68021 5.98646C4.8559 6.16215 5.07361 6.25 5.33333 6.25Z"
                              />
                            </svg>
                          </div>
                          <div className="text-black dark:text-white">
                            Transcripts
                          </div>
                        </div>
                      </button>
                      <button
                        className={` ${
                          Tab === 3 ? activeClasses : inactiveClasses
                        }`}
                        onClick={() => setTab(3)}
                      >
                        <div className="flex items-center gap-3 text-black dark:text-white">
                          <div>
                            <svg
                              className="text-black dark:text-white"
                              width="20"
                              height="19"
                              viewBox="0 0 20 19"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill="currentColor"
                                d="M0.603224 14.0875C0.404613 13.95 0.28621 13.7628 0.248016 13.526C0.209821 13.2892 0.251835 13.0639 0.374058 12.85L3.83447 7.30417C4.00253 7.04445 4.23552 6.90313 4.53343 6.88021C4.83135 6.85729 5.08725 6.96042 5.30114 7.18958L7.24906 9.45833L10.1595 4.71458C10.3275 4.42431 10.5834 4.27917 10.9272 4.27917C11.2709 4.27917 11.5345 4.41667 11.7178 4.69167L12.6574 6.1125C12.8254 6.37222 12.8751 6.62049 12.8063 6.85729C12.7376 7.0941 12.6039 7.27361 12.4053 7.39583C12.2067 7.51806 11.989 7.56771 11.7522 7.54479C11.5154 7.52188 11.3129 7.38056 11.1449 7.12083L10.9845 6.89167L8.16572 11.475C7.99767 11.7347 7.76086 11.8799 7.45531 11.9104C7.14975 11.941 6.89003 11.834 6.67614 11.5896L4.72822 9.32084L1.93239 13.8354C1.79489 14.0646 1.59246 14.2059 1.3251 14.2594C1.05774 14.3128 0.817113 14.2556 0.603224 14.0875ZM13.7345 16.8604C12.5886 16.8604 11.6147 16.4594 10.8126 15.6573C10.0105 14.8552 9.60947 13.8813 9.60947 12.7354C9.60947 11.5896 10.0105 10.6156 10.8126 9.81354C11.6147 9.01146 12.5886 8.61042 13.7345 8.61042C14.8803 8.61042 15.8543 9.01146 16.6563 9.81354C17.4584 10.6156 17.8595 11.5896 17.8595 12.7354C17.8595 13.1326 17.806 13.5184 17.6991 13.8927C17.5921 14.267 17.4317 14.6146 17.2178 14.9354L19.4178 17.1354C19.6011 17.3188 19.6966 17.5326 19.7043 17.7771C19.7119 18.0215 19.6241 18.2354 19.4407 18.4188C19.2574 18.6021 19.0397 18.6938 18.7876 18.6938C18.5355 18.6938 18.3178 18.6021 18.1345 18.4188L15.9116 16.2188C15.606 16.4326 15.2661 16.5931 14.8918 16.7C14.5175 16.8069 14.1317 16.8604 13.7345 16.8604ZM13.7345 15.0271C14.3761 15.0271 14.9185 14.8056 15.3616 14.3625C15.8046 13.9194 16.0261 13.3771 16.0261 12.7354C16.0261 12.0938 15.8046 11.5514 15.3616 11.1083C14.9185 10.6653 14.3761 10.4438 13.7345 10.4438C13.0928 10.4438 12.5504 10.6653 12.1074 11.1083C11.6643 11.5514 11.4428 12.0938 11.4428 12.7354C11.4428 13.3771 11.6643 13.9194 12.1074 14.3625C12.5504 14.8056 13.0928 15.0271 13.7345 15.0271ZM14.8574 7.44167C14.6588 7.31945 14.5213 7.14375 14.4449 6.91458C14.3685 6.68542 14.4143 6.44097 14.5824 6.18125L18.0657 0.658334C18.2032 0.444445 18.4018 0.306945 18.6616 0.245834C18.9213 0.184723 19.1581 0.238195 19.372 0.406251C19.5706 0.543751 19.6928 0.730904 19.7386 0.967709C19.7845 1.20451 19.7463 1.42986 19.6241 1.64375L16.1178 7.14375C15.9498 7.40347 15.7473 7.54861 15.5105 7.57917C15.2737 7.60972 15.056 7.56389 14.8574 7.44167Z"
                              />
                            </svg>
                          </div>
                          <div className="text-black dark:text-white">
                            Analysis
                          </div>
                        </div>
                      </button>
                      <button
                        className={` ${
                          Tab === 4 ? activeClasses : inactiveClasses
                        }`}
                        onClick={() => setTab(4)}
                      >
                        {' '}
                        <div className="flex items-center gap-3 text-black dark:text-white">
                          <div>
                            <svg
                              className="text-black dark:text-white"
                              width="18"
                              height="16"
                              viewBox="0 0 18 16"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill="currentColor"
                                d="M3.85592 13.4237L1.92627 15.3533C1.66059 15.619 1.35646 15.6784 1.01388 15.5316C0.671292 15.3848 0.5 15.1226 0.5 14.7451V1.67796C0.5 1.21652 0.6643 0.821501 0.992901 0.492901C1.3215 0.1643 1.71652 0 2.17796 0H15.6016C16.0631 0 16.4581 0.1643 16.7867 0.492901C17.1153 0.821501 17.2796 1.21652 17.2796 1.67796V11.7457C17.2796 12.2072 17.1153 12.6022 16.7867 12.9308C16.4581 13.2594 16.0631 13.4237 15.6016 13.4237H3.85592ZM3.14279 11.7457H15.6016V1.67796H2.17796V12.6896L3.14279 11.7457ZM4.6949 10.0678H9.72878C9.96649 10.0678 10.1657 9.98735 10.3265 9.82655C10.4874 9.66575 10.5678 9.46649 10.5678 9.22878C10.5678 8.99107 10.4874 8.79181 10.3265 8.631C10.1657 8.4702 9.96649 8.3898 9.72878 8.3898H4.6949C4.45719 8.3898 4.25793 8.4702 4.09713 8.631C3.93632 8.79181 3.85592 8.99107 3.85592 9.22878C3.85592 9.46649 3.93632 9.66575 4.09713 9.82655C4.25793 9.98735 4.45719 10.0678 4.6949 10.0678ZM4.6949 7.55082H13.0847C13.3224 7.55082 13.5217 7.47042 13.6825 7.30961C13.8433 7.14881 13.9237 6.94955 13.9237 6.71184C13.9237 6.47413 13.8433 6.27487 13.6825 6.11406C13.5217 5.95326 13.3224 5.87286 13.0847 5.87286H4.6949C4.45719 5.87286 4.25793 5.95326 4.09713 6.11406C3.93632 6.27487 3.85592 6.47413 3.85592 6.71184C3.85592 6.94955 3.93632 7.14881 4.09713 7.30961C4.25793 7.47042 4.45719 7.55082 4.6949 7.55082ZM4.6949 5.03388H13.0847C13.3224 5.03388 13.5217 4.95348 13.6825 4.79267C13.8433 4.63187 13.9237 4.43261 13.9237 4.1949C13.9237 3.95719 13.8433 3.75793 13.6825 3.59713C13.5217 3.43632 13.3224 3.35592 13.0847 3.35592H4.6949C4.45719 3.35592 4.25793 3.43632 4.09713 3.59713C3.93632 3.75793 3.85592 3.95719 3.85592 4.1949C3.85592 4.43261 3.93632 4.63187 4.09713 4.79267C4.25793 4.95348 4.45719 5.03388 4.6949 5.03388Z"
                              />
                            </svg>
                          </div>
                          <div className="text-black dark:text-white">
                            Messages
                          </div>
                        </div>
                      </button>
                      <button
                        className={` ${
                          Tab === 5 ? activeClasses : inactiveClasses
                        }`}
                        onClick={() => setTab(5)}
                      >
                        <div className="flex items-center gap-3 text-black dark:text-white">
                          <div>
                            <svg
                              className="text-black dark:text-white"
                              width="17"
                              height="16"
                              viewBox="0 0 17 16"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill="currentColor"
                                d="M8 8C7.74815 8 7.53704 7.91481 7.36667 7.74444C7.1963 7.57407 7.11111 7.36296 7.11111 7.11111C7.11111 6.85926 7.1963 6.64815 7.36667 6.47778C7.53704 6.30741 7.74815 6.22222 8 6.22222C8.25185 6.22222 8.46296 6.30741 8.63333 6.47778C8.8037 6.64815 8.88889 6.85926 8.88889 7.11111C8.88889 7.36296 8.8037 7.57407 8.63333 7.74444C8.46296 7.91481 8.25185 8 8 8ZM8 2.66667C7.74815 2.66667 7.53704 2.58148 7.36667 2.41111C7.1963 2.24074 7.11111 2.02963 7.11111 1.77778C7.11111 1.52593 7.1963 1.31481 7.36667 1.14444C7.53704 0.974074 7.74815 0.888889 8 0.888889C8.25185 0.888889 8.46296 0.974074 8.63333 1.14444C8.8037 1.31481 8.88889 1.52593 8.88889 1.77778C8.88889 2.02963 8.8037 2.24074 8.63333 2.41111C8.46296 2.58148 8.25185 2.66667 8 2.66667ZM9.77778 5.33333C9.52593 5.33333 9.31481 5.24815 9.14444 5.07778C8.97407 4.90741 8.88889 4.6963 8.88889 4.44444C8.88889 4.19259 8.97407 3.98148 9.14444 3.81111C9.31481 3.64074 9.52593 3.55556 9.77778 3.55556C10.0296 3.55556 10.2407 3.64074 10.4111 3.81111C10.5815 3.98148 10.6667 4.19259 10.6667 4.44444C10.6667 4.6963 10.5815 4.90741 10.4111 5.07778C10.2407 5.24815 10.0296 5.33333 9.77778 5.33333ZM10.6667 8C10.4148 8 10.2037 7.91481 10.0333 7.74444C9.86296 7.57407 9.77778 7.36296 9.77778 7.11111C9.77778 6.85926 9.86296 6.64815 10.0333 6.47778C10.2037 6.30741 10.4148 6.22222 10.6667 6.22222C10.9185 6.22222 11.1296 6.30741 11.3 6.47778C11.4704 6.64815 11.5556 6.85926 11.5556 7.11111C11.5556 7.36296 11.4704 7.57407 11.3 7.74444C11.1296 7.91481 10.9185 8 10.6667 8ZM10.6667 2.66667C10.4148 2.66667 10.2037 2.58148 10.0333 2.41111C9.86296 2.24074 9.77778 2.02963 9.77778 1.77778C9.77778 1.52593 9.86296 1.31481 10.0333 1.14444C10.2037 0.974074 10.4148 0.888889 10.6667 0.888889C10.9185 0.888889 11.1296 0.974074 11.3 1.14444C11.4704 1.31481 11.5556 1.52593 11.5556 1.77778C11.5556 2.02963 11.4704 2.24074 11.3 2.41111C11.1296 2.58148 10.9185 2.66667 10.6667 2.66667ZM12.4444 5.33333C12.1926 5.33333 11.9815 5.24815 11.8111 5.07778C11.6407 4.90741 11.5556 4.6963 11.5556 4.44444C11.5556 4.19259 11.6407 3.98148 11.8111 3.81111C11.9815 3.64074 12.1926 3.55556 12.4444 3.55556C12.6963 3.55556 12.9074 3.64074 13.0778 3.81111C13.2481 3.98148 13.3333 4.19259 13.3333 4.44444C13.3333 4.6963 13.2481 4.90741 13.0778 5.07778C12.9074 5.24815 12.6963 5.33333 12.4444 5.33333ZM13.3333 8C13.0815 8 12.8704 7.91481 12.7 7.74444C12.5296 7.57407 12.4444 7.36296 12.4444 7.11111C12.4444 6.85926 12.5296 6.64815 12.7 6.47778C12.8704 6.30741 13.0815 6.22222 13.3333 6.22222C13.5852 6.22222 13.7963 6.30741 13.9667 6.47778C14.137 6.64815 14.2222 6.85926 14.2222 7.11111C14.2222 7.36296 14.137 7.57407 13.9667 7.74444C13.7963 7.91481 13.5852 8 13.3333 8ZM13.3333 2.66667C13.0815 2.66667 12.8704 2.58148 12.7 2.41111C12.5296 2.24074 12.4444 2.02963 12.4444 1.77778C12.4444 1.52593 12.5296 1.31481 12.7 1.14444C12.8704 0.974074 13.0815 0.888889 13.3333 0.888889C13.5852 0.888889 13.7963 0.974074 13.9667 1.14444C14.137 1.31481 14.2222 1.52593 14.2222 1.77778C14.2222 2.02963 14.137 2.24074 13.9667 2.41111C13.7963 2.58148 13.5852 2.66667 13.3333 2.66667ZM15.1111 5.33333C14.8593 5.33333 14.6481 5.24815 14.4778 5.07778C14.3074 4.90741 14.2222 4.6963 14.2222 4.44444C14.2222 4.19259 14.3074 3.98148 14.4778 3.81111C14.6481 3.64074 14.8593 3.55556 15.1111 3.55556C15.363 3.55556 15.5741 3.64074 15.7444 3.81111C15.9148 3.98148 16 4.19259 16 4.44444C16 4.6963 15.9148 4.90741 15.7444 5.07778C15.5741 5.24815 15.363 5.33333 15.1111 5.33333ZM16 8C15.7481 8 15.537 7.91481 15.3667 7.74444C15.1963 7.57407 15.1111 7.36296 15.1111 7.11111C15.1111 6.85926 15.1963 6.64815 15.3667 6.47778C15.537 6.30741 15.7481 6.22222 16 6.22222C16.2519 6.22222 16.463 6.30741 16.6333 6.47778C16.8037 6.64815 16.8889 6.85926 16.8889 7.11111C16.8889 7.36296 16.8037 7.57407 16.6333 7.74444C16.463 7.91481 16.2519 8 16 8ZM16 2.66667C15.7481 2.66667 15.537 2.58148 15.3667 2.41111C15.1963 2.24074 15.1111 2.02963 15.1111 1.77778C15.1111 1.52593 15.1963 1.31481 15.3667 1.14444C15.537 0.974074 15.7481 0.888889 16 0.888889C16.2519 0.888889 16.463 0.974074 16.6333 1.14444C16.8037 1.31481 16.8889 1.52593 16.8889 1.77778C16.8889 2.02963 16.8037 2.24074 16.6333 2.41111C16.463 2.58148 16.2519 2.66667 16 2.66667ZM15.0667 16C13.2148 16 11.3852 15.5963 9.57778 14.7889C7.77037 13.9815 6.12593 12.837 4.64444 11.3556C3.16296 9.87407 2.01852 8.22963 1.21111 6.42222C0.403704 4.61481 0 2.78519 0 0.933333C0 0.666667 0.0888889 0.444444 0.266667 0.266667C0.444444 0.0888889 0.666667 0 0.933333 0H4.53333C4.74074 0 4.92593 0.0703704 5.08889 0.211111C5.25185 0.351852 5.34815 0.518519 5.37778 0.711111L5.95556 3.82222C5.98519 4.05926 5.97778 4.25926 5.93333 4.42222C5.88889 4.58519 5.80741 4.72593 5.68889 4.84444L3.53333 7.02222C3.82963 7.57037 4.18148 8.1 4.58889 8.61111C4.9963 9.12222 5.44444 9.61481 5.93333 10.0889C6.39259 10.5481 6.87407 10.9741 7.37778 11.3667C7.88148 11.7593 8.41481 12.1185 8.97778 12.4444L11.0667 10.3556C11.2 10.2222 11.3741 10.1222 11.5889 10.0556C11.8037 9.98889 12.0148 9.97037 12.2222 10L15.2889 10.6222C15.4963 10.6815 15.6667 10.7889 15.8 10.9444C15.9333 11.1 16 11.2741 16 11.4667V15.0667C16 15.3333 15.9111 15.5556 15.7333 15.7333C15.5556 15.9111 15.3333 16 15.0667 16ZM2.68889 5.33333L4.15556 3.86667L3.77778 1.77778H1.8C1.87407 2.38519 1.97778 2.98519 2.11111 3.57778C2.24444 4.17037 2.43704 4.75556 2.68889 5.33333ZM10.6444 13.2889C11.2222 13.5407 11.8111 13.7407 12.4111 13.8889C13.0111 14.037 13.6148 14.1333 14.2222 14.1778V12.2222L12.1333 11.8L10.6444 13.2889Z"
                              />
                            </svg>
                          </div>
                          <div className="text-black dark:text-white">
                            Call Cost
                          </div>
                        </div>
                      </button>
                    </div>
                    <div
                      className={`leading-relaxed ${
                        Tab === 1 ? 'block' : 'hidden'
                      }`}
                    >
                      <Logs />
                    </div>
                    <div
                      className={`leading-relaxed ${
                        Tab === 2 ? 'block' : 'hidden'
                      }`}
                    >
                      <Transcripts />
                    </div>
                    <div
                      className={`leading-relaxed ${
                        Tab === 3 ? 'block' : 'hidden'
                      }`}
                    >
                      <Analysis />
                    </div>
                    <div
                      className={`leading-relaxed ${
                        Tab === 4 ? 'block' : 'hidden'
                      }`}
                    >
                      <Messages />
                    </div>
                    <div
                      className={`leading-relaxed ${
                        Tab === 5 ? 'block' : 'hidden'
                      }`}
                    >
                      <CallCost />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default CallLogs;
