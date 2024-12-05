import React, { useEffect, useState } from 'react';
import MonthlyUsageLimit from './MonthlyUsageLimit';
import CallLog from './CallLog';
import TableBilling from './TableBilling';
import { getBilling } from '../../api/modules/Swiftsync.class';
import Loader from '../../common/Loader';

const Billing: React.FC = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [monthly, setMonthly] = useState(null);
  const [daily, setDaily] = useState(null);

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        setLoading(true);
        const res = await getBilling();
        setData(res?.data?.daily_usage_details);
        setMonthly(res?.data?.monthly_usage);
        setDaily(res?.data?.daily_usage_today);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBillingData();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col justify-between gap-3 md:flex-row">
            <div className="flex-1">
              <MonthlyUsageLimit monthly={monthly} daily={daily} />
            </div>
            <div className="flex-1">
              <CallLog />
            </div>
          </div>
          <div>
            <TableBilling data={data} />
          </div>
        </>
      )}
    </div>
  );
};

export default Billing;
