import React, { useEffect, useRef, useState } from 'react';
import { DataTable } from 'simple-datatables';
import './datatables.css';
import { GetRoles, changePermission } from '../api/modules/Swiftsync.class';
import ChangePermission from './ChangePermissionModal';
import Toaster from './Toast/Toast'
import { useNavigate } from 'react-router-dom';
import Loader from '../common/Loader';
import ConfirmModalRoles from './ConfirmModalRoles';

interface Role {
  name: string;
  Addedby: string;
  view_migration: boolean;
  view_platform: boolean;
  view_organization: boolean;
  create_organization: boolean;
  id: number;
}

const UserTable: React.FC = ({user,setUser}) => {
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
      if (res?.name){
        setError({success:"Permissions Updated Successfully",error:""})
        setModalOpen(false);
        const updatedRoles = await GetRoles(onNavigate);
        setUser(updatedRoles);
        setLoading(false)
      }
        
    } catch (error) {
      console.error('API error:', error);
    }
    
  };
 

  useEffect(() => {
    const api = async () => {
      setLoading(true)
      try {
        const res = await GetRoles(onNavigate);
        setUser(res)
      } catch (error) {
        console.error('API error:', error);
      }
      setLoading(false)
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

    if (user && user.length > 0) {
      initTable();
    }
  }, [user]);

  return (
  <>
  <Toaster message={error}/>
  {loading ? <Loader/>: <div className="dark-bg-boxdark rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark">
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
              <th>Permissions</th>
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
                <td>
                    <ConfirmModalRoles id={item?.id} />
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>}

   
    </>
  );
};

export default UserTable;
