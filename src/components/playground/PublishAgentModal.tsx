import React, { useState } from 'react';
import cross from '../../images/cross.png';
import './modal.css';
import Select from 'react-select';
import clsx from 'clsx';
import { publishAgent, publishAgentDetails } from '../../api/modules/Swiftsync.class';
import { BeatLoader } from 'react-spinners';

interface PhoneNumber {
  id: string;
  phone_number: string;
  account_sid: string;
  account_auth_token: string;
  name: string;
  status: number;
}

// Custom styles for react-select with dark mode support

const PublishAgentModal = ({
  details,
  isOpen,
  openModal,
  closeModal,
  setError,
  selectedAgent,
  firstMessage,
  selectedProvider,
  selectedModel,
  questions,
  ttsProvider,
  sttProvider,
  gender,
  voice,
  productPricing,
  services,
  company,
  pricing,
  general,
  knowledge,
  setGetAgentDetails,
}: {
  details: any;
  isOpen: any;
  setIsOpen: any;
  closeModal: any;
  openModal: any;
  setError: (error: string,success: string) => void;
  firstMessage: any;
  selectedProvider: any;
  selectedModel: any;
  questions: any;
  ttsProvider: any;
  sttProvider: any;
  gender: any;
  voice: any;
  productPricing: any;
  services: any;
  company: any;
  pricing: any;
  general: any;
  selectedAgent: any;
  knowledge: any;
  setGetAgentDetails:any;
}) => {
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
    id: string;
  } | null>(null);
  // Map phone data to react-select options
  const options = details?.twilio_numbers?.map((item: PhoneNumber) => ({
    value: item.phone_number, // Value used in the form submission or logic
    label: item?.phone_number, // Label displayed in the dropdown
    id: item?.id,
  }));
  const [loading, setLoading] = useState(false);
  const handleChange = (
    option: { value: string; label: string; id: string } | null
  ) => {
    setSelectedOption(option);
  };

  const files = [
    { file: knowledge, file_type: 'prompt_files' },
    { file: productPricing, file_type: 'product_pricing' },
    { file: pricing, file_type: 'pricing' },
    { file: general, file_type: 'general_information' },
    { file: company, file_type: 'company_information' },
    { file: services, file_type: 'product_information' },
  ];

  const handleOpen = async () => {
    setLoading(true);

    // Prepare data with conditional assignment of feed_files or feed_questions
    const requestData = {
      first_message: firstMessage,
      active: true,
      gender: gender,
      ai_model: selectedModel,
      ai_tec: selectedProvider,
      voice_name: voice,
      agent_type: selectedAgent?.type,
      twillio_number: selectedOption?.id,
      tts_technology_provider: ttsProvider,
      stt_technology_provider: sttProvider,
      ...(selectedAgent?.type === 'sales'
        ? { files: files }
        : { feed_questions: questions }),
    };

    try {
      const res = await publishAgent(selectedAgent?.id, requestData);
      console.log(res);

      if (res?.status === 200) {
        setLoading(false);
        closeModal();
        setError({error:'',success:"Agent Published Successfully"})
        const res=await publishAgentDetails(selectedAgent?.id,selectedAgent?.type)
    setGetAgentDetails(res?.data);
      }
    } catch (error) {
      console.error('Error in publishing agent:', error);
      setLoading(false);
    }
  };
  return (
    <div>
      <button
        onClick={() => openModal()}
        disabled={
          !(
            firstMessage ||
            selectedProvider ||
            selectedModel ||
            productPricing ||
            questions ||
            ttsProvider ||
            sttProvider ||
            gender ||
            voice ||
            productPricing ||
            services ||
            company ||
            pricing ||
            general ||
            knowledge
          )
        }
        type="submit"
        className={`mt-[14px] flex items-center justify-center gap-[6px] rounded-[4px] bg-[#2691B6] p-3 text-xs font-semibold text-white ${
          !firstMessage && 'cursor-not-allowed opacity-50'
        }`}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_556_1489)">
            <path
              d="M4.5835 3.66669H17.4168V5.50002H4.5835V3.66669ZM4.5835 12.8334H8.25016V18.3334H13.7502V12.8334H17.4168L11.0002 6.41669L4.5835 12.8334ZM11.9168 11V16.5H10.0835V11H9.011L11.0002 9.01085L12.9893 11H11.9168Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_556_1489">
              <rect width="22" height="22" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <span>Publish</span>
      </button>

      {isOpen && (
        <div className=" fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/95 ">
          <div className="flex w-full max-w-142.5 flex-col gap-6 rounded-lg bg-[#EEEEEE]  p-8 dark:bg-[#222e42] ">
            <div className=" flex items-center justify-between text-center">
              <h2 className="text-lg font-semibold text-[#1D2532] dark:text-white sm:text-2xl">
                Publish Agent
              </h2>

              <svg
                className="cursor-pointer"
                onClick={closeModal}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="fill-[#1D2532] dark:fill-white "
                  d="M11.9998 13.4L7.0998 18.3C6.91647 18.4834 6.68314 18.575 6.3998 18.575C6.11647 18.575 5.88314 18.4834 5.6998 18.3C5.51647 18.1167 5.4248 17.8834 5.4248 17.6C5.4248 17.3167 5.51647 17.0834 5.6998 16.9L10.5998 12L5.6998 7.10005C5.51647 6.91672 5.4248 6.68338 5.4248 6.40005C5.4248 6.11672 5.51647 5.88338 5.6998 5.70005C5.88314 5.51672 6.11647 5.42505 6.3998 5.42505C6.68314 5.42505 6.91647 5.51672 7.0998 5.70005L11.9998 10.6L16.8998 5.70005C17.0831 5.51672 17.3165 5.42505 17.5998 5.42505C17.8831 5.42505 18.1165 5.51672 18.2998 5.70005C18.4831 5.88338 18.5748 6.11672 18.5748 6.40005C18.5748 6.68338 18.4831 6.91672 18.2998 7.10005L13.3998 12L18.2998 16.9C18.4831 17.0834 18.5748 17.3167 18.5748 17.6C18.5748 17.8834 18.4831 18.1167 18.2998 18.3C18.1165 18.4834 17.8831 18.575 17.5998 18.575C17.3165 18.575 17.0831 18.4834 16.8998 18.3L11.9998 13.4Z"
                  fill="#D6D6D5"
                />
              </svg>
            </div>

            <form>
              <label className="mb-2 block text-sm font-normal text-[#7E7E7E] dark:text-[#D6D6D5]">
                Phone Numbers
              </label>
              <div className="relative dark:bg-[#1D2532]">
                <Select
                  options={options}
                  value={selectedOption}
                  onChange={handleChange}
                  classNames={{
                    control: () => '',
                    option: () =>
                      'dark:bg-[#1D2532] dark:text-[white] cursor-pointer',
                  }}
                  placeholder="Select a phone number"
                />

                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-2 left-1"
                >
                  <path
                    className="fill-[#1D2532] "
                    d="M19.95 21C17.8667 21 15.8083 20.5458 13.775 19.6375C11.7417 18.7292 9.89167 17.4417 8.225 15.775C6.55833 14.1083 5.27083 12.2583 4.3625 10.225C3.45417 8.19167 3 6.13333 3 4.05C3 3.75 3.1 3.5 3.3 3.3C3.5 3.1 3.75 3 4.05 3H8.1C8.33333 3 8.54167 3.07917 8.725 3.2375C8.90833 3.39583 9.01667 3.58333 9.05 3.8L9.7 7.3C9.73333 7.56667 9.725 7.79167 9.675 7.975C9.625 8.15833 9.53333 8.31667 9.4 8.45L6.975 10.9C7.30833 11.5167 7.70417 12.1125 8.1625 12.6875C8.62083 13.2625 9.125 13.8167 9.675 14.35C10.1917 14.8667 10.7333 15.3458 11.3 15.7875C11.8667 16.2292 12.4667 16.6333 13.1 17L15.45 14.65C15.6 14.5 15.7958 14.3875 16.0375 14.3125C16.2792 14.2375 16.5167 14.2167 16.75 14.25L20.2 14.95C20.4333 15.0167 20.625 15.1375 20.775 15.3125C20.925 15.4875 21 15.6833 21 15.9V19.95C21 20.25 20.9 20.5 20.7 20.7C20.5 20.9 20.25 21 19.95 21ZM6.025 9L7.675 7.35L7.25 5H5.025C5.10833 5.68333 5.225 6.35833 5.375 7.025C5.525 7.69167 5.74167 8.35 6.025 9ZM14.975 17.95C15.625 18.2333 16.2875 18.4583 16.9625 18.625C17.6375 18.7917 18.3167 18.9 19 18.95V16.75L16.65 16.275L14.975 17.95Z"
                    fill="#D6D6D5"
                  />
                </svg>
              </div>
            </form>

            <div className="flex justify-between gap-[8px]">
              <button
                type="button"
                disabled={!selectedOption}
                onClick={handleOpen}
                className={`flex w-full items-center justify-center gap-2 rounded-[6px] bg-[#2691B6] p-[12px] text-sm font-semibold text-white ${!selectedOption && 'cursor-not-allowed opacity-5'}`}
              >
                {loading ? (
                  <BeatLoader color="white" />
                ) : (
                  <>
                    {' '}
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_556_1489)">
                        <path
                          d="M4.5835 3.66669H17.4168V5.50002H4.5835V3.66669ZM4.5835 12.8334H8.25016V18.3334H13.7502V12.8334H17.4168L11.0002 6.41669L4.5835 12.8334ZM11.9168 11V16.5H10.0835V11H9.011L11.0002 9.01085L12.9893 11H11.9168Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_556_1489">
                          <rect width="22" height="22" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span>Publish</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublishAgentModal;
