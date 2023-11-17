import OrganisationTable from '../../components/OrganisationTable'
import ModalOne from '../../components/OrganisationModal';
import { useSelector } from 'react-redux';

const organisations = () => {
  const perm = useSelector((state)=>state.isAdmin?.isAdmin?.group); 
  const isAdmin = useSelector((state)=>state.isAdmin?.isAdmin?.is_admin); 

  return (
    <>
     
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-5">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        Organisations
      </h2>

      {(perm?.create_organization || isAdmin)&&<ModalOne />}
    </div>

    <OrganisationTable />
      
    </>
  );
};

export default organisations;
