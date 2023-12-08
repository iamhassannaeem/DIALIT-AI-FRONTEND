import React, { useEffect } from 'react';
import { DataTable } from 'simple-datatables';
import './datatables.css';
import eye from '../images/organisation/eye.svg';
import del from '../images/packages/delete.svg'
import highlight from '../images/organisation/highlight.svg';

interface User {
  name: string;
  email: string;
  group: string;
}

const OrganisationUser: React.FC = ({users}) => {

  useEffect(() => {
    const initTable = () => {
      const dataTableTwo = document.getElementById('OrganisationalUser');
      if (dataTableTwo) {
        const NotMapped = new DataTable(dataTableTwo, {
          perPageSelect: [5, 10, 15, ['All', -1]],
        });
        NotMapped.init();
      }
    };

    // Initialize DataTable if platform data is available
    if (users && users.length > 0) {
      initTable();
    }
  }, [users]);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark-bg-boxdark mt-5">
    <div style={{borderBottom: "1px solid #E2E8F0"}} className='flex justify-between items-center'>
    <h6 style={{ fontSize: "20px", fontWeight: "700", color: "black"}} className='p-9'>Organization User</h6>
    {/* <button
     
      className="rounded-md bg-primary py-3 px-3 font-medium text-white mr-3"
    >
      Add New User
    </button> */}
    </div>
    <div className="data-table-common data-table-two max-w-full overflow-x-auto">
      <table className="table w-full table-auto" id="OrganisationalUser">
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
           
            
            <th><div className="flex items-center gap-1.5">
              <p>EMAIL</p>
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
            </div></th>
           
            <th>
            <div className="flex items-center gap-1.5">
              <p>GROUP</p>
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
            </div></th>
           
          </tr>
          </thead>
          <tbody>
          {users?.map((item, index) => (
            <tr key={index}>
              <td>
                {item?.name}
              </td>
              
              <td>{item?.email}</td>
              
              <td>{item?.group}</td>
  
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );

  
};

export default OrganisationUser;
