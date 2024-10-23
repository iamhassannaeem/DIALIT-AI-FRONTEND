import React, { useEffect, useState } from 'react';
import LibraryDetails from './LibraryDetails';
import libraryicon from '../../../images/library.svg';
import add from '../../../images/import.png';
import { getFiles, uploadFile } from '../../../api/modules/Swiftsync.class';
import { BeatLoader } from 'react-spinners';
const Library: React.FC = () => {
  const [files, setFiles] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorState>({ success: '', error: '' });

  const [load, setLoad] = useState(false);
  const handleFileChange = async (event:any) => {
    const file = event.target.files[0];
    if (file) {
      
      const formData = new FormData();
      formData.append('file', file);

      try {
        // Call your uploadFile function and pass the FormData
        setLoad(true);
        const resp = await uploadFile(formData);
        setLoad(false);
        setError({error: "",success:"File uploaded successfully"})
        const res = await getFiles();
        setFiles(res);
      } catch (error) {
        console.error('Error uploading file:', error);
        setError({error: "Error uploading file",success:""})

      }
    } else {
      console.log('No file selected');
      
    }
  };

  useEffect(() => {
    try {
      const api = async () => {
        setLoading(true);
        const res = await getFiles();
        setFiles(res);
        setLoading(false);
      };
      api();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      {files && files?.length <= 0 ? (
        <div className="flex w-full flex-col items-center gap-[24px] rounded-[12px] bg-[#EEEEEE]  p-[24px] dark:bg-[#1D2532]">
          <img src={libraryicon} alt="" />
          <div className="flex flex-col items-center justify-center gap-[8px]">
            <h4 className="text-center text-2xl font-semibold text-[#1D2532] dark:text-white">
              Knowledge Base{' '}
            </h4>
            <p className="text-center text-sm font-normal text-[#7E7E7E] dark:text-[#D6D6D5]">
              Knowledge base is a bank of files that are accessible by your
              assistants.
              <br />
              You can upload PDF & Docs and attach it to your assistants, they
              pull from these for more context during conversations.
            </p>
            <label className="relative inline-flex cursor-pointer items-center justify-center gap-1 rounded-[6px] bg-[#2691B6] p-[12px] text-sm font-semibold text-white">
              {load ? (
                <BeatLoader color="white" />
              ) : (
                <>
                  Choose file <img src={add} alt="" />
                </>
              )}
              <input
                type="file"
                accept=".pdf, .txt" // Restrict to PDF and TXT files
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
      ) : (
        <LibraryDetails files={files} loading={loading} setFiles={setFiles} />
      )}
    </>
  );
};

export default Library;
