import React, { useEffect } from 'react';
import { DataTable } from 'simple-datatables';
import './datatables.css';
import eye from '../images/organisation/eye.svg';
import del from '../images/packages/delete.svg';
import highlight from '../images/organisation/highlight.svg';

interface User {
  name: string;
  cloud: string;
  admin: string;
  date: string;
  createdby: string;
  Action: string;
}
const PlatformTable: React.FC = ({ platforms }) => {
  useEffect(() => {
    const initTable = () => {
      const dataTableTwo = document.getElementById('PlatformTable');
      if (dataTableTwo) {
        const NotMapped = new DataTable(dataTableTwo, {
          perPageSelect: [5, 10, 15, ['All', -1]],
        });
        NotMapped.init();
      }
    };

    // Initialize DataTable if platform data is available
    if (platforms && platforms.length > 0) {
      initTable();
    }
  }, [platforms]);

  const convertUTCToLocalTime = (utcTimeString) => {
    const utcDate = new Date(utcTimeString);

    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true, // Display in 12-hour format with AM/PM
    };

    const localDateString = utcDate.toLocaleString('en-US', options);
    return localDateString;
  };

  return (
    <div className="dark-bg-boxdark mt-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark">
      <div
        style={{ borderBottom: '1px solid #E2E8F0' }}
        className="flex items-center justify-between"
      >
        <h6
          style={{ fontSize: '20px', fontWeight: '700', color: 'black' }}
          className="p-9"
        >
          Organization Platform
        </h6>
      </div>
      <div className="data-table-common data-table-two max-w-full overflow-x-auto">
        <table className="table w-full table-auto" id="PlatformTable">
          <thead>
            <tr>
              <th>
                <div className="flex items-center gap-1.5">
                  <p> NAME</p>
                  <div className="inline-flex flex-col space-y-[2px]">
                    <span className="inline-block">
                      <svg
                        className="fill-current"
                        width="10"
                        height="5"
                        viewBox="0 0 10 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 0L0 5H10L5 0Z" fill="" />
                      </svg>
                    </span>
                    <span className="inline-block">
                      <svg
                        className="fill-current"
                        width="10"
                        height="5"
                        viewBox="0 0 10 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 5L10 0L-4.37114e-07 8.74228e-07L5 5Z"
                          fill=""
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </th>
              <th>
                <div className="flex items-center gap-1.5">
                  <p> CLOUD STORAGE PROVIDER</p>
                  <div className="inline-flex flex-col space-y-[2px]">
                    <span className="inline-block">
                      <svg
                        className="fill-current"
                        width="10"
                        height="5"
                        viewBox="0 0 10 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 0L0 5H10L5 0Z" fill="" />
                      </svg>
                    </span>
                    <span className="inline-block">
                      <svg
                        className="fill-current"
                        width="10"
                        height="5"
                        viewBox="0 0 10 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 5L10 0L-4.37114e-07 8.74228e-07L5 5Z"
                          fill=""
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </th>

              <th>
                <div className="flex items-center gap-1.5">
                  <p>ADMIN EMAIL</p>
                  <div className="inline-flex flex-col space-y-[2px]">
                    <span className="inline-block">
                      <svg
                        className="fill-current"
                        width="10"
                        height="5"
                        viewBox="0 0 10 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 0L0 5H10L5 0Z" fill="" />
                      </svg>
                    </span>
                    <span className="inline-block">
                      <svg
                        className="fill-current"
                        width="10"
                        height="5"
                        viewBox="0 0 10 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 5L10 0L-4.37114e-07 8.74228e-07L5 5Z"
                          fill=""
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </th>

              <th>
                <div className="flex items-center gap-1.5">
                  <p>DATE CREATED</p>
                  <div className="inline-flex flex-col space-y-[2px]">
                    <span className="inline-block">
                      <svg
                        className="fill-current"
                        width="10"
                        height="5"
                        viewBox="0 0 10 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 0L0 5H10L5 0Z" fill="" />
                      </svg>
                    </span>
                    <span className="inline-block">
                      <svg
                        className="fill-current"
                        width="10"
                        height="5"
                        viewBox="0 0 10 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 5L10 0L-4.37114e-07 8.74228e-07L5 5Z"
                          fill=""
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </th>
              <th>
                <div className="flex items-center gap-1.5">
                  <p>CREATED BY</p>
                  <div className="inline-flex flex-col space-y-[2px]">
                    <span className="inline-block">
                      <svg
                        className="fill-current"
                        width="10"
                        height="5"
                        viewBox="0 0 10 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 0L0 5H10L5 0Z" fill="" />
                      </svg>
                    </span>
                    <span className="inline-block">
                      <svg
                        className="fill-current"
                        width="10"
                        height="5"
                        viewBox="0 0 10 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 5L10 0L-4.37114e-07 8.74228e-07L5 5Z"
                          fill=""
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {platforms?.map((employee, index) => (
              <tr key={index}>
                <td>{employee.name}</td>
                <td>{employee.service}</td>

                <td>{employee.admin_email}</td>
                <td>{convertUTCToLocalTime(employee.created_at)}</td>

                <td>{employee.added_by}</td>

                {/* <td>
                <div className='flex gap-3'>
               
                  <img src={del} alt="" />
                  <img src={highlight} alt="" />
                </div>
              </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlatformTable;
