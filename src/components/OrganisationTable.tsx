import React, { useEffect,useState } from 'react';
import { DataTable } from 'simple-datatables';
import './datatables.css';
import eye from '../images/organisation/eye.svg';
import ban from '../images/organisation/ban.svg';
import highlight from '../images/organisation/highlight.svg';
import { Link, useNavigate } from 'react-router-dom';
import { organisationget } from '../api/modules/Swiftsync.class';
import Loader from '../common/Loader';

interface Employee {
  Name: string;
  Email: string;
  PhoneNumber: string;
  OrgName: string;
  PackagePlan: string;
  Action: string;
}

const OrganisationTable: React.FC = () => {
  useEffect(() => {
    const OrganisationTable = new DataTable('#OrganisationTable', {
      header: false,
      perPageSelect: [5, 10, 15, ['All', -1]],
    });

    OrganisationTable;
    console.log(OrganisationTable);
  });
  const [organisation, setOrganisation] = useState<Employee[]>([]);
  const [isloaing, setIsloading] = useState(false);
  const navigate=useNavigate()
  const onNavigate = (path: To) => {
    navigate(path)
    console.log(`Navigating to ${path}`);  
  };
  useEffect(() => {
    try {
      const api = async () => {
        setIsloading(true)
        const res = await organisationget(onNavigate);
        
        const mappedData = res?.map((item) => ({
          Name: item?.owner_name,
          Email: item?.owner_email,
          OrgName: item?.name,
          PackagePlan: item?.package,
          id: item?.id,
          Action: 'Actions', // You can set a default value for Action
        }));
        setOrganisation(mappedData);
      setIsloading(false)

      };

      api();
    } catch (error) {
      console.log(error);
    }
  }, []);



  return (
    <>
    {isloaing && <Loader/>}
     <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark-bg-boxdark">
      <h6 style={{ fontSize: "20px", fontWeight: "700", color: "black", borderBottom: "1px solid #E2E8F0" }} className='p-9'>ALL Organizations</h6>
      <div className="data-table-common data-table-two max-w-full overflow-x-auto">
        
        <table className="table w-full table-auto" id="OrganisationTable">
          <tbody>
            <tr>
              <th>OWNER's Name</th>
              <th>OWNER's EMAIL</th>
              <th>ORGANISATION NAME</th>
              <th>PACKAGE PLAN</th>
              <th>ACTION</th>
            </tr>
            {organisation?.map((employee, index) => (
              
              <tr key={index}>
                <td>{employee.Name}</td>
                <td>{employee.Email}</td>
                <td>{employee.OrgName}</td>
                <td>{employee?.PackagePlan?employee?.PackagePlan:"No package"}</td>
                <td>
                  <div className='flex gap-3'>
                
                    <Link to={`/organisationsDetail/${employee?.id}`} style={{display:"contents"}}>
                      <img src={eye} alt='eye' className='w-5 h-5' />
                    </Link>
                    {/* <img src={ban} alt="" />
                    <img src={highlight} alt="" /> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
   
  );
};

export default OrganisationTable;
