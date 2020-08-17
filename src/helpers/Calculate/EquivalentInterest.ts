import IEquivalentInterest from "./IEquivalentInterest";
import { PeriodTypeEnum } from "../../services/enums/PeriodTypeEnum";

export default function EquivalentInterest(input: IEquivalentInterest): number {

    // 1 + taxa equivalente = (1 + taxa de juros)período da taxa equivalente/período da taxa atual

    var treatedrate = input.rate = parseFloat(input.rate.toString().replace(/[^\d]+/gi, '')) / 100;

    var rate = treatedrate / 100;

    var periods = input.currentPeriodType === PeriodTypeEnum.annually ? 1 / 12 : 12 / 1;

    var result = Number(Math.pow((rate + 1), periods) - 1) * 100;
    console.log('treatedrate: ' + treatedrate + ' rate: ' + input.rate + ' result: ' + Math.round((result + Number.EPSILON) * 100) / 100);
    return Math.round((result + Number.EPSILON) * 100) / 100;
}