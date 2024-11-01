import React, { useEffect, useState, useRef } from 'react';
import * as XLSX from 'xlsx';


const data = [
    {
        CompaignName: 'Web Development',
        AgentName: 'Hassan',
        CompaignType: 'Computer ',
        Status: 'Active',
        ToggleButton: '',
        Actions: '',

    },
    {
        CompaignName: 'App Development',
        AgentName: 'Hammad',
        CompaignType: 'Computer ',
        Status: 'Active',
        ToggleButton: '',
        Actions: '',
    },
    {
        CompaignName: 'Web-3',
        AgentName: 'Abdullah',
        CompaignType: 'Computer ',
        Status: 'Active',
        ToggleButton: '',
        Actions: ' ',
    },
];



const Compaign: React.FC = () => {
    const [modalOpenDelete, setModalOpenDelete] = useState(false);
    const [modalOpenEdit, setModalOpenEdit] = useState(false);
    const [modalOpenAdd, setModalOpenAdd] = useState(false);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [datas, setData] = useState([]);
    const modal = useRef<any>(null);


    const handleToggle = () => {
        setIsModalOpen(true); // Open modal on toggle click
    };

    const handleStartCampaign = () => {
        setIsChecked(true); // Set toggle to 'on' position
        setIsModalOpen(false); // Close modal
    };


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

                // Filter and map the data to numbers 1 to 10
                const numbers = jsonData.flat().filter((num) => num >= 1 && num <= 10);
                setData(numbers);
            };
            reader.readAsBinaryString(file);
        }
    };


    return (
        <>
            <div className="flex flex-col gap-6 rounded-xl bg-[#EEEEEE] px-3 py-6 shadow-default dark:bg-[#1D2532]">
                {/* Search and Filter Section */}
                <div className="flex flex-wrap items-center justify-between gap-6">
                    <div className="relative">
                        <input
                            type="text"
                            name=""
                            id=""
                            className="w-[270px] rounded-md border-[1px] bg-white py-3 pl-3 pr-2 text-sm font-normal text-[#1D2532]  dark:border-[#333B48] dark:bg-[#242E3E] dark:text-[#D6D6D5] md:w-[311px] md:pr-4"
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

                    <div className="flex gap-[6px] rounded-md border-[1px] p-[8px] dark:border-[#333B48] dark:bg-[#242E3E]">
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

                        <span className="text-sm font-normal text-[#1D2532] dark:text-[#D6D6D5]">
                            Web Calls
                        </span>
                    </div>
                </div>

                {/* Table Header */}
                <div className="scrollbar overflow-x-scroll">
                    <div className="grid min-w-[900px] grid-cols-6  border-t  border-stroke  dark:border-strokedark ">
                        <div className=" flex items-center  px-3 py-4">
                            <p className="text-sm  font-semibold text-[#1D2532] dark:text-[#D6D6D5]">
                                Compaign Name
                            </p>
                        </div>
                        <div className=" flex items-center px-3 py-4">
                            <p className=" text-sm  font-semibold text-[#1D2532] dark:text-[#D6D6D5]">
                                Agent Name
                            </p>
                        </div>
                        <div className=" flex items-center px-3 py-4">
                            <p className=" text-sm font-semibold text-[#1D2532] dark:text-[#D6D6D5]">
                                Compaign Type
                            </p>
                        </div>
                        <div className=" flex items-center px-3 py-4">
                            <p className=" text-sm font-semibold text-[#1D2532] dark:text-[#D6D6D5]">
                                Status
                            </p>
                        </div>
                        <div className=" flex items-center px-3 py-4">
                            <p className="text-sm  font-semibold text-[#1D2532] dark:text-[#D6D6D5]">
                                Toggle Button
                            </p>
                        </div>
                        <div className=" flex items-center px-3 py-4">
                            <p className="text-sm  font-semibold text-[#1D2532] dark:text-[#D6D6D5]">
                                Actions
                            </p>
                        </div>


                    </div>

                    {/* Mapping JSON Data */}
                    {data?.map((log, index) => (
                        <div
                            key={index}
                            className="grid  grid-cols-6 border-t  border-stroke  dark:border-strokedark"
                        >
                            <div className=" flex items-center justify-start px-3 py-4">
                                <p className="text-base font-normal text-black dark:text-[#D6D6D5]">
                                    {log.CompaignName}
                                </p>
                            </div>
                            <div className="flex items-center justify-start">
                                <div className="flex items-center gap-1 px-3 py-4">
                                    {' '}
                                    <p className="break-all text-base font-normal text-black dark:text-[#D6D6D5]">
                                        {log.AgentName}
                                    </p>

                                </div>
                            </div>

                            <div className="flex items-center justify-start px-3 py-4 ">
                                <p className="text-base font-normal text-black dark:text-[#D6D6D5]">
                                    {log.CompaignType}
                                </p>
                            </div>

                            <div className="flex items-center justify-start px-3 py-4 ">
                                <p className="text-base font-normal text-black dark:text-[#D6D6D5]" >
                                    {log.Status}
                                </p>
                            </div>
                            <div className=" flex items-center justify-start gap-3 px-3 py-4">
                                <p className="text-base font-normal text-black dark:text-[#D6D6D5]">
                                    <div className="py-3 px-6">
                                        <label
                                            className={`relative block h-7.5 w-14 cursor-pointer rounded-full transition-colors duration-300 ${isChecked ? 'bg-[#2691b6]' : 'bg-[#bed5f3]'
                                                }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={handleToggle}
                                                className="absolute top-0 z-50 h-full w-full cursor-pointer opacity-0"
                                            />
                                            <span
                                                className={`absolute top-1/2 left-[3px] bg-white h-6 w-6 -translate-y-1/2 transform rounded-full shadow-sm transition-transform duration-300 ${isChecked ? 'bg-green-500 translate-x-6' : 'translate-x-0'
                                                    }`}
                                            ></span>
                                        </label>
                                    </div>
                                </p>

                                {/* Toggle Modal  */}
                                {isModalOpen && (
                                    <div className={`fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/50 px-4 ${isModalOpen ? 'block' : 'hidden'
                                        }`}>
                                        <div ref={modal}
                                            className="w-full max-w-94 text-center rounded-lg bg-white py-7 px-8 dark:bg-boxdark">
                                            <p className='text-black dark:text-white  font-bold text-xl'>Start the campaign?</p>
                                            <div className='flex justify-center gap-3'>
                                                <button onClick={handleStartCampaign} className=" text-white font-semibold bg-[#1F2937]  text-blue px-4 py-2 rounded mt-8">
                                                    Start Campaign
                                                </button>
                                                <button onClick={() => setIsModalOpen(false)} className="ml-2 bg-red text-white font-semibold  px-4 py-2 rounded mt-8">
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Delete Modal */}
                            {modalOpenDelete && (<div
                                className={`fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/50 px-4 ${modalOpenDelete ? 'block' : 'hidden'
                                    }`}
                            >
                                <div
                                    ref={modal}
                                    className="w-full max-w-142.5 rounded-lg bg-white py-7 px-8 dark:bg-boxdark"
                                >
                                    <div className='text-center '>
                                        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        <h3 className="mb-5 text-center text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this entry?</h3>
                                        <div className='flex items justify-center gap-x-3'>
                                            <button data-modal-hide="popup-modal" className="bg-[#E02424] text-white outline-none font-bold text-base rounded-lg inline-flex items-center px-5 py-2.5 text-center">
                                                Yes, I'm sure
                                            </button>
                                            <button data-modal-hide="popup-modal" onClick={() => setModalOpenDelete(false)} className="bg-[#1F2937] text-white outline-none font-bold text-base rounded-lg inline-flex items-center px-5 py-2.5 text-center">
                                                No, Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>)}

                            {/* Edit modal */}
                            {modalOpenEdit && (
                                <div className={`fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/50 px-4 ${modalOpenEdit ? 'block' : 'hidden'
                                    }`}>
                                    <div ref={modal} className="w-full max-w-203 rounded-lg text-black dark:text-white bg-white py-7 px-8 dark:bg-boxdark">
                                        <h2 className="text-2xl font-semibold">Edit Modal</h2>
                                        <div className='flex flex-wrap gap-6 justify-start w-full'>
                                            <div>
                                                <div className='mt-3 font-bold'>
                                                    Compaign Name:
                                                </div>
                                                <div className=''>Web Development</div>
                                            </div>
                                            <div>
                                                <div className='mt-3 font-bold'>Compaign name & type</div>
                                                <select className='mt-1 w-50 outline outline-none border border-strokedark rounded-md bg-[#EEEEEE] dark:bg-[#242E3E]'>
                                                    <option>Hassan <span className='text-xs'>Type1</span></option>
                                                    <option>Hammad <span>Type2</span></option>
                                                    <option>Abdullah <span>Type3</span></option>
                                                </select>
                                            </div>
                                            <div>
                                                <div className='mt-3 font-bold'>Start date & time:</div>
                                                <div>01-Nov-2024 3:20pm</div>
                                            </div>
                                            <div>
                                                <div className='mt-3 font-bold'>Time zone:</div>
                                                <div>Pakistan</div>
                                            </div>
                                        </div>
                                        <input className='mt-5' type='file'></input>
                                    </div>

                                </div>
                            )}

                            {/* Add modal */}
                            {modalOpenAdd && (
                                <div className={`fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/50 px-4 ${modalOpenAdd ? 'block' : 'hidden'
                                    }`}>
                                    <div ref={modal} className="w-full max-w-203 rounded-lg text-black dark:text-white bg-white py-7 px-8 dark:bg-boxdark">
                                        <h2 className="text-2xl font-semibold">Add Modal</h2>
                                        <div className='flex flex-wrap gap-6 justify-start w-full'>
                                            <div>
                                                <div className='mt-3 font-bold'>
                                                    Compaign Name:
                                                </div>
                                                <div className=''>Web Development</div>
                                            </div>
                                            <div>
                                                <div className='mt-3 font-bold'>Compaign name & type</div>
                                                <select className='mt-1 w-50 outline outline-none border border-strokedark rounded-md bg-[#EEEEEE] dark:bg-[#242E3E]'>
                                                    <option>Hassan <span className='text-xs'>Type1</span></option>
                                                    <option>Hammad <span>Type2</span></option>
                                                    <option>Abdullah <span>Type3</span></option>
                                                </select>
                                            </div>
                                            <div>
                                                <div className='mt-3 font-bold'>Start date & time:</div>
                                                <div>01-Nov-2024 3:20pm</div>
                                            </div>
                                            <div>
                                                <div className='mt-3 font-bold'>Time zone:</div>
                                                <div>Pakistan</div>
                                            </div>
                                        </div>
                                        <input
                                            className="mt-5 p-2 "
                                            type="file"
                                            accept=".xlsx, .xls"
                                            onChange={handleFileChange}
                                        />
                                        <table className="mt-5 table-auto w-full border border-gray-300">
                                            <thead>

                                            </thead>
                                            <tbody>
                                                {datas.map((num, index) => (
                                                    <tr key={index}>
                                                        <td className="border border-gray-300 px-4 py-2">{num}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}


                            <div className="flex items-center justify-start px-3 py-4">
                                <p className="text-base font-normal text-black dark:text-[#D6D6D5]">
                                    <div className='flex items-center'>
                                        {/* Edit Icon */}
                                        <div><svg
                                            onClick={() => setModalOpenEdit(true)}
                                            className="fill-current cursor-pointer text-black dark:text-white" // Use Tailwind classes for colors
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
                                        </svg></div>
                                        {/* Delete Icon */}
                                        <div><svg
                                            onClick={() => setModalOpenDelete(true)}
                                            className="fill-current cursor-pointer text-black dark:text-white"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17ZM14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17Z" />
                                        </svg>

                                        </div>
                                        {/* Add Icon */}
                                        <div> <svg
                                            onClick={() => setModalOpenAdd(true)}
                                            className="cursor-pointer text-black dark:text-white" // Use Tailwind classes for colors
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="22"
                                            height="22"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor" // Use currentColor to inherit the text color
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                            />
                                        </svg>

                                        </div>


                                    </div>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
export default Compaign;
