import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const data = {
    labels: [
      'Dialit.ai Fixed Cost', 
      'Talkscriber', 
      'GPT 4o', 
      'Cartesia', 
      'Web'
    ],
    datasets: [
      {
        data: [25, 15, 20, 10, 30], // Custom values as per your data
        backgroundColor: ['#32CD32', '#FF6347', '#00CED1', '#FFD700', '#FFFFFF'], // Custom colors
        hoverBackgroundColor: ['#32CD32', '#FF6347', '#00CED1', '#FFD700', '#FFFFFF'],
        borderWidth: 7,  // To create space between the segments
        borderRadius:20,
        
        borderColor: 'transparent',  // Same as the background to make the gaps invisible
      },
    ],
  };

  const options = {
    cutout: '78%',  // Adjust size of the inner circle
    responsive: true,
    plugins: {
      legend: {
        display: false,  // We'll use a custom legend
      },
      tooltip: {
        enabled: true, // Show tooltips on hover
      },
    },
  };

  return (
    <>
      <div className=' font-normal text-xs flex flex-col gap-3'>
        <p className='dark:text-[#D6D6D5] text-[#7E7E7E]'><span className='h-[6px] w-[6px] text-[#1FCD67]'>●</span> Dialit.ai Fixed Cost</p>
        <p className='dark:text-[#D6D6D5] text-[#7E7E7E]'><span className='h-[6px] w-[6px] text-[#F23030]' >●</span> Talkscriber</p>
        <p className='dark:text-[#D6D6D5] text-[#7E7E7E]'><span className='h-[6px] w-[6px] text-[#2691B6]'>●</span> GPT 4o</p>
        <p className='dark:text-[#D6D6D5] text-[#7E7E7E]'><span className='h-[6px] w-[6px] text-[#FBBF24]'>●</span> Cartesia</p>
        <p className='dark:text-[#D6D6D5] text-[#7E7E7E]'><span className='h-[6px] w-[6px] text-[#FFFFFF]'>●</span> Web</p>
      </div>

      {/* Doughnut Chart */}
      <div className='w-30 h-30'>
        <Doughnut data={data} options={options} />
      </div>
    </>
  );
};

export default DoughnutChart;
