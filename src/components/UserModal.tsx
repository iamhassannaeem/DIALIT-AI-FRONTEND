import React, { useState, useEffect, useRef } from 'react';
import { GetUserList, PostUser } from '../api/modules/Swiftsync.class';
import Toaster from '../components/Toast/Toast';
import { useNavigate } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';

const UserModal: React.FC = ({ setUser }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const trigger = useRef<any>(null);
  const modal = useRef<any>(null);
  const [error, setError] = useState({ success: '', error: '' });
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isloaing, setIsloading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    let isValid = true;
    let errorMessage = '';

    if (name === 'name') {
      isValid = /^[a-zA-Z\s]{0,64}$/.test(value);
      errorMessage =
        'Name should contain only alphabets between 0 to 64 characters, including space.';
      setNameError(isValid ? '' : errorMessage);
    } else if (name === 'email') {
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      errorMessage = 'Enter a valid email address';
      setEmailError(isValid ? '' : errorMessage);
    } else if (name === 'password') {
      isValid = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,24}$/.test(
        value
      );
      errorMessage =
        'Password must be between 6 to 24 characters including numbers and special characters';
      setPasswordError(isValid ? '' : errorMessage);
    }
    const strength = getPasswordStrength(value);
    setPasswordStrength(strength);

    switch (strength) {
      case 'weak':
        errorMessage += ' (weak)';
        break;
      case 'medium':
        errorMessage += ' (medium)';
        break;
      case 'strong':
        errorMessage += ' (strong)';
        break;
      default:
        break;
    }

    setPasswordError(isValid ? '' : errorMessage);
  };
  const getPasswordStrength = (value) => {
    const weakRegex = /^(?=.*[a-zA-Z])/;
    const mediumRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/;
  
    if (strongRegex.test(value)) {
      return 'strong';
    } else if (mediumRegex.test(value)) {
      return 'medium';
    } else if (weakRegex.test(value)) {
      return 'weak';
    } else {
      return 'invalid';
    }
  };
  const getStrengthLabel = (strength) => {
    switch (strength) {
      case 'weak':
        return 'Weak';
      case 'medium':
        return 'Medium';
      case 'strong':
        return 'Strong';
      default:
        return '';
    }
  };
  
  const getStrengthClass = (strength) => {
    switch (strength) {
      case 'weak':
        return 'red';
      case 'medium':
        return '#d1b847';
      case 'strong':
        return 'green';
      default:
        return '';
    }
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

  const onNavigate = (path: To) => {
    navigate(path);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsloading(true);
      const res = await PostUser(formData, onNavigate);
      setIsloading(false);
      const user = await GetUserList(onNavigate);
      setUser(user);
      if (res.success === false) {
        const serverErrors = res.message?.response?.data;
        if (serverErrors) {
          const userFriendlyErrors = mapServerErrors(serverErrors);
          setError({ success: '', error: userFriendlyErrors.join('\n') });
        } else {
          setError({ success: '', error: 'An unexpected error occurred.' });
        }
      } else {
        setError({ success: 'User Added Successfully', error: '' });
      }
    } catch (error) {
      setIsloading(false);
      setError({
        success: '',
        error: 'An unexpected error occurred. Please check all fields.',
      });
      console.error(error);
    } finally {
      setModalOpen(false);
    }
  };

  const mapServerErrors = (serverErrors) => {
    const userFriendlyErrors = [];

    for (const key in serverErrors) {
      switch (key) {
        case 'email':
          if (
            serverErrors[key][0] ===
            'user with this email address already exists.'
          ) {
            userFriendlyErrors.push('Email already exists.');
          } else {
            userFriendlyErrors.push('Email field is required.');
          }
          break;
        case 'password':
          userFriendlyErrors.push('Password field is required.');
          break;
        case 'name':
          userFriendlyErrors.push('Name field is required.');
          break;
        // Add more cases for other fields as needed
        default:
          userFriendlyErrors.push(`${key}: ${serverErrors[key]}`);
      }
    }

    return userFriendlyErrors;
  };

  return (
    <div>
      <Toaster message={error} />

      <button
        ref={trigger}
        onClick={() => setModalOpen(!modalOpen)}
        className="rounded-md bg-primary py-3 px-9 font-medium text-white"
      >
        Add New User
      </button>
      <div
        className={`fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 ${
          modalOpen ? 'block' : 'hidden'
        }`}
      >
        <div ref={modal} className="w-full max-w-142.5 rounded-lg">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex flex-wrap items-center">
                <div className="w-full border-stroke dark:border-strokedark  xl:border-l-2">
                  <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                    <form>
                      <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                          Name
                        </label>
                        <div className="relative">
                          <input
                            type="name"
                            name="name"
                            value={formData?.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                      </div>

                      <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                          Email
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            value={formData?.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                      </div>

                      <div className="mb-6">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                          Password
                        </label>
                        <div className="relative">
                          <input
                            type={passwordVisible ? 'text' : 'password'}
                            name="password"
                            value={formData?.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />
                          {passwordError && (
                            <p
                              className="mt-1 text-sm"
                              style={{ color: 'red' }}
                            >
                              {passwordError}
                            </p>
                          )}
                          {passwordStrength && (
                            <p
                              className={`mt-1 text-sm`}
                              style={{color:`${getStrengthClass(
                                passwordStrength
                              )}`}}
                            >
                              Password Strength:{' '}
                              {getStrengthLabel(passwordStrength)}
                            </p>
                          )}
                          <span
                            className="absolute right-4 top-4"
                            onClick={togglePasswordVisibility}
                            style={{ cursor: 'pointer' }}
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
                      </div>

                      <div className="mb-5">
                        <button
                          className={`w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 ${
                            nameError || emailError || passwordError
                              ? 'cursor-not-allowed opacity-50'
                              : ''
                          }`}
                          disabled={nameError || emailError || passwordError}
                          type="submit"
                          onClick={handleSubmit}
                        >
                          {isloaing ? (
                            <BeatLoader color="white" />
                          ) : (
                            'Save User'
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
