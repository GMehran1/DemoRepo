import { IPrepaymentInformation } from './mortgate-prepayment.model';

export interface IMortgageInformation {
  mortgageAmount: number,
  interestRate: number,
  amortizationPeriodYear: number,
  amortizationPeriodMonth: number,
  paymentFrequency: number,
  term: number,
  prepaymentInfo: IPrepaymentInformation
}
