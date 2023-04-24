import jsonData from './data.json';
import { useState } from 'react';
import { Chart as Chartjs, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

export const App = () => {

  const [domainName, setDomainName] = useState('');
  const [technologies, setTechnologies] = useState([]);
  const [employees, setEmployees] = useState([]);


  const handleDomainChange = e => {
    const selectedDomainName = e.target.value;
    setDomainName(selectedDomainName);
    const selectedDomain = jsonData.find(d => d.domainName === selectedDomainName);
    // console.log(selectedDomain.technologies);
    setTechnologies(selectedDomain?.technologies || []);
  };

  const handleTechnologyChange = e => {
    const selectedTechnologyName = e.target.value;
    const selectedTechnology = technologies.find(t => t.technologyName === selectedTechnologyName);
    console.log(selectedTechnology);
    setEmployees(selectedTechnology?.employees);

    console.log(employees)
  }

  const htmlLegendPlugin = {
    id: 'htmlLegend',
    afterUpdate(chart, args, options) {
      const ul = getOrCreateLegendList(chart, options.containerID);

      // Remove old legend items
      while (ul.firstChild) {
        ul.firstChild.remove();
      }

      // Reuse the built-in legendItems generator
      const items = chart.options.plugins.legend.labels.generateLabels(chart);

      items.forEach(item => {
        const li = document.createElement('li');
        li.style.alignItems = 'center';
        li.style.cursor = 'pointer';
        li.style.display = 'flex';
        li.style.flexDirection = 'row';
        li.style.marginLeft = '10px';

        li.onclick = () => {
          const { type } = chart.config;
          if (type === 'pie' || type === 'doughnut') {
            // Pie and doughnut charts only have a single dataset and visibility is per item
            chart.toggleDataVisibility(item.index);
          } else {
            chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
          }
          chart.update();
        };

        // Color box
        const boxSpan = document.createElement('span');
        boxSpan.style.background = item.fillStyle;
        boxSpan.style.borderColor = item.strokeStyle;
        boxSpan.style.borderWidth = item.lineWidth + 'px';
        boxSpan.style.display = 'inline-block';
        boxSpan.style.height = '20px';
        boxSpan.style.marginRight = '10px';
        boxSpan.style.width = '20px';

        // Text
        const textContainer = document.createElement('p');
        textContainer.style.color = item.fontColor;
        textContainer.style.margin = 0;
        textContainer.style.padding = 0;
        textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

        const text = document.createTextNode(item.text);
        textContainer.appendChild(text);

        li.appendChild(boxSpan);
        li.appendChild(textContainer);
        ul.appendChild(li);
      });
    }
  };

  const getOrCreateLegendList = (chart, id) => {
    const legendContainer = document.getElementById(id);
    let listContainer = legendContainer.querySelector('ul');

    if (!listContainer) {
      listContainer = document.createElement('ul');
      listContainer.style.display = 'flex';
      listContainer.style.flexDirection = 'row';
      listContainer.style.margin = 0;
      listContainer.style.padding = 0;

      legendContainer.appendChild(listContainer);
    }

    return listContainer;
  };


  Chartjs.register(
    ArcElement,
    Tooltip,
    Legend,
    htmlLegendPlugin
  );


  const options = {
    plugins: {
      htmlLegend: {
        containerID: 'legend-container'
      }
    }
  }

  function getCount(employees) {
    console.log("get count")
    console.log(employees)
    let A = 0, B = 0, C = 0, D = 0;
    if (employees.length > 0) {
      employees.map(employee => {
        if (employee.grade == 'A') A++;
        else if ((employee.grade == 'B')) B++;
        else if ((employee.grade == 'C')) C++;
        else if ((employee.grade == 'D')) D++;
      })
    }

    return [A, B, C, D];
  }

  const data = {
    labels: ['A', 'B', 'C', 'D'],
    datasets: [{
      label: 'Poll',
      data: getCount(employees),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']
    }],
    options: options
  }
  return (
    <>
      <div className="Dropdown">
        <h1 style={{ textAlign: "center" }}>Skill Matrix</h1>
        <div>
          <label htmlFor="domain">Domain:</label>
          <select name="domains" id="domains" onChange={handleDomainChange}>
            <option value="">Select a Domain</option>
            {jsonData.map(domain => (
              <option value={domain.domainName} key={domain.domainId}>{domain.domainName}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="technology">Technology:</label>
          <select name="technologies" id="technologies" onChange={handleTechnologyChange}>
            <option value="select-technology">Select a technology</option>
            {technologies.map(technology => (
              <option value={technology.technologyName} key={technology.technologyId}>{technology.technologyName}</option>
            ))}
          </select>
        </div>
        <div className="Chart">
          {employees.length > 0 &&
            <div style={{ width: "30%", height: "30%", marginLeft: 'auto', marginRight: 'auto' }}>
              <Doughnut
                data={data}
                options={options}
              ></Doughnut>
            </div>}
          <div id="legend-container"></div>
        </div>
      </div>


    </>
  );
}

export default App;
