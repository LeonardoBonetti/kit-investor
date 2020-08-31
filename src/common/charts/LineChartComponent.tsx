import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import ILineChart from './ILineChart';
import { Chart } from 'react-google-charts';
import { count } from 'console';

function LineChartComponent(props: ILineChart) {

  const [data, setData] = useState<any[][]>([]);

  useEffect(() => {
    let chartValues = props.values;
    chartValues.unshift(props.headers);
    setData(chartValues);
  }, [props.values]);

  return (
    <Chart
      height={'600px'}
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        hAxis: {
          title: 'Tempo (meses)',
        },
        vAxis: {
          title: 'Patrimônio',
          format: 'R$ #,###'
        },
        series: {
          1: { curveType: 'function' },
          2: { curveType: 'function' },
          3: { curveType: 'function' },
        },
        animation: {
          startup: true,
          easing: 'linear',
          duration: 1000,
        },
      }}
      chartLanguage={"pt-br"}

      rootProps={{ 'data-testid': '2' }}

      chartPackages={['corechart', 'controls']}

      controls={[
        {
          controlType: 'ChartRangeFilter',
          options: {
            filterColumnIndex: 0,
            ui: {
              chartType: 'LineChart',
              chartOptions: {
                chartArea: { width: '95%', height: '50%' },
                hAxis: { baselineColor: 'none' },
              },
            },
          },
          controlPosition: 'bottom',
          controlWrapperParams: {
            state: {
              range: { start: 1, end: data.length },
            },
          },
        },
      ]}
    />
  );
}

export default LineChartComponent;
