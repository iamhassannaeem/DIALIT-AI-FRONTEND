import React, { useState } from 'react';
import LibraryDetails from './LibraryDetails';
import libraryicon from '../../../images/library.svg';
import add from '../../../images/import.png';
const Library: React.FC = () => {
  const library = false;
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file);
    }
  };
  return (
    <>
      {library ? (

        
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
            <input
              type="file"
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              onChange={handleFileChange}
            />
            <button className="flex items-center justify-center gap-1 rounded-[6px] bg-[#2691B6] p-[12px] text-sm font-semibold text-white">
              Choose file <img src={add} alt="" />
            </button>
          </div>
        </div>
      ) : (
        <LibraryDetails />
      )}
    </>
  );
};

export default Library;
