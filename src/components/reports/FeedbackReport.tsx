import React, { useEffect, useState } from 'react';
import { feedbackReport } from '../../api/modules/Swiftsync.class';
import Loader from '../../common/Loader';

const FeedbackReport: React.FC = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await feedbackReport();
        setFeedbackData(res?.data); 
      } catch (error) {
        console.error('Error fetching feedback report:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const questions =
    feedbackData?.length > 0
      ? feedbackData[0].combined_answers.map((item) => item.question_text)
      : [];

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-4 p-6 dark:bg-[#1D2532] bg-[#EEEEEE]">
      {feedbackData ?
      feedbackData?.map((item, rowIndex) => (
        <div
          key={rowIndex}
          className="rounded-lg bg-white p-4 shadow-md dark:bg-[#2A2E3B] dark:text-white"
        >
          <button
            className="text-lg font-semibold w-full text-left mb-3"
            onClick={() => toggleExpand(rowIndex)}
          >
            Phone Number: {item.phone_number} {expanded === rowIndex ? '-' : '+'}
          </button>
          {expanded === rowIndex && (
            <div className="grid grid-cols-1 gap-4">
              {item.combined_answers.map((answerObj, index) => (
                <div key={index} className="p-2 bg-gray-100 rounded-md bg-[#EEEEEE] dark:bg-[#333845]">
                  <p className="font-medium">{`${questions[index]} ?` }</p>
                  <p>{answerObj?.answer || 'No answer provided'}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )): "No Data Available"}
    </div>
  );
};

export default FeedbackReport;
