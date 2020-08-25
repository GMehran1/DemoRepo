import { Injectable } from '@angular/core';
import { IMortgageInformation } from '../models/mortgage-information.model';

@Injectable({
  providedIn: 'root'
})
export class MortgageRepoService {

  constructor() { }

  getAmortizationPeriodYear() {
    return [{text: '25 Years', value: 25}];
  }

  getAmortizationPeriodMonths() {
    return [{text:'', value: 0}, {text: '1 Month', value: 1}, {text: '2 Months', value: 2}, {text: '3 Months', value: 3}, {text: '4 Months', value: 4},
    {text: '5 Months', value: 5}, {text: '6 Months', value: 6}, {text: '7 Months', value: 7}, {text: '8 Months', value: 8},
    {text: '9 Months', value: 9}, {text: '10 Months', value: 10}, {text: '11 Months', value: 11}];
  }

  getPaymentFrequency() {
    return [{text: 'Monthly (12x per year)', value: 12}];
  }

  getTerm() {
    return [{text: '1 Year', value: 1}, {text: '2 Years', value: 2}, {text: '3 Years', value: 3}, {text: '4 Years', value: 4},
    {text: '5 Years', value: 5}, {text: '6 Years', value: 6}, {text: '7 Years', value: 7}, {text: '8 Years', value: 8},
    {text: '9 Years', value: 9}, {text: '10 Years', value: 10}];
  }

  getMockedMortgageInformation(): IMortgageInformation {
    return { mortgageAmount: 100000, interestRate: 5, amortizationPeriodYear: 25,
      amortizationPeriodMonth: 0, paymentFrequency: 12, term: 5, prepaymentInfo: { prepaymentAmount: 0,
      prepaymentFrequency: 0, startWithPayment: 0 }};
  }
}
