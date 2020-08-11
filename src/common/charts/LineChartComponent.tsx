import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import ILineChart from './ILineChart';
import { Chart } from 'react-google-charts';
import { count } from 'console';

function LineChartComponent(props: ILineChart) {

  const [data, setData] = useState<any[][]>();

  useEffect(() => {
    let chartValues = props.values;
    chartValues.unshift(props.headers);
    setData(chartValues);
  }, []);

  return (
    <Chart
      width={'600px'}
      height={'400px'}
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        hAxis: {
          title: 'Tempo',
        },
        vAxis: {
          title: 'Patrimônio',
        },
        series: {
          1: { curveType: 'function' },
        },
      }}
      rootProps={{ 'data-testid': '2' }}
    />
  );
}

export default LineChartComponent;
