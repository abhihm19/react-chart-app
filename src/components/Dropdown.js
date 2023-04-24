// import data from '../data.json';
// import { useState } from 'react';
// import { Chart } from './Chart'


// import React from 'react'

// export const Dropdown = () => {

//   const [domainName, setDomainName] = useState('');
//   const [technologies, setTechnologies] = useState([]);
//   const [employees, setEmployees] = useState([]);


//   const handleDomainChange = e => {
//     const selectedDomainName = e.target.value;
//     setDomainName(selectedDomainName);
//     const selectedDomain = data.find(d => d.domainName === selectedDomainName);
//     // console.log(selectedDomain.technologies);
//     setTechnologies(selectedDomain?.technologies || []);
//   };

//   const handleTechnologyChange = e => {
//     const selectedTechnologyName = e.target.value;
//     const selectedTechnology = technologies.find(t => t.technologyName === selectedTechnologyName);
//     console.log(selectedTechnology);
//     setEmployees(selectedTechnology?.employees);

//     console.log(employees)
//   }
  

//   return (
//     <div className="Dropdown">
//       <h1 style={{ textAlign: "center" }}>Skill Matrix</h1>
//       <div>
//         <label htmlFor="domain">Domain:</label>
//         <select name="domains" id="domains" onChange={handleDomainChange}>
//           <option value="">Select a Domain</option>
//           {data.map(domain => (
//             <option value={domain.domainName} key={domain.domainId}>{domain.domainName}</option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label htmlFor="technology">Technology:</label>
//         <select name="technologies" id="technologies" onChange={handleTechnologyChange}>
//           <option value="select-technology">Select a technology</option>
//           {technologies.map(technology => (
//             <option value={technology.technologyName} key={technology.technologyId}>{technology.technologyName}</option>
//           ))}
//         </select>
//       </div>
//       {/* <Chart employees={} /> */}
//     </div>

//   );
// }

// export default Dropdown;
