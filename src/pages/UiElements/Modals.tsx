import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import ModalOne from '../../components/ModalOne';
import ModalTwo from '../../components/ModalTwo';
import ModalThree from '../../components/ModalThree';

const Modals: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Modals" />

      <div className="rounded-sm border border-stroke bg-white p-10 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap justify-center gap-5">
          <ModalOne />
          <ModalTwo />
          <ModalThree />
        </div>
      </div>
    </>
  );
};

export default Modals;
