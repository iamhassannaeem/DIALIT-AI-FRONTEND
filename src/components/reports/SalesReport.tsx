import React, { useEffect, useState } from 'react';
import { feedbackReport, salesReport } from '../../api/modules/Swiftsync.class';
import Loader from '../../common/Loader';

const SalesReport: React.FC = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await salesReport();
        setSalesData(res?.data || []); // Default to empty array if data is not present
      } catch (error) {
        console.error('Error fetching feedback report:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  

  return loading ? (
    <Loader />
  ) : (
    <div className="space-y-6 rounded-xl bg-[#EEEEEE] p-6 dark:bg-[#1D2532]">
    <div className="scrollbar overflow-x-auto">
    <table className="min-w-full text-left">
      <thead className="text-[#7E7E7E] dark:text-[#D6D6D5]">
        <tr>
          <th className="px-4 pb-3 text-xs font-semibold">
            Phone Number
          </th>
          <th className="px-4 pb-3 text-xs font-semibold">
            Email
          </th>
          <th className="px-4 pb-3 text-xs font-semibold">
            Date Of Birth
          </th>
          <th className="px-4 pb-3 text-xs font-semibold">Address</th>
          <th className="px-4 pb-3 text-xs font-semibold">Tag</th>
        </tr>
      </thead>
      <tbody>
        {salesData?.map((item, index) => (
          <tr
            key={index}
            className="border-t border-[#333b48] text-[#7E7E7E] dark:text-[#D6D6D5]"
          >
            <td className="py-3 px-4 text-sm font-normal">
              {item?.phone_number}
            </td>
            <td className="py-3 px-4 text-sm font-normal">
              {item?.email}
            </td>
            <td className="py-3 px-4 text-sm font-normal">
              {item?.date_of_birth}
            </td>

            <td className="py-3 px-4 text-sm font-normal uppercase">
              {item?.address}
            </td>
            <td
              className="py-3 px-4 text-sm font-normal capitalize"
            >
              {item?.tag}
            </td>
           
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </div>
  );
};

export default SalesReport;
