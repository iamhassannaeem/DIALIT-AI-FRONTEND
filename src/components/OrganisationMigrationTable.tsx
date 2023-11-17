import React, { useEffect } from 'react'
import { DataTable } from 'simple-datatables'
import './datatables.css'
import eye from '../images/organisation/eye.svg'
import ban from '../images/organisation/ban.svg'
import highlight from '../images/organisation/highlight.svg'
import { Link } from 'react-router-dom'
interface Migration {
  Name: string;
  Status: string;
  Source: string;
  Destination: string;
  CreateDate: string;
  CreatedBy:string;
  Action: string;
}

const OrganisationMigrationTable: React.FC = ({migrations}) => {
  const [user, setUser] = React.useState<Migration[]>([]);

  useEffect(() => {
    // Inside the useEffect, map your data and update the user state
    const mappedData = migrations?.map((item) => ({
      Name: item?.name,
      Status: item?.email,
      Source: item?.source,
      Destination:item?.destination,
      CreateDate:item?.created_at,
      CreatedBy:item?.added_by,
    }));
    setUser(mappedData);
  }, [migrations]); 

  useEffect(() => {
    const OrganisationMigrationTable = new DataTable('#OrganisationMigrationTable', {   
      header:false,
      perPageSelect: [5, 10, 15, ['All', -1]],
      
    });
    OrganisationMigrationTable;
  });

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark-bg-boxdark mt-5">
      <h6 style={{ fontSize: "20px", fontWeight: "700", color: "black" ,borderBottom:"1px solid #E2E8F0"}} className='p-9'>Organisation Migrations</h6>
      <div className="data-table-common data-table-two max-w-full overflow-x-auto">
        <table className="table w-full table-auto" id="OrganisationMigrationTable">
          <tbody>
            <tr>
              <th>MIGRATION NAME</th>
              <th>MIGRATION STATUS</th>
              <th>SOURCE</th>
              <th>DESTINATION</th>
              <th>DATE CREATED</th>
              <th>CREATED BY</th>
              <th>ACTION</th>
            </tr>
            {user?.map((employee, index) => (
              <tr key={index}>
               <td>
               <Link to={`/Migrationdetail/${employee.Name}`} >{employee.Name}</Link>
              </td>
                <td>
                  
                <button className="inline-flex rounded py-1 px-2 text-sm font-medium text-[#DC3545] " style={{backgroundColor:employee.Status==="started"?"#fecaca":employee.Status==="not started"?"#bbdaca":"#fecaca"}}>
                {employee.Status? employee.Status:"Not Started"}
          </button></td>
                <td>{employee.Source}</td>
                <td>{employee.Destination}</td>
                <td>{employee.CreateDate}</td>
                <td>{employee.CreatedBy}</td>
                <td>
                  <div className='flex gap-3'>
                 <Link to={`/Migrationdetail/${employee.Name}`}><img src={eye} alt="" /></Link> 
                    <img src={ban} alt="" />
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

export default OrganisationMigrationTable;
