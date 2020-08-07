import { PeriodTypeEnum } from "../../enums/PeriodTypeEnum";

export default interface IEquivalentInterest {
    currentPeriodType: PeriodTypeEnum;
    rate: number;
}