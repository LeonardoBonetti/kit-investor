
import React, { useState, useEffect } from 'react';
import LineChartComponent from './common/charts/LineChartComponent';
import ICycle from './services/interfaces/Calculate/ICycle';
import TextField from '@material-ui/core/TextField';
import ICalculateCompoundInterest from './services/interfaces/Calculate/ICalculateCompoundInterest';
import PercentageInput from './common/inputs/Percentage/PercentageInput';
import { Grid, makeStyles, Theme, createStyles, Paper, Select, MenuItem, InputLabel } from '@material-ui/core';
import SelectInput from './common/inputs/Select/SelectInput';
import MoneyInput from './common/inputs/Money/MoneyInput';
import { PeriodTypeEnum } from './services/enums/PeriodTypeEnum';


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
      margin: 'auto',
      maxWidth: 600,
      marginTop: 20
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

  const [cycles, setCycles] = useState<ICycle[]>([]);

  const [calculatorInput, setCalculatorInput] = useState<ICalculateCompoundInterest>({
    interestRate: 0,
    interestRateType: PeriodTypeEnum.monthly,

    initialPatrimony: 0,
    monthlyInvestedCapital: 0,

    period: 0,
    periodType: PeriodTypeEnum.monthly
  });

  async function handleInterestRateTypeSelect(e) {
    setCalculatorInput({ ...calculatorInput, interestRateType: e as PeriodTypeEnum })
  }

  async function handlePeriodTypeSelect(e) {
    setCalculatorInput({ ...calculatorInput, periodType: e as PeriodTypeEnum })
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
                (e) => setCalculatorInput({ ...calculatorInput, initialPatrimony: e })
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="outlined-basic" label="Aporte mensal" variant="outlined"
              value={calculatorInput?.monthlyInvestedCapital}
              onChange={
                (e) => setCalculatorInput({ ...calculatorInput, monthlyInvestedCapital: Number(e.target.value) })
              }
            />
          </Grid>

          <Grid xs={12} />

          <Grid item xs={3}>
            <PercentageInput
              name={"Percentual de Juros"}
              onChange={(e) => setCalculatorInput({ ...calculatorInput, interestRate: Number(e.target.value) })}
              value={calculatorInput.interestRate}
            />

          </Grid>
          <Grid item xs={3}>
            <SelectInput
              value={calculatorInput.interestRateType}
              onChange={handleInterestRateTypeSelect}
              options={
                [
                  { label: "Mensal", value: String(PeriodTypeEnum.monthly) },
                  { label: "Anual", value: String(PeriodTypeEnum.annually) }
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
                (e) => setCalculatorInput({ ...calculatorInput, period: Number(e.target.value) })
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
          <LineChartComponent headers={["x", "cat", "dog"]} values={[[0, 2, 0], [1, 4, 10]]} />
        </Grid>
      </Grid>

    </div>
  );
}

export default App;
