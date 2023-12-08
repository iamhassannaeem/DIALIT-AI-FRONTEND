import React, { useEffect } from 'react';
import { DataTable } from 'simple-datatables';
import './datatables.css';
import eye from '../images/organisation/eye.svg';
import ban from '../images/organisation/ban.svg';
import highlight from '../images/organisation/highlight.svg';
import { Link } from 'react-router-dom';
interface Migration {
  Name: string;
  Status: string;
  Source: string;
  Destination: string;
  CreateDate: string;
  CreatedBy: string;
  Action: string;
}

const OrganisationMigrationTable: React.FC = ({ migrations }) => {
  useEffect(() => {
    const initTable = () => {
      const dataTableTwo = document.getElementById(
        'OrganisationMigrationTable'
      );
      if (dataTableTwo) {
        const NotMapped = new DataTable(dataTableTwo, {
          perPageSelect: [5, 10, 15, ['All', -1]],
        });
        NotMapped.init();
      }
    };

    // InitialusersataTable if platform data is available
    if (migrations && migrations.length > 0) {
      initTable();
    }
  }, [migrations]);

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
      <h6
        style={{
          fontSize: '20px',
          fontWeight: '700',
          color: 'black',
          borderBottom: '1px solid #E2E8F0',
        }}
        className="p-9"
      >
        Organisation Migrations
      </h6>
      <div className="data-table-common data-table-two max-w-full overflow-x-auto">
        <table
          className="table w-full table-auto"
          id="OrganisationMigrationTable"
        >
          <thead>
            <tr>
              <th>MIGRATION NAME</th>
              <th>MIGRATION STATUS</th>
              <th>SOURCE</th>
              <th>DESTINATION</th>
              <th>DATE CREATED</th>
              <th>CREATED BY</th>
              {/* <th>ACTION</th> */}
            </tr>
          </thead>
          <tbody>
            {migrations?.map((employee, index) => (
              <tr key={index}>
                <td>
                  <Link to={`/Migrationdetail/${employee?.name}`}>
                    {employee?.name}
                  </Link>
                </td>
                <td>
                  <button
                    className="inline-flex rounded py-1 px-2 text-sm font-medium text-[#DC3545] "
                    style={{
                      backgroundColor:
                        employee.Status === 'started'
                          ? '#fecaca'
                          : employee.Status === 'not started'
                          ? '#bbdaca'
                          : '#fecaca',
                    }}
                  >
                    {employee.Status ? employee.Status : 'Not Started'}
                  </button>
                </td>
                <td>{employee?.source}</td>
                <td>{employee?.destination}</td>
                <td>{convertUTCToLocalTime(employee?.created_at)}</td>
                <td>{employee?.added_by}</td>
                {/* <td>
                  <div className='flex gap-3'>
                 
                  <img src={eye} alt="" />
                  
                    <img src={ban} alt="" />
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

export default OrganisationMigrationTable;
