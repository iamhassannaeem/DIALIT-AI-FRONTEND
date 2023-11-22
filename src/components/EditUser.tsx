import React, { useState, useEffect, useRef } from 'react';

import Platform from '../images/organisation/highlight.svg';
import Toaster from '../components/Toast/Toast'
import { EditUserName } from '../api/modules/Swiftsync.class';
import { useNavigate } from 'react-router-dom';
const EditUser: React.FC = (props) => {
  
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState({ success: '', error: '' });

  const [name, setName] = useState(props.item?.Name);
 

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
          (target.parentElement.closest('form') ||
            target.parentElement.querySelector('.next-button')))
      )
        return;
      setModalOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });
  
  const handleModalOpen = async () => {
    setModalOpen(!modalOpen);
  };

  const handleSave = async() => {
    const navigate=useNavigate()
    const onNavigate = (path: To) => {
      navigate(path)
      console.log(`Navigating to ${path}`);  
    };
    const res= await EditUserName({
      name: name,
      
    },onNavigate)
    if (res.success === false) {
      setError({ success: '', error: '' });

    } else {
      setError({ success: 'Name Changed Successfully', error: '' });
       
      setInterval(() => {
        window.location.reload();
      }, 3000);
    }
    setModalOpen(false);


  };

  return (
    <>
      <Toaster message={error} />
      <div>
      <a href="#"  ref={trigger}
        onClick={handleModalOpen}>
      <img src={Platform} alt="" />

      </a>
      
      <div
        className={`fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 ${
          modalOpen ? 'block' : 'hidden'
        }`}
      >
        <div ref={modal} className="w-full max-w-142.5 rounded-lg">
          <div className="flex flex-col gap-9">
            {/* <!-- Contact Form --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium font-semibold text-black dark:text-white">
                  Edit user Name
                </h3>
              </div>
              <form action="#">
                <div className="p-6.5">
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-sm font-semibold ">
                      User Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="enter user name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-sm font-semibold font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                  

                  
              <button
                type="submit"
                onClick={handleSave}
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
              >
                Save
              </button> 
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default EditUser;
