import DataTableTwo from '../components/DataTableTwo'
import ModalOne from '../components/ModalOne';

const organisations = () => {
  return (
    <>
     
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-5">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        Organisations
      </h2>

      <ModalOne />
    </div>

    <DataTableTwo />
      
    </>
  );
};

export default organisations;
