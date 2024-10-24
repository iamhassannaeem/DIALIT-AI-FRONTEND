import React, { useEffect, useState } from 'react';
import AgentModal from './AgentModal';
import agentimg from '../../images/agent.png';
import AgentDetails from './AgentDetails';
import { getAgents } from '../../api/modules/Swiftsync.class';

const Agent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [agentData, setAgentData] = useState<any>({});
  const [selectedAgent, setSelectedAgent] = useState<any>(null);

  const handleSelectAgent = (id: string, type: string) => {
    setSelectedAgent({ id, type });
  };

  const agents = [
    ...(agentData?.feedback_agents || []),
    ...(agentData?.sales_agents || []),
  ];

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await getAgents();

        if (res?.data?.feedback_agents.length > 0 || res?.data?.sales_agents.length > 0) {
          setAgentData(res?.data);

          // Set the first agent as the default selected agent
          const firstAgent =
            res.data.feedback_agents[0] || res.data.sales_agents[0];
          setSelectedAgent({
            id: firstAgent.id,
            type: firstAgent.type,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAgents();
  }, []);

  return (
    <>
      {agents.length > 0 ? (
        <div className="flex flex-col items-start justify-start gap-4">
          <div className="flex w-full flex-col gap-6 rounded-t-xl bg-[#EEEEEE] p-6 dark:bg-[#1D2532]">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-base font-semibold text-[#1D2532] dark:text-white">
                  All Agents
                </h5>
                <span className="text-xs font-normal text-[#7E7E7E] dark:text-[#D6D6D5]">
                  Here are all your created agents.
                </span>
              </div>
              <AgentModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                openModal={openModal}
                closeModal={closeModal}
              />
            </div>

            <div className="block w-full md:hidden">
              <select
                className="w-full rounded-md border bg-white p-2 text-[#1D2532] dark:bg-[#242E3E] dark:text-white"
                value={selectedAgent?.id || ''} // Ensure this is a string or empty initially
                onChange={(e) => {
                  const selectedOption = agents.find(
                    (agent) => String(agent.id) === e.target.value // Convert to string for comparison
                  );
                  if (selectedOption) {
                    handleSelectAgent(selectedOption.id, selectedOption.type); // Update selected agent
                  }
                }}
              >
                <option value="" disabled>
                  Select an agent
                </option>
                {agents?.map((agent) => (
                  <option key={agent.id} value={String(agent.id)}>
                    {agent?.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Grid layout for larger screens */}
            <div className="scrollbar hidden w-full items-center justify-between gap-3 overflow-x-auto md:flex">
              {agents?.map((agent) => (
                <div
                  key={agent?.id}
                  className={`flex min-w-[150px] cursor-pointer flex-col rounded-md p-2 gap-2${
                    selectedAgent?.id === agent?.id
                      ? ' border-[#333B48] bg-[#c0bfbf] dark:bg-[#242E3E]'
                      : ''
                  }`}
                  onClick={() => handleSelectAgent(agent?.id, agent?.type)}
                >
                  <h6 className="text-sm font-semibold text-[#1D2532] dark:text-white">
                    {agent?.name}
                  </h6>
                  <span className="text-xs font-normal text-[#1D2532] dark:text-white">
                    {agent?.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <AgentDetails selectedAgent={selectedAgent} />
        </div>
      ) : (
        <div className="flex w-full flex-col items-center gap-6 rounded-lg bg-[#EEEEEE]  p-6 dark:bg-[#1D2532]">
          <img src={agentimg} alt="" />
          <div className="flex flex-col items-center justify-center gap-2">
            <h4 className="text-center text-2xl font-semibold text-[#1D2532] dark:text-white">
              Agent
            </h4>
            <p className="text-center text-sm font-normal text-[#7E7E7E] dark:text-[#D6D6D5]">
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
