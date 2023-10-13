import React from 'react';
import DataStatsThree from '../../components/DataStatsThree';
import ChartSeven from '../../components/ChartSeven'
import ChartEight from '../../components/ChartEight'
import ChartNine from '../../components/ChartNine'
import LeadsReport from '../../components/LeadsReport';
import ToDoList from '../../components/ToDoList';

const CRM: React.FC = () => {
  return (
    <>
      <DataStatsThree />

      <div className="mt-7.5 grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-7">
          <ChartSeven />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <ChartEight />
        </div>

        <LeadsReport />

        <div className="col-span-12 xl:col-span-5">
          <ChartNine />
        </div>

        <ToDoList />
      </div>
    </>
  );
};

export default CRM;
