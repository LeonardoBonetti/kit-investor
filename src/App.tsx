
import React, { useState } from 'react';
import LineChartComponent from './common/charts/LineChartComponent';
import ICycle from './services/interfaces/Calculate/ICycle';
import TextField from '@material-ui/core/TextField';
import './App.css';
import ICalculateCompoundInterest from './services/interfaces/Calculate/ICalculateCompoundInterest';

const data = [
  {
    name: 'Mês 1', value: 100,
  },
  {
    name: 'Mês 2', value: 120,
  }
];

function App() {

  const [cycles, setCycles] = useState<ICycle[]>([]);
  const [calculatorInput, setCalculatorInput] = useState<ICalculateCompoundInterest>({
    interestRate: 0,
    initialPatrimony: 0,
    monthlyInvestedCapital: 0,
    monthPeriod: 0
  });
  // useEffect(() => {
  //   console.log(EquivalentInterest({currentPeriodType: PeriodTypeEnum.annually, rate: 2}));
  // });
  
  return (
    <>
      <TextField 
        value={calculatorInput?.initialPatrimony} 
        onChange={
          (e) => setCalculatorInput({...calculatorInput, initialPatrimony: e.target.value})
        } 
      />

      <TextField 
        value={calculatorInput?.monthlyInvestedCapital} 
        onChange={
          (e) => setCalculatorInput({...calculatorInput, monthlyInvestedCapital: e.target.value})
        } 
      />

      <TextField 
        value={calculatorInput?.interestRate} 
        onChange={
          (e) => setCalculatorInput({...calculatorInput, interestRate: e.target.value})
        } 
      />

      
      <TextField 
        value={calculatorInput?.monthPeriod} 
        onChange={
          (e) => setCalculatorInput({...calculatorInput, monthPeriod: e.target.value})
        } 
      />
    
      <LineChartComponent items={data}/>
    </>
     );
}

export default App;
