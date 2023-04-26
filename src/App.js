import jsonData from './data.json';
import './App.css';
import { useState } from 'react';
import { Chart as Chartjs, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

export const App = () => {

  const [technologies, setTechnologies] = useState([]);
  const [employees, setEmployees] = useState([]);


  const handleDomainChange = e => {
    const selectedDomainName = e.target.value;
    const selectedDomain = jsonData.find(d => d.domainName === selectedDomainName);
    setTechnologies(selectedDomain?.technologies || []);
  };

  const handleTechnologyChange = e => {
    const selectedTechnologyName = e.target.value;
    const selectedTechnology = technologies.find(t => t.technologyName === selectedTechnologyName);
    setEmployees(selectedTechnology?.employees || []);
  }

  Chartjs.register(
    ArcElement,
    Tooltip,
    Legend,
  );


  const options = {
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  }

  function getCount(employees) {
    // console.log(employees)
    let A = 0, B = 0, C = 0, D = 0;
    if (employees.length > 0) {
      employees.map(employee => {
        if (employee.grade === 'A') A++;
        else if ((employee.grade === 'B')) B++;
        else if ((employee.grade === 'C')) C++;
        else if ((employee.grade === 'D')) D++;
      })
    }

    return [A, B, C, D];
  }

  const data = {
    labels: ['A', 'B', 'C', 'D'],
    datasets: [{
      label: 'Count',
      data: getCount(employees),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']
    }]
  }
  return (
    <>
      <div className="Dropdown">
        <h1 style={{ textAlign: "center" }}>Skills Matrix</h1>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ marginRight: '1rem' }}>
            <select name="domains" id="domains" onChange={handleDomainChange} style={{ backgroundColor: "#fff", fontSize: "16px", border: "1px solid #ccc", borderRadius: "5px" }}>
              <option value="select-domain" style={{ backgroundColor: "#fff", color: "#333" }}>Domain</option>
              {jsonData.map(domain => (
                <option value={domain.domainName} key={domain.domainId} style={{ backgroundColor: "#fff", color: "#333", ":hover": { backgroundColor: "#f1f1f1" } }}>{domain.domainName}</option>
              ))}
            </select>
          </div>
          <div>
            <select name="technologies" id="technologies" onChange={handleTechnologyChange} style={{ backgroundColor: "#fff", fontSize: "16px", border: "1px solid #ccc", borderRadius: "5px" }}>
              <option value="select-technology" style={{ backgroundColor: "#fff", color: "#333" }}>Technology</option>
              {technologies.map(technology => (
                <option value={technology.technologyName} key={technology.technologyId} style={{ backgroundColor: "#fff", color: "#333" }}>{technology.technologyName}</option>
              ))}
            </select>
          </div>
        </div>
        <br />
        <div className="Chart" style={{ display: 'flex', justifyContent: 'center' }}>
          {employees.length > 0 &&
            <div style={{ width: "30%", height: "30%", marginLeft: 'auto', marginRight: 'auto' }}>
              <Doughnut
                data={data}
                options={options}
              ></Doughnut>
            </div>}
        </div>
      </div>

    </>
  );
}

export default App;
