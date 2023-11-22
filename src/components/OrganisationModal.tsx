import React, { useState, useEffect, useRef } from 'react';
import { organisationCreate } from '../api/modules/Swiftsync.class';
import Toaster from './Toast/Toast';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
const OrganisationModal: React.FC = () => {
  const [error, setError] = useState({ success: "", error: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [showAdditionalDiv, setShowAdditionalDiv] = useState(false); 
  const [formData, setFormData] = useState({
    ownerName: "",
    ownerEmail: "",
    password: "",
    orgName: "",
    
  });
  const [isloaing, setIsloading] = useState(false);
  const trigger = useRef<any>(null);
  const modal = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!modal.current) return;
      if (
        !modalOpen ||
        modal.current.contains(target) ||
        trigger.current.contains(target) ||
        (target instanceof Node &&
          target.parentElement &&
          (target.parentElement.closest("form") ||
            target.parentElement.querySelector(".next-button")))
      )
        return;
      setModalOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });
  

const navigate=useNavigate()
 

  const handleSave =async () => {
    
    const onNavigate = (path: To) => {
      navigate(path)
      console.log(`Navigating to ${path}`);  
    };
    setIsloading(true)
     await organisationCreate({
        user: {
          name: formData.ownerName,
          email: formData.ownerEmail,
          password: formData.password,
        },
        user_org: formData.orgName,
      },onNavigate)
        .then((res) => {
          console.log(res);
          
         
         
            setError((prev) => ({
              ...prev,
              success: "Organization created successfully",
              error:"",
            }));
          
        })
        .catch((err) => {
          setError((prev) => ({
            ...prev,
            success: "",
            error:  'Check All  Feilds',
          }));
          console.error('no',err);
         
        });
    setIsloading(false)

        setModalOpen(false);
        setShowAdditionalDiv(false);
    } 
   
  
  
  return (
    <>
    <Toaster message={error} />
    <div>
      <button
        ref={trigger}
        onClick={() => setModalOpen(!modalOpen)}
        className="rounded-md bg-primary py-3 px-9 font-medium text-white"
      >
        Add Organization
      </button>
      <div
        className={`fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 ${
          modalOpen ? 'block' : 'hidden'
        }`}
      >
        <div
          ref={modal}
          
          className="w-full max-w-142.5 rounded-lg"
        >

        {!showAdditionalDiv&& <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
           
            <form action="#">
              <div className="p-6.5">
              
              <div className="mb-4.5">
                  <label className="mb-2.5 block text-sm font-semibold ">
                  Owner's Name 
                  </label>
                  <input
                    type="email"
                    placeholder="loremipsem"
                    value={formData.ownerName}
  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    className="w-full rounded border-[1.5px] text-sm font-semibold border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-sm font-semibold ">
                    Owner's Email 
                  </label>
                  <input
                    type="email"
                    placeholder="loremipsem@gmail.com"
                    value={formData.ownerEmail}
                    onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                    className="w-full rounded border-[1.5px] text-sm font-semibold border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-sm font-semibold ">
                  Owner's Password 
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    
                    placeholder="Enter your password"
                    className="w-full rounded border-[1.5px] text-sm font-semibold border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <button onClick={()=>setShowAdditionalDiv(true)} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
}
        {showAdditionalDiv && (
            <div className="flex flex-col gap-9">
            {/* <!-- Contact Form --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              
              <form action="#">
                <div className="p-6.5">
                
                <div className="mb-4.5">
                    <label className="mb-2.5 block text-sm font-semibold ">
                    Organisation Name 
                    </label>
                    <input
                      type="text"
                      value={formData.orgName}
                      onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                      placeholder="loremipsem"
                      className="w-full rounded border-[1.5px] text-sm font-semibold border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                
                  {/* <div className="mb-4.5">
                    <label className="mb-2.5 block text-sm font-semibold ">
                      Current Plan
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        <option value="">Premium</option>
                        <option value="">USA</option>
                        <option value="">UK</option>
                       
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div> */}
  
                  
  
                  <button onClick={handleSave} type='submit' className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                    {isloaing? <BeatLoader color='white'/>:"Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default OrganisationModal;
