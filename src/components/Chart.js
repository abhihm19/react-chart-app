import { Chart as Chartjs, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


import React from 'react'

export const Chart = ({employees}) => {
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
    let A=0, B=0, C=0, D=0;
    if(employees.length > 0) {
      employees.map(employee => {
        if(employee.grade == 'A') A++;
        else if((employee.grade == 'B')) B++;
        else if((employee.grade == 'C')) C++;
        else if((employee.grade == 'D')) D++;
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
    <div className="Chart"> 
      { employees.length > 0 &&
       <div style={{ width: "30%", height: "30%", marginLeft: 'auto', marginRight: 'auto' }}>
        <Doughnut
          data={data}
          options={options}
        ></Doughnut>
      </div>}
      <div id="legend-container"></div>
    </div>
  );
}

export default Chart;
