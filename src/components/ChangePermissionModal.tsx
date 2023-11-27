import React, { useState, useEffect, useRef } from 'react';
import { changePermission } from '../api/modules/Swiftsync.class';
import BeatLoader from 'react-spinners/BeatLoader'

interface ChangePermissionProps {
  user: string;
  isOpen: boolean;
  onOpen: () => void;
  onSave: (permissions: Partial<string>) => void;
  onClose: () => void;
  loading: boolean;
}

const ChangePermission: React.FC<ChangePermissionProps> = ({
  user,
  isOpen,
  onOpen,
  onSave,
  onClose,
  loading,
}) => {
  const [migration, setMigration] = useState(user?.view_migration);
  const [platform, setPlatform] = useState(user?.view_platform);
  const [viewOrg, setViewOrg] = useState(user?.view_organization);
  const [createOrg, setCreateOrg] = useState(user?.create_organization);
  const modalRef = useRef<HTMLDivElement | null>(null); 
  const trigger = useRef<any>(null);
  

  const handleSave = () => {
    
    onSave({
      view_migration: migration,
      view_platform: platform,
      view_organization: viewOrg,
      create_organization: createOrg,
    }, user?.id); // Pass user ID to the onSave function
  };

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!modalRef.current) return;
      if (
        !isOpen ||
        modalRef.current.contains(target) ||
        trigger.current.contains(target) ||
        (target instanceof Node &&
          target.parentElement &&
          (target.parentElement.closest('form') ||
            target.parentElement.querySelector('.next-button')))
      )
        return;
      onClose()
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  return (
    <div>
      <button onClick={onOpen}  ref={trigger} className="rounded-md bg-primary py-1 px-3 font-medium text-white">
        Permissions
      </button>
      {isOpen && (
        <div
        
          className={`fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <div  className="w-full max-w-142.5 rounded-lg" ref={modalRef}>
            <div className="flex flex-col gap-9">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-wrap items-center">
                  <div className="w-full border-stroke dark:border-strokedark  xl:border-l-2">
                    <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                      <label
                        htmlFor="checkboxLabelMigration"
                        className="flex cursor-pointer select-none items-center"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="checkboxLabelMigration"
                            className="sr-only"
                            onChange={() => {
                              setMigration(!migration);
                            }}
                            checked={migration}
                          />
                          <div
                            className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                              migration && 'border-primary bg-gray dark:bg-transparent'
                            }`}
                          >
                            <span
                              className={`h-2.5 w-2.5 rounded-sm ${migration && 'bg-primary'}`}
                            ></span>
                          </div>
                        </div>
                        View Migration
                      </label>
                      <label
                        htmlFor="checkboxLabelPlatform"
                        className="flex cursor-pointer select-none items-center mt-4"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="checkboxLabelPlatform"
                            className="sr-only"
                            onChange={() => {
                              setPlatform(!platform);
                            }}
                            checked={platform}
                          />
                          <div
                            className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                              platform && 'border-primary bg-gray dark:bg-transparent'
                            }`}
                          >
                            <span
                              className={`h-2.5 w-2.5 rounded-sm ${platform && 'bg-primary'}`}
                            ></span>
                          </div>
                        </div>
                        View Platform
                      </label>
                      <label
                        htmlFor="checkboxLabelViewOrg"
                        className="flex cursor-pointer select-none items-center mt-4"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="checkboxLabelViewOrg"
                            className="sr-only"
                            onChange={() => {
                              setViewOrg(!viewOrg);
                            }}
                            checked={viewOrg}
                          />
                          <div
                            className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                              viewOrg && 'border-primary bg-gray dark:bg-transparent'
                            }`}
                          >
                            <span
                              className={`h-2.5 w-2.5 rounded-sm ${viewOrg && 'bg-primary'}`}
                            ></span>
                          </div>
                        </div>
                        View Organisation
                      </label>
                      <label
                        htmlFor="checkboxLabelCreateOrg"
                        className="flex cursor-pointer select-none items-center mt-4"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="checkboxLabelCreateOrg"
                            className="sr-only"
                            onChange={() => {
                              setCreateOrg(!createOrg);
                            }}
                            checked={createOrg}
                          />
                          <div
                            className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                              createOrg && 'border-primary bg-gray dark:bg-transparent'
                            }`}
                          >
                            <span
                              className={`h-2.5 w-2.5 rounded-sm ${createOrg && 'bg-primary'}`}
                            ></span>
                          </div>
                        </div>
                        Create Organisation
                      </label>
                      <button
                        type="submit"
                        onClick={handleSave}
                        className="btn-primary mt-4 inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover-bg-opacity-90 lg:px-8 xl:px-10"
                      >
                        {loading ? <BeatLoader color='white'/>: "Save Changes"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePermission;
