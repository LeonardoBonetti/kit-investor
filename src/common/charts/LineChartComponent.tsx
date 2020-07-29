import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import ILineChart from '../../services/interfaces/LineChart/ILineChart';

function LineChartComponent(props: ILineChart) {
  
  return (
    <LineChart
        width={500}
        height={300}
        data={props.items}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
  );
}

export default LineChartComponent;
