import { PeriodTypeEnum } from "../../../services/enums/PeriodTypeEnum";

export default interface IEquivalentPeriod {
    currentPeriodType: PeriodTypeEnum;
    period: number;
}