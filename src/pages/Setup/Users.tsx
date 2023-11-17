

import UsersTable from '../../components/UsersTable';
import UserModal from '../../components/UserModal';
const Migration = () => {
 
  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-5">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
      Users
      </h2>
      <UserModal/>
      
    </div>

    <UsersTable />
    </>
  );
};

export default Migration;
