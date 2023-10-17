const DataStats = () => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark mb-10">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-0">
        <div className="flex items-center justify-center gap-2 border-b border-stroke pb-5 dark:border-strokedark xl:border-b-0 xl:border-r xl:pb-0">
          <div>
            <h4 className="mb-0.5 text-xl font-semibold  md:text-title-lg" style={{color:"green"}}>
             2K
            </h4>
            <p className="text-sm font-medium">Migrations Completed</p>
          </div>
         
        </div>
        <div className="flex items-center justify-center gap-2 border-b border-stroke pb-5 dark:border-strokedark xl:border-b-0 xl:border-r xl:pb-0">
          <div>
            <h5 className="mb-0.5 text-xl font-semibold text-black dark:text-white md:text-title-md" style={{color:"blue"}}>
              1.2K
            </h5>
            <p className="text-sm font-medium">Migrations in Progress</p>
          </div>
         
        </div>
        <div className="flex items-center justify-center gap-2  pb-5 dark:border-strokedark sm:border-b-0 sm:pb-0 ">
          <div>
            <h5 className="mb-0.5 text-xl font-semibold text-black dark:text-white md:text-title-md" style={{color:"red"}}>
              104
            </h5>
            <p className="text-sm font-medium">Migrations Not Started</p>
          </div>
          
        </div>
        
      </div>
    </div>
  );
};

export default DataStats;
