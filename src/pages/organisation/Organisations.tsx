import React from 'react';
import OrganisationTable from '../../components/OrganisationTable'
import ModalOne from '../../components/OrganisationModal';
import { useSelector } from 'react-redux';
interface Employee {
  name: string;
  owner_email: string;
  owner_name: string;
  package: string;
}
const organisations = () => {
  const perm = useSelector((state)=>state.isAdmin?.isAdmin?.group); 
  const isAdmin = useSelector((state)=>state.isAdmin?.isAdmin?.is_admin); 
  const [organisation, setOrganisation] = React.useState<Employee[]>([]);
  return (
    <>
     
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-5">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
      Organizations
      </h2>

      {(perm?.create_organization || isAdmin)&&<ModalOne setOrganisation={setOrganisation}/>}
    </div>

    <OrganisationTable setOrganisation={setOrganisation} organisation={organisation}/>
      
    </>
  );
};

export default organisations;
