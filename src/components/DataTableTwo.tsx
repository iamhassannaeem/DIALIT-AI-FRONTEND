import React, { useEffect } from 'react'
import { DataTable } from 'simple-datatables'
import './datatables.css'
import eye from '../images/organisation/eye.svg'
import ban from '../images/organisation/ban.svg'
import highlight from '../images/organisation/highlight.svg'
interface Employee {
  Name: string;
  Email: string;
  PhoneNumber: string;
  OrgName: string;
  PackagePlan: string;
  Action: string;
}

const dataTwo: Employee[] = [
  {
    Name: 'Brielle Kuphal',
    Email: 'Senior Javascript Developer',
    PhoneNumber: 'Edinburgh',
    OrgName: '20',
    PackagePlan: '2012/03/29',
    Action: '$433,060',
  },
  {
    Name: 'Barney Murray',
    Email: 'Senior Backend Developer',
    PhoneNumber: 'amsterdam',
    OrgName: '29',
    PackagePlan: '2010/05/01',
    Action: '$424,785',
  },
  {
    Name: 'Ressie Ruecker',
    Email: 'Senior Frontend Developer',
    PhoneNumber: 'Jakarta',
    OrgName: '27',
    PackagePlan: '2013/07/01',
    Action: '$785,210',
  },
  {
    Name: 'Teresa Mertz',
    Email: 'Senior Designer',
    PhoneNumber: 'New Caledonia',
    OrgName: '25',
    PackagePlan: '2014/05/30',
    Action: '$532,126',
  },
  {
    Name: 'Chelsey Hackett',
    Email: 'Product Manager',
    PhoneNumber: 'NewYork',
    OrgName: '26',
    PackagePlan: '2011/09/30',
    Action: '$421,541',
  },
  {
    Name: 'Tatyana Metz',
    Email: 'Senior Product Manager',
    PhoneNumber: 'NewYork',
    OrgName: '28',
    PackagePlan: '2009/09/30',
    Action: '$852,541',
  },
  {
    Name: 'Oleta Harvey',
    Email: 'Junior Product Manager',
    PhoneNumber: 'California',
    OrgName: '25',
    PackagePlan: '2015/10/30',
    Action: '$654,444',
  },
  {
    Name: 'Bette Haag',
    Email: 'Junior Product Manager',
    PhoneNumber: 'Carolina',
    OrgName: '29',
    PackagePlan: '2017/12/31',
    Action: '$541,111',
  },
  {
    Name: 'Meda Ebert',
    Email: 'Junior Web Developer',
    PhoneNumber: 'Amsterdam',
    OrgName: '27',
    PackagePlan: '2015/10/31',
    Action: '$651,456',
  },
  {
    Name: 'Elissa Stroman',
    Email: 'Junior React Developer',
    PhoneNumber: 'Kuala Lumpur',
    OrgName: '29',
    PackagePlan: '2008/05/31',
    Action: '$566,123',
  },
  {
    Name: 'Sid Swaniawski',
    Email: 'Senior React Developer',
    PhoneNumber: 'Las Vegas',
    OrgName: '29',
    PackagePlan: '2009/09/01',
    Action: '$852,456',
  },
  {
    Name: 'Madonna Hahn',
    Email: 'Senior Vue Developer',
    PhoneNumber: 'New York',
    OrgName: '27',
    PackagePlan: '2006/10/01',
    Action: '$456,147',
  },
  {
    Name: 'Waylon Kihn',
    Email: 'Senior HTML Developer',
    PhoneNumber: 'Amsterdam',
    OrgName: '23',
    PackagePlan: '2017/11/01',
    Action: '$321,254',
  },
  {
    Name: 'Jaunita Lindgren',
    Email: 'Senior Backend Developer',
    PhoneNumber: 'Jakarta',
    OrgName: '25',
    PackagePlan: '2018/12/01',
    Action: '$321,254',
  },
  {
    Name: 'Lenora MacGyver',
    Email: 'Junior HTML Developer',
    PhoneNumber: 'Carolina',
    OrgName: '27',
    PackagePlan: '2015/09/31',
    Action: '$852,254',
  },
  {
    Name: 'Edyth McCullough',
    Email: 'Senior Javascript Developer',
    PhoneNumber: 'Edinburgh',
    OrgName: '25',
    PackagePlan: '2012/03/29',
    Action: '$433,060',
  },
  {
    Name: 'Ibrahim Stroman',
    Email: 'Senior Backend Developer',
    PhoneNumber: 'amsterdam',
    OrgName: '29',
    PackagePlan: '2010/05/01',
    Action: '$424,785',
  },
  {
    Name: 'Katelynn Reichert',
    Email: 'Senior Frontend Developer',
    PhoneNumber: 'Jakarta',
    OrgName: '27',
    PackagePlan: '2013/07/01',
    Action: '$785,210',
  },
  {
    Name: 'Brielle Kuphal',
    Email: 'Senior Javascript Developer',
    PhoneNumber: 'Edinburgh',
    OrgName: '25',
    PackagePlan: '2012/03/29',
    Action: '$433,060',
  },
  {
    Name: 'Barney Murray',
    Email: 'Senior Backend Developer',
    PhoneNumber: 'amsterdam',
    OrgName: '29',
    PackagePlan: '2010/05/01',
    Action: '$424,785',
  },
  {
    Name: 'Ressie Ruecker',
    Email: 'Senior Frontend Developer',
    PhoneNumber: 'Jakarta',
    OrgName: '27',
    PackagePlan: '2013/07/01',
    Action: '$785,210',
  },
  {
    Name: 'Teresa Mertz',
    Email: 'Senior Designer',
    PhoneNumber: 'New Caledonia',
    OrgName: '25',
    PackagePlan: '2014/05/30',
    Action: '$532,126',
  },
  {
    Name: 'Chelsey Hackett',
    Email: 'Product Manager',
    PhoneNumber: 'NewYork',
    OrgName: '26',
    PackagePlan: '2011/09/30',
    Action: '$421,541',
  },
  {
    Name: 'Tatyana Metz',
    Email: 'Senior Product Manager',
    PhoneNumber: 'NewYork',
    OrgName: '28',
    PackagePlan: '2009/09/30',
    Action: '$852,541',
  },
  {
    Name: 'Oleta Harvey',
    Email: 'Junior Product Manager',
    PhoneNumber: 'California',
    OrgName: '25',
    PackagePlan: '2015/10/30',
    Action: '$654,444',
  },
  {
    Name: 'Bette Haag',
    Email: 'Junior Product Manager',
    PhoneNumber: 'Carolina',
    OrgName: '29',
    PackagePlan: '2017/12/31',
    Action: '$541,111',
  },
  {
    Name: 'Meda Ebert',
    Email: 'Junior Web Developer',
    PhoneNumber: 'Amsterdam',
    OrgName: '27',
    PackagePlan: '2015/10/31',
    Action: '$651,456',
  },
  {
    Name: 'Elissa Stroman',
    Email: 'Junior React Developer',
    PhoneNumber: 'Kuala Lumpur',
    OrgName: '29',
    PackagePlan: '2008/05/31',
    Action: '$566,123',
  },
  {
    Name: 'Sid Swaniawski',
    Email: 'Senior React Developer',
    PhoneNumber: 'Las Vegas',
    OrgName: '29',
    PackagePlan: '2009/09/01',
    Action: '$852,456',
  },
  {
    Name: 'Madonna Hahn',
    Email: 'Senior Vue Developer',
    PhoneNumber: 'New York',
    OrgName: '27',
    PackagePlan: '2006/10/01',
    Action: '$456,147',
  },
  {
    Name: 'Waylon Kihn',
    Email: 'Senior HTML Developer',
    PhoneNumber: 'Amsterdam',
    OrgName: '23',
    PackagePlan: '2017/11/01',
    Action: '$321,254',
  },
  {
    Name: 'Jaunita Lindgren',
    Email: 'Senior Backend Developer',
    PhoneNumber: 'Jakarta',
    OrgName: '25',
    PackagePlan: '2018/12/01',
    Action: '$321,254',
  },
  {
    Name: 'Lenora MacGyver',
    Email: 'Junior HTML Developer',
    PhoneNumber: 'Carolina',
    OrgName: '27',
    PackagePlan: '2015/09/31',
    Action: '$852,254',
  },
  {
    Name: 'Edyth McCullough',
    Email: 'Senior Javascript Developer',
    PhoneNumber: 'Edinburgh',
    OrgName: '25',
    PackagePlan: '2012/03/29',
    Action: '$433,060',
  },
  {
    Name: 'Ibrahim Stroman',
    Email: 'Senior Backend Developer',
    PhoneNumber: 'amsterdam',
    OrgName: '29',
    PackagePlan: '2010/05/01',
    Action: '$424,785',
  },
  {
    Name: 'Katelynn Reichert',
    Email: 'Senior Frontend Developer',
    PhoneNumber: 'Jakarta',
    OrgName: '27',
    PackagePlan: '2013/07/01',
    Action: '$785,210',
  },
  {
    Name: 'Brielle Kuphal',
    Email: 'Senior Javascript Developer',
    PhoneNumber: 'Edinburgh',
    OrgName: '25',
    PackagePlan: '2012/03/29',
    Action: '$433,060',
  },
  {
    Name: 'Barney Murray',
    Email: 'Senior Backend Developer',
    PhoneNumber: 'amsterdam',
    OrgName: '29',
    PackagePlan: '2010/05/01',
    Action: '$424,785',
  },
  {
    Name: 'Ressie Ruecker',
    Email: 'Senior Frontend Developer',
    PhoneNumber: 'Jakarta',
    OrgName: '27',
    PackagePlan: '2013/07/01',
    Action: '$785,210',
  },
  {
    Name: 'Teresa Mertz',
    Email: 'Senior Designer',
    PhoneNumber: 'New Caledonia',
    OrgName: '25',
    PackagePlan: '2014/05/30',
    Action: '$532,126',
  },
  {
    Name: 'Chelsey Hackett',
    Email: 'Product Manager',
    PhoneNumber: 'NewYork',
    OrgName: '26',
    PackagePlan: '2011/09/30',
    Action: '$421,541',
  },
  {
    Name: 'Tatyana Metz',
    Email: 'Senior Product Manager',
    PhoneNumber: 'NewYork',
    OrgName: '28',
    PackagePlan: '2009/09/30',
    Action: '$852,541',
  },
  {
    Name: 'Oleta Harvey',
    Email: 'Junior Product Manager',
    PhoneNumber: 'California',
    OrgName: '25',
    PackagePlan: '2015/10/30',
    Action: '$654,444',
  },
  {
    Name: 'Bette Haag',
    Email: 'Junior Product Manager',
    PhoneNumber: 'Carolina',
    OrgName: '29',
    PackagePlan: '2017/12/31',
    Action: '$541,111',
  },
  {
    Name: 'Meda Ebert',
    Email: 'Junior Web Developer',
    PhoneNumber: 'Amsterdam',
    OrgName: '27',
    PackagePlan: '2015/10/31',
    Action: '$651,456',
  },
  {
    Name: 'Elissa Stroman',
    Email: 'Junior React Developer',
    PhoneNumber: 'Kuala Lumpur',
    OrgName: '29',
    PackagePlan: '2008/05/31',
    Action: '$566,123',
  },
  {
    Name: 'Sid Swaniawski',
    Email: 'Senior React Developer',
    PhoneNumber: 'Las Vegas',
    OrgName: '29',
    PackagePlan: '2009/09/01',
    Action: '$852,456',
  },
  {
    Name: 'Madonna Hahn',
    Email: 'Senior Vue Developer',
    PhoneNumber: 'New York',
    OrgName: '27',
    PackagePlan: '2006/10/01',
    Action: '$456,147',
  },
  {
    Name: 'Waylon Kihn',
    Email: 'Senior HTML Developer',
    PhoneNumber: 'Amsterdam',
    OrgName: '23',
    PackagePlan: '2017/11/01',
    Action: '$321,254',
  },
  {
    Name: 'Jaunita Lindgren',
    Email: 'Senior Backend Developer',
    PhoneNumber: 'Jakarta',
    OrgName: '25',
    PackagePlan: '2018/12/01',
    Action: '$321,254',
  },
  {
    Name: 'Lenora MacGyver',
    Email: 'Junior HTML Developer',
    PhoneNumber: 'Carolina',
    OrgName: '27',
    PackagePlan: '2015/09/31',
    Action: '$852,254',
  },
  {
    Name: 'Edyth McCullough',
    Email: 'Senior Javascript Developer',
    PhoneNumber: 'Edinburgh',
    OrgName: '25',
    PackagePlan: '2012/03/29',
    Action: '$433,060',
  },
  {
    Name: 'Ibrahim Stroman',
    Email: 'Senior Backend Developer',
    PhoneNumber: 'amsterdam',
    OrgName: '29',
    PackagePlan: '2010/05/01',
    Action: '$424,785',
  },
  {
    Name: 'Katelynn Reichert',
    Email: 'Senior Frontend Developer',
    PhoneNumber: 'Jakarta',
    OrgName: '27',
    PackagePlan: '2013/07/01',
    Action: '$785,210',
  },
  {
    Name: 'Brielle Kuphal',
    Email: 'Senior Javascript Developer',
    PhoneNumber: 'Edinburgh',
    OrgName: '25',
    PackagePlan: '2012/03/29',
    Action: '$433,060',
  },
  {
    Name: 'Barney Murray',
    Email: 'Senior Backend Developer',
    PhoneNumber: 'amsterdam',
    OrgName: '29',
    PackagePlan: '2010/05/01',
    Action: '$424,785',
  },
  {
    Name: 'Ressie Ruecker',
    Email: 'Senior Frontend Developer',
    PhoneNumber: 'Jakarta',
    OrgName: '27',
    PackagePlan: '2013/07/01',
    Action: '$785,210',
  },
  {
    Name: 'Teresa Mertz',
    Email: 'Senior Designer',
    PhoneNumber: 'New Caledonia',
    OrgName: '25',
    PackagePlan: '2014/05/30',
    Action: '$532,126',
  },
  {
    Name: 'Chelsey Hackett',
    Email: 'Product Manager',
    PhoneNumber: 'NewYork',
    OrgName: '26',
    PackagePlan: '2011/09/30',
    Action: '$421,541',
  },
  {
    Name: 'Tatyana Metz',
    Email: 'Senior Product Manager',
    PhoneNumber: 'NewYork',
    OrgName: '28',
    PackagePlan: '2009/09/30',
    Action: '$852,541',
  },
  {
    Name: 'Oleta Harvey',
    Email: 'Junior Product Manager',
    PhoneNumber: 'California',
    OrgName: '25',
    PackagePlan: '2015/10/30',
    Action: '$654,444',
  },
  {
    Name: 'Bette Haag',
    Email: 'Junior Product Manager',
    PhoneNumber: 'Carolina',
    OrgName: '29',
    PackagePlan: '2017/12/31',
    Action: '$541,111',
  },
  {
    Name: 'Meda Ebert',
    Email: 'Junior Web Developer',
    PhoneNumber: 'Amsterdam',
    OrgName: '27',
    PackagePlan: '2015/10/31',
    Action: '$651,456',
  },
  {
    Name: 'Elissa Stroman',
    Email: 'Junior React Developer',
    PhoneNumber: 'Kuala Lumpur',
    OrgName: '29',
    PackagePlan: '2008/05/31',
    Action: '$566,123',
  },
  {
    Name: 'Sid Swaniawski',
    Email: 'Senior React Developer',
    PhoneNumber: 'Las Vegas',
    OrgName: '29',
    PackagePlan: '2009/09/01',
    Action: '$852,456',
  },
  {
    Name: 'Madonna Hahn',
    Email: 'Senior Vue Developer',
    PhoneNumber: 'New York',
    OrgName: '27',
    PackagePlan: '2006/10/01',
    Action: '$456,147',
  },
  {
    Name: 'Waylon Kihn',
    Email: 'Senior HTML Developer',
    PhoneNumber: 'Amsterdam',
    OrgName: '23',
    PackagePlan: '2017/11/01',
    Action: '$321,254',
  },
  {
    Name: 'Jaunita Lindgren',
    Email: 'Senior Backend Developer',
    PhoneNumber: 'Jakarta',
    OrgName: '25',
    PackagePlan: '2018/12/01',
    Action: '$321,254',
  },
  {
    Name: 'Lenora MacGyver',
    Email: 'Junior HTML Developer',
    PhoneNumber: 'Carolina',
    OrgName: '27',
    PackagePlan: '2015/09/31',
    Action: '$852,254',
  },
  {
    Name: 'Edyth McCullough',
    Email: 'Senior Javascript Developer',
    PhoneNumber: 'Edinburgh',
    OrgName: '25',
    PackagePlan: '2012/03/29',
    Action: '$433,060',
  },
  {
    Name: 'Ibrahim Stroman',
    Email: 'Senior Backend Developer',
    PhoneNumber: 'amsterdam',
    OrgName: '29',
    PackagePlan: '2010/05/01',
    Action: '$424,785',
  },
  {
    Name: 'Katelynn Reichert',
    Email: 'Senior Frontend Developer',
    PhoneNumber: 'Jakarta',
    OrgName: '27',
    PackagePlan: '2013/07/01',
    Action: '$785,210',
  },
  {
    Name: 'Logan Kiehn',
    Email: 'Senior Designer',
    PhoneNumber: 'New Caledonia',
    OrgName: '25',
    PackagePlan: '2014/05/30',
    Action: '$532,126',
  },
  {
    Name: 'Rogers Stanton',
    Email: 'Product Manager',
    PhoneNumber: 'NewYork',
    OrgName: '26',
    PackagePlan: '2011/09/30',
    Action: '$421,541',
  },
  {
    Name: 'Alanis Torp',
    Email: 'Senior Product Manager',
    PhoneNumber: 'NewYork',
    OrgName: '28',
    PackagePlan: '2009/09/30',
    Action: '$852,541',
  },
  {
    Name: 'Jarvis Bauch',
    Email: 'Junior Product Manager',
    PhoneNumber: 'California',
    OrgName: '25',
    PackagePlan: '2015/10/30',
    Action: '$654,444',
  },
  {
    Name: 'Trey Ritchie',
    Email: 'Junior Product Manager',
    PhoneNumber: 'Carolina',
    OrgName: '29',
    PackagePlan: '2017/12/31',
    Action: '$541,111',
  },
  {
    Name: 'Ronny Dietrich',
    Email: 'Junior Web Developer',
    PhoneNumber: 'Amsterdam',
    OrgName: '27',
    PackagePlan: '2015/10/31',
    Action: '$651,456',
  },
  {
    Name: 'Isabella Christiansen',
    Email: 'Junior React Developer',
    PhoneNumber: 'Kuala Lumpur',
    OrgName: '29',
    PackagePlan: '2008/05/31',
    Action: '$566,123',
  },
];

