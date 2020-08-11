import { PeriodTypeEnum } from "../../enums/PeriodTypeEnum";

export default interface ICalculateCompoundInterest {
    interestRate: number;
    interestRateType: PeriodTypeEnum;

    initialPatrimony: number;
    monthlyInvestedCapital: number;

    period: number;
    periodType: PeriodTypeEnum;
}