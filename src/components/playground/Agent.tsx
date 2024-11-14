import React, { useEffect, useState } from 'react';
import AgentModal from './AgentModal';
import agentimg from '../../images/agent.png';
import AgentDetails from './AgentDetails';
import {
  getAgents,
  publishAgentDetails,
} from '../../api/modules/Swiftsync.class';
import Loader from '../../common/Loader';
import Toaster from '../Toast/Toast';

const Agent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);
  const [agentData, setAgentData] = useState<any>({});

  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [getAgentDetails, setGetAgentDetails] = useState();
  const [agentstatus, setAgentStatus] = useState('');
  const [error, setError] = useState({ success: '', error: '' });

  const handleSelectAgent = async (
    id: string,
    type: string,
    status: string
  ) => {
    setAgentStatus(status);
    setLoading(true);
    setSelectedAgent({ id, type });
    console.log(id, type)
    const res = await publishAgentDetails(id);
    setGetAgentDetails(res?.data);
    setLoading(false);
  };

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        const res = await getAgents();
        setAgentData(res?.data);
        const firstAgent =res?.data[0];
        setSelectedAgent({
          id: firstAgent.id,
          type: firstAgent.type,
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAgents();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster message={error} />
      {agentData?.length > 0 ? (
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
                setAgentData={setAgentData}
              />
            </div>

            <div className="block w-full md:hidden">
              <select
                className="w-full rounded-md border bg-white p-2 text-[#1D2532] dark:bg-[#242E3E] dark:text-white"
                value={selectedAgent?.id || ''} // Ensure this is a string or empty initially
                onChange={(e) => {
                  const selectedOption = agentData?.find(
                    (agent) => String(agent.id) === e.target.value // Convert to string for comparison
                  );
                  if (selectedOption) {
                    handleSelectAgent(
                      selectedOption.id,
                      selectedOption.agent_type,
                      selectedOption?.active
                    ); // Update selected agent
                  }
                }}
              >
                <option value="" disabled>
                  Select an agent
                </option>
                {agentData?.map((agent) => (
                  <option key={agent.id} value={String(agent.id)}>
                    {agent?.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Grid layout for larger screens */}
            <div className="scrollbar hidden w-full items-center justify-start gap-3 overflow-x-auto md:flex">
              {agentData?.map((agent) => (
                <div
                  key={agent?.id}
                  className={`flex min-w-[180px] cursor-pointer flex-col rounded-md p-4 gap-2${
                    selectedAgent?.id === agent?.id
                      ? ' border-[#333B48] bg-[#faf7f7] dark:bg-[#242E3E]'
                      : ''
                  }`}
                  onClick={() =>
                    handleSelectAgent(agent?.id, agent?.agent_type, agent?.active)
                  }
                >
                  <h6 className="text-sm font-semibold text-[#1D2532] dark:text-white">
                    {agent?.name}
                  </h6>
                  <span className="text-xs font-normal text-[#1D2532] dark:text-white">
                    {agent?.agent_type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {getAgentDetails && (
            <AgentDetails
              selectedAgent={selectedAgent}
              getAgentDetails={getAgentDetails}
              setError={setError}
              setGetAgentDetails={setGetAgentDetails}
              agentstatus={agentstatus}
            />
          )}
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
              setAgentData={setAgentData}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Agent;
