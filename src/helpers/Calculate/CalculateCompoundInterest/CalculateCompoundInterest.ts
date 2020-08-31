import { PeriodTypeEnum } from "../../../services/enums/PeriodTypeEnum";
import ICalculateCompoundInterest from "../../../services/interfaces/Calculate/ICalculateCompoundInterest";
import EquivalentPeriod from "../EquivalentCalculators/EquivalentPeriod";
import ICalculateCompoundInterestResponse from "../../../services/interfaces/Calculate/ICalculateCompoundInterestResponse";
import Cycle from "../../../models/Cycle";
import EquivalentInterest from "../EquivalentCalculators/EquivalentInterest";
import Round from "../../Numeric/Round";

export default function CalculateCompoundInterest(input: ICalculateCompoundInterest): ICalculateCompoundInterestResponse {

    var cycles: Cycle[] = [];
    var threatedInput: ICalculateCompoundInterest = prepareInput(input);
    console.log(threatedInput);
    for (var i = 0; i < threatedInput.period; i++) {
        let cycle: Cycle = new Cycle();

        cycle.month = i + 1;
        cycle.initialPatrimony = Round((cycles[i - 1] ? cycles[i - 1].finalPatrimony : 0) + (i === 0 ? threatedInput.initialPatrimony : 0));
        cycle.monthlyInterestIncome = Round((cycle.initialPatrimony + cycle.investedCapital) * threatedInput.interestRate);
        cycle.investedCapital = Round(threatedInput.monthlyInvestedCapital);

        cycle.totalInvestedCapital += Round((cycles[i - 1] ? cycles[i - 1].totalInvestedCapital : 0) + cycle.investedCapital + (i === 0 ? threatedInput.initialPatrimony : 0));
        cycle.finalPatrimony = Round(cycle.initialPatrimony + cycle.monthlyInterestIncome + cycle.investedCapital);
        cycles.push(cycle);
    };
    return {
        cycles,
        patrimony: cycles.length > 0 ? cycles[cycles.length - 1].finalPatrimony : 0,
        input
    };
}


function prepareInput(input: ICalculateCompoundInterest): ICalculateCompoundInterest {
    var period = input.periodType === PeriodTypeEnum.monthly ? input.period : EquivalentPeriod({ currentPeriodType: input.periodType, period: input.period });

    var threatedInterest = parseFloat(input.interestRate.toString().replace(/[^\d]+/gi, ''));
    var interest = input.interestRateType === PeriodTypeEnum.monthly ? threatedInterest / 100 : EquivalentInterest({ currentPeriodType: input.interestRateType, rate: threatedInterest });

    var initialPatrimony = parseFloat(input.initialPatrimony.toString().replace(/[^\d]+/gi, '')) / 100;
    var monthlyInvestedCapital = parseFloat(input.monthlyInvestedCapital.toString().replace(/[^\d]+/gi, '')) / 100

    return {
        period: period,
        interestRate: interest / 100,
        initialPatrimony: initialPatrimony,
        monthlyInvestedCapital: monthlyInvestedCapital,
        periodType: PeriodTypeEnum.monthly,
        interestRateType: PeriodTypeEnum.monthly
    };
}