
import React, { useState, useEffect } from 'react';
import LineChartComponent from './common/charts/LineChartComponent';
import TextField from '@material-ui/core/TextField';
import ICalculateCompoundInterest from './services/interfaces/Calculate/ICalculateCompoundInterest';
import PercentageInput from './common/inputs/Percentage/PercentageInput';
import { Grid, makeStyles, Theme, createStyles, Paper, Select, MenuItem, InputLabel, Button } from '@material-ui/core';
import SelectInput from './common/inputs/Select/SelectInput';
import MoneyInput from './common/inputs/Money/MoneyInput';
import { PeriodTypeEnum } from './services/enums/PeriodTypeEnum';
import CalculateCompoundInterest from './helpers/Calculate/CalculateCompoundInterest/CalculateCompoundInterest';
import EquivalentPeriod from './helpers/Calculate/EquivalentCalculators/EquivalentPeriod';
import EquivalentInterest from './helpers/Calculate/EquivalentCalculators/EquivalentInterest';
import Cycle from './models/Cycle';
import { MoneyMask } from './helpers/Mask/MoneyMask';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    utilityHeader: {
      backgroundColor: "red"
    },
    utilityTitle: {
      textAlign: "center"
    },
    calculatorGraph: {

    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 600,
      marginTop: 50
    }
  }),
);

function App() {


  const [cycles, setCycles] = useState<Cycle[]>([]);

  const [calculatorInput, setCalculatorInput] = useState<ICalculateCompoundInterest>({
    interestRate: 0.8,
    interestRateType: PeriodTypeEnum.monthly,
    initialPatrimony: 55000 * 100,
    monthlyInvestedCapital: 100 * 100,
    period: 360,
    periodType: PeriodTypeEnum.monthly
  });

  // useEffect(() => {
  // }, [calculatorInput])
  //debounce JS
  async function handleInterestRateTypeSelect(e) {
    const newInterestRateType = e as PeriodTypeEnum;
    var equivalentInterest = EquivalentInterest({ currentPeriodType: calculatorInput.interestRateType, rate: calculatorInput.interestRate });
    setCalculatorInput({ ...calculatorInput, interestRateType: newInterestRateType, interestRate: equivalentInterest })
  }

  async function handlePeriodTypeSelect(e) {
    const newPeriodType = e as PeriodTypeEnum;
    const newPeriod = EquivalentPeriod({ period: calculatorInput.period, currentPeriodType: calculatorInput.periodType });
    setCalculatorInput({ ...calculatorInput, periodType: newPeriodType, period: newPeriod })
  }

  async function calculate() {
    var c = await CalculateCompoundInterest(calculatorInput);
    setCycles(c.cycles);
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <div className={classes.utilityHeader}>
            <h1 className={classes.utilityTitle}>Calculadora de Juros compostos</h1>
          </div>
        </Grid>
      </Grid>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <MoneyInput
              name={"Capital inicial"}
              value={calculatorInput?.initialPatrimony}
              onChange={
                (e) => setCalculatorInput(state => ({ ...state, initialPatrimony: e }))
              }
            />
          </Grid>

          <Grid item xs={6}>
            <MoneyInput
              name={"Aporte mensal"}
              value={calculatorInput?.monthlyInvestedCapital}
              onChange={
                (e) => setCalculatorInput(state => ({ ...state, monthlyInvestedCapital: e }))
              }

            />
          </Grid>

          <Grid xs={12} />

          <Grid item xs={3}>
            <PercentageInput
              name={"Percentual de Juros"}
              onChange={(e) => {
                setCalculatorInput(state => ({ ...state, interestRate: e }))
              }}

              value={calculatorInput.interestRate}
            />

          </Grid>
          <Grid item xs={3}>
            <SelectInput
              value={calculatorInput.interestRateType}
              onChange={handleInterestRateTypeSelect}
              options={
                [
                  { label: "Mensal", value: PeriodTypeEnum.monthly },
                  { label: "Anual", value: PeriodTypeEnum.annually }
                ]
              }
              name={""}
            />

          </Grid>

          <Grid item xs={3}>
            <TextField
              id="outlined-basic" label="Período" variant="outlined"
              value={calculatorInput?.period}
              onChange={
                (e) => setCalculatorInput(state => ({ ...state, period: Number(e.target.value) }))
              }
            />
          </Grid>
          <Grid item xs={3}>
            <SelectInput
              value={calculatorInput.periodType}
              onChange={handlePeriodTypeSelect}
              options={
                [
                  { label: "Meses", value: String(PeriodTypeEnum.monthly) },
                  { label: "Anos", value: String(PeriodTypeEnum.annually) }
                ]
              }
              name={""}
            />

          </Grid>
        </Grid>
      </Paper >
      <Grid container spacing={3}>
        <Grid item xs className={classes.calculatorGraph}>
          <Button onClick={calculate}>
            Calcular
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs className={classes.calculatorGraph}>
          <LineChartComponent
            headers={["meses", "Total investido", "Patrimônio total", "Renda Mensal"]}
            values={
              cycles.map(c => [
                c.month,
                { v: c.totalInvestedCapital, f: MoneyMask(c.totalInvestedCapital) },
                { v: c.finalPatrimony, f: MoneyMask(c.finalPatrimony) },
                { v: c.monthlyInterestIncome, f: MoneyMask(c.monthlyInterestIncome) }
              ]
              )} />
        </Grid>
      </Grid>


    </div>
  );
}

export default App;
