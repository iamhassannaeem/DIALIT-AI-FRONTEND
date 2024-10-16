import React, { ReactNode } from 'react';
import up from '../images/up.png';
import low from '../images/low.png';
interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
  val: number;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  val,
}) => {
  return (
    <div className="rounded-[10px] bg-[#EEEEEE]  dark:bg-[#1D2532] p-[16px] shadow-default flex flex-col gap-[12px]">
     
        <h2 className="text-title-md text-[40px] font-semibold text-[#1D2532]  dark:text-white">
          {total}
        </h2>
        <div className="flex items-center justify-between">
          <h6 className="mt-1 text-sm font-semibold  dark:text-[#D6D6D5] text-[#7E7E7E]">{title}</h6>
         <div className='flex justify-center items-center'>
          <span
            className={`text-xs font-semibold ${
              levelUp ? 'text-[#1FCD67]' : 'text-[#F23030]'
            }`}
          >
            {val} 
          </span>
          <img src={levelUp ? up : low} alt="" />
          </div>
        </div>

      
    </div>
  );
};

export default CardDataStats;
