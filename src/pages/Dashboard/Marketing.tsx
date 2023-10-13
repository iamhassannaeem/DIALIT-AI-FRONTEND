import React from 'react';
import DataStatsTwo from '../../components/DataStatsTwo';
import ChartFive from '../../components/ChartFive';
import TableFour from '../../components/TableFour';
import ExternalLink from '../../components/ExternalLink';
import ChartSix from '../../components/ChartSix';
import FeaturedCampaigns from '../../components/FeaturedCampaigns';
import Feedback from '../../components/Feedback';

const Marketing: React.FC = () => {
  return (
    <>
      <DataStatsTwo />

      <div className="mt-7.5 grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <TableFour />
        <ChartFive />
        <ExternalLink />
        <div className="col-span-12 xl:col-span-7">
          <ChartSix />
        </div>
        <FeaturedCampaigns />
        <Feedback />
      </div>
    </>
  );
};

export default Marketing;
