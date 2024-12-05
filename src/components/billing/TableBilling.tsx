import React, { useState } from 'react';
import Pagination from './Pagination';
import Loader from '../../common/Loader';

function TableBilling({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust the number of rows per page

  // Calculate data for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const rowsPerPageOptions = [10, 20, 30, 50]; 
  const getPaginationNumbers = () => {
    const range = [];
    for (let i = 1; i <= totalPages; i++) {
      range.push(i);
    }
    return range;
  };
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  }


  return (
    <div className="mt-4">
      <div className="rounded-xl bg-[#EEEEEE] py-6 px-3  shadow-default dark:bg-[#1D2532]">
        <div className="scrollbar overflow-x-scroll bg-[#EEEEEE] dark:bg-[#1D2532]">
          <div className=" dark:border-stroke-dark grid grid-cols-3 border-b border-stroke dark:border-[#333B48]  ">
            <div className="flex items-center px-3 py-4 text-black dark:text-[#D6D6D5]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M2.91667 12.8333C2.59583 12.8333 2.32118 12.7191 2.09271 12.4906C1.86424 12.2622 1.75 11.9875 1.75 11.6667V3.50001C1.75 3.17917 1.86424 2.90452 2.09271 2.67605C2.32118 2.44757 2.59583 2.33334 2.91667 2.33334H3.5V1.75001C3.5 1.58473 3.5559 1.44619 3.66771 1.33438C3.77951 1.22257 3.91806 1.16667 4.08333 1.16667C4.24861 1.16667 4.38715 1.22257 4.49896 1.33438C4.61076 1.44619 4.66667 1.58473 4.66667 1.75001V2.33334H9.33333V1.75001C9.33333 1.58473 9.38924 1.44619 9.50104 1.33438C9.61285 1.22257 9.75139 1.16667 9.91667 1.16667C10.0819 1.16667 10.2205 1.22257 10.3323 1.33438C10.4441 1.44619 10.5 1.58473 10.5 1.75001V2.33334H11.0833C11.4042 2.33334 11.6788 2.44757 11.9073 2.67605C12.1358 2.90452 12.25 3.17917 12.25 3.50001V11.6667C12.25 11.9875 12.1358 12.2622 11.9073 12.4906C11.6788 12.7191 11.4042 12.8333 11.0833 12.8333H2.91667ZM2.91667 11.6667H11.0833V5.83334H2.91667V11.6667ZM2.91667 4.66667H11.0833V3.50001H2.91667V4.66667Z"
                  fill="currentColor"
                />
              </svg>
              <p className="ml-1 text-xs font-semibold	dark:text-[#D6D6D5]	 md:ml-2">
                Date
              </p>
            </div>
            <div className="flex items-center px-3 py-4 text-black dark:text-[#D6D6D5]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M8.2487 6.76667V4.66667C8.2487 4.50139 8.19279 4.36285 8.08099 4.25105C7.96918 4.13924 7.83064 4.08334 7.66536 4.08334C7.50009 4.08334 7.36154 4.13924 7.24974 4.25105C7.13793 4.36285 7.08203 4.50139 7.08203 4.66667V6.98542C7.08203 7.0632 7.09661 7.13855 7.12578 7.21146C7.15495 7.28438 7.1987 7.35 7.25703 7.40834L9.18203 9.33334C9.28898 9.44028 9.42509 9.49375 9.59036 9.49375C9.75564 9.49375 9.89175 9.44028 9.9987 9.33334C10.1056 9.22639 10.1591 9.09028 10.1591 8.925C10.1591 8.75973 10.1056 8.62362 9.9987 8.51667L8.2487 6.76667ZM7.66536 12.8333C6.85842 12.8333 6.10009 12.6802 5.39036 12.374C4.68064 12.0677 4.06328 11.6521 3.53828 11.1271C3.01328 10.6021 2.59766 9.98473 2.29141 9.275C1.98516 8.56528 1.83203 7.80695 1.83203 7C1.83203 6.19306 1.98516 5.43473 2.29141 4.725C2.59766 4.01528 3.01328 3.39792 3.53828 2.87292C4.06328 2.34792 4.68064 1.9323 5.39036 1.62605C6.10009 1.3198 6.85842 1.16667 7.66536 1.16667C8.47231 1.16667 9.23064 1.3198 9.94036 1.62605C10.6501 1.9323 11.2674 2.34792 11.7924 2.87292C12.3174 3.39792 12.7331 4.01528 13.0393 4.725C13.3456 5.43473 13.4987 6.19306 13.4987 7C13.4987 7.80695 13.3456 8.56528 13.0393 9.275C12.7331 9.98473 12.3174 10.6021 11.7924 11.1271C11.2674 11.6521 10.6501 12.0677 9.94036 12.374C9.23064 12.6802 8.47231 12.8333 7.66536 12.8333Z"
                  fill="currentColor"
                />
              </svg>
              <p className="ml-1 text-xs font-semibold	dark:text-[#D6D6D5] md:ml-2">
                Minutes
              </p>
            </div>
            <div className="flex items-center px-3 py-4 text-black dark:text-[#D6D6D5]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M7.34824 12.25C7.18297 12.25 7.04443 12.1941 6.93262 12.0823C6.82081 11.9705 6.76491 11.8319 6.76491 11.6667V10.9958C6.32741 10.8986 5.94338 10.7285 5.61283 10.4854C5.28227 10.2424 5.01491 9.90208 4.81074 9.46458C4.74269 9.32847 4.74026 9.18507 4.80345 9.03438C4.86665 8.88368 4.98088 8.77431 5.14616 8.70625C5.28227 8.64792 5.42324 8.65035 5.56908 8.71354C5.71491 8.77674 5.82672 8.88125 5.90449 9.02708C6.06977 9.31875 6.2788 9.53993 6.53158 9.69063C6.78436 9.84132 7.09547 9.91667 7.46491 9.91667C7.86352 9.91667 8.20137 9.82674 8.47845 9.64687C8.75554 9.46701 8.89408 9.1875 8.89408 8.80833C8.89408 8.46806 8.78713 8.19826 8.57324 7.99896C8.35936 7.79965 7.86352 7.57361 7.08574 7.32083C6.24963 7.05833 5.67602 6.74479 5.36491 6.38021C5.0538 6.01562 4.89824 5.57083 4.89824 5.04583C4.89824 4.41389 5.10241 3.92292 5.51074 3.57292C5.91908 3.22292 6.33713 3.02361 6.76491 2.975V2.33333C6.76491 2.16806 6.82081 2.02951 6.93262 1.91771C7.04443 1.8059 7.18297 1.75 7.34824 1.75C7.51352 1.75 7.65206 1.8059 7.76387 1.91771C7.87567 2.02951 7.93158 2.16806 7.93158 2.33333V2.975C8.30102 3.03333 8.62186 3.15243 8.89408 3.33229C9.1663 3.51215 9.38991 3.73333 9.56491 3.99583C9.65241 4.12222 9.66943 4.26319 9.61595 4.41875C9.56248 4.57431 9.45311 4.68611 9.28783 4.75417C9.15172 4.8125 9.01074 4.81493 8.86491 4.76146C8.71908 4.70799 8.58297 4.61319 8.45658 4.47708C8.33019 4.34097 8.18193 4.23646 8.01179 4.16354C7.84165 4.09063 7.63019 4.05417 7.37741 4.05417C6.94963 4.05417 6.62394 4.14896 6.40033 4.33854C6.17672 4.52813 6.06491 4.76389 6.06491 5.04583C6.06491 5.36667 6.21074 5.61944 6.50241 5.80417C6.79408 5.98889 7.29963 6.18333 8.01908 6.3875C8.68991 6.58194 9.1979 6.89062 9.54304 7.31354C9.88818 7.73646 10.0607 8.225 10.0607 8.77917C10.0607 9.46944 9.85658 9.99444 9.44824 10.3542C9.03991 10.7139 8.53436 10.9375 7.93158 11.025V11.6667C7.93158 11.8319 7.87567 11.9705 7.76387 12.0823C7.65206 12.1941 7.51352 12.25 7.34824 12.25Z"
                  fill="currentColor"
                />
              </svg>
              <p className="text-xs font-semibold	dark:text-[#D6D6D5] md:ml-1">
                Cost
              </p>
            </div>
          </div>
          
           {data?.map((tableRow, index) => (
              <div
                key={index}
                className="dark:border-stroke-dark grid grid-cols-3 border-b border-stroke dark:border-[#333B48] "
              >
                <div className="flex items-center justify-start px-3 py-4">
                  <p className="text-sm font-normal dark:text-[#D6D6D5] ">
                    {tableRow?.date}
                  </p>
                </div>

                <div className="flex items-center justify-start px-3 py-4">
                  <p className="text-sm font-normal dark:text-[#D6D6D5]">
                    {tableRow?.total_duration}
                  </p>
                </div>

                <div className="flex items-center justify-start px-3 py-4">
                  <p className="text-sm font-normal dark:text-[#D6D6D5]">
                    {tableRow?.total_cost}
                  </p>
                </div>
              </div>
            ))
          }
        </div>

     <div className="flex items-center justify-between  p-4 text-white">
      {/* Rows per page */}
      <div className="flex items-center space-x-2">
        <span className="text-sm">Rows</span>
        <select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
          className="rounded border border-gray-600 bg-[#2D3748] px-2 py-1 text-sm text-white focus:outline-none"
        >
          {rowsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="text-sm">Per Page</span>
      </div>

      {/* Pagination Numbers */}
      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <button
          className="inline-flex items-center px-2 py-1 text-sm hover:bg-gray-600 disabled:opacity-50"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L6.707 7l4.647 4.646a.5.5 0 0 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </button>

        {/* Page Numbers */}
        {getPaginationNumbers().map((page) =>
          page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1 ? (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-2 py-1 text-sm rounded ${
                currentPage === page
                  ? "bg-[#4A5568] text-white"
                  : "hover:bg-gray-600"
              }`}
            >
              {page}
            </button>
          ) : (
            <span
              key={page}
              className="px-2 py-1 text-sm text-gray-400"
            >
              ...
            </span>
          )
        )}

        {/* Next Button */}
        <button
          className="inline-flex items-center px-2 py-1 text-sm hover:bg-gray-600 disabled:opacity-50"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l5 5a.5.5 0 0 1 0 .708l-5 5a.5.5 0 0 1-.708-.708L9.293 7 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </button>
      </div>
    </div>
      </div>
    </div>
  );
}
export default TableBilling;