const DataTableTwo: React.FC = () => {
  useEffect(() => {
    const dataTableTwo = new DataTable('#dataTableTwo', {   
      header:false,
      perPageSelect: [5, 10, 15, ['All', -1]],
      
    });
    dataTableTwo;
  });

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark-bg-boxdark">
      <h6 style={{ fontSize: "20px", fontWeight: "700", color: "black" ,borderBottom:"1px solid #E2E8F0"}} className='p-9'>ALL Organizations</h6>
      <div className="data-table-common data-table-two max-w-full overflow-x-auto">
        <table className="table w-full table-auto" id="dataTableTwo">
          <tbody>
            <tr>
              <th>OWNER's Name</th>
              <th>OWNER's EMAIL</th>
              <th>OWNER's PHONE NUMBER</th>
              <th>ORGANISATION NAME</th>
              <th>PACKAGE PLAN</th>
              <th>ACTION</th>
            </tr>
            {dataTwo?.map((employee, index) => (
              <tr key={index}>
                <td>{employee.Name}</td>
                <td>{employee.Email}</td>
                <td>{employee.PhoneNumber}</td>
                <td>{employee.OrgName}</td>
                <td>{employee.PackagePlan}</td>
                <td>
                  <div className='flex gap-3'>
                    <img src={eye} alt="" />
                    <img src={ban} alt="" />
                    <img src={highlight} alt="" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTableTwo;
