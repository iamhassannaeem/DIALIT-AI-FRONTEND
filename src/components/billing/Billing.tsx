import React from 'react';
import MonthlyUsageLimit from './MonthlyUsageLimit';
import CallLog from './CallLog';
import TableBilling from './TableBilling';
const Billing: React.FC = () => {
  return (
    <>
      <div className="flex flex-col justify-between gap-3 md:flex-row">
        <div className="flex-1">
          <MonthlyUsageLimit />
        </div>
        <div className="flex-1">
          <CallLog />
        </div>
      </div>
      <div>
        <TableBilling />
      </div>
    </>
  );
};

export default Billing;
