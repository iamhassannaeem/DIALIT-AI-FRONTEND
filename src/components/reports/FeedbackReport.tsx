import React, { useEffect, useState } from 'react';
import { feedbackReport } from '../../api/modules/Swiftsync.class';
import Loader from '../../common/Loader';

const FeedbackReport: React.FC = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await feedbackReport();
        setFeedbackData(res?.data || []); // Default to empty array if data is not present
      } catch (error) {
        console.error('Error fetching feedback report:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-4 p-6 bg-[#EEEEEE] dark:bg-[#1D2532]">
      {feedbackData.length > 0 ? (
        feedbackData.map((item, rowIndex) => (
          <div
            key={rowIndex}
            className="rounded-lg bg-white p-4 shadow-md dark:bg-[#2A2E3B] dark:text-white"
          >
            <button
              className="text-lg font-semibold w-full text-left mb-3"
              onClick={() => toggleExpand(rowIndex)}
            >
              Phone Number: {item?.phone_number} {expanded === rowIndex ? '-' : '+'}
            </button>
            {expanded === rowIndex && (
              <div className="grid grid-cols-1 gap-4">
                {item?.combined_answers.map((answerObj, index) => (
                  <div
                    key={index}
                    className="p-2 rounded-md bg-[#EEEEEE] dark:bg-[#333845]"
                  >
                    <p className="font-medium">{`${answerObj?.question_text || 'Unknown Question'}:`}</p>
                    <p>{answerObj?.answer || 'No answer provided'}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400">
          No Data Available
        </div>
      )}
    </div>
  );
};

export default FeedbackReport;
