import React from 'react';
import './App.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import LineChartComponent from './common/charts/LineChartComponent';

const data = [
  {
    name: 'Mês 1', value: 100,
  },
  {
    name: 'Mês 2', value: 120,
  }
];


function App() {
  
  return (
   <LineChartComponent items={data}/>
  );
}

export default App;
