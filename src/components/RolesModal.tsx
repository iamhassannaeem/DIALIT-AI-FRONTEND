import React, { useState, useEffect, useRef } from 'react';
import { CreateRole, GetRoles } from '../api/modules/Swiftsync.class';
import Toaster from './Toast/Toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';

interface Role {
  Name: string;
  Addedby: string;
  id: number;
}

interface ChangePermissionProps {
  user: Role;
}

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <h2 className="mb-4 mt-4 text-lg font-semibold">{title}</h2>
);
const PermissionCheckbox: React.FC<{
  id: string;
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}> = ({ id, label, checked, onChange }) => (
  <label
    htmlFor={id}
    className="mt-4 flex cursor-pointer select-none items-center"
  >
    <div className="relative">
      <input
        type="checkbox"
        id={id}
        className="sr-only"
        onChange={() => {
          onChange(!checked);
        }}
        checked={checked}
      />
      <div
        className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
          checked && 'border-primary bg-gray dark:bg-transparent'
        }`}
      >
        <span
          className={`h-2.5 w-2.5 rounded-sm ${checked && 'bg-primary'}`}
        ></span>
      </div>
    </div>
    {label}
  </label>
);
const RolesModal: React.FC = ({ setUser }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const organisationid = useSelector(
    (state) => state?.isAdmin?.isAdmin?.organization?.id
  );

  const trigger = useRef<any>(null);
  const modal = useRef<any>(null);
  const [error, setError] = useState({ success: '', error: '' });
  const [name, setName] = useState();
  const [viewmigration, setViewMigration] = useState(false);
  const [viewPlatform, setViewPlatform] = useState(false);
  const [viewOrg, setViewOrg] = useState(false);
  const [createOrg, setCreateOrg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);

    const isValid = /^[a-zA-Z\s]{0,150}$/.test(newName);
    setNameError(
      isValid
        ? ''
        : 'Name should contain only alphabets between 0 to 150 characters, including space.'
    );
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const onNavigate = (path: To) => {
      navigate(path);
    };

    try {
      setLoading(true);
      const res = await CreateRole(
        {
          name: name,
          view_migration: viewmigration,
          view_platform: viewPlatform,
          view_organization: viewOrg,
          create_organization: createOrg,
        },
        onNavigate
      );
      const updatedRoles = await GetRoles(onNavigate);
      setUser(updatedRoles);
      setLoading(false);

      if (res.success === false) {
        const serverErrors = res.message?.response?.data;

        if (serverErrors) {
          const userFriendlyErrors = mapServerErrors(serverErrors);
          setError({ success: '', error: userFriendlyErrors.join('\n') });
        } else {
          setError({ success: '', error: 'An unexpected error occurred.' });
        }
      } else {
        setError({ success: 'Role Added Successfully', error: '' });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setModalOpen(false);
    }
  };

  const mapServerErrors = (serverErrors) => {
    const userFriendlyErrors = [];

    for (const key in serverErrors) {
      switch (key) {
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
        Add New Role
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
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex flex-wrap items-center">
                <div className="w-full border-stroke dark:border-strokedark  xl:border-l-2">
                  <div className="w-full p-4 sm:p-5.5 xl:p-10.5">
                    <div className="mb-4">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Name
                      </label>
                      <div className="relative">
                        <input
                          type="name"
                          name="name"
                          value={name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                      {nameError && (
                        <p className=" mt-1 text-sm" style={{ color: 'red' }}>
                          {nameError}
                        </p>
                      )}
                    </div>

                    <div className="w-full p-4 sm:p-5.5 xl:p-10.5">
                      <PermissionCheckbox
                        id="Migrationview"
                        label="View Migration"
                        checked={viewmigration}
                        onChange={setViewMigration}
                      />

                      <PermissionCheckbox
                        id="viewplatform"
                        label="View Platform"
                        checked={viewPlatform}
                        onChange={setViewPlatform}
                      />

                      <PermissionCheckbox
                        id="ViewOrg"
                        label="View Organization"
                        checked={viewOrg}
                        onChange={setViewOrg}
                      />
                      <PermissionCheckbox
                        id="CreateOrg"
                        label="Create Organization"
                        checked={createOrg}
                        onChange={setCreateOrg}
                      />
                    </div>
                    <div className="mb-5">
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className={`w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 ${
                          nameError ? 'cursor-not-allowed opacity-50' : ''
                        }`}
                        disabled={nameError}
                      >
                        {loading ? <BeatLoader color="white" /> : 'Save Role'}
                      </button>
                    </div>
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

export default RolesModal;
