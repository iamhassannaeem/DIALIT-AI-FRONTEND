import React from 'react';

const WorkFlowCard = ({
  files,
  productPricing,
  setProductPricing,
  services,
  setServices,
  company,
  setCompany,
  pricing,
  setPricing,
  general,
  setGeneral,
}) => {
   
  return (
    
    <>
      <div className="flex items-center justify-center rounded-xl bg-[#faf7f7] p-4 dark:bg-[#242E3E] sm:p-6">
        <div className="flex w-full flex-col gap-4 rounded-lg ">
          <div className="flex flex-col items-start gap-[6px]"></div>

          {/* Text to Speech Section */}
          <div className="rounded-lg ">
            <div className="ms-2 flex items-center justify-start gap-3">
              <svg
                className="text-black dark:text-white"
                width="20"
                fill="currentColor"
                height="18"
                viewBox="0 0 20 18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13 16V15H11C10.45 15 9.97917 14.8042 9.5875 14.4125C9.19583 14.0208 9 13.55 9 13V5H7V6C7 6.55 6.80417 7.02083 6.4125 7.4125C6.02083 7.80417 5.55 8 5 8H2C1.45 8 0.979167 7.80417 0.5875 7.4125C0.195833 7.02083 0 6.55 0 6V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H5C5.55 0 6.02083 0.195833 6.4125 0.5875C6.80417 0.979167 7 1.45 7 2V3H13V2C13 1.45 13.1958 0.979167 13.5875 0.5875C13.9792 0.195833 14.45 0 15 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V6C20 6.55 19.8042 7.02083 19.4125 7.4125C19.0208 7.80417 18.55 8 18 8H15C14.45 8 13.9792 7.80417 13.5875 7.4125C13.1958 7.02083 13 6.55 13 6V5H11V13H13V12C13 11.45 13.1958 10.9792 13.5875 10.5875C13.9792 10.1958 14.45 10 15 10H18C18.55 10 19.0208 10.1958 19.4125 10.5875C19.8042 10.9792 20 11.45 20 12V16C20 16.55 19.8042 17.0208 19.4125 17.4125C19.0208 17.8042 18.55 18 18 18H15C14.45 18 13.9792 17.8042 13.5875 17.4125C13.1958 17.0208 13 16.55 13 16ZM15 6H18V2H15V6ZM15 16H18V12H15V16ZM2 6H5V2H2V6Z" />
              </svg>

              <h5 className="text-base font-semibold text-[#1D2532] dark:text-white">
                Workflow
              </h5>
            </div>
            <p className="mb-2 text-sm text-black dark:text-white">
              Lorem ipsum dolor sit amet
            </p>
            <div className="mt-10 flex w-full flex-wrap items-center justify-around  gap-2">
              <div className="flex w-full flex-col justify-start md:w-[47%]">
                <label className="text-sm font-bold text-black dark:text-white">
                  Product & Pricing
                </label>
                <label className="mt-1 text-sm font-normal text-black dark:text-white">
                  Knowledge base
                </label>
                <select
                  id="product-pricing"
                  onChange={(e) => setProductPricing(e.target.value)}
                  value={productPricing}
                  className="w-full rounded-md border-2 border-[#333B48] bg-[#EEEEEE] p-3 text-sm font-normal text-[#1D2532] focus:outline-none focus:ring dark:bg-[#242E3E] dark:text-white"
                >
                  {files?.map((item) => (
                    <option value={item?.id}>{item?.file_name}</option>
                  ))}
                </select>
              </div>
              <div className="flex w-full flex-col justify-start md:w-[47%]">
                <label className="text-sm font-bold text-black dark:text-white">
                  Product & Services
                </label>
                <label className="mt-1 text-sm font-normal text-black dark:text-white">
                  Knowledge base
                </label>
                <select
                  id="product-services"
                  onChange={(e) => setServices(e.target.value)}
                  value={services}
                  className="w-full rounded-md border-2 border-[#333B48] bg-[#EEEEEE] p-3 text-sm font-normal text-[#1D2532] focus:outline-none focus:ring dark:bg-[#242E3E] dark:text-white"
                >
                  {files?.map((item) => (
                    <option value={item?.id}>{item?.file_name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-10 flex w-full flex-wrap items-center justify-around  gap-2">
              <div className="flex w-full flex-col justify-start md:w-[47%]">
                <label className="text-sm font-bold text-black dark:text-white">
                  Price
                </label>
                <label className="mt-1 text-sm font-normal text-black dark:text-white">
                  Knowledge base
                </label>
                <select
                  id="pricing"
                  onChange={(e) => setPricing(e.target.value)}
                  value={pricing}
                  className="w-full rounded-md border-2 border-[#333B48] bg-[#EEEEEE] p-3 text-sm font-normal text-[#1D2532] focus:outline-none focus:ring dark:bg-[#242E3E] dark:text-white"
                >
                  {files?.map((item) => (
                    <option value={item?.id}>{item?.file_name}</option>
                  ))}
                </select>
              </div>
              <div className="flex w-full flex-col justify-start md:w-[47%]">
                <label className="text-sm font-bold text-black dark:text-white">
                  Company information
                </label>
                <label className="mt-1 text-sm font-normal text-black dark:text-white">
                  Knowledge base
                </label>
                <select
                  id="company-info"
                  onChange={(e) => setCompany(e.target.value)}
                  value={company}
                  className="w-full rounded-md border-2 border-[#333B48] bg-[#EEEEEE] p-3 text-sm font-normal text-[#1D2532] focus:outline-none focus:ring dark:bg-[#242E3E] dark:text-white"
                >
                  {files?.map((item) => (
                    <option value={item?.id}>{item?.file_name}</option>
                  ))}
                </select>
              </div>
              <div className="mx-3 mt-5 flex w-full flex-col md:w-[100%]">
                <label className="text-sm font-bold text-black dark:text-white">
                  General information
                </label>
                <label className="text-sm font-normal text-black dark:text-white">
                  Knowledge base
                </label>
                <select
                  id="general"
                  onChange={(e) => setGeneral(e.target.value)}
                  value={general}
                  className="w-full rounded-md border-2 border-[#333B48] bg-[#EEEEEE] p-3 text-sm font-normal text-[#1D2532] focus:outline-none focus:ring dark:bg-[#242E3E] dark:text-white"
                >
                  {files?.map((item) => (
                    <option value={item?.id}>{item?.file_name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkFlowCard;
