import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import Edit from './Edit';
import Delete from './Delete';
import Add from './Add';
import Toggle from './Toggle';
import EditCampaign from './EditCompaign';
import { DeleteCompaign } from './DeleteCompaign';
import CompaignToggle from './CompaignToggle';
import { AddCompaign } from './AddCompaign';
import { compaignsList, getAgents } from '../../api/modules/Swiftsync.class';
import Loader from '../../common/Loader';
import Toaster from '../Toast/Toast';

const Campaign = () => {
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [modalOpenDelete, setModalOpenDelete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpenAdd, setModalOpenAdd] = useState(false);
  const [activeToggleId, setActiveToggleId] = useState<number | null>(null);
  const [toggleStates, setToggleStates] = useState(false);
  const [datas, setData] = useState([]);
  const [compaigns, setCampaigns] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ success: '', error: '' });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!modalOpenDelete || keyCode !== 27) return;
      setModalOpenDelete(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [modalOpenDelete]);

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!modalOpenEdit || keyCode !== 27) return;
      setModalOpenEdit(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [modalOpenEdit]);

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!modalOpenAdd || keyCode !== 27) return;
      setModalOpenAdd(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [modalOpenAdd]);

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!isModalOpen || keyCode !== 27) return;
      setIsModalOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [isModalOpen]);

  const handleToggle = (id: number) => {
    setSelectedCampaign(id);
    setActiveToggleId(id);
    setIsModalOpen(true); // Open modal
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const numbers = jsonData
          .flat()
          .filter((num) => typeof num === 'number' && num >= 1 && num <= 10);
        setData(numbers);
      };
      reader.readAsBinaryString(file);
    }
  };
  const handleEditClick = (campaign) => {
    setSelectedCampaign(campaign); // Set the campaign details for the selected row
    setModalOpenEdit(true);
    //console.log("Editing campaign:", campaign);  // Log details of the selected campaign
  };
  const handleDel = (campaign) => {
    setSelectedCampaign(campaign);
    setModalOpenDelete(true);
  };

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        const res = await compaignsList();

        if (res?.status === 200) {
          setCampaigns(res?.data);
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchCampaigns();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster message={error} />
      <div className="flex flex-col rounded-xl bg-[#EEEEEE] px-3 py-6 shadow-default dark:bg-[#1D2532]">
        {/* Header */}
        <div className="mx-2 flex flex-wrap items-center justify-between">
          <div className="mb-3 text-2xl font-bold text-[#1D2532] dark:text-[#D6D6D5]">
            Campaign
          </div>
          <div>
            <button
              className="mb-2 flex items-center gap-1 rounded-md bg-white px-3 py-2 text-xl font-semibold text-black dark:bg-[#2691B6] dark:text-white"
              onClick={() => setModalOpenAdd(true)}
            >
              Add
            </button>
          </div>
          <AddCompaign
            modalOpenAdd={modalOpenAdd}
            setModalOpenAdd={setModalOpenAdd}
            handleFileChange={handleFileChange}
            datas={datas}
            setError={setError}
            setCampaigns={setCampaigns}
          />
        </div>
        <div className="overflow-x-auto">
          <div className="flex items-center justify-between border-t border-stroke dark:border-strokedark">
            <div className="flex min-w-[150px] flex-[1] items-center px-3 py-4">
              <p className="text-sm font-semibold text-[#1D2532] dark:text-[#D6D6D5]">
                Campaign Name
              </p>
            </div>
            <div className="flex min-w-[100px] flex-[1] items-center px-3 py-4">
              <p className="text-sm font-semibold text-[#1D2532] dark:text-[#D6D6D5]">
                Agent Name
              </p>
            </div>
            <div className="flex min-w-[150px] flex-[1] items-center px-3 py-4">
              <p className="text-sm font-semibold text-[#1D2532] dark:text-[#D6D6D5]">
                Campaign Type
              </p>
            </div>
            <div className="flex min-w-[150px] flex-[1] items-center px-3 py-4">
              <p className="text-sm font-semibold text-[#1D2532] dark:text-[#D6D6D5]">
                Local Time
              </p>
            </div>
            <div className="flex min-w-[100px] flex-[1] items-center px-3 py-4">
              <p className="text-sm font-semibold text-[#1D2532] dark:text-[#D6D6D5]">
                Status
              </p>
            </div>
            <div className="flex min-w-[100px] flex-[1] items-center px-3 py-4">
              <p className="text-sm font-semibold text-[#1D2532] dark:text-[#D6D6D5]">
                Force Stop
              </p>
            </div>
            <div className="flex min-w-[100px] flex-[1] items-center px-3 py-4">
              <p className="text-sm font-semibold text-[#1D2532] dark:text-[#D6D6D5]">
                Actions
              </p>
            </div>
          </div>

          {/* Table Rows */}
          {compaigns?.map((campaign) => (
            <div
              key={campaign?.id}
              className="flex border-t border-stroke dark:border-strokedark"
            >
              <div className="flex min-w-[150px] flex-[1] items-center px-3 py-4">
                <p className="text-base font-normal text-black dark:text-[#D6D6D5]">
                  {campaign?.name}
                </p>
              </div>
              <div className="flex min-w-[100px] flex-[1] items-center px-3 py-4">
                <p className="text-base font-normal text-black dark:text-[#D6D6D5]">
                  {campaign?.agent_name}
                </p>
              </div>

              <div className="flex min-w-[150px] flex-[1] items-center px-3 py-4">
                <p className="text-base font-normal text-black dark:text-[#D6D6D5]">
                  {campaign?.type === 1 ? 'Outbound' : 'Inbound'}
                </p>
              </div>
              <div className="flex min-w-[100px] flex-[1] items-center px-3 py-4">
                <p className="text-base font-normal text-black dark:text-[#D6D6D5]">
                  {campaign?.campaign_local_datetime
                    ? new Date(
                        campaign?.campaign_local_datetime
                      ).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true, // Set to false if you prefer 24-hour format
                      })
                    : ''}
                </p>
              </div>

              <div className="flex min-w-[100px] flex-[1] items-center px-3 py-4">
                <p className="text-base font-normal text-black dark:text-[#D6D6D5]">
                  {campaign?.status === 1
                    ? 'Started'
                    : campaign?.status === 2
                    ? 'Not Started'
                    : campaign?.status === 3
                    ? 'Completed'
                    : 'stop'}
                </p>
              </div>
              <div className="flex min-w-[100px] flex-[1] items-center px-3 py-4">
                {campaign?.status === 1 && (
                  <div className="py-3">
                    <label
                      className={`relative block h-7.5 w-14 cursor-pointer rounded-full transition-colors duration-300 ${
                        campaign?.status === 4 ? 'bg-[#2691b6]' : 'bg-[#bed5f3]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={campaign?.status === 4}
                        onChange={() => handleToggle(campaign?.id)}
                        className="absolute top-0 z-50 h-full w-full cursor-pointer opacity-0"
                      />
                      <span
                        className={`absolute top-1/2 left-[3px] h-6 w-6 -translate-y-1/2 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${
                          campaign?.status === 4
                            ? 'bg-green-500 translate-x-6'
                            : 'translate-x-0'
                        }`}
                      ></span>
                    </label>

                    <CompaignToggle
                      isModalOpen={isModalOpen}
                      setIsModalOpen={setIsModalOpen}
                      item={selectedCampaign}
                      setError={setError}
                      setCampaigns={setCampaigns}
                    />
                  </div>
                )}
              </div>
              <div className="flex min-w-[100px] flex-[1] items-center px-3 py-4">
                <div className="flex gap-1">
                  <div>
                    {/* Edit SVG  */}
                    <svg
                      onClick={() => handleEditClick(campaign)}
                      className="cursor-pointer fill-current text-black dark:text-white"
                      width="20"
                      height="23"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                          fill=""
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                          fill=""
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_88_10224">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  {/* Delete Icon */}
                  <div>
                    <svg
                      onClick={() => handleDel(campaign)}
                      className="cursor-pointer fill-current text-black dark:text-white"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17ZM14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17Z" />
                    </svg>
                    <DeleteCompaign
                      modalOpenDelete={modalOpenDelete}
                      setModalOpenDelete={setModalOpenDelete}
                      item={selectedCampaign}
                      setCampaigns={setCampaigns}
                      setError={setError}
                    />
                  </div>
                  {/* Add Icon */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <EditCampaign
        modalOpenEdit={modalOpenEdit}
        setModalOpenEdit={setModalOpenEdit}
        item={selectedCampaign}
        handleFileChange={handleFileChange}
        datas={datas}
        setError={setError}
        setCampaigns={setCampaigns}
      />
    </>
  );
};

export default Campaign;
