import React, { useState, useEffect, useRef } from 'react';
import { createPackage } from '../api/modules/Swiftsync.class';
import Toaster from '../components/Toast/Toast';
import BeatLoader from 'react-spinners/BeatLoader';
import { useNavigate } from 'react-router-dom';

const ModalPackage: React.FC = () => {
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

  const trigger = useRef<any>(null);
  const modal = useRef<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const description = e.target.value

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
      const res = await createPackage(formData,onNavigate);
      setIsloading(false);

      const user=(res?.message?.response?.data)
      
      if (res?.id) {
        setError((prev) => ({
          ...prev,
          success: 'Package created successfully',
          error: '',
        }));
      } else {
        const errorMessages = [];
      
        for (const key in user) {
          const errorMessage = `${key}: ${user[key]}`;
       
          errorMessages.push(errorMessage);
        }
      
        setError({ success: "", error: errorMessages.join("\n") });
      }
    }catch (error) {
      console.log(error);
    }

    setModalOpen(false);
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
        <div className="w-full max-w-142.5 rounded-lg" ref={modal} style={{ overflow: 'hidden' }}>
            <div className="flex flex-col gap-9"    style={{ overflowY: 'scroll', maxHeight: '95vh' }}>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark-bg-boxdark">
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
                      className="w-full rounded border-[1.5px] text-sm font-semibold border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus-border-primary active-border-primary disabled-cursor-default disabled-bg-whiter dark-border-form-strokedark dark-bg-form-input dark-focus-border-primary"
                    />
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
                      className="w-full rounded border-[1.5px] text-sm font-semibold border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus-border-primary active-border-primary disabled-cursor-default disabled-bg-whiter dark-border-form-strokedark dark-bg-form-input dark-focus-border-primary"
                    />
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
                      className="w-full rounded border-[1.5px] text-sm font-semibold border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus-border-primary active-border-primary disabled-cursor-default disabled-bg-whiter dark-border-form-strokedark dark-bg-form-input dark-focus-border-primary"
                    />
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
                      className="w-full rounded border-[1.5px] text-sm font-semibold border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus-border-primary active-border-primary disabled-cursor-default disabled-bg-whiter dark-border-form-strokedark dark-bg-form-input dark-focus-border-primary"
                    />
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
                      className="w-full rounded border-[1.5px] text-sm font-semibold border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus-border-primary active-border-primary disabled-cursor-default disabled-bg-whiter dark-border-form-strokedark dark-bg-form-input dark-focus-border-primary"
                    />
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
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus-border-primary active-border-primary disabled-cursor-default disabled-bg-whiter dark-border-form-strokedark dark-bg-form-input dark-focus-border-primary"
                    ></textarea>
                  </div>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                  >
                    {isloaing?<BeatLoader color='white'/>:"Save"}
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
