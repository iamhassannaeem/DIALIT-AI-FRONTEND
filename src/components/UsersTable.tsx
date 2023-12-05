import React, { useEffect, useState } from 'react';
import { DataTable } from 'simple-datatables';
import './datatables.css';
import { GetRoles, GetUserList } from '../api/modules/Swiftsync.class';
import RoleAssign from '../components/RoleAssign';
import Inactive from './Inactivemodal';
import EditUser from './EditUser';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../common/Loader';
interface Setup {
  name: string;
  email: string;
  is_active: boolean;
  group: string;
}

const SetupUser: React.FC = ({user,setUser}) => {
  const [roles, setRoles] = useState();
  const isAdmin = useSelector((state) => state.isAdmin?.isAdmin?.is_admin);
  const user_id=useSelector((state)=>state?.isAdmin?.isAdmin?.id)
  const [isloading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const onNavigate = (path: To) => {
    navigate(path);
  };
  useEffect(() => {
    try {
      const api = async () => {
        setIsloading(true);
        const res = await GetUserList(onNavigate);
        const role = await GetRoles(onNavigate);
        setRoles(role);
        setUser(res);
        setIsloading(false);
      };
      api();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const initTable = () => {
      const OrganisationTable = document.getElementById('SetupUser');
      if (OrganisationTable) {
        const NotMapped = new DataTable(OrganisationTable, {
          perPageSelect: [5, 10, 15, ['All', -1]],
        });
        NotMapped.init();
      }
    };

    // Initialize DataTable if platform data is available
    if (user && user.length > 0) {
      initTable();
    }
  }, [user]);

  return (
    <>
      {isloading ? (
        <Loader />
      ) : (
        <div className="dark-bg-boxdark rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark">
          <h6
            style={{
              fontSize: '20px',
              fontWeight: '700',
              color: 'black',
              borderBottom: '1px solid #E2E8F0',
            }}
            className="p-9"
          >
            ALL Users
          </h6>
          <div className="data-table-common data-table-two max-w-full overflow-x-auto">
            <table className="table w-full table-auto" id="SetupUser">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>EMAIL</th>
                  <th>Group</th>
                  <th>Status</th>
                  <th>Roles</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {user?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.group ? item?.group : 'Owner'}</td>
                    <td>{item?.is_active === true ? 'active' : 'Inactive'}</td>
                    <td>
                      <RoleAssign roles={roles} id={item?.id}  />
                    </td>
                    <td>
                      <div className="flex gap-3">
                      {user_id===item?.id ? <></>:<Inactive id={item?.id} status={item?.is_active} setUser={setUser} />} 
                        {/* {isAdmin && <EditUser item={item} />}    */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default SetupUser;
