import React, { useState, useEffect, useRef } from 'react';
import { organisationCreate, organisationget } from '../api/modules/Swiftsync.class';
import Toaster from './Toast/Toast';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
const OrganisationModal: React.FC = ({setOrganisation}) => {
  const [error, setError] = useState({ success: '', error: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [showAdditionalDiv, setShowAdditionalDiv] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: '',
    ownerEmail: '',
    password: '',
    orgName: '',
  });
  const [nameError, setNameError] = useState('');
  const [orgNameError, setOrgNameError] = useState('');
  const[emailError, setEmailError] =useState('');
  const[passwordError, setPasswordError] = useState('');
  const [isloaing, setIsloading] = useState(false);
  const trigger = useRef<any>(null);
  const modal = useRef<any>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  
    let isValid = true;
    let errorMessage = '';
  
    if (name === 'ownerName') {
      isValid = /^[a-zA-Z\s]{0,64}$/.test(value);
      errorMessage = 'Name should contain only alphabets between 0 to 64 characters, including space.';
      setNameError(isValid ? '' : errorMessage);
    } else if (name === 'ownerEmail') {
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      errorMessage = 'Enter a valid email address';
      setEmailError(isValid ? '' : errorMessage);
    } else if (name === 'password') {
      isValid = /^.{0,24}$/.test(value);
      errorMessage = 'Password should be between 0 and 24 characters';
      setPasswordError(isValid ? '' : errorMessage);
    }
    else if(name === 'orgName') {
      isValid = /^[a-zA-Z\s]{0,64}$/.test(value);
      errorMessage = 'Name should contain only alphabets between 0 to 64 characters, including space.';
      setOrgNameError(isValid ? '' : errorMessage);}
  };
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

  const navigate = useNavigate();


  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleSave = async (e) => {
    e.preventDefault();
  
    const onNavigate = (path: To) => {
      navigate(path);
    };
  
    try {
      setIsloading(true);
  
      const res = await organisationCreate(
        {
          user: {
            name: formData.ownerName,
            email: formData.ownerEmail,
            password: formData.password,
          },
          user_org: formData.orgName,
        },
        onNavigate
      );
       const org = await organisationget(onNavigate);
        
       setOrganisation(org)
  
      if (res?.success === false) {
        const serverErrors = res?.message?.response?.data;
  
        if (serverErrors) {
          const userFriendlyErrors = mapServerErrors(serverErrors);
          setError({ success: '', error: userFriendlyErrors.join('\n') });
        } else {
          setError({
            success: '',
            error: 'An unexpected error occurred. Please try again.',
          });
        }
      } else {
        setError({ success: 'Organization Added Successfully', error: '' });
      }
    } catch (error) {
      console.error('API call failed', error);
      setError({
        success: '',
        error: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsloading(false);
      setModalOpen(false);
      setShowAdditionalDiv(false);
    }
  };
  
  const mapServerErrors = (serverErrors) => {
    const userFriendlyErrors = [];
  
    for (const key in serverErrors) {
      switch (key) {
        case 'email':
          userFriendlyErrors.push('Email field is required.');
          break;
        case 'password':
          userFriendlyErrors.push('Password field is required.');
          break;
        case 'name':
          userFriendlyErrors.push('Name field is required.');
          break;
        
        default:
          userFriendlyErrors.push(`${key}: ${serverErrors[key]}`);
      }
    }
  
    return userFriendlyErrors;
  };
  

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
          <div ref={modal} className="w-full max-w-142.5 rounded-lg">
            {!showAdditionalDiv && (
              <div className="flex flex-col gap-9">
                {/* <!-- Contact Form --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <form action="#">
                    <div className="p-6.5">
                      <div className="mb-4.5">
                        <label className="mb-2.5 block text-sm font-semibold ">
                          Owner's Name
                        </label>
                        <input
                          type="name"
                          name='ownerName'
                          placeholder="Enter Your Name"
                          value={formData.ownerName}
                          onChange={handleChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-sm font-semibold font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                        {nameError && (
                            <p
                              className="mt-1 text-sm"
                              style={{ color: 'red' }}
                            >
                              {nameError}
                            </p>
                          )}
                      </div>
                      
                      <div className="mb-4.5">
                        <label className="mb-2.5 block text-sm font-semibold ">
                          Owner's Email
                        </label>
                        <input
                          type="email"
                          name='ownerEmail'
                          placeholder="Enter Your Email Address"
                          value={formData.ownerEmail}
                          onChange={handleChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-sm font-semibold font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                        {emailError && (
                            <p
                              className="mt-1 text-sm"
                              style={{ color: 'red' }}
                            >
                              {emailError}
                            </p>
                          )}
                      </div>
                      <div className="mb-4.5 relative">
                        <label className="mb-2.5 block text-sm font-semibold ">
                          Owner's Password
                        </label>
                        <input
                          type={passwordVisible ? 'text' : 'password'}
                          name='password'
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Enter your password"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-sm font-semibold font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                         {passwordError && (
                            <p
                              className="mt-1 text-sm"
                              style={{ color: 'red' }}
                            >
                              {passwordError}
                            </p>
                          )}
                        <span
                        className="absolute right-4 top-11"
                        onClick={togglePasswordVisibility}
                        style={{cursor: "pointer"}}
                      >
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.5">
                            <path
                              d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                              fill=""
                            />
                            <path
                              d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                      </div>

                      <button
                        onClick={() => setShowAdditionalDiv(true)}
                        className={`flex w-full justify-center rounded bg-primary p-3 font-medium text-gray  ${
                          nameError || emailError || passwordError ? 'opacity-50 cursor-not-allowed' : ''
                       }`}
                       disabled={  nameError || emailError || passwordError}
                      >
                        Next
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {showAdditionalDiv && (
              <div className="flex flex-col gap-9">
                {/* <!-- Contact Form --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <form action="#">
                    <div className="p-6.5">
                      <div className="mb-4.5">
                        <label className="mb-2.5 block text-sm font-semibold ">
                          Organization Name
                        </label>
                        <input
                          type="text"
                          name='orgName'
                          value={formData.orgName}
                          onChange={handleChange}
                          placeholder="Enter Your Organization Name"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-sm font-semibold font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                        {orgNameError && (
                            <p
                              className="mt-1 text-sm"
                              style={{ color: 'red' }}
                            >
                              {orgNameError}
                            </p>
                          )}
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

                      <button
                        onClick={handleSave}
                        type="submit"
                        className={`flex w-full justify-center rounded bg-primary p-3 font-medium text-gray  ${
                          orgNameError ? 'opacity-50 cursor-not-allowed' : ''
                       }`}
                       disabled={ orgNameError}
                      >
                        {isloaing ? <BeatLoader color="white" /> : 'Save'}
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
