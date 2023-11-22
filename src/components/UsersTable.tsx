import React, { useEffect,useState } from 'react';
import { DataTable } from 'simple-datatables';
import './datatables.css';
import { GetRoles, GetUserList } from '../api/modules/Swiftsync.class';
import RoleAssign from '../components/RoleAssign'
import Inactive from './Inactivemodal';
import EditUser from './EditUser';  
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
interface Setup {
  Name: string;
  Email: string;
  is_active:boolean;
  Group: string;
  
}

const SetupUser: React.FC = () => {
  const [user, setUser] = React.useState<Setup[]>([]);
 const [roles,setRoles]=useState()
 const isAdmin = useSelector((state)=>state.isAdmin?.isAdmin?.is_admin); 
 const navigate=useNavigate()
 const onNavigate = (path: To) => {
   navigate(path)
   console.log(`Navigating to ${path}`);  
 };
  useEffect(() => {
    try {
      const api = async () => {
        const res = await GetUserList(onNavigate);
        const role=await GetRoles(onNavigate)
        setRoles(role)
        
        console.log(res);
  
        if (Array.isArray(res)) {
          const mappedData = res.map((item) => ({
            id:item?.id,
            Name: item.name,
            Email: item.email,
            Group:item?.group,
            is_active:item?.is_active,
          }));
          setUser(mappedData);
        } else {
          console.log("The response is not an array");
        }
      };
      api();
    } catch (error) {
      console.log(error);
    }
  }, []);
  

  useEffect(() => {
    const SetupUser = new DataTable('#SetupUser', {
      header: false,
      perPageSelect: [5, 10, 15, ['All', -1]],
    });
    SetupUser;
  });

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark-bg-boxdark">
      <h6 style={{ fontSize: "20px", fontWeight: "700", color: "black", borderBottom: "1px solid #E2E8F0" }} className='p-9'>ALL Users</h6>
      <div className="data-table-common data-table-two max-w-full overflow-x-auto">
        
        <table className="table w-full table-auto" id="SetupUser">
          <tbody>
            <tr>
              <th>Name</th>
              <th>EMAIL</th>
              <th>Group</th>
              <th>Status</th>
              <th>Roles</th>
              <th>ACTION</th>
            </tr>
            {user?.map((item, index) => (
              
              <tr key={index}>
                <td>{item.Name}</td>
                <td>{item.Email}</td>
                <td>{item.Group?item?.Group:"Owner"}</td>
                <td>{item?.is_active===true ?"active":"Inactive" }</td>
                <td>
                <RoleAssign roles={roles} id={item?.id}/>

                </td>
                <td>
                <div className='flex gap-3'>
                    <Inactive id={item?.id}/>
                 {/* {isAdmin && <EditUser item={item} />}    */}
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

export default SetupUser;
