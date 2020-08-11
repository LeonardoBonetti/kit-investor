import { PeriodTypeEnum } from "../../services/enums/PeriodTypeEnum";

export default interface IEquivalentInterest {
    currentPeriodType: PeriodTypeEnum;
    rate: number;
}