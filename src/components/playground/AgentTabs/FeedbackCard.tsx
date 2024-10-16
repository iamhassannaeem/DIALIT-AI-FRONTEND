import React, { useState } from 'react';
const FeedbackCard = () => {
  const [questions, setQuestions] = useState([
    { id: 1, question: 'How can I give my feedback?' },
    {
      id: 2,
      question: 'How much does the monthly subscription cost in total?',
    },
    { id: 3, question: 'How much does the yearly subscription cost in total?' },
    { id: 4, question: 'Does this software have a 7-day free trial period?' },
  ]);
  const [isAdding, setIsAdding] = useState(false); // For showing the add form
  const [newQuestion, setNewQuestion] = useState(''); // For handling new question input

  // Handles form submission
  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (newQuestion.trim() === '') return; // Prevent adding empty questions
    setQuestions([
      ...questions,
      { id: questions.length + 1, question: newQuestion },
    ]);
    setNewQuestion('');
    setIsAdding(false); // Hide the form after adding the question
  };
  return (
    <div className=" mx-auto rounded-lg bg-[#c0bfbf] dark:bg-[#242E3E] p-2 shadow-md  sm:p-4">
      <div className="mb-4 flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col justify-start gap-[6px]">
          <div className=" flex items-center gap-3 sm:mb-0">
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
            <h2 className=" text-base font-semibold text-[#1D2532] dark:text-white">
              Feedback
            </h2>
          </div>
          <span className="text-sm font-normal text-[#7E7E7E] dark:text-[#D6D6D5]">
            Lorem ipsum dolor sit amet
          </span>
        </div>
        <button
          className="flex items-center justify-center gap-2 rounded-full p-2 text-[#1D2532] dark:text-white sm:p-3"
          onClick={() => setIsAdding(true)}
        >
          Add New Question{' '}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className=" fill-black dark:fill-white"
              d="M11 13V16C11 16.2833 11.0958 16.5208 11.2875 16.7125C11.4792 16.9042 11.7167 17 12 17C12.2833 17 12.5208 16.9042 12.7125 16.7125C12.9042 16.5208 13 16.2833 13 16V13H16C16.2833 13 16.5208 12.9042 16.7125 12.7125C16.9042 12.5208 17 12.2833 17 12C17 11.7167 16.9042 11.4792 16.7125 11.2875C16.5208 11.0958 16.2833 11 16 11H13V8C13 7.71667 12.9042 7.47917 12.7125 7.2875C12.5208 7.09583 12.2833 7 12 7C11.7167 7 11.4792 7.09583 11.2875 7.2875C11.0958 7.47917 11 7.71667 11 8V11H8C7.71667 11 7.47917 11.0958 7.2875 11.2875C7.09583 11.4792 7 11.7167 7 12C7 12.2833 7.09583 12.5208 7.2875 12.7125C7.47917 12.9042 7.71667 13 8 13H11ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
              fill="#333B48"
            />
          </svg>
        </button>
      </div>
      {isAdding ? (
        <form onSubmit={handleAddQuestion} className="mb-4">
          <h3 className="mb-2 text-xs font-normal text-[#7E7E7E] dark:text-[#D6D6D5]">
            Question
          </h3>
          <input
            type="text"
            className="w-full rounded-md border p-2 dark:bg-[#1D2532] dark:text-white"
            placeholder="Enter your question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="mt-[14px] rounded-[4px] bg-[#2691B6] p-2 text-xs font-semibold text-white flex gap-[6px] items-center justify-center"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.75 15.75C3.3375 15.75 2.98438 15.6031 2.69063 15.3094C2.39687 15.0156 2.25 14.6625 2.25 14.25V3.75C2.25 3.3375 2.39687 2.98438 2.69063 2.69063C2.98438 2.39687 3.3375 2.25 3.75 2.25H12.1313C12.3313 2.25 12.5219 2.2875 12.7031 2.3625C12.8844 2.4375 13.0438 2.54375 13.1813 2.68125L15.3188 4.81875C15.4563 4.95625 15.5625 5.11563 15.6375 5.29688C15.7125 5.47813 15.75 5.66875 15.75 5.86875V14.25C15.75 14.6625 15.6031 15.0156 15.3094 15.3094C15.0156 15.6031 14.6625 15.75 14.25 15.75H3.75ZM14.25 5.8875L12.1125 3.75H3.75V14.25H14.25V5.8875ZM9 13.5C9.625 13.5 10.1563 13.2812 10.5938 12.8438C11.0312 12.4062 11.25 11.875 11.25 11.25C11.25 10.625 11.0312 10.0938 10.5938 9.65625C10.1563 9.21875 9.625 9 9 9C8.375 9 7.84375 9.21875 7.40625 9.65625C6.96875 10.0938 6.75 10.625 6.75 11.25C6.75 11.875 6.96875 12.4062 7.40625 12.8438C7.84375 13.2812 8.375 13.5 9 13.5ZM5.25 7.5H10.5C10.7125 7.5 10.8906 7.42813 11.0344 7.28438C11.1781 7.14062 11.25 6.9625 11.25 6.75V5.25C11.25 5.0375 11.1781 4.85938 11.0344 4.71563C10.8906 4.57188 10.7125 4.5 10.5 4.5H5.25C5.0375 4.5 4.85938 4.57188 4.71563 4.71563C4.57188 4.85938 4.5 5.0375 4.5 5.25V6.75C4.5 6.9625 4.57188 7.14062 4.71563 7.28438C4.85938 7.42813 5.0375 7.5 5.25 7.5ZM3.75 5.8875V14.25V3.75V5.8875Z"
                  fill="white"
                />
              </svg>
              <span>Save Question</span>
            </button>
          </div>
        </form>
      ) : (
        <div>
          {questions.map((item) => (
            <div
              key={item}
              className="mt-3 flex w-full items-center justify-between rounded-md bg-[#EEEEEE]  p-3 dark:bg-[#1D2532] sm:p-4"
            >
              <div className="w-[70%] sm:w-full">
                <h3 className="text-xs font-normal text-[#7E7E7E] dark:text-[#D6D6D5] ">
                  Question {item?.id}
                </h3>
                <p className="text-sm  font-normal text-[#1D2532] dark:text-white">
                  {item?.question}
                </p>
              </div>
              <div className="flex items-center justify-center gap-[10px]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="cursor-pointer fill-black dark:fill-white"
                    d="M5 19H6.425L16.2 9.225L14.775 7.8L5 17.575V19ZM4 21C3.71667 21 3.47917 20.9042 3.2875 20.7125C3.09583 20.5208 3 20.2833 3 20V17.575C3 17.3083 3.05 17.0542 3.15 16.8125C3.25 16.5708 3.39167 16.3583 3.575 16.175L16.2 3.575C16.4 3.39167 16.6208 3.25 16.8625 3.15C17.1042 3.05 17.3583 3 17.625 3C17.8917 3 18.15 3.05 18.4 3.15C18.65 3.25 18.8667 3.4 19.05 3.6L20.425 5C20.625 5.18333 20.7708 5.4 20.8625 5.65C20.9542 5.9 21 6.15 21 6.4C21 6.66667 20.9542 6.92083 20.8625 7.1625C20.7708 7.40417 20.625 7.625 20.425 7.825L7.825 20.425C7.64167 20.6083 7.42917 20.75 7.1875 20.85C6.94583 20.95 6.69167 21 6.425 21H4ZM15.475 8.525L14.775 7.8L16.2 9.225L15.475 8.525Z"
                    fill="#333B48"
                  />
                </svg>

                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="cursor-pointer fill-black dark:fill-white"
                    d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17ZM14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17Z"
                    fill="#333B48"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackCard;
