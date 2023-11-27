import React, { useEffect, useRef, useState } from 'react';
import { DataTable } from 'simple-datatables';
import './datatables.css';
import { GetRoles, changePermission } from '../api/modules/Swiftsync.class';
import ChangePermission from './ChangePermissionModal';
import Toaster from './Toast/Toast'
import { useNavigate } from 'react-router-dom';
import Loader from '../common/Loader';
interface Role {
  name: string;
  Addedby: string;
  view_migration: boolean;
  view_platform: boolean;
  view_organization: boolean;
  create_organization: boolean;
  id: number;
}

const UserTable: React.FC = () => {
  const [user, setUser] = React.useState<Role[]>([]);
  const [selectedUser, setSelectedUser] = useState<Role | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
const [error, setError] = useState({success:'', error:''});
  const tableRef = useRef<HTMLTableElement>(null);
  const navigate=useNavigate()

  const[loading,setLoading] = useState(false);

  const openModal = (user: Role) => {
    setSelectedUser(user);
    setModalOpen(true);
  };
  const onNavigate = (path: To) => {
    navigate(path)
      
  };
 
  const handleSave = async (permissions: Partial<Role>, userId: number) => {
    
    try {
      setLoading(true)
      const res = await changePermission(
        { ...selectedUser, ...permissions },
        userId,onNavigate
      );
      setLoading(false)

      
        setError({success:"Permissions Updated Successfully",error:""})
      
    } catch (error) {
      console.error('API error:', error);
    }
    setModalOpen(false);
  };
 

  useEffect(() => {
    const api = async () => {
      try {
        setLoading(true)
        const res = await GetRoles(onNavigate);
        setUser(res)
setLoading(false)
        
      } catch (error) {
        console.error('API error:', error);
      }
    };
    api();
  }, []);
  useEffect(() => {
    const initTable = () => {
      const OrganisationTable = document.getElementById('SetupRole');
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
  {loading && <Loader/>}
  <Toaster message={error}/>
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
        ALL Roles
      </h6>
      <div className="data-table-common data-table-two max-w-full overflow-x-auto">
        <table className="table w-full table-auto" id="SetupRole" >
          <thead>
            <tr>
              <th>Name</th>
              <th>Added by</th>
              <th>View Migration</th>
              <th>View Platform</th>
              <th>View Organisation</th>
              <th>Create Organisation</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {user?.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.Addedby ? item.Addedby : 'Admin'}</td>
                <td>{item.view_migration ? 'Yes' : 'No'}</td>
                <td>{item.view_platform ? 'Yes' : 'No'}</td>
                <td>{item.view_organization ? 'Yes' : 'No'}</td>
                <td>{item.create_organization ? 'Yes' : 'No'}</td>
                <td>
                  <ChangePermission
                  loading={loading}
                    user={item}
                    isOpen={modalOpen && selectedUser === item}
                    onOpen={() => openModal(item)}
                    onSave={(permissions) => handleSave(permissions, item.id)}
                    onClose={(  ) => setModalOpen(false)}
                  />
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

export default UserTable;
