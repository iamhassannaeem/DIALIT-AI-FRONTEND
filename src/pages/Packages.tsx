import React,{useState} from 'react';
import ModalPackage from '../components/ModalPackage';
import PricingPackage from '../components/PricingPackage'

const organisations = () => {
  const [packages, setPackages] = useState([]);
  return (
    <>
     
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-5">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        Packages
      </h2>

      <ModalPackage  setPackages={setPackages} />
    </div>

    <PricingPackage packages={packages} setPackages={setPackages}/>
    
      
    </>
  );
};

export default organisations;
