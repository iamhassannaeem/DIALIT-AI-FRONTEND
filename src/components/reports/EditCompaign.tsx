import React, { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import Timezones from '../../utils/Timezone';
import { compaignsList, editCompaign, getAgents, postCompaign } from '../../api/modules/Swiftsync.class';
import { BeatLoader } from 'react-spinners';
import dayjs from "dayjs";

const EditCampaign = ({ modalOpenEdit, setModalOpenEdit, item ,setCampaigns,setError}) => {
  if (!modalOpenEdit || !item) return null;

  const editmodal = useRef(null);
  const [campaignName, setCampaignName] = useState(item?.name);
  const [startDateTime, setStartDateTime] = useState(item?.start_time);
  const [file, setFile] = useState(null);
  const [agent, setAgent] = useState();
  const [timeZone, setTimeZone] = useState('');
  const [datas, setData] = useState([]);
  const [agentError, setAgentError] = useState('');
  const [timezoneError, setTimeZoneError] = useState('');
  const [typeError, setTypeError] = useState('');
  const [agentData, setAgentData] = useState<any>(item?.feedback_agent|| item?.sales_agent);
  const [loading, setLoading] = useState(false);
  const [campaignType, setCampaignType] = useState(item?.type);
  const [isFormValid, setIsFormValid] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const [fileError, setFileError] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  useEffect(() => {
    if (timeZone) {
      const updateTime = () => {
        const now = new Date();
        const formattedTime = new Intl.DateTimeFormat('en-US', {
          timeZone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }).format(now);
        setCurrentTime(formattedTime);
      };

      updateTime(); // Update immediately
      const intervalId = setInterval(updateTime, 1000); // Update every second

      return () => clearInterval(intervalId); // Clear interval on component unmount or timezone change
    }
  }, [timeZone]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
  
    if (file) {
      setFileSelected(true);
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const binaryStr = e.target.result;
  
        // Read the Excel workbook
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
  
        // Convert worksheet to JSON with each row as an array
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
        // Flatten the array and extract phone numbers in the desired format
        const phoneNumbers = jsonData
          .flat()
          .filter((value) => typeof value === 'string' || typeof value === 'number')
          .map((phone) => {
            // Convert numbers to strings and handle the format
            let phoneStr = phone.toString();
           
            return { phone_number: phoneStr,campaign:item?.id };
          });
  
        console.log(phoneNumbers); // Log formatted phone numbers
        setData(phoneNumbers); // Update state with formatted phone numbers
      };
  
      reader.readAsBinaryString(file);
    } else {
      setFileSelected(false);
    }
  
    setFileError(!file ? 'Please choose a file to upload' : '');
  };

  
  const handleAgent = (e) => {
    const value = e.target.value;
    setAgent(value);
    setAgentError(value === '' ? 'Please select an agent' : '');
  };
 
  const handleTimeZone = (e) => {
    const value = e.target.value;
    setTimeZone(value);
    setTimeZoneError(value === '' ? 'Please select a TimeZone' : '');
  };

  const handleCampaignTypeChange = (e) => {
    const value = e.target.value;
    setCampaignType(value);
    setTypeError(value === '' ? 'Please select a campaign type' : '');
  };

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        const res = await getAgents();

        if (
          res?.data?.feedback_agents.length > 0 ||
          res?.data?.sales_agents.length > 0
        ) {
          setAgentData(res?.data);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAgents();
  }, []);
  
  useEffect(() => {
    // Form validation checks
    const isNameValid = campaignName.length >= 4 && campaignName.length <= 50;
    const isTypeSelected = campaignType !== '';
    const isDateSelected = startDateTime !== '';
    const isFileChosen = fileSelected;

    // Set form validity state
    setIsFormValid(
      isNameValid && isTypeSelected && isDateSelected && isFileChosen
    );
  }, [campaignName, campaignType, startDateTime, fileSelected]);


  const handleSave = async (e) => {
    e.preventDefault();
    if (!isFormValid) return; // Prevent submission if form is invalid

    setLoading(true);
    const formattedDateTime = dayjs(startDateTime).format("YYYY-MM-DD HH:mm:ss");

    try {
      

      const res = await editCompaign(item?.id,{
        name: campaignName,
        agent: agent,  
        datetime: formattedDateTime,
        timezone: timeZone,
        status: 1,
        type: campaignType,
        call_details: datas,
      });
      const resp = await compaignsList();
      setCampaigns(resp?.data);
      setModalOpenEdit(false);
      console.log(res);
      if (res.status === 200) {
        setError({ error: '', success: 'Campaign Updated Successfully' });
      }
      else{
        setError({ error: res?.message?.response?.data[0], success: '' });
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 ${
        modalOpenEdit ? 'block' : 'hidden'
      }`}
    >
      <div
        ref={editmodal}
        className="w-full max-w-142.5  rounded-lg bg-[#EEEEEE]  p-8 dark:bg-[#222e42]"
      >
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Edit Campaign</h2>
          <svg
            className="cursor-pointer"
            onClick={() => setModalOpenEdit(false)}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-[#1D2532] dark:fill-white"
              d="M11.9998 13.4L7.0998 18.3C6.91647 18.4834 6.68314 18.575 6.3998 18.575C6.11647 18.575 5.88314 18.4834 5.6998 18.3C5.51647 18.1167 5.4248 17.8834 5.4248 17.6C5.4248 17.3167 5.51647 17.0834 5.6998 16.9L10.5998 12L5.6998 7.10005C5.51647 6.91672 5.4248 6.68338 5.4248 6.40005C5.4248 6.11672 5.51647 5.88338 5.6998 5.70005C5.88314 5.51672 6.11647 5.42505 6.3998 5.42505C6.68314 5.42505 6.91647 5.51672 7.0998 5.70005L11.9998 10.6L16.8998 5.70005C17.0831 5.51672 17.3165 5.42505 17.5998 5.42505C17.8831 5.42505 18.1165 5.51672 18.2998 5.70005C18.4831 5.88338 18.5748 6.11672 18.5748 6.40005C18.5748 6.68338 18.4831 6.91672 18.2998 7.10005L13.3998 12L18.2998 16.9C18.4831 17.0834 18.5748 17.3167 18.5748 17.6C18.5748 17.8834 18.4831 18.1167 18.2998 18.3C18.1165 18.4834 17.8831 18.575 17.5998 18.575C17.3165 18.575 17.0831 18.4834 16.8998 18.3L11.9998 13.4Z"
              fill="#D6D6D5"
            />
          </svg>
        </div>
        <form className="flex flex-col gap-4">
          {/* Campaign Name */}
          <div>
            <label className="  mb-1 text-[#7E7E7E] dark:text-[#D6D6D5]">
              Campaign Name:
            </label>
            <input
              type="text"
              className="w-full rounded-md bg-[#FFFFFF] p-3 text-[#1D2532] focus:outline-none dark:bg-[#2C3B4A] dark:text-white"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="Enter campaign name"
            />
          </div>

          {/* Campaign Type */}
          <div>
            <label className=" mb-1 text-[#7E7E7E] dark:text-[#D6D6D5]">
              Campaign Type:
            </label>
            <select
              className="w-full rounded-md bg-[#FFFFFF] p-3 text-[#1D2532] focus:outline-none dark:bg-[#2C3B4A] dark:text-white"
              value={campaignType}
              onChange={handleCampaignTypeChange}
            >
             <option value="">Select type</option>
              <option value="2">Inbound</option>
              <option value="1">Outbound</option>
            </select>
          </div>
          {/* Agent List */}
          <div>
            <label className="mb-1 text-[#7E7E7E] dark:text-[#D6D6D5]">
              Select Agent
            </label>
            <select
              className="w-full rounded-md bg-[#FFFFFF] p-3 text-[#1D2532] focus:outline-none dark:bg-[#2C3B4A] dark:text-white"
              value={item?.agent}
              onChange={handleAgent}
            >
              <option value="">Select Type</option>
              {campaignType == 1
                ? agentData?.feedback_agents?.map((item, index) => (
                    <option key={index} value={item?.id}>
                      {item?.name}
                    </option>
                  ))
                : agentData?.sales_agents?.map((item, index) => (
                    <option key={index} value={item?.id}>
                      {item?.name}
                    </option>
                  ))}
            </select>
            {agentError && <p className="text-sm text-red">{agentError}</p>}
          </div>
          {/* Time Format */}
          <div>
            <label className="mb-1 text-[#7E7E7E] dark:text-[#D6D6D5]">
              Time Format
            </label>
            <select
              className="w-full rounded-md bg-[#FFFFFF] p-3 text-[#1D2532] focus:outline-none dark:bg-[#2C3B4A] dark:text-white"
              value={timeZone}
              onChange={handleTimeZone}
            >
              {Timezones?.map((timezone, index) => (
                <option key={index} value={timezone}>
                  {timezone}
                </option>
              ))}
            </select>
            {timezoneError && <p className="text-sm text-red">{timezoneError}</p>}
            {timeZone && (
          <p>Current Time: {currentTime}</p>
        )}
          </div>

          {/* Start Date & Time */}
          <div>
            <label className=" mb-1 text-[#7E7E7E] dark:text-[#D6D6D5]">
              Start Date & Time:
            </label>
            <input
              type="datetime-local"
              className="w-full rounded-md bg-[#FFFFFF] p-3 text-[#1D2532] focus:outline-none dark:bg-[#2C3B4A] dark:text-white"
              value={startDateTime}
              onChange={(e) => setStartDateTime(e.target.value)}
            />
          </div>
          

          {/* File Upload */}
          <div>
            <label className=" mb-1 text-[#7E7E7E] dark:text-[#D6D6D5]">
              Upload File:
            </label>
            <input type="file" className="w-full" onChange={handleFileChange} />
          </div>
          <div>
            <label className="mb-1 text-[#7E7E7E] dark:text-[#D6D6D5]">
              Phone no List
            </label>
            <ol className="grid grid-cols-3 ">
              {datas?.map((item) => (
                <li>{item?.phone_number}</li>
              ))}
            </ol>
          </div>
          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSave}
            className={`w-full rounded-[6px] bg-[#2691B6] p-[12px] text-sm font-semibold text-white ${
              !isFormValid && 'cursor-not-allowed opacity-50'
            }`}
            disabled={!isFormValid}
          >
            {loading ? <BeatLoader color="white" /> : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};
export default EditCampaign;
