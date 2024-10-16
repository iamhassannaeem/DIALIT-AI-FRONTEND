import React, { useState } from 'react';
import importBtn from '../../images/import.png';
import cross from '../../images/cross.png';
import './modal.css';
import feedback from '../../images/feedback.png';
import appointment from '../../images/appointment.png';
import order_cnfrm from '../../images/order_cnfrm.png';
import tracking from '../../images/tracking.png';
import support from '../../images/support.png';
import general_qa from '../../images/general_qa.png';

const AgentModal = ({
  isOpen,
  setIsOpen,
  openModal,
  closeModal,
}: {
  isOpen: any;
  setIsOpen: any;
  closeModal: any;
  openModal: any;
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>('feedback');

  const templates = [
    {
      id: 'feedback',
      name: 'Feedback Agent',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      icon: feedback,
    },
    {
      id: 'appointment',
      name: 'Appointment Agent',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      icon: appointment,
    },
    {
      id: 'order-confirmation',
      name: 'Order Confirmation Agent',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      icon: order_cnfrm,
    },
    {
      id: 'tracking',
      name: 'Tracking Order Agent',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      icon: tracking,
    },
    {
      id: 'support',
      name: 'Support Agent',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      icon: support,
    },
    {
      id: 'qna',
      name: 'General QnA Agent',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      icon: general_qa,
    },
  ];

  const handleTemplateSelect = (id: string) => {
    setSelectedTemplate(id);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="flex items-center justify-center gap-1 rounded-[6px] bg-[#2691B6] p-[12px] text-sm font-semibold text-white"
      >
        Choose Agent <img src={importBtn} alt="" />
      </button>

      {isOpen && (
        <div className="fixed top-0 left-0 z-[999999] flex h-full min-h-screen w-full items-center justify-center bg-black/90">
          <div className="w-full max-w-[850px] rounded-lg bg-[#EEEEEE]  dark:bg-[#1D2532] p-[24px] ">
            <div className="bg-gray-900 scrollbar mx-auto max-h-[90vh] max-w-4xl overflow-y-auto rounded-lg p-[24px] text-[#1D2532] dark:text-white ">
              <div className="flex items-center justify-between">
                {' '}
                <h4 className="mb-2 text-2xl font-semibold ">Create Agent</h4>
                <img
                  src={cross}
                  alt=""
                  className="cursor-pointer"
                  onClick={closeModal}
                />
              </div>
              <p className="mb-4 text-sm font-normal dark:text-[#D6D6D5] text-[#7E7E7E]">
                Here’s a few templates to get you started.
              </p>

              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-normal text-[#9AAAB9]"
                  htmlFor="agentName"
                >
                  Agent Name
                </label>
                <input
                  id="agentName"
                  type="text"
                  className="w-full rounded-lg border dark:border-[#333B48] dark:bg-[#242E3E] p-3 text-sm font-normal text-[#1D2532] dark:text-white focus:outline-none"
                  placeholder="Enter Agent Name"
                />
              </div>

              <h5 className="mb-2 text-base font-semibold">Choose Template</h5>
              <p className="mb-6 text-sm font-normal dark:text-[#D6D6D5] text-[#7E7E7E]">
                You can choose a template here to get started.
              </p>

              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {templates.map((template) => (
                  <div
                    key={template?.id}
                    onClick={() => handleTemplateSelect(template.id)}
                    className={`cursor-pointer rounded-lg border p-[16px] transition duration-200 ${
                      selectedTemplate === template.id
                        ? 'border-white dark:bg-[#242E3E] bg-[#c0bfbf]'
                        : 'border-transparent'
                    }  hover:border-white`}
                  >
                    <div className="mb-4 flex h-[60px] w-[60px] items-center justify-center rounded-[30px] bg-[#EEEEEE]  dark:bg-[#1D2532]">
                      <img src={template?.icon} alt="" />
                    </div>
                    <h5 className="mb-2 text-sm font-semibold">
                      {template?.name}
                    </h5>
                    <p className="text-sm font-normal dark:text-[#D6D6D5] text-[#7E7E7E]">
                      {template?.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex w-full items-center justify-between gap-[2px] sm:gap-[8px]">
                <button
                  onClick={closeModal}
                  className="w-[40%] rounded-[6px] border border-[#2691B6] bg-transparent px-1 py-2 text-[#1D2532] dark:text-white sm:w-full sm:px-4"
                >
                  Cancel
                </button>
                <button
                  onClick={closeModal}
                  className="w-[60%] rounded-[6px] bg-[#2691B6] px-1 py-2 text-[#1D2532] dark:text-white transition duration-200 sm:w-full sm:px-4"
                >
                  Create Agent
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentModal;
