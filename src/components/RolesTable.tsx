import React, { useEffect, useRef, useState } from 'react';
import { DataTable } from 'simple-datatables';
import './datatables.css';
import { GetRoles, changePermission } from '../api/modules/Swiftsync.class';
import ChangePermission from './ChangePermissionModal';
import Toaster from './Toast/Toast'
import { useNavigate } from 'react-router-dom';
import Loader from '../common/Loader';
interface Role {
  Name: string;
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
    console.log(`Navigating to ${path}`);  
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
setLoading(false)
        if (Array.isArray(res)) {
          const mappedData = res.map((item) => ({
            Name: item.name,
            Addedby: item.added_by,
            view_migration: item?.view_migration,
            view_platform: item?.view_platform,
            view_organization: item?.view_organization,
            create_organization: item?.create_organization,
            id: item.id,
          }));
          setUser(mappedData);

          if (tableRef.current) {
            new DataTable(tableRef.current, {
              header: false,
              perPageSelect: [5, 10, 15, ['All', -1]],
            });
          }
        } else {
          console.error('The response is not an array');
        }
      } catch (error) {
        console.error('API error:', error);
      }
    };
    api();
  }, []);

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
        <table className="table w-full table-auto" id="SetupRole" ref={tableRef}>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Added by</th>
              <th>View Migration</th>
              <th>View Platform</th>
              <th>View Organisation</th>
              <th>Create Organisation</th>
              <th>Action</th>
            </tr>
            {user?.map((item, index) => (
              <tr key={index}>
                <td>{item.Name}</td>
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
