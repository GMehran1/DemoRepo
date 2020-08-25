import { IPrepaymentInformation } from './mortgate-prepayment.model';

export interface IMortgageCalculationSummary {
  mortgageAmount: number,
  numberOfPayments: number,
  mortgagePayment: number,
  prepaymentInfo: IPrepaymentInformation,
  prepaymentInterestSavings: number,
  prepaymentPaymentNo: number,
  prepaymentLastPayment: number,
  principalPayments: number,
  interestPayments: number,
  monthlyPayment: number,
  totalCost: number
}
