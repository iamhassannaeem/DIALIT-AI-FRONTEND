import React, { useEffect, useRef, useState } from 'react';
import add from '../../../images/import.png';
import Loader from '../../../common/Loader';
import {
  deleteFile,
  downloadFile,
  getFiles,
  replaceFile,
  uploadFile,
} from '../../../api/modules/Swiftsync.class';
import { BeatLoader } from 'react-spinners';
import Toaster from '../../Toast/Toast';

const Data = [
  { id: 1, title: 'Cover Letter', type: 'Docs File' },
  { id: 2, title: 'CV-Updated - PDF', type: 'PDF File' },
  { id: 3, title: 'Lorem Ipsum', type: 'PDF File' },
  { id: 4, title: 'Doler Sit Amet', type: 'Docs File' },
  { id: 5, title: 'Lorem Ipsum', type: 'PDF File' },
  { id: 6, title: 'Doler Sit Amet', type: 'Docs File' },
  { id: 7, title: 'Doler Sit Amet', type: 'Docs File' },
];

const LibraryDetails: React.FC = ({ files, loading, setFiles }) => {
  const [selectedCard, setSelectedCard] = useState(0);
  const [load, setLoad] = useState(false);
  const [delLoad, setDelLoad] = useState<{ [key: number]: boolean }>({});
  const [filelLoad, setFileLoad] = useState(false);
  const [error, setError] = useState<ErrorState>({ success: '', error: '' });
  const [downloadLoad, setDownloadLoad] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        setLoad(true);
        const resp = await uploadFile(formData);
        setLoad(false);
        setError({ error: '', success: 'File uploaded successfully' });
        const res = await getFiles();
        setFiles(res);
      } catch (error) {
        console.error('Error uploading file:', error);
        setError({ error: 'Error uploading file', success: '' });
      }
    } else {
      console.log('No file selected');
    }
  };

  const bytesToKB = (bytes) => {
    return (bytes / 1024).toFixed(3); // Convert and keep 2 decimal places
  };

  const handleDownload = async (fileName: string) => {
    try {
      setDownloadLoad((prev) => ({ ...prev, [fileName]: true })); // Set loading for specific file

      const res = await downloadFile(fileName);

      if (res?.status === 200) {
        const blob = res.data;

        // Create a link element
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName; // Set the file name for download
        document.body.appendChild(a);
        a.click(); // Trigger the download
        a.remove(); // Remove the link element
        window.URL.revokeObjectURL(url);
        setError({ success: 'File Downloaded successfully', error: '' });
      } else {
        setError({ success: '', error: 'Failed to Download File' });
      }
    } catch (error) {
      console.error('An error occurred while downloading the file:', error);
    } finally {
      setDownloadLoad((prev) => ({ ...prev, [fileName]: false }));
    }
  };

  const handleDelete = async (id: number) => {
    setDelLoad((prev) => ({ ...prev, [id]: true })); // Set loading for specific file

    const res = await deleteFile(id);

    setDelLoad((prev) => ({ ...prev, [id]: false })); // Remove loading for specific file

    if (res?.status === 204) {
      setError({ success: 'File deleted successfully', error: '' });
      const resp = await getFiles();
      setFiles(resp); // Update file list after deletion
    } else {
      // Handle error
      setError({ success: '', error: 'Failed to delete file' });
    }
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFiles, setFilteredFiles] = useState(files);
  const [selectedFileType, setSelectedFileType] = useState('');
  const [fileid, setFileid] = useState();
  useEffect(() => {
    if (!Array.isArray(files)) {
      setFilteredFiles([]); // Clear the filtered files if `files` is not an array
      return;
    }

    const searchResults = files.filter((file) =>
      file.file_name?.toLowerCase().includes(searchTerm?.toLowerCase() ?? '')
    );

    setFilteredFiles(searchResults);
  }, [files, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Update search term
  };

  const handleFilter = async () => {
    try {
      const res = await getFiles(selectedFileType ? selectedFileType : ''); // Make API call
      setFiles(res); // Update the main files state with API response
    } catch (error) {
      console.error('Filter error:', error);
    }
  };
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleReplace = (id) => {
    setFileid(id);
    const fileInput = fileInputRefs.current[id];
    if (fileInput) {
      fileInput.click();
    } else {
      console.error(`File input for item ${id} is not set.`);
    }
  };

  const handleFileReplace = async (event) => {
    const file = event.target.files[0];
  
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        setFileLoad(true); 
        const response = await replaceFile(fileid, formData); 
        setFileLoad(false);
        if (response.status === 200) {
          setError({ error: '', success: response?.data?.status });
          const res = await getFiles();
          setFiles(res); 
        } else {
          // If status is not 200, show an error alert
          window.alert('Failed to replace the file');
        }
      } catch (error) {
        console.error('File upload failed:', error);
        setFileLoad(false); // Make sure to set loading to false in case of an error
        // Optionally, you can show an alert or set an error message here
        window.alert('An error occurred while uploading the file');
      }
    }
  };
  

  return (
    <>
      <Toaster message={error} />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col  gap-[24px] rounded-xl bg-[#EEEEEE]  p-[24px] dark:bg-[#1D2532]">
          <div className=" flex justify-between gap-6">
            <div className="  gap-1.5 ">
              <h5 className=" text-base font-semibold text-[#1D2532] dark:text-[#FFFFFF] ">
                All Libraries
              </h5>
              <span>
                <p className="text-xs font-normal	text-[#7E7E7E] dark:text-[#D6D6D5]">
                  Here are all your libraries
                </p>
              </span>
            </div>
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
                accept=".pdf, .txt"
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="w-full md:w-[40%]">
              <input
                type="text"
                placeholder="Search here..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full rounded-md border-2 border-[#333B48] bg-[#EEEEEE] p-3 text-sm font-normal text-[#1D2532] focus:outline-none focus:ring dark:bg-[#242E3E] dark:text-white"
              />
            </div>
            <div className=" flex w-full items-end justify-center gap-4 md:w-[50%]">
              <div className="w-full ">
                <select
                  id="model"
                  value={selectedFileType}
                  onChange={(e) => setSelectedFileType(e.target.value)}
                  className="w-full rounded-md border-2 border-[#333B48] bg-[#EEEEEE] p-3 text-sm font-normal text-[#1D2532] focus:outline-none focus:ring dark:bg-[#242E3E] dark:text-white"
                >
                  <option value="">Filter on the base of FIle type</option>
                  <option value=".txt">Text File</option>
                  <option value=".pdf">Pdf File</option>
                </select>
              </div>

              <button
                onClick={handleFilter}
                type="button"
                disabled={!selectedFileType}
                className="cursor-pointer rounded border-2 border-[#2691B6] bg-transparent px-4 py-3 text-center text-sm font-semibold text-[#2691B6]"
              >
                Filter
              </button>
            </div>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <>
            {filteredFiles && filteredFiles?.length > 0 ? (
              filteredFiles?.map((LibraryData: any) => (
                <div className=" flex w-full flex-col justify-start gap-6 rounded-xl bg-[#EEEEEE]  p-4 dark:bg-[#1D2532] md:flex-row md:p-6">
                  <div className="w-[168px] gap-6 rounded-xl bg-white p-6 dark:bg-[#242E3E]">
                    <div className="justify-center  p-4">
                      {LibraryData?.file_type === '.pdf' ? (
                        <svg
                          className="m-auto  gap-2.5"
                          width="81"
                          height="80"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            className="fill-black dark:fill-white"
                            d="M9 18H15C15.2833 18 15.5208 17.9042 15.7125 17.7125C15.9042 17.5208 16 17.2833 16 17C16 16.7167 15.9042 16.4792 15.7125 16.2875C15.5208 16.0958 15.2833 16 15 16H9C8.71667 16 8.47917 16.0958 8.2875 16.2875C8.09583 16.4792 8 16.7167 8 17C8 17.2833 8.09583 17.5208 8.2875 17.7125C8.47917 17.9042 8.71667 18 9 18ZM9 14H15C15.2833 14 15.5208 13.9042 15.7125 13.7125C15.9042 13.5208 16 13.2833 16 13C16 12.7167 15.9042 12.4792 15.7125 12.2875C15.5208 12.0958 15.2833 12 15 12H9C8.71667 12 8.47917 12.0958 8.2875 12.2875C8.09583 12.4792 8 12.7167 8 13C8 13.2833 8.09583 13.5208 8.2875 13.7125C8.47917 13.9042 8.71667 14 9 14ZM6 22C5.45 22 4.97917 21.8042 4.5875 21.4125C4.19583 21.0208 4 20.55 4 20V4C4 3.45 4.19583 2.97917 4.5875 2.5875C4.97917 2.19583 5.45 2 6 2H13.175C13.4417 2 13.6958 2.05 13.9375 2.15C14.1792 2.25 14.3917 2.39167 14.575 2.575L19.425 7.425C19.6083 7.60833 19.75 7.82083 19.85 8.0625C19.95 8.30417 20 8.55833 20 8.825V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22H6ZM13 8V4H6V20H18V9H14C13.7167 9 13.4792 8.90417 13.2875 8.7125C13.0958 8.52083 13 8.28333 13 8Z"
                            fill="#333B48"
                          />
                        </svg>
                      ) : (
                        <svg
                          className=" m-auto  gap-2.5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="81"
                          height="80"
                          viewBox="0 0 81 80"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_18_7412)">
                            <path
                              className="fill-black dark:fill-white"
                              d="M27.8429 -1.86265e-06C32.0995 -0.0109527 36.3561 -0.0192184 40.6128 -0.0242888C42.5892 -0.0267057 44.5656 -0.0300007 46.5421 -0.0353641C48.2648 -0.0400367 49.9874 -0.0430605 51.7101 -0.0441058C52.6223 -0.0447169 53.5344 -0.0461526 54.4465 -0.0495628C55.3052 -0.0527475 56.164 -0.0537254 57.0227 -0.0530211C57.3376 -0.0531499 57.6526 -0.0540805 57.9675 -0.0558794C58.3982 -0.0582186 58.8287 -0.0576483 59.2594 -0.0563712C59.3834 -0.0577366 59.5074 -0.059102 59.6352 -0.0605087C60.9193 -0.050247 61.9244 0.35703 62.8697 1.23535C63.8767 2.38857 64.1121 3.66335 64.113 5.15489C64.1133 5.2616 64.1135 5.36832 64.1138 5.47826C64.1145 5.83564 64.1142 6.193 64.1138 6.55038C64.1141 6.80928 64.1144 7.06817 64.1149 7.32707C64.1158 8.0384 64.1158 8.74972 64.1156 9.46105C64.1156 10.2283 64.1164 10.9955 64.1172 11.7627C64.1185 13.2657 64.1189 14.7688 64.119 16.2718C64.1191 17.4935 64.1194 18.7152 64.1199 19.9369C64.1213 23.4001 64.122 26.8633 64.1219 30.3265C64.1218 30.6066 64.1218 30.6066 64.1218 30.8924C64.1218 31.0793 64.1218 31.2663 64.1218 31.4589C64.1218 34.4891 64.1233 37.5192 64.1255 40.5494C64.1277 43.6603 64.1288 46.7713 64.1286 49.8822C64.1286 51.6289 64.129 53.3756 64.1307 55.1223C64.1321 56.6095 64.1325 58.0966 64.1314 59.5837C64.1309 60.3424 64.1309 61.1011 64.1322 61.8598C64.1335 62.5547 64.1333 63.2495 64.1319 63.9443C64.1316 64.1954 64.1319 64.4464 64.1328 64.6975C64.1389 66.5806 64.1195 68.1949 62.8429 69.6875C61.3151 71.0867 59.7691 71.1173 57.7877 71.1146C57.496 71.1152 57.496 71.1152 57.1985 71.1157C56.6606 71.1165 56.1227 71.1166 55.5848 71.1165C55.004 71.1164 54.4232 71.1173 53.8424 71.118C52.7052 71.1193 51.5679 71.1198 50.4307 71.1199C49.5061 71.1199 48.5815 71.1202 47.6569 71.1207C45.0341 71.1221 42.4113 71.1228 39.7885 71.1227C39.5765 71.1227 39.5765 71.1227 39.3603 71.1227C39.2188 71.1227 39.0773 71.1227 38.9315 71.1227C36.6385 71.1226 34.3455 71.1241 32.0526 71.1263C29.6968 71.1286 27.341 71.1296 24.9853 71.1295C23.6632 71.1295 22.3412 71.1299 21.0192 71.1316C19.8936 71.133 18.768 71.1333 17.6424 71.1323C17.0684 71.1318 16.4945 71.1317 15.9206 71.1331C15.2975 71.1346 14.6745 71.1336 14.0514 71.1324C13.8713 71.1332 13.6911 71.134 13.5055 71.1348C11.7353 71.1273 10.2832 70.951 8.94518 69.7205C7.73059 68.4449 7.61729 67.0897 7.63027 65.3832C7.62987 65.1893 7.62947 64.9954 7.62906 64.7957C7.62842 64.2608 7.62988 63.726 7.63223 63.1912C7.63427 62.6131 7.63357 62.0351 7.63322 61.4571C7.63297 60.4568 7.63444 59.4565 7.63708 58.4561C7.64089 57.0098 7.64211 55.5635 7.6427 54.1172C7.64372 51.7705 7.64684 49.4237 7.65128 47.077C7.65558 44.7979 7.6589 42.5188 7.66089 40.2397C7.66101 40.0991 7.66114 39.9585 7.66126 39.8137C7.66188 39.1084 7.66247 38.4031 7.66305 37.6979C7.66791 31.8506 7.67616 26.0034 7.68664 20.1562C7.87109 20.1553 8.05554 20.1544 8.24558 20.1535C9.98806 20.1445 11.7305 20.1331 13.473 20.1194C14.3687 20.1124 15.2644 20.1063 16.1601 20.1021C17.0253 20.098 17.8905 20.0917 18.7557 20.0839C19.0849 20.0813 19.4142 20.0795 19.7435 20.0785C20.2065 20.077 20.6693 20.0726 21.1323 20.0676C21.2669 20.0678 21.4016 20.068 21.5403 20.0682C23.118 20.0442 24.5591 19.5621 25.8116 18.5937C26.2342 18.1575 26.5772 17.6977 26.9054 17.1875C26.9696 17.0878 27.0339 16.9881 27.1001 16.8854C28.1213 15.0861 27.8844 12.7983 27.8734 10.8032C27.8728 10.4906 27.8724 10.178 27.8721 9.86541C27.8709 9.04857 27.8678 8.23174 27.8643 7.41491C27.8611 6.57902 27.8597 5.74312 27.8581 4.90722C27.8548 3.27147 27.8495 1.63574 27.8429 -1.86265e-06ZM19.5909 30.7617C19.3429 31.2055 19.2691 31.5211 19.2491 32.0312C19.5002 32.8401 19.788 33.2878 20.4991 33.75C21.078 33.9429 21.6134 33.9289 22.2162 33.9282C22.3448 33.9287 22.4734 33.9291 22.606 33.9296C23.0385 33.931 23.471 33.9312 23.9036 33.9314C24.2131 33.9321 24.5226 33.9329 24.8321 33.9338C25.674 33.9358 26.516 33.9368 27.3579 33.9375C27.8837 33.938 28.4095 33.9386 28.9354 33.9393C30.5799 33.9415 32.2244 33.943 33.8689 33.9436C35.7684 33.9443 37.6679 33.947 39.5674 33.9515C41.0349 33.9549 42.5024 33.9565 43.9699 33.9567C44.8467 33.9569 45.7235 33.9578 46.6003 33.9606C47.4251 33.9632 48.2499 33.9635 49.0746 33.9621C49.3773 33.962 49.6801 33.9627 49.9828 33.9642C50.3961 33.9662 50.8093 33.9653 51.2226 33.9637C51.4022 33.9656 51.4022 33.9656 51.5855 33.9675C52.5207 33.9588 53.1495 33.7386 53.8292 33.0957C54.1672 32.5324 54.3021 32.0641 54.2491 31.4062C53.8812 30.6408 53.4234 30.2498 52.6866 29.8437C52.2275 29.7846 51.8281 29.7591 51.3701 29.7644C51.2398 29.7634 51.1095 29.7624 50.9753 29.7614C50.5398 29.7589 50.1045 29.7609 49.6691 29.7629C49.3564 29.762 49.0438 29.7609 48.7311 29.7596C47.8827 29.7567 47.0344 29.7578 46.186 29.7598C45.298 29.7614 44.4101 29.7599 43.5222 29.7589C42.0311 29.7578 40.54 29.7593 39.0489 29.7623C37.3251 29.7657 35.6013 29.7646 33.8775 29.7611C32.3974 29.7583 30.9173 29.7579 29.4371 29.7595C28.5532 29.7605 27.6692 29.7606 26.7852 29.7586C25.9542 29.7568 25.1231 29.758 24.2921 29.7616C23.9871 29.7624 23.6821 29.7622 23.3771 29.7608C22.9607 29.7591 22.5445 29.7613 22.1282 29.7644C22.0075 29.763 21.8869 29.7616 21.7625 29.7602C20.8101 29.774 20.2445 30.0856 19.5909 30.7617ZM19.9132 41.7676C19.4374 42.3359 19.2317 42.6896 19.2784 43.4375C19.4677 44.1362 19.6537 44.5493 20.2779 44.9407C20.9105 45.1962 21.4633 45.222 22.1341 45.2168C22.3305 45.2181 22.3305 45.2181 22.5309 45.2194C22.9685 45.2216 23.406 45.2205 23.8436 45.2194C24.1578 45.2203 24.4719 45.2214 24.7861 45.2226C25.6387 45.2254 26.4913 45.2253 27.3439 45.2244C28.0556 45.2239 28.7674 45.2248 29.4792 45.2258C31.1582 45.228 32.8371 45.2277 34.5161 45.2259C36.2484 45.2241 37.9808 45.2263 39.7131 45.2305C41.2005 45.234 42.6879 45.235 44.1753 45.2341C45.0637 45.2336 45.952 45.234 46.8404 45.2367C47.6755 45.2391 48.5107 45.2385 49.3458 45.2355C49.6523 45.2349 49.9588 45.2354 50.2653 45.2371C50.6838 45.2391 51.102 45.2373 51.5204 45.2346C51.7023 45.2368 51.7023 45.2368 51.8879 45.2391C52.6974 45.2281 53.1583 45.045 53.7804 44.5312C54.1569 43.9969 54.2878 43.6013 54.2394 42.959C54.1346 42.3568 53.9039 41.9985 53.4679 41.5625C52.6733 41.0328 51.8868 41.0709 50.9557 41.0729C50.7662 41.0723 50.7662 41.0723 50.5729 41.0718C50.15 41.0708 49.727 41.0709 49.3041 41.071C49.0007 41.0706 48.6973 41.0701 48.3939 41.0695C47.5701 41.0681 46.7462 41.0677 45.9224 41.0676C45.2347 41.0675 44.547 41.0669 43.8593 41.0663C42.237 41.0651 40.6148 41.0647 38.9925 41.0648C37.3187 41.0649 35.6448 41.0632 33.971 41.0608C32.534 41.0587 31.097 41.0579 29.66 41.058C28.8017 41.058 27.9434 41.0576 27.0851 41.0559C26.2781 41.0544 25.471 41.0544 24.6639 41.0555C24.3678 41.0557 24.0716 41.0553 23.7754 41.0544C23.3711 41.0532 22.9667 41.0539 22.5624 41.0551C22.4453 41.0543 22.3282 41.0535 22.2075 41.0527C21.2932 41.0587 20.6204 41.1729 19.9132 41.7676ZM19.6556 52.6245C19.2845 53.3668 19.1407 53.8623 19.4054 54.6875C19.8264 55.186 20.2936 55.7352 20.9716 55.8214C21.154 55.8222 21.154 55.8222 21.3402 55.823C21.5501 55.825 21.5501 55.825 21.7643 55.8271C21.9175 55.8269 22.0706 55.8268 22.2285 55.8266C22.4709 55.8282 22.4709 55.8282 22.7182 55.8298C23.254 55.8328 23.7897 55.8334 24.3254 55.8337C24.6974 55.8347 25.0693 55.8358 25.4412 55.8369C26.2216 55.8388 27.0019 55.8393 27.7823 55.8392C28.7822 55.8391 29.782 55.8434 30.7819 55.8488C31.5503 55.8522 32.3188 55.8529 33.0873 55.8527C33.4559 55.8531 33.8245 55.8545 34.1931 55.8569C34.7089 55.8599 35.2246 55.859 35.7404 55.8572C35.8926 55.8589 36.0449 55.8607 36.2017 55.8625C37.0874 55.8543 37.6157 55.7602 38.3116 55.1562C38.6881 54.6219 38.819 54.2263 38.7706 53.584C38.6645 52.9808 38.4434 52.6191 37.9991 52.1875C37.5403 51.9113 37.2023 51.8357 36.6695 51.8343C36.5291 51.8332 36.3887 51.8321 36.2441 51.8309C36.0148 51.8315 36.0148 51.8315 35.7809 51.8321C35.619 51.8313 35.457 51.8305 35.2902 51.8297C34.7546 51.8275 34.219 51.8276 33.6833 51.828C33.3113 51.8274 32.9392 51.8267 32.5671 51.826C31.787 51.8248 31.007 51.8249 30.2269 51.8257C29.2268 51.8266 28.2268 51.8239 27.2267 51.8203C26.4583 51.818 25.6898 51.8179 24.9213 51.8184C24.5526 51.8183 24.1839 51.8175 23.8151 51.8159C23.2997 51.814 22.7843 51.815 22.2689 51.8168C22.1163 51.8156 21.9638 51.8144 21.8066 51.8132C20.9093 51.8202 20.2438 51.8688 19.6556 52.6245Z"
                              fill="#D6D6D5"
                            />
                            <path
                              className="fill-black dark:fill-white"
                              d="M66.4368 8.90625C66.8356 8.90333 67.2343 8.90121 67.6331 8.89953C67.8012 8.89818 67.8012 8.89818 67.9726 8.89681C69.5935 8.89171 70.8361 9.16017 72.0533 10.2795C73.426 11.7212 73.3797 13.3552 73.3713 15.2361C73.3719 15.4993 73.3726 15.7624 73.3736 16.0256C73.3755 16.7466 73.3745 17.4675 73.3731 18.1885C73.372 18.9669 73.3737 19.7452 73.375 20.5236C73.377 22.0476 73.3766 23.5716 73.3752 25.0956C73.3742 26.3342 73.374 27.5729 73.3745 28.8115C73.3746 28.9879 73.3747 29.1642 73.3748 29.3459C73.3749 29.7041 73.3751 30.0623 73.3752 30.4205C73.3765 33.7791 73.375 37.1377 73.3725 40.4962C73.3704 43.3777 73.3708 46.2591 73.3729 49.1405C73.3754 52.4871 73.3764 55.8337 73.375 59.1803C73.3748 59.5372 73.3747 59.8941 73.3745 60.251C73.3745 60.4266 73.3744 60.6022 73.3743 60.7831C73.3739 62.0202 73.3746 63.2572 73.3757 64.4943C73.377 66.002 73.3767 67.5097 73.3742 69.0174C73.3729 69.7866 73.3724 70.5557 73.374 71.3249C73.3754 72.0292 73.3746 72.7335 73.3721 73.4379C73.3716 73.6924 73.3719 73.947 73.373 74.2015C73.3799 75.8646 73.3834 77.3452 72.1985 78.6426C72.0886 78.7677 71.9786 78.8927 71.8653 79.0216C70.6717 80.006 69.4882 80.0903 67.9835 80.0783C67.7803 80.0792 67.5771 80.08 67.3677 80.0809C66.8068 80.0832 66.2459 80.0817 65.6849 80.0794C65.0788 80.0777 64.4726 80.0796 63.8665 80.081C62.6803 80.0831 61.4942 80.082 60.308 80.0796C58.926 80.077 57.5441 80.0775 56.1622 80.0781C53.6962 80.079 51.2303 80.0768 48.7643 80.0729C46.3725 80.0692 43.9807 80.0681 41.5889 80.0697C38.983 80.0715 36.377 80.0718 33.7711 80.0695C33.4931 80.0693 33.2151 80.0691 32.9372 80.0688C32.7321 80.0686 32.7321 80.0686 32.5228 80.0685C31.5599 80.0677 30.597 80.068 29.6342 80.0687C28.4606 80.0694 27.287 80.0685 26.1134 80.0654C25.5149 80.0639 24.9163 80.0631 24.3177 80.0643C23.6685 80.0656 23.0194 80.0633 22.3702 80.0606C22.1815 80.0615 21.9928 80.0625 21.7983 80.0634C20.2119 80.0515 19.1731 79.7346 17.9969 78.6334C16.9987 77.4997 16.88 76.1635 16.8958 74.7168C16.8969 74.5321 16.8969 74.5321 16.8979 74.3436C16.8998 74.0415 16.9026 73.7395 16.9056 73.4375C16.9955 73.4373 17.0854 73.4371 17.1781 73.4369C22.5121 73.4243 27.846 73.41 33.18 73.3937C33.8209 73.3918 34.4617 73.3898 35.1026 73.3879C35.294 73.3873 35.294 73.3873 35.4892 73.3867C37.5533 73.3805 39.6174 73.3754 41.6815 73.3707C43.8005 73.3658 45.9194 73.3598 48.0384 73.3527C49.3452 73.3483 50.652 73.3449 51.9589 73.3426C52.8558 73.341 53.7527 73.3382 54.6496 73.3345C55.1666 73.3324 55.6836 73.331 56.2005 73.3306C56.7624 73.3301 57.3242 73.3277 57.886 73.3248C58.1284 73.3252 58.1284 73.3252 58.3757 73.3257C60.7621 73.3074 62.8163 72.7939 64.5618 71.0938C65.8115 69.6054 66.2977 67.9101 66.3022 65.9889C66.3031 65.7843 66.3039 65.5796 66.3048 65.3688C66.305 65.1435 66.3051 64.9183 66.3053 64.6931C66.306 64.4524 66.3068 64.2117 66.3076 63.971C66.3097 63.3107 66.3109 62.6505 66.3119 61.9902C66.3132 61.2778 66.3153 60.5654 66.3173 59.853C66.3207 58.619 66.3236 57.3851 66.326 56.1511C66.3296 54.367 66.334 52.5829 66.3386 50.7988C66.346 47.9043 66.3528 45.0097 66.3591 42.1151C66.3653 39.3033 66.3717 36.4916 66.3786 33.6798C66.3793 33.4199 66.3793 33.4199 66.3799 33.1546C66.3821 32.285 66.3842 31.4155 66.3864 30.5459C66.4042 23.3327 66.4208 16.1195 66.4368 8.90625Z"
                              fill="#D6D6D5"
                            />
                            <path
                              className="fill-black dark:fill-white"
                              d="M24.5625 0.15625C25.0312 0.546875 25.0312 0.546875 25.3438 0.9375C25.4211 1.01484 25.4211 1.01484 25.5 1.09375C25.5182 1.52458 25.5263 1.95154 25.5277 2.38255C25.5287 2.51772 25.5297 2.65289 25.5308 2.79217C25.5339 3.24186 25.5357 3.69154 25.5372 4.14124C25.5379 4.29468 25.5385 4.44812 25.5392 4.60621C25.5424 5.41915 25.5447 6.23208 25.5461 7.04502C25.5478 7.88375 25.5532 8.72241 25.5594 9.56112C25.5635 10.2066 25.5648 10.852 25.5654 11.4974C25.5661 11.8065 25.568 12.1155 25.5709 12.4245C25.5747 12.8584 25.5745 13.2921 25.5734 13.7259C25.5754 13.8527 25.5774 13.9794 25.5795 14.11C25.5703 15.1305 25.2742 15.9327 24.6132 16.7169C24.5288 16.7852 24.4444 16.8535 24.3574 16.9238C24.2742 16.9941 24.1911 17.0644 24.1053 17.1368C23.1755 17.7305 22.412 17.8819 21.3303 17.8756C21.1991 17.8767 21.0679 17.8778 20.9326 17.8789C20.5017 17.8817 20.0709 17.8811 19.64 17.8802C19.339 17.881 19.0381 17.8818 18.7371 17.8827C18.1076 17.8841 17.4781 17.8838 16.8486 17.8822C16.0428 17.8804 15.2371 17.8836 14.4313 17.8881C13.8103 17.891 13.1892 17.8909 12.5682 17.8901C12.2711 17.89 11.974 17.891 11.6769 17.8929C11.2615 17.8952 10.8462 17.8936 10.4307 17.8909C10.3087 17.8924 10.1866 17.8939 10.0609 17.8955C9.25425 17.8846 8.79715 17.7179 8.15625 17.1875C7.78011 16.6536 7.69192 16.3163 7.64844 15.6641C8.00179 13.7898 10.9004 11.7581 12.1913 10.4645C12.4022 10.2529 12.4022 10.2529 12.6174 10.037C13.2836 9.36869 13.9502 8.70062 14.6172 8.03302C15.3836 7.26587 16.149 6.49769 16.9136 5.72864C17.5794 5.05903 18.2465 4.39072 18.9141 3.72287C19.1967 3.43974 19.479 3.15623 19.7609 2.87231C20.1542 2.47632 20.549 2.08182 20.9441 1.68766C21.1177 1.51197 21.1177 1.51197 21.2947 1.33273C22.2844 0.351012 23.1435 -0.282781 24.5625 0.15625Z"
                              fill="#D6D6D5"
                            />
                          </g>
                        </svg>
                      )}
                    </div>
                    <div className="text-center text-sm font-normal  text-[#1D2532] dark:text-[#FFFFFF] ">
                      {LibraryData?.file_name}
                    </div>
                  </div>
                  <div className="flex w-full md:gap-6 md:px-3">
                    <div className="flex w-full flex-col justify-between">
                      <div>
                        <p className="text-sm font-semibold  text-[#1D2532] dark:text-[#FFFFFF]  ">
                          Cover Letter
                        </p>
                        <p className=" break-all text-sm	font-normal	text-[#7E7E7E] dark:text-[#D6D6D5]">
                          {LibraryData?.file_name}-
                          {bytesToKB(LibraryData?.file_size)} KB
                        </p>
                      </div>
                      <div className=" py-9 md:flex  md:gap-9">
                        <div>
                          <p className="text-sm font-semibold  text-[#1D2532] dark:text-[#FFFFFF]  ">
                            ID
                          </p>
                          <span className="break-all text-sm	font-normal	text-[#7E7E7E] dark:text-[#D6D6D5] md:gap-4">
                            {LibraryData?.request_id}
                            <span className="inline-flex md:px-2">
                              <svg
                                className="h-4 w-4 cursor-pointer "
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <rect
                                  x="8"
                                  y="4"
                                  width="12"
                                  height="12"
                                  rx="2"
                                />
                                <path d="M16 16v2a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8a2 2 0 0 1 2 -2h2" />
                              </svg>
                            </span>
                          </span>
                        </div>

                        <div>
                          <p className="mt-2 text-sm font-semibold text-[#1D2532] dark:text-[#FFFFFF]   md:mt-0">
                            Meta Data
                          </p>
                          <p className="text-sm font-normal	text-[#7E7E7E] dark:text-[#D6D6D5]	">
                            {LibraryData?.content_type}
                          </p>
                        </div>
                        <div>
                          <p className="mt-2 text-sm font-semibold text-[#1D2532] dark:text-[#FFFFFF]  md:mt-0">
                            Date Created
                          </p>
                          <p className="text-sm font-normal text-[#7E7E7E] dark:text-[#D6D6D5]">
                            {LibraryData?.created_date
                              ? new Date(LibraryData.created_date)
                                  .toISOString()
                                  .split('T')[0]
                              : ''}
                          </p>
                        </div>
                        <div>
                          <p className="mt-2 text-sm font-semibold text-[#1D2532] dark:text-[#FFFFFF]  md:mt-0">
                            Agent Name
                          </p>
                          <div className="flex gap-1">
                            {LibraryData?.agent_details?.map((item, index) => (
                              <button className=" rounded-md bg-[#3BA2B8] py-1 px-1 text-xs font-normal text-white ">
                                {item?.agent_details?.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className=" flex flex-wrap gap-2.5">
                        <div
                          className="flex w-full cursor-pointer justify-center gap-2 rounded border-[1px] border-[#2691B6] bg-transparent p-3 text-center text-sm font-semibold text-[#2691B6] sm:w-[30%]"
                          onClick={() => handleDownload(LibraryData?.file_name)}
                        >
                          {downloadLoad[LibraryData?.file_name] ? (
                            <BeatLoader color="#2691B6" />
                          ) : (
                            <>
                              <svg
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                                className="h-5 w-5"
                              >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                                <polyline points="7 11 12 16 17 11" />
                                <line x1="12" y1="4" x2="12" y2="16" />
                              </svg>
                              <button type="button">Download</button>
                            </>
                          )}
                        </div>

                        <div
                          className="flex w-full cursor-pointer justify-center gap-2 rounded border-[1px] border-[#2691B6] bg-transparent p-3 text-center text-sm font-semibold text-[#2691B6] sm:w-[30%]"
                          onClick={() => handleReplace(LibraryData?.id)}
                        >
                          {filelLoad ? (
                            <BeatLoader color="white" />
                          ) : (
                            <>
                              {' '}
                              <svg
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <rect
                                  x="8"
                                  y="4"
                                  width="12"
                                  height="12"
                                  rx="2"
                                />
                                <path d="M16 16v2a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8a2 2 0 0 1 2 -2h2" />
                              </svg>
                              <button type="button">Replace</button>
                            </>
                          )}
                        </div>

                        {/* Hidden file input */}
                        <input
                          type="file"
                           accept=".pdf, .txt"  
                          ref={(el) => fileInputRefs.current[LibraryData?.id] = el} 
                          style={{ display: 'none' }}
                          onChange={handleFileReplace}
                        />

                        <div
                          className="flex w-full cursor-pointer justify-center gap-2 rounded border-[1px] border-[#F23030] bg-[#F23030] p-3 text-center text-sm font-semibold text-white sm:w-[30%]"
                          onClick={() => handleDelete(LibraryData?.id)}
                        >
                          {delLoad[LibraryData?.id] ? (
                            <BeatLoader color="white" />
                          ) : (
                            <>
                              <svg
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                                className="h-5 w-5"
                              >
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                <line x1="10" y1="11" x2="10" y2="16" />
                                <line x1="14" y1="11" x2="14" y2="16" />
                              </svg>
                              <button type="button">Delete</button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No files found</div> // Display a message if no files match the filter
            )}
          </>
        )}
      </div>
    </>
  );
};

export default LibraryDetails;
