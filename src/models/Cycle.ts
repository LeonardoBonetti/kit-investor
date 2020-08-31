import { timeStamp } from "console";
import { pathToFileURL } from "url";

export default class Cycle {
    month: number;
    initialPatrimony: number;
    finalPatrimony: number;
    monthlyInterestIncome: number;
    investedCapital: number;
    totalInvestedCapital: number;

    constructor() {
        this.month = 0;
        this.initialPatrimony = 0;
        this.monthlyInterestIncome = 0;
        this.investedCapital = 0;
        this.finalPatrimony = 0;
        this.totalInvestedCapital = 0;
    }
}