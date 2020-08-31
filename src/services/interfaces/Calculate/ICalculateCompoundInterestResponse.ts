import { PeriodTypeEnum } from "../../enums/PeriodTypeEnum";
import ICalculateCompoundInterest from "./ICalculateCompoundInterest";
import Cycle from "../../../models/Cycle";

export default interface ICalculateCompoundInterestResponse {
    input: ICalculateCompoundInterest;
    cycles: Cycle[];
    patrimony: Number;
}