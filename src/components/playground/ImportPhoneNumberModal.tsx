import React, { useState } from 'react';
import importBtn from '../../images/import.png';
import cross from '../../images/cross.png';
import ReactFlagsSelect from 'react-flags-select';
import './modal.css';
import { addPhoneNumber } from '../../api/modules/Swiftsync.class';
import customLabels from '../../utils/countryCode'; // Import the custom labels
const ImportPhoneNumberModal = ({
  isOpen,
  openModal,
  closeModal,
  setError
}: {
  isOpen: any;
  setIsOpen: any;
  closeModal: any;
  openModal: any;
  setError: (error: string | null) => void;
}) => {
  // State for form inputs
  const [selected, setSelected] = useState(''); // Country code
  const [twilioPhoneNumber, setTwilioPhoneNumber] = useState('');
  const [accountSid, setAccountSid] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [name, setName] = useState('');

  const handleClick = async () => {
    // Create a new FormData object
    const formData = new FormData();
    formData.append('phone_number', selected+twilioPhoneNumber);
    formData.append('account_sid', accountSid);
    formData.append('auth_token', authToken);
    // formData.append('name', name);

    // Send data to API
    const res = await addPhoneNumber(formData);
   
    console.log(res)
    
  };
  const handleSelect = (code: string) => {
    setSelected(customLabels[code]); 
    
  };
  return (
    <div>
      <button
        onClick={openModal}
        className="flex items-center justify-center  gap-1 rounded-[6px] bg-[#2691B6] p-[12px] text-sm font-semibold text-white"
      >
        Import <img src={importBtn} alt="" />
      </button>

      {isOpen && (
        <div className=" fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 ">
          <div className="w-full max-w-142.5  rounded-lg bg-[#EEEEEE]  p-8 dark:bg-[#1D2532] ">
            <div className="mb-6 flex items-center justify-between text-center">
              <h2 className="text-lg font-semibold text-[#1D2532] dark:text-white sm:text-2xl">
                Import Phone Number
              </h2>
              <img
                src={cross}
                alt=""
                className="cursor-pointer"
                onClick={closeModal}
              />
            </div>

            <form className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-normal text-[#7E7E7E] dark:text-[#D6D6D5]">
                  Twilio Phone Number
                </label>
                <div className="flex items-center justify-center space-x-2">
                  <ReactFlagsSelect
                    selected={selected}
                    onSelect={handleSelect}  // Handle selection of country
                    customLabels={customLabels} 
                    showSelectedLabel={true}
                    fullWidth={false}
                    searchable
                  />
                  <input
                    type="text"
                    value={twilioPhoneNumber}
                    onChange={(e) => setTwilioPhoneNumber(e.target.value)}
                    className="w-full rounded-md bg-[#c0bfbf]  p-3 text-[#1D2532] focus:outline-none dark:bg-[#2C3B4A] dark:text-white"
                    placeholder="Enter Your Twilio Phone Number"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-normal text-[#7E7E7E] dark:text-[#D6D6D5]">
                  Twilio Account SID
                </label>
                <input
                  type="text"
                  value={accountSid}
                  onChange={(e) => setAccountSid(e.target.value)}
                  className="w-full rounded-md bg-[#c0bfbf] p-3 text-[#1D2532] focus:outline-none dark:bg-[#2C3B4A] dark:text-white"
                  placeholder="Enter Your Account SID"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-normal text-[#7E7E7E] dark:text-[#D6D6D5]">
                  Twilio Auth Token
                </label>
                <input
                  type="text"
                  value={authToken}
                  onChange={(e) => setAuthToken(e.target.value)}
                  className="w-full rounded-md bg-[#c0bfbf] p-3 text-[#1D2532] focus:outline-none dark:bg-[#2C3B4A] dark:text-white"
                  placeholder="Enter Your Auth Token"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-normal text-[#7E7E7E] dark:text-[#D6D6D5]">
                Enter Identification Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md bg-[#c0bfbf] p-3 text-[#1D2532] focus:outline-none dark:bg-[#2C3B4A] dark:text-white"
                  placeholder="Enter Your Phone Number"
                />
              </div>

              <div className="mt-6 flex justify-between gap-[8px]">
                <button
                  type="button"
                  className=" w-full rounded-[6px] border border-[#2691B6] p-[12px] text-sm font-semibold text-[#2691B6]"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleClick}
                  className="w-full  rounded-[6px] bg-[#2691B6] p-[12px] text-sm font-semibold text-white"
                >
                  Import from Twilio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportPhoneNumberModal;
