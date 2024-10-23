import React, { useEffect, useState } from 'react';
import telephone from '../../images/telephone.png';
import ImportPhoneNumberModal from './ImportPhoneNumberModal';
import Toaster from '../Toast/Toast';
import { getPhoneNumber } from '../../api/modules/Swiftsync.class';
import Loader from '../../common/Loader';
import InActiveModal from './InActiveModal';
import ChangeStatus from '../ChangeStatus';

interface PhoneNumber {
  phone_number: string;
  usage_count: string;
  created_date: string;
  auth_token_label: string;
  status: string;
  id: number;
}

interface ErrorState {
  success: string;
  error: string;
}

const Phone: React.FC = () => {
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
  const [isInactiveModalOpen, setIsInactiveModalOpen] =
    useState<boolean>(false);

  // Functions to open/close modals
  const openImportModal = () => setIsImportModalOpen(true);
  const closeImportModal = () => setIsImportModalOpen(false);

  const openInactiveModal = () => setIsInactiveModalOpen(true);
  const closeInactiveModal = () => setIsInactiveModalOpen(false);

  const [error, setError] = useState<ErrorState>({ success: '', error: '' });
  const [data, setData] = useState<PhoneNumber[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const api = async () => {
      try {
        setLoading(true);
        const res = await getPhoneNumber();
        setData(res);
      } catch (error) {
        console.error(error);
        setError({ success: '', error: 'Failed to load phone numbers.' });
      } finally {
        setLoading(false);
      }
    };

    api();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster message={error} />
      {data.length > 0 ? (
        <div className="space-y-6 rounded-xl bg-[#EEEEEE] p-6 dark:bg-[#1D2532]">
          <div className="flex items-center justify-between">
            <h5 className="text-base font-semibold text-[#1D2532] dark:text-white">
              Imported Phone Numbers
            </h5>
            <ImportPhoneNumberModal
              isOpen={isImportModalOpen}
              setIsOpen={setIsImportModalOpen}
              openModal={openImportModal}
              closeModal={closeImportModal}
              setError={setError}
              setData={setData}
            />
          </div>

          <div className="scrollbar overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="text-[#7E7E7E] dark:text-[#D6D6D5]">
                <tr>
                  <th className="px-4 pb-3 text-xs font-semibold">
                    Phone Number
                  </th>
                  <th className="px-4 pb-3 text-xs font-semibold">
                    Assigned Agent
                  </th>
                  <th className="px-4 pb-3 text-xs font-semibold">
                    Creation Date
                  </th>
                  <th className="px-4 pb-3 text-xs font-semibold">Label</th>
                  <th className="px-4 pb-3 text-xs font-semibold">Status</th>
                  <th className="px-4 pb-3 text-xs font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t border-[#333b48] text-[#7E7E7E] dark:text-[#D6D6D5]"
                  >
                    <td className="py-3 px-4 text-sm font-normal">
                      {item?.phone_number}
                    </td>
                    <td className="py-3 px-4 text-sm font-normal">
                      {item?.usage_count}
                    </td>
                    <td className="py-3 px-4 text-sm font-normal">
                    {item?.created_date
                              ? new Date(item?.created_date)
                                  .toISOString()
                                  .split('T')[0]
                              : ''}

                    </td>
                    <td className="py-3 px-4 text-sm font-normal uppercase">
                      {item?.auth_token_label}
                    </td>
                    <td
                      className={`py-3 px-4 text-sm font-normal capitalize ${
                        item?.status == 'active' ? 'text-[#009933]' : 'text-red'
                      }`}
                    >
                      {item?.status}
                    </td>
                    <td>
                      <ChangeStatus
                        setError={setError}
                        id={item?.id}
                        status={item?.status}
                        setData={setData}
                      />
                      {/* <InActiveModal
                        isOpen={isInactiveModalOpen}
                        setIsOpen={setIsInactiveModalOpen}
                        openModal={openInactiveModal}
                        closeModal={closeInactiveModal}
                        setError={setError}
                        id={item?.id}
                        status={item?.status}
                        setData={setData}
                      /> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col items-center gap-[24px] rounded-[12px] bg-[#EEEEEE] p-[24px] dark:bg-[#1D2532]">
          <img src={telephone} alt="" />
          <div className="flex flex-col items-center justify-center gap-[8px]">
            <h4 className="text-center text-2xl font-semibold text-[#1D2532] dark:text-white">
              Phone Numbers
            </h4>
            <p className="text-center text-sm font-normal text-[#7E7E7E] dark:text-[#D6D6D5]">
              Assistants are able to be connected to phone numbers for calls.
              <br />
              You can import from Twilio, vonage, or by one directly from Vapi
              for use with your assistants.
            </p>
          </div>
          <div>
            <ImportPhoneNumberModal
              isOpen={isImportModalOpen}
              setIsOpen={setIsImportModalOpen}
              openModal={openImportModal}
              closeModal={closeImportModal}
              setError={setError}
              setData={setData}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Phone;
