import React from 'react';import RolesTable from '../../components/RolesTable'
import RolesModal from '../../components/RolesModal';

const Roles = () => {
  const [user, setUser] = React.useState<Role[]>([]);
 
  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-5">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
      Roles
      </h2>
      <RolesModal setUser={setUser}/>
      
    </div>

    <RolesTable user={user} setUser={setUser} />
    </>
  );
};

export default Roles;
