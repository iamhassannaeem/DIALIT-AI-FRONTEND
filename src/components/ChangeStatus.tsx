import { useState, useEffect } from 'react';
import { getPhoneNumber, inactivePhoneNumber } from '../api/modules/Swiftsync.class';

const ChangeStatus = ({
  setError,
  id,
  status,
  setData,
}: {
  id: number;
  status: string;
  setData: any;
  setError: (error: string | null) => void;
}) => {
  // Set initial state based on the passed status prop
  const [isToggled, setIsToggled] = useState(status === 'active'); // Check if status is 'active'

  // Update the toggle when the `status` prop changes
  useEffect(() => {
    setIsToggled(status === 'active');
  }, [status]);

  // Toggle switcher and hit API
  const handleToggle = async () => {
    const newStatus = isToggled ? 'inactive' : 'active'; // Determine the new status
    const resp = await inactivePhoneNumber(id, { status: newStatus });

    if (resp?.status === 200) {
      // Update the state and error on success
      setIsToggled(!isToggled); // Update the toggle state
      setError({ success: `Status changed to ${newStatus}`, error: '' });
    } else {
      // Handle the error case
      setError({ success: '', error: 'Unable to update the status' });
    }

    // Fetch updated phone numbers and update the data
    const res = await getPhoneNumber();
    setData(res);
  };

  return (
    <div className="py-3 px-6">
      <label
        className={`relative m-0 block h-7.5 w-14 rounded-full ${
          isToggled ? 'bg-[#2691B6]' : 'bg-stroke'
        }`}
      >
        <input
          type="checkbox"
          onChange={handleToggle}
          checked={isToggled}
          className="absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
        />
        <span
          className={`absolute top-1/2 left-[3px] flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white shadow-switcher duration-75 ease-linear ${
            isToggled && '!right-[3px] !translate-x-full'
          }`}
        ></span>
      </label>
    </div>
  );
};

export default ChangeStatus;
