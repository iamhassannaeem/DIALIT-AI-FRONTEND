import React, { useState } from 'react';
import AgentModal from './AgentModal';
import agentimg from '../../images/agent.png';
import AgentDetails from './AgentDetails';
const agents = [
  {
    id: 'domify',
    name: 'Domify',
    description: 'Order Confirmation Agent',
  },
  {
    id: 'appoinify',
    name: 'Appoinify',
    description: 'Appointment Agent',
  },
  {
    id: 'feedist-pro',
    name: 'Feedist Pro',
    description: 'Feedback Agent',
  },
  {
    id: 'trackify',
    name: 'Trackify',
    description: 'Tracking Order Agent',
  },
  {
    id: 'saleify',
    name: 'Saleify',
    description: 'Sales Agent',
  },
  {
    id: 'chatify',
    name: 'Chatify',
    description: 'General QnA Agent',
  },
];
const Agent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const data = true;

  const [selectedAgent, setSelectedAgent] = useState<string | null>('domify');

  const handleSelectAgent = (id: string) => {
    setSelectedAgent(id);
  };

  return (
    <>
      {data ? (
       <div className="flex flex-col items-start justify-start gap-4">
       <div className="flex flex-col w-full gap-6 rounded-t-xl bg-[#EEEEEE] dark:bg-[#1D2532] p-6">
         <div>
           <h5 className="text-base font-semibold text-[#1D2532] dark:text-white">All Agents</h5>
           <span className="text-xs font-normal dark:text-[#D6D6D5] text-[#7E7E7E]">
             Here are all your created agents.
           </span>
         </div>
         
         {/* Dropdown for small screens */}
         <div className="block md:hidden w-full">
           <select
             className="w-full p-2 border rounded-md bg-white dark:bg-[#242E3E] text-[#1D2532] dark:text-white"
             value={selectedAgent}
             onChange={(e) => handleSelectAgent(e.target.value)}
           >
             {agents.map((agent) => (
               <option key={agent.id} value={agent.id}>
                 {agent.name}
               </option>
             ))}
           </select>
         </div>
     
         {/* Grid layout for larger screens */}
         <div className="hidden md:flex flex-wrap items-center justify-between gap-3">
           {agents.map((agent) => (
             <div
               key={agent.id}
               className={`cursor-pointer rounded-md p-2 ${
                 selectedAgent === agent.id
                   ? ' border-[#333B48] dark:bg-[#242E3E] bg-[#c0bfbf]'
                   : ''
               }`}
               onClick={() => handleSelectAgent(agent.id)}
             >
               <h6 className="text-sm font-semibold text-[#1D2532] dark:text-white">
                 {agent.name}
               </h6>
               <span className="text-xs font-normal text-[#1D2532] dark:text-white">
                 {agent.description}
               </span>
             </div>
           ))}
         </div>
       </div>
     
       <AgentDetails />
     </div>
     
      ) : (
        <div className="flex w-full flex-col items-center gap-6 rounded-lg bg-[#EEEEEE]  dark:bg-[#1D2532] p-6">
          <img src={agentimg} alt="" />
          <div className="flex flex-col items-center justify-center gap-2">
            <h4 className="text-center text-2xl font-semibold text-[#1D2532] dark:text-white">
              Agent
            </h4>
            <p className="text-center text-sm font-normal dark:text-[#D6D6D5] text-[#7E7E7E]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut.
              <br />
              Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris.
            </p>
          </div>
          <div>
            <AgentModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              openModal={openModal}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Agent;
