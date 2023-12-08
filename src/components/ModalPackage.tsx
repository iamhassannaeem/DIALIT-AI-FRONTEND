import React, { useState, useEffect, useRef } from 'react';
import { createPackage, getPackages } from '../api/modules/Swiftsync.class';
import Toaster from '../components/Toast/Toast';
import BeatLoader from 'react-spinners/BeatLoader';
import { useNavigate } from 'react-router-dom';

const ModalPackage: React.FC = ({setPackages}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState({ success: '', error: '' });
  const [isloaing, setIsloading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    user_count: '',
    data_quota: '',
    monthly_price: '',
    annual_price: '',
    description: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    user_count: '',
    data_quota: '',
    monthly_price: '',
    annual_price: '',
    description: '',
  });
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

    if (name === 'name') {
      isValid = /^[a-zA-Z\s]{0,64}$/.test(value);
      errorMessage =
        'Package Name should contain only alphabets between 0 to 64 characters, including space.';
    } else if (
      name === 'user_count' ||
      name === 'data_quota' ||
      name === 'monthly_price' ||
      name === 'annual_price'
    ) {
      isValid = !isNaN(Number(value)) && Number(value) >= 0;
      errorMessage = `${name.replace(
        '_',
        ' '
      )} should be a valid non-negative number`;
    } else if (name === 'description') {
      const lines = value.split('\n');
      const wordCount = value.split(/\s+/).filter(Boolean).length;

      isValid = lines.length <= 3 && wordCount <= 100;
      errorMessage = 'Description should not exceed 3 lines and 100 words.';
    }
    setFormErrors({
      ...formErrors,
      [name]: isValid ? '' : errorMessage,
    });
    console.log(formErrors);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const description = e.target.value;

    setFormData({
      ...formData,
      description,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const onNavigate = (path) => {
      navigate(path);
    };

    try {
      setIsloading(true);
      const res = await createPackage(formData, onNavigate);
      const pack = await getPackages(onNavigate);
      setPackages(pack);
      setIsloading(false);

      if (res?.id) {
        setError((prev) => ({
          ...prev,
          success: 'Package created successfully',
          error: '',
        }));
      } else {
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
      }
    } catch (error) {
      console.error('API call failed', error);
      setError({
        success: '',
        error: 'An unexpected error occurred. Please try again.',
      });
    }

    setModalOpen(false);
  };

  const mapServerErrors = (serverErrors) => {
    const userFriendlyErrors = [];

    for (const key in serverErrors) {
      switch (key) {
        case 'annual_price':
          userFriendlyErrors.push('Annual price must be a number.');
          break;
        case 'data_quota':
          userFriendlyErrors.push('Data quota must be a number.');
          break;
        case 'description':
          userFriendlyErrors.push('Description is required.');
          break;
        case 'monthly_price':
          userFriendlyErrors.push('Monthly price must be a number.');
          break;
        case 'user_count':
          userFriendlyErrors.push('User count must be a number.');
          break;
        case 'name':
          userFriendlyErrors.push('Name field is required.');
          break;
        // Add more cases for other fields as needed
        default:
        const errorMessage = `${key}: ${serverErrors[key]}`;
        // Use a regular expression to split the error message based on periods
        const splitMessages = errorMessage.split(/\.\s*/);
        // Remove empty strings from the array
        const filteredMessages = splitMessages.filter((msg) => msg.trim() !== '');
        // Push each message to the userFriendlyErrors array
        userFriendlyErrors.push(...filteredMessages);
      }
    }

    return userFriendlyErrors;
  };

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
  }, [modalOpen]);

  return (
    <div>
      <Toaster message={error} />

      <button
        ref={trigger}
        onClick={() => setModalOpen(!modalOpen)}
        className="rounded-md bg-primary py-3 px-9 font-medium text-white"
      >
        Add New Package
      </button>
      <div
        className={`fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 ${
          modalOpen ? 'block' : 'hidden'
        }`}
      >
        <div
          className="w-full max-w-142.5 rounded-lg"
          ref={modal}
          style={{ overflow: 'hidden' }}
        >
          <div
            className="flex flex-col gap-9"
            style={{ overflowY: 'scroll', maxHeight: '95vh' }}
          >
            <div className="dark-bg-boxdark rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark">
              <form action="#">
                <div className="p-6.5">
                  <div className="mb-1.5">
                    <label className="mb-2.5 block text-sm font-semibold ">
                      Package Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData?.name}
                      onChange={handleChange}
                      placeholder="Enter Package Name"
                      className="focus-border-primary active-border-primary disabled-cursor-default disabled-bg-whiter dark-border-form-strokedark dark-bg-form-input dark-focus-border-primary w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-sm font-semibold font-medium outline-none transition"
                    />
                    {formErrors.name && (
                      <span className="text-sm" style={{color:"red"}}>
                        {formErrors.name}
                      </span>
                    )}
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-sm font-semibold ">
                      User Count
                    </label>
                    <input
                      type="text"
                      name="user_count"
                      value={formData?.user_count}
                      onChange={handleChange}
                      placeholder="Enter user count"
                      className="focus-border-primary active-border-primary disabled-cursor-default disabled-bg-whiter dark-border-form-strokedark dark-bg-form-input dark-focus-border-primary w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-sm font-semibold font-medium outline-none transition"
                    />
                    {formErrors.user_count && (
                      <span className="text-sm" style={{color:"red"}}>
                        {formErrors.user_count}
                      </span>
                    )}
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-sm font-semibold ">
                      Data Quota
                    </label>
                    <input
                      type="text"
                      name="data_quota"
                      value={formData?.data_quota}
                      onChange={handleChange}
                      placeholder="Enter Data Quota"
                      className="focus-border-primary active-border-primary disabled-cursor-default disabled-bg-whiter dark-border-form-strokedark dark-bg-form-input dark-focus-border-primary w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-sm font-semibold font-medium outline-none transition"
                    />
                    {formErrors.data_quota && (
                      <span className="text-sm" style={{color:"red"}}>
                        {formErrors.data_quota}
                      </span>
                    )}
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-sm font-semibold ">
                      Package Monthly Price
                    </label>
                    <input
                      type="text"
                      name="monthly_price"
                      value={formData?.monthly_price}
                      onChange={handleChange}
                      placeholder="Enter Package Monthly Price"
                      className="focus-border-primary active-border-primary disabled-cursor-default disabled-bg-whiter dark-border-form-strokedark dark-bg-form-input dark-focus-border-primary w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-sm font-semibold font-medium outline-none transition"
                    />
                    {formErrors.monthly_price && (
                      <span className="text-sm" style={{color:"red"}}>
                        {formErrors.monthly_price}
                      </span>
                    )}
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-sm font-semibold ">
                      Package Annual Price
                    </label>
                    <input
                      type="text"
                      name="annual_price"
                      value={formData?.annual_price}
                      onChange={handleChange}
                      placeholder="Enter Package Annual Price"
                      className="focus-border-primary active-border-primary disabled-cursor-default disabled-bg-whiter dark-border-form-strokedark dark-bg-form-input dark-focus-border-primary w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-sm font-semibold font-medium outline-none transition"
                    />
                    {formErrors.annual_price && (
                      <span className="text-sm" style={{color:"red"}}>
                        {formErrors.annual_price}
                      </span>
                    )}
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-sm font-semibold ">
                      Package Features (One per line)
                    </label>
                    <textarea
                      rows={4}
                      name="description"
                      value={formData?.description}
                      onChange={handleDescriptionChange}
                      placeholder="Enter Package Features (one per line)"
                      className="focus-border-primary active-border-primary disabled-cursor-default disabled-bg-whiter dark-border-form-strokedark dark-bg-form-input dark-focus-border-primary w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition"
                    ></textarea>
                    {formErrors.description && (
                      <span className="text-sm" style={{color:"red"}}>
                        {formErrors.description}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className={`flex w-full justify-center rounded bg-primary p-3 font-medium text-gray ${
                      !!formErrors.name ||
                      !!formErrors.user_count ||
                      !!formErrors.data_quota ||
                      !!formErrors.monthly_price ||
                      !!formErrors.annual_price
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                    
                   disabled={
                    !!formErrors.name ||
                    !!formErrors.user_count ||
                    !!formErrors.data_quota ||
                    !!formErrors.monthly_price ||
                    !!formErrors.annual_price ||
                    !!formErrors.description
                  }
                  >
                    {isloaing ? <BeatLoader color="white" /> : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPackage;
