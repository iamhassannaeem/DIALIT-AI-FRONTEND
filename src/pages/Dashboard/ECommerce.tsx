import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ecommerce.css'
import Statistics from '../../components/Statistics';
import calender from '../../images/data-time/calender.svg'
import time from '../../images/data-time/time.svg'
import site from '../../images/data-time/site.svg'
// import ChartFour from '../../components/ChartFour';
import DataStats from '../../components/DataStats';
import { Filter, GetStats, filterStats, organisationget } from '../../api/modules/Swiftsync.class';
// import ChartSix from '../../components/ChartSix';
const ECommerce: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedOrganization, setSelectedOrganization] = useState();

  const [migrations, setMigrations] = useState(null);
  const [organisations, setOrganisations]=useState()

  useEffect(() => {
    try {
      
      organisationget().then((res)=>{
        setOrganisations(res)}).catch((error) => {console.log(error);});
    } catch (error) {
      console.log(error);
    }

  }, []);
  
  const handleDateChange = (date) => {
   
    setSelectedDate(date);
  };
  const handleEndDateChange = (date) => {
   
    setEndDate(date);
  };
  
 
  useEffect(() => {
    
    handleFilter();
  }, [selectedDate, endDate, selectedOrganization]);
  const handleFilter = async () => {
    try {
      const result = await filterStats(selectedOrganization, endDate, selectedDate);
      setMigrations(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 mb-9 mt-3">


        <div className="flex flex-col gap-5.5">
          <div className="relative">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy MMM dd"
              className="custom-input-date customsize custom-input-date-2 w-full rounded border-[1.5px] border-stroke bg-white py-2 px-4 pl-10 font-medium outline-none transition focus-border-primary active-border-primary dark:border-form-strokedark dark:bg-form-input dark:focus-border-primary"
            />
 <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.8">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                    fill="#637381"
                  ></path>
                </g>
              </svg>
            </span>
            <div className="absolute top-3 left-3">
              <img src={calender} alt="" />
            </div>
          </div>

        </div>
        <div className="flex flex-col gap-5.5">
          <div className="relative">
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat="yyyy MMM dd"
              className="custom-input-date customsize custom-input-date-2 w-full rounded border-[1.5px] border-stroke bg-white py-2 px-4 pl-10 font-medium outline-none transition focus-border-primary active-border-primary dark:border-form-strokedark dark:bg-form-input dark:focus-border-primary"
            />
 <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.8">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                    fill="#637381"
                  ></path>
                </g>
              </svg>
            </span>
            <div className="absolute top-3 left-3">
              <img src={calender} alt="" />
            </div>
          </div>

        </div>
        <div className="flex flex-col gap-5.5">


          <div className="relative  bg-white dark:bg-form-input">
            <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
              <img src={site} alt="" />
            </span>
            <select className="relative customsize w-full appearance-none rounded border border-stroke bg-transparent py-2 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
            onChange={(e)=>setSelectedOrganization(e.target.value)}>
            <option value="">Organisation Name</option>
            
            {Array.isArray(organisations) ? (
  organisations.map((item, index) => (
    <option key={index} value={item?.id}>
      {item?.name}
    </option>
  ))
) : (
  // Handle the case when organisations is not an array
  <option value="">No organisations available</option>
)}
            </select>
            <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.8">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                    fill="#637381"
                  ></path>
                </g>
              </svg>
            </span>
          </div>

        </div>


      </div>

      <Statistics title="Application Statistics" migrations={migrations} />
      <DataStats migrations={migrations}/>
      {/* <Statistics title="Financial Statistics" /> */}
      {/* <ChartSix /> */}
      

      {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div> */}
    </>
  );
};

export default ECommerce;
