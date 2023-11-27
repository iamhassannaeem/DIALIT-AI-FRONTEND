import React, { useEffect } from 'react';
import highlight from '../images/organisation/highlight.svg';
import del from '../images/packages/delete.svg';
import { getPackages } from '../api/modules/Swiftsync.class';
import { useNavigate } from 'react-router-dom';
import Loader from '../common/Loader';

const PricingPackage: React.FC = () => {
  const [packages, setPackages] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate=useNavigate()
  const onNavigate = (path: To) => {
    navigate(path)
      
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await getPackages(onNavigate);
        setPackages(res);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    // You can render a loading indicator here if needed
    return <div>{loading && <Loader/>}</div>;
  }
  if (Array.isArray(packages)) {
    return (

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        {/* <!-- Pricing Item --> */}

        {packages?.map((item, index) => (
          <div
            className="relative rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark md:p-9 xl:p-11.5"
            key={index}
          >
            {/* <span className="absolute right-3 flex gap-2">
              <img src={del} alt="Banner" />
              <img src={highlight} alt="Banner" />
            </span> */}
            <span className="mb-2.5 block text-title-sm2 font-bold text-black dark:text-white">
              {item?.name}
            </span>
            <h3>
              <span className="text-xl font-medium text-black dark:text-white">
                $
              </span>
              <span className="text-title-xxl2 font-bold text-black dark:text-white">
                {item?.monthly_price}
              </span>
              <span className="font-medium"> Per Month</span>
            </h3>
            <h3>
              <span className="text-xl font-medium text-black dark:text-white">
                $
              </span>
              <span className="text-title-xxl2 font-bold text-black dark:text-white">
                {item?.annual_price}
              </span>
              <span className="font-medium"> Per Year</span>
            </h3>

            <h4 className="mt-7.5 mb-5 text-lg font-medium text-black dark:text-white">
              Features
            </h4>

            <ul className="flex flex-col gap-3.5">
  {item?.description.split('\n').map((line, index) => (
    <li key={index}>{line}</li>
  ))}
</ul>
      </div>
    ))}
    </div>
    );
  } else {
    return <div>No packages available.</div>;
  }
};

export default PricingPackage;
