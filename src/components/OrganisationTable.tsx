import React, { useEffect,useState } from 'react';
import { DataTable } from 'simple-datatables';
import './datatables.css';
import eye from '../images/organisation/eye.svg';
import { Link, useNavigate } from 'react-router-dom';
import { organisationget } from '../api/modules/Swiftsync.class';
import Loader from '../common/Loader';

interface Employee {
  name: string;
  owner_email: string;
  owner_name: string;
  package: string;
}

const OrganisationTable: React.FC = () => {
  const [organisation, setOrganisation] = useState<Employee[]>([]);
  const [isloaing, setIsloading] = useState(false);
  const navigate=useNavigate()
  const onNavigate = (path: To) => {
    navigate(path)
      
  };

  useEffect(() => {
    const initTable = () => {
      const OrganisationTable = document.getElementById('OrganisationTable');
      if (OrganisationTable) {
        const NotMapped = new DataTable(OrganisationTable, {
          perPageSelect: [5, 10, 15, ['All', -1]],
        });
        NotMapped.init();
      }
    };

    // Initialize DataTable if platform data is available
    if (organisation && organisation.length > 0) {
      initTable();
    }
  }, [organisation]);

  useEffect(() => {
    try {
      const api = async () => {
        setIsloading(true)
        const res = await organisationget(onNavigate);
        
       setOrganisation(res)
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
          <thead>
            <tr>
              <th>OWNER's Name</th>
              <th>OWNER's EMAIL</th>
              <th>ORGANISATION NAME</th>
              <th>PACKAGE PLAN</th>
              <th>ACTION</th>
            </tr>
            </thead>
            <tbody>
            {organisation?.map((employee, index) => (
              
              <tr key={index}>
                <td>{employee.name}</td>
                <td>{employee.owner_email}</td>
                <td>{employee.owner_name}</td>
                <td>{employee?.package?employee?.package:"No package"}</td>
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
