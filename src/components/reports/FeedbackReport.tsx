import React, { useEffect, useState } from 'react';
import { feedbackReport } from '../../api/modules/Swiftsync.class';
import Loader from '../../common/Loader';

const FeedbackReport: React.FC = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await feedbackReport();
        setFeedbackData(res?.data); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching feedback report:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Extract unique questions from the first data item
  const questions =
    feedbackData?.length > 0
      ? feedbackData[0].combined_answers.map((item) => item.question_text)
      : [];

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="flex flex-col gap-6 rounded-xl bg-[#EEEEEE] px-3 py-6 shadow-default dark:bg-[#1D2532]">
        <div className="feedback-table">
          <table className="w-full border-collapse">
            <thead>
              {/* Row with Q1, Q2, Q3, etc. */}
              <tr className="bg-gray-200">
                <th className="border p-2 text-black dark:text-white">
                  Phone Number
                </th>
                {questions.map((_, index) => (
                  <th
                    key={index}
                    className="border p-2 text-center text-black dark:text-white"
                  >
                    Q{index + 1}
                  </th>
                ))}
              </tr>
              {/* Row with questions */}
              <tr className="bg-gray-200">
                <th className="border p-2 text-black dark:text-white"></th>
                {questions.map((question, index) => (
                  <th
                    key={index}
                    className="border p-2 text-center text-black dark:text-white"
                  >
                    {question}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {feedbackData.map((item, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="border p-2 text-center text-black dark:text-white">
                    {item.phone_number}
                  </td>
                  {questions.map((_, questionIndex) => {
                    const answerObj = item.combined_answers[questionIndex];
                    return (
                      <td
                        key={questionIndex}
                        className="border p-2 text-center text-black dark:text-white"
                      >
                        {answerObj ? answerObj.answer : ''}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default FeedbackReport;
