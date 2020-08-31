import { PeriodTypeEnum } from "../../../services/enums/PeriodTypeEnum";
import IEquivalentPeriod from "./IEquivalentPeriod";

export default function EquivalentPeriod(input: IEquivalentPeriod): number {
    let period = input.currentPeriodType === PeriodTypeEnum.annually ? input.period * 12 : input.period / 12;
    return Math.ceil(period)
}