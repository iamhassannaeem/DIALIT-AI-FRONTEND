import React from 'react';
import MonthlyUsageLimit from './MonthlyUsageLimit';
import CallLog from './CallLog';
const Billing: React.FC = () => {
  return (
    <>
     <div className="flex flex-col md:flex-row gap-3 justify-between h-screen">
        <div className="flex-1">
          <MonthlyUsageLimit />
        </div>
        <div className="flex-1">
          <CallLog />
        </div>
      </div>
    </>
  );
};

export default Billing;
