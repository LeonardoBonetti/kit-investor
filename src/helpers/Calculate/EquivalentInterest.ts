import IEquivalentInterest from "./IEquivalentInterest";
import { PeriodTypeEnum } from "../../services/enums/PeriodTypeEnum";

export default function EquivalentInterest(input: IEquivalentInterest) {

    // 1 + taxa equivalente = (1 + taxa de juros)período da taxa equivalente/período da taxa atual

    var rate = input.rate / 100;

    var periods = input.currentPeriodType === PeriodTypeEnum.annually ? 1 / 12 : 12 / 1;

    var result = (Math.pow((rate + 1), periods) - 1) * 100;

    return result;
}