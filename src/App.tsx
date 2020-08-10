
import React, { useState, useEffect } from 'react';
import LineChartComponent from './common/charts/LineChartComponent';
import ICycle from './services/interfaces/Calculate/ICycle';
import TextField from '@material-ui/core/TextField';
import ICalculateCompoundInterest from './services/interfaces/Calculate/ICalculateCompoundInterest';
import PercentageInput from './common/inputs/PercentageInput';
import { Grid, makeStyles, Theme, createStyles, Paper } from '@material-ui/core';

const data = [
  {
    name: 'Mês 1', value: 100,
  },
  {
    name: 'Mês 2', value: 120,
  }
];

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
    initialPatrimony: 0,
    monthlyInvestedCapital: 0,
    monthPeriod: 0
  });

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
            <TextField
              id="outlined-basic" label="Capital inicial" variant="outlined"
              value={calculatorInput?.initialPatrimony}
              onChange={
                (e) => setCalculatorInput({ ...calculatorInput, initialPatrimony: Number(e.target.value) })
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

          <Grid item xs={6}>
            <PercentageInput
              name={"Percentual de Juros"}
              onChange={(e) => setCalculatorInput({ ...calculatorInput, interestRate: e })}
              value={calculatorInput.interestRate}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="outlined-basic" label="Período" variant="outlined"
              value={calculatorInput?.monthPeriod}
              onChange={
                (e) => setCalculatorInput({ ...calculatorInput, monthPeriod: Number(e.target.value) })
              }
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
