import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import moment from 'moment';
import { HealthContext } from '../context/HealthContext';
/**
 * @desc Renders Readout of CPU Temperature
 * @param object props - passed from GraphsContainer
 * @return Plot Component - Component for CPU Graph
 */

const TemperatureChart = () => {
  // Once we pass down specific props to our graph components
  // (i.e cputemp, time, etc) we can remove our for loop, desctructured variables
  const { healthData } = useContext(HealthContext);
  const { time, cputemp } = healthData;
  console.log('in temp chart TIME =>', time);
  console.log('in temp chart cpuTEMP => ', cputemp);

  const createChart = () => {
    const yAxis = cputemp;
    let month: undefined | string;
    let timeArr: undefined | [number];
    if (time === undefined || cputemp === undefined) {
      // Do Nothing
    } else {
      // const xAxis = healthData.time;
      timeArr = time.map((el: string) => moment(el).format('hh:mm A'));
      month = moment(time[0]).format('MMM Do');
      console.log('what is timearr temp ------>', timeArr)
    }

    return (
      <Plot
        data={[
          {
            type: 'scatter',
            fill: 'tozeroy',
            mode: 'lines',
            fillcolor: 'rgb(250, 26, 88)',
            x: timeArr,
            y: yAxis,
            name: 'CPU Temperature',
            showlegend: true,
          },
        ]}
        config={{ responsive: true }}
        layout={{
          title: 'CPU Temperature',
          height: 400,
          width: 400,
          font: {
            color: 'black',
            size: 15,
            family: 'Nunito, san serif',
          },
          paper_bgcolor: 'white',
          plot_bgcolor: 'white',
          legend: {
            orientation: 'h',
            xanchor: 'center',
            x: 0.5,
            y: 5,
          },
          xaxis: {
            title: month,
            tickmode: 'linear',
            tickformat: '%d %B (%a)<br>%Y',
            mirror: false,
            ticks: 'outside',
            showline: true,
          },
          yaxis: {
            title: `Temperature (\xB0C)`,
            rangemode: 'nonnegative',
            mirror: false,
            ticks: 'outside',
            showline: true,
          },
        }}
      />
    );
  };

  return <div>{createChart()}</div>;
};

export default TemperatureChart;