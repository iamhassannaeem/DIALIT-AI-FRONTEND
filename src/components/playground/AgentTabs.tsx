import React, { useState } from 'react';
import FeedbackCard from './AgentTabs/FeedbackCard';
import ModelCard from './AgentTabs/ModelCard';
import AudioCard from './AgentTabs/AudioCard';
import WorkFlowCard from './AgentTabs/WorkFlowCard';
const AgentTabs: React.FC = ({
  details,
  selectedAgent,
  setFirstMessage,
  setSelectedProvider,
  setSelectedModel,
  firstMessage,
  selectedProvider,
  selectedModel,
  questions,
  setQuestions,
  ttsProvider,
  setTtsProvider,
  sttProvider,
  setSttProvider,
  gender,
  setGender,
  voice,
  setVoice,
  productPricing,
  setProductPricing,
  services,
  setServices,
  company,
  setCompany,
  pricing,
  setPricing,
  general,
  setGeneral,
  knowledge,
  setKnowledge,
  setError,
  setGetAgentDetails,
  setWorkFlow,
  workFlow,
}) => {
  const [openTab, setOpenTab] = useState(1);

  const activeClasses =
    'text-[#1D2532] dark:text-white dark:border-white border-black text-sm  font-semibold';
  const inactiveClasses =
    'border-transparent dark:text-[#D6D6D5] text-[#7E7E7E] text-sm font-normal ';

  return (
    <div className="flex  w-full flex-col gap-[24px] rounded-sm shadow-default">
      <div className="flex flex-wrap items-center justify-around gap-5 border-b  sm:gap-10">
        <div
          className={`flex w-[25%] cursor-pointer items-center justify-center gap-1 border-b-2 p-3 hover:text-[#1D2532] dark:text-white sm:gap-[10px] md:text-base ${
            openTab === 1 ? activeClasses : inactiveClasses
          }`}
          onClick={() => setOpenTab(1)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-black dark:fill-white"
              d="M12 21C11.7167 21 11.4792 20.9042 11.2875 20.7125C11.0958 20.5208 11 20.2833 11 20C11 19.7167 11.0958 19.4792 11.2875 19.2875C11.4792 19.0958 11.7167 19 12 19H19V11.9C19 9.95 18.3208 8.29583 16.9625 6.9375C15.6042 5.57917 13.95 4.9 12 4.9C10.05 4.9 8.39583 5.57917 7.0375 6.9375C5.67917 8.29583 5 9.95 5 11.9V17C5 17.2833 4.90417 17.5208 4.7125 17.7125C4.52083 17.9042 4.28333 18 4 18C3.45 18 2.97917 17.8042 2.5875 17.4125C2.19583 17.0208 2 16.55 2 16V14C2 13.65 2.0875 13.3208 2.2625 13.0125C2.4375 12.7042 2.68333 12.4583 3 12.275L3.075 10.95C3.20833 9.81667 3.5375 8.76667 4.0625 7.8C4.5875 6.83333 5.24583 5.99167 6.0375 5.275C6.82917 4.55833 7.7375 4 8.7625 3.6C9.7875 3.2 10.8667 3 12 3C13.1333 3 14.2083 3.2 15.225 3.6C16.2417 4 17.15 4.55417 17.95 5.2625C18.75 5.97083 19.4083 6.80833 19.925 7.775C20.4417 8.74167 20.775 9.79167 20.925 10.925L21 12.225C21.3167 12.375 21.5625 12.6 21.7375 12.9C21.9125 13.2 22 13.5167 22 13.85V16.15C22 16.4833 21.9125 16.8 21.7375 17.1C21.5625 17.4 21.3167 17.625 21 17.775V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H12ZM9 14C8.71667 14 8.47917 13.9042 8.2875 13.7125C8.09583 13.5208 8 13.2833 8 13C8 12.7167 8.09583 12.4792 8.2875 12.2875C8.47917 12.0958 8.71667 12 9 12C9.28333 12 9.52083 12.0958 9.7125 12.2875C9.90417 12.4792 10 12.7167 10 13C10 13.2833 9.90417 13.5208 9.7125 13.7125C9.52083 13.9042 9.28333 14 9 14ZM15 14C14.7167 14 14.4792 13.9042 14.2875 13.7125C14.0958 13.5208 14 13.2833 14 13C14 12.7167 14.0958 12.4792 14.2875 12.2875C14.4792 12.0958 14.7167 12 15 12C15.2833 12 15.5208 12.0958 15.7125 12.2875C15.9042 12.4792 16 12.7167 16 13C16 13.2833 15.9042 13.5208 15.7125 13.7125C15.5208 13.9042 15.2833 14 15 14ZM6.025 12.45C5.90833 10.6833 6.44167 9.16667 7.625 7.9C8.80833 6.63333 10.2833 6 12.05 6C13.5333 6 14.8375 6.47083 15.9625 7.4125C17.0875 8.35417 17.7667 9.55833 18 11.025C16.4833 11.0083 15.0875 10.6 13.8125 9.8C12.5375 9 11.5583 7.91667 10.875 6.55C10.6083 7.88333 10.0458 9.07083 9.1875 10.1125C8.32917 11.1542 7.275 11.9333 6.025 12.45Z"
              fill="#333B48"
            />
          </svg>
          <span>Model</span>
        </div>
        <div
          className={`flex  w-[25%] cursor-pointer items-center justify-center gap-1 border-b-2 p-3 hover:text-[#1D2532] dark:text-white sm:gap-[10px] md:text-base ${
            openTab === 2 ? activeClasses : inactiveClasses
          }`}
          onClick={() => setOpenTab(2)}
        >
          {selectedAgent?.type === 'feedback' ? (
            <>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_519_2489)">
                  <path
                    className=" fill-black dark:fill-white"
                    d="M20 2H4C2.9 2 2.01 2.9 2.01 4L2 22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4.58 16.59L4 17.17V4H20V16ZM10.5 14H18V12H12.5L10.5 14ZM14.36 8.13C14.56 7.93 14.56 7.62 14.36 7.42L12.59 5.65C12.39 5.45 12.08 5.45 11.88 5.65L6 11.53V14H8.47L14.36 8.13Z"
                    fill="#333B48"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_519_2489">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span>Feedback</span>
            </>
          ) : (
            <>
              {' '}
              <svg
                width="23"
                height="22"
                viewBox="0 0 23 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className=" fill-black dark:fill-white"
                  d="M14.2502 17.4167V16.5H12.4168C11.9127 16.5 11.4811 16.3205 11.122 15.9615C10.763 15.6024 10.5835 15.1708 10.5835 14.6667V7.33333H8.75016V8.25C8.75016 8.75417 8.57065 9.18576 8.21162 9.54479C7.85259 9.90382 7.421 10.0833 6.91683 10.0833H4.16683C3.66266 10.0833 3.23107 9.90382 2.87204 9.54479C2.51301 9.18576 2.3335 8.75417 2.3335 8.25V4.58333C2.3335 4.07917 2.51301 3.64757 2.87204 3.28854C3.23107 2.92951 3.66266 2.75 4.16683 2.75H6.91683C7.421 2.75 7.85259 2.92951 8.21162 3.28854C8.57065 3.64757 8.75016 4.07917 8.75016 4.58333V5.5H14.2502V4.58333C14.2502 4.07917 14.4297 3.64757 14.7887 3.28854C15.1477 2.92951 15.5793 2.75 16.0835 2.75H18.8335C19.3377 2.75 19.7693 2.92951 20.1283 3.28854C20.4873 3.64757 20.6668 4.07917 20.6668 4.58333V8.25C20.6668 8.75417 20.4873 9.18576 20.1283 9.54479C19.7693 9.90382 19.3377 10.0833 18.8335 10.0833H16.0835C15.5793 10.0833 15.1477 9.90382 14.7887 9.54479C14.4297 9.18576 14.2502 8.75417 14.2502 8.25V7.33333H12.4168V14.6667H14.2502V13.75C14.2502 13.2458 14.4297 12.8142 14.7887 12.4552C15.1477 12.0962 15.5793 11.9167 16.0835 11.9167H18.8335C19.3377 11.9167 19.7693 12.0962 20.1283 12.4552C20.4873 12.8142 20.6668 13.2458 20.6668 13.75V17.4167C20.6668 17.9208 20.4873 18.3524 20.1283 18.7115C19.7693 19.0705 19.3377 19.25 18.8335 19.25H16.0835C15.5793 19.25 15.1477 19.0705 14.7887 18.7115C14.4297 18.3524 14.2502 17.9208 14.2502 17.4167ZM16.0835 8.25H18.8335V4.58333H16.0835V8.25ZM16.0835 17.4167H18.8335V13.75H16.0835V17.4167ZM4.16683 8.25H6.91683V4.58333H4.16683V8.25Z"
                  fill="white"
                />
              </svg>
              <span>WorkFlow</span>
            </>
          )}
        </div>
        <div
          className={`flex  w-[25%] cursor-pointer items-center justify-center gap-1 border-b-2 p-3 hover:text-[#1D2532] dark:text-white sm:gap-[10px] md:text-base ${
            openTab === 3 ? activeClasses : inactiveClasses
          }`}
          onClick={() => setOpenTab(3)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-black dark:fill-white"
              d="M7 17V7C7 6.71667 7.09583 6.47917 7.2875 6.2875C7.47917 6.09583 7.71667 6 8 6C8.28333 6 8.52083 6.09583 8.7125 6.2875C8.90417 6.47917 9 6.71667 9 7V17C9 17.2833 8.90417 17.5208 8.7125 17.7125C8.52083 17.9042 8.28333 18 8 18C7.71667 18 7.47917 17.9042 7.2875 17.7125C7.09583 17.5208 7 17.2833 7 17ZM11 21V3C11 2.71667 11.0958 2.47917 11.2875 2.2875C11.4792 2.09583 11.7167 2 12 2C12.2833 2 12.5208 2.09583 12.7125 2.2875C12.9042 2.47917 13 2.71667 13 3V21C13 21.2833 12.9042 21.5208 12.7125 21.7125C12.5208 21.9042 12.2833 22 12 22C11.7167 22 11.4792 21.9042 11.2875 21.7125C11.0958 21.5208 11 21.2833 11 21ZM3 13V11C3 10.7167 3.09583 10.4792 3.2875 10.2875C3.47917 10.0958 3.71667 10 4 10C4.28333 10 4.52083 10.0958 4.7125 10.2875C4.90417 10.4792 5 10.7167 5 11V13C5 13.2833 4.90417 13.5208 4.7125 13.7125C4.52083 13.9042 4.28333 14 4 14C3.71667 14 3.47917 13.9042 3.2875 13.7125C3.09583 13.5208 3 13.2833 3 13ZM15 17V7C15 6.71667 15.0958 6.47917 15.2875 6.2875C15.4792 6.09583 15.7167 6 16 6C16.2833 6 16.5208 6.09583 16.7125 6.2875C16.9042 6.47917 17 6.71667 17 7V17C17 17.2833 16.9042 17.5208 16.7125 17.7125C16.5208 17.9042 16.2833 18 16 18C15.7167 18 15.4792 17.9042 15.2875 17.7125C15.0958 17.5208 15 17.2833 15 17ZM19 13V11C19 10.7167 19.0958 10.4792 19.2875 10.2875C19.4792 10.0958 19.7167 10 20 10C20.2833 10 20.5208 10.0958 20.7125 10.2875C20.9042 10.4792 21 10.7167 21 11V13C21 13.2833 20.9042 13.5208 20.7125 13.7125C20.5208 13.9042 20.2833 14 20 14C19.7167 14 19.4792 13.9042 19.2875 13.7125C19.0958 13.5208 19 13.2833 19 13Z"
              fill="#333B48"
            />
          </svg>
          Audio
        </div>
      </div>

      <div className="w-full">
        <div
          className={`leading-relaxed ${openTab === 1 ? 'block' : 'hidden'}`}
        >
          <ModelCard
            model={details}
            selectedAgent={selectedAgent}
            setFirstMessage={setFirstMessage}
            setSelectedProvider={setSelectedProvider}
            setSelectedModel={setSelectedModel}
            firstMessage={firstMessage}
            selectedProvider={selectedProvider}
            selectedModel={selectedModel}
            knowledge={knowledge}
            setKnowledge={setKnowledge}
          />
        </div>
        <div
          className={`leading-relaxed ${openTab === 2 ? 'block' : 'hidden'}`}
        >
          {selectedAgent?.type === 'feedback' ? (
            <FeedbackCard questions={questions} setQuestions={setQuestions} setError={setError} setGetAgentDetails={setGetAgentDetails} selectedAgent={selectedAgent}/>
          ) : (
            <WorkFlowCard
              files={details?.files}
              productPricing={productPricing}
              setProductPricing={setProductPricing}
              services={services}
              setServices={setServices}
              company={company}
              setCompany={setCompany}
              pricing={pricing}
              setPricing={setPricing}
              general={general}
              setGeneral={setGeneral}
              setWorkFlow={setWorkFlow}
              workFlow={workFlow}
            />
          )}
        </div>
        <div
          className={`leading-relaxed ${openTab === 3 ? 'block' : 'hidden'}`}
        >
          <AudioCard
            model={details}
            ttsProvider={ttsProvider}
            setTtsProvider={setTtsProvider}
            sttProvider={sttProvider}
            setSttProvider={setSttProvider}
            gender={gender}
            setGender={setGender}
            voice={voice}
            setVoice={setVoice}
          />
        </div>
      </div>
    </div>
  );
};

export default AgentTabs;