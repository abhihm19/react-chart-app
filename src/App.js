import './App.css';
import { Chart as Chartjs, ArcElement, Tooltip, Legend } from 'chart.js';
import json_data from './data.json';
import { useState } from 'react';

import { Doughnut } from 'react-chartjs-2';



function App() {

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
  const domains = Object.keys(json_data);
  console.log(domains);
  const fields = domains.map(domain => {
    const subdomains = Object.keys(json_data[domain]);
    const domainFields = subdomains.map(subdomain => json_data[domain][subdomain]);
    return { domain, fields: [].concat(...domainFields) };
  });
  console.log(fields);
  // State to store the selected domain and field
  const [selectedDomain, setSelectedDomain] = useState(domains[0]);
  const [selectedField, setSelectedField] = useState('');

  // Filter the fields related to the selected domain
  // Handle change event of the domain dropdown
  const handleDomainChange = e => {
    setSelectedDomain(e.target.value);
    setSelectedField('');
  };

  // Handle change event of the field dropdown
  const handleFieldChange = e => {
    setSelectedField(e.target.value);
  };

  const data = {
    labels: ['A', 'B', 'C', 'D'],
    datasets: [{
      label: 'Poll',
      data: [3, 6, 2, 1],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']
    }],
    options: options
  }
  


  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Skill Matrix</h1>
      <div>
        <label htmlFor="domain">Domain:</label>
        <select name="domains" id="domains" onChange={handleDomainChange}>
        <option value="">Select a Domain</option>
          {domains.map(domain => (            
            <option value={domain}>{domain}</option>
          ))}
        </select>
      </div>
      {fields.length > 0 && (
        <div>
          <label htmlFor="field">Field:</label>
          <select name="fields" id="fields" onChange={handleFieldChange} value={selectedField}>
          <option value="">Select a Field</option>
            {fields.map(field => (
              <option value={field} key={field}>{field}</option>
            ))}
          </select>
        </div>
      )}
      <button>Generate</button>
      <div style={{ width: "30%", height: "30%", marginLeft: 'auto', marginRight: 'auto' }}>
        <Doughnut
          data={data}
          options={options}
        ></Doughnut>
      </div>
      <div id="legend-container"></div>
    </div>
  );
}

export default App;
