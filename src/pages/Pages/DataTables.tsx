import React from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import DataTableOne from '../../components/DataTableOne'
import DataTableTwo from '../../components/DataTableTwo'

const DataTables: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Data Tables" />

      <div className="flex flex-col gap-5 md:gap-7 2xl:gap-10">
        <DataTableOne />
        <DataTableTwo />
      </div>
    </>
  );
};

export default DataTables
