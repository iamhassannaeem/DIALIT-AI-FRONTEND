import React from 'react';
import { useParams } from 'react-router-dom';
import OrganisationMigrationTable from '../components/OrganisationMigrationTable';
import OrganisationUser from '../components/OrganisationUser';
import PlatformTable from '../components/PlatformTable';
import { useEffect } from 'react';
import { organisationDetailGet } from '../api/modules/Swiftsync.class';
const organisations = () => {
  const { id } = useParams();
  const [organization, setOrganization] = React.useState(null);

  useEffect(() => {
    const api = async () => {
      try {
        const res = await organisationDetailGet(id);
        setOrganization(res);
      } catch (error) {
        console.log('error',error);
      }
    };

    api();
  }, []);

  return (
    <>
      <div className="mb-6 mt-5 flex flex-col  gap-3 sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          {organization?.name}
        </h2>
        <p>
          Organisation Owner: <span>{organization?.owner}</span>
        </p>
      </div>
      <PlatformTable platforms={organization?.platforms} />
      <OrganisationUser users={organization?.users} />
      <OrganisationMigrationTable migrations={organization?.migrations} />
    </>
  );
};

export default organisations;
