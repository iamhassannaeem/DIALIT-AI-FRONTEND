import React, { useEffect } from 'react';
import { DataTable } from 'simple-datatables';
import './datatables.css';
import eye from '../images/organisation/eye.svg';
import del from '../images/packages/delete.svg'
import highlight from '../images/organisation/highlight.svg';

interface User {
  name: string;
  cloud: string;
  admin: string;
  date: string;
  createdby: string;
  Action: string;
}
const PlatformTable: React.FC = ({platforms}) => {
  const [user, setUser] = React.useState<User[]>([]);

  useEffect(() => {
    // Inside the useEffect, map your data and update the user state
    const mappedData = platforms?.map((item) => ({
      Name: item?.name,
      cloud:item?.service,
      Email: item?.admin_email,
      date:item?.created_at,
      createdby:item?.added_by,
      
    }));
    setUser(mappedData);
  }, [platforms]); 

  useEffect(() => {
    const PlatformTable = new DataTable('#PlatformTable', {
      header: false,
      perPageSelect: [5, 10, 15, ['All', -1]],
    });
    PlatformTable;
  });


  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark-bg-boxdark mt-5">
    <div style={{borderBottom: "1px solid #E2E8F0"}} className='flex justify-between items-center'>
    <h6 style={{ fontSize: "20px", fontWeight: "700", color: "black"}} className='p-9'>Organisation Platform</h6>
    
    </div>
    <div className="data-table-common data-table-two max-w-full overflow-x-auto">
      <table className="table w-full table-auto" id="PlatformTable">
        <tbody>
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
            
            <th><div className="flex items-center gap-1.5">
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
            </div></th>
           
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
            </div></th>
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
            </div></th>
            <th>ACTION</th>
          </tr>
          {user?.map((employee, index) => (
            <tr key={index}>
              <td>
                {employee.Name}
              </td>
              <td>
                {employee.cloud}
              </td>
              
              <td>{employee.Email}</td>
              <td>{employee.date}</td>
              
              <td>{employee.createdby}</td>
  
              <td>
                <div className='flex gap-3'>
               {/* <img src={eye} alt="" /> */}
                  <img src={del} alt="" />
                  <img src={highlight} alt="" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );

  
};

export default PlatformTable;
