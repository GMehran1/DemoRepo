import { Injectable } from '@angular/core';
import { IMortgageInformation } from '../models/mortgage-information.model';
import { IMortgageCalculationSummary } from '../models/mortgage-calculation-summary.model';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MortgageCalculatorService {

  private mortgageInformation: IMortgageInformation
  private mortgageAmortizationSummary: IMortgageCalculationSummary
  private mortgageTermSummary: IMortgageCalculationSummary
  mortgageAmrtObs: BehaviorSubject<IMortgageCalculationSummary> = new BehaviorSubject(null);
  mortgageTermObs: BehaviorSubject<IMortgageCalculationSummary> = new BehaviorSubject(null);

  constructor() { }

  calculateMortgage(mortgageInfo: IMortgageInformation) {
    //calulate monthly payment with principal multiplied by interest future values
    if(mortgageInfo.mortgageAmount!=null && mortgageInfo.interestRate!=null && mortgageInfo.amortizationPeriodYear) {
      this.mortgageInformation = mortgageInfo;
      const totalAmrtMonths = (this.mortgageInformation.amortizationPeriodYear * this.mortgageInformation.paymentFrequency) + (+this.mortgageInformation.amortizationPeriodMonth);
      const monthlyInterest = +((this.mortgageInformation.interestRate/100)/this.mortgageInformation.paymentFrequency).toFixed(4);
      const interestFactor = Math.pow(1+ monthlyInterest, totalAmrtMonths);
      let monthlyPayments = +(this.mortgageInformation.mortgageAmount * ((monthlyInterest * interestFactor)/(interestFactor - 1))).toFixed(2);
      const noOfPayments = this.mortgageInformation.term * this.mortgageInformation.paymentFrequency;
      //init summary objects
      this.mortgageTermSummary = { mortgageAmount: this.mortgageInformation.mortgageAmount, numberOfPayments: noOfPayments, mortgagePayment: monthlyPayments,
        prepaymentInfo: { prepaymentAmount: this.mortgageInformation.prepaymentInfo.prepaymentAmount, prepaymentFrequency: this.mortgageInformation.prepaymentInfo.prepaymentFrequency, startWithPayment: this.mortgageInformation.prepaymentInfo.startWithPayment},
        prepaymentInterestSavings:0, prepaymentLastPayment:0, prepaymentPaymentNo:0, principalPayments:0, interestPayments:0, monthlyPayment:monthlyPayments, totalCost:0  };
        const noOfPaymentsAmrt = (this.mortgageInformation.amortizationPeriodYear * this.mortgageInformation.paymentFrequency) + (+this.mortgageInformation.amortizationPeriodMonth);
      this.mortgageAmortizationSummary = { mortgageAmount: this.mortgageInformation.mortgageAmount, numberOfPayments: noOfPaymentsAmrt, mortgagePayment: monthlyPayments,
        prepaymentInfo: { prepaymentAmount: this.mortgageInformation.prepaymentInfo.prepaymentAmount, prepaymentFrequency: this.mortgageInformation.prepaymentInfo.prepaymentFrequency, startWithPayment: this.mortgageInformation.prepaymentInfo.startWithPayment},
        prepaymentInterestSavings:0, prepaymentLastPayment:0, prepaymentPaymentNo:0, principalPayments:0, interestPayments:0, monthlyPayment:monthlyPayments, totalCost:0  };
      this.mortgageTermSummary.mortgageAmount = this.mortgageInformation.mortgageAmount;
      this.mortgageTermSummary.monthlyPayment = monthlyPayments;
      // Calculate Term Payments
      this.calculateTermPayments();
      // Process Amortization Payments
      this.mortgageAmortizationSummary.mortgageAmount = +this.mortgageInformation.mortgageAmount;
      this.mortgageAmortizationSummary.monthlyPayment = monthlyPayments;
      // check if prepayment is present
      if (+this.mortgageAmortizationSummary.prepaymentInfo.prepaymentAmount === 0) {
      this.mortgageAmortizationSummary.interestPayments = +((monthlyPayments * this.mortgageAmortizationSummary.numberOfPayments) - this.mortgageInformation.mortgageAmount).toFixed(2);
      this.mortgageAmortizationSummary.principalPayments = +this.mortgageInformation.mortgageAmount;
      this.mortgageAmortizationSummary.totalCost = +(this.mortgageAmortizationSummary.principalPayments + this.mortgageAmortizationSummary.interestPayments).toFixed(2);
      } else {
        this.calculateAmortizationPayments();
      }
      // let consumers know that term and amortization objects have changed
      this.mortgageAmrtObs.next(this.mortgageAmortizationSummary);
      this.mortgageTermObs.next(this.mortgageTermSummary);
    }
  }

  calculateTermPayments() {

    let mthInterest = 0;
    let mthInterestNoPrepayment = 0;
    let mthPrincipal = 0;
    let totalAmt = this.mortgageTermSummary.mortgageAmount;
    let totalInterest = 0;
    let totalInterestNoPrepayment = 0;
    let totalPrincipal = 0;

    for(var i=1; i<=this.mortgageTermSummary.numberOfPayments; i++) {
      if(i==1 && this.mortgageTermSummary.prepaymentInfo.prepaymentAmount > 0)   // prepayment on first payment
        totalAmt -= this.mortgageTermSummary.prepaymentInfo.prepaymentAmount;
      mthInterest = (totalAmt * ((this.mortgageInformation.term / 100) / this.mortgageInformation.paymentFrequency));         // this total includes prepayment
      mthInterestNoPrepayment = (this.mortgageTermSummary.mortgageAmount * ((this.mortgageInformation.term /100) / this.mortgageInformation.paymentFrequency));         // this total is for comparison
      mthPrincipal = this.mortgageTermSummary.monthlyPayment - mthInterest;
      totalPrincipal += mthPrincipal;
      totalInterest += mthInterest;
      totalInterestNoPrepayment += mthInterestNoPrepayment;
      totalAmt -= mthPrincipal;
      if(this.mortgageTermSummary.prepaymentInfo.prepaymentAmount > 0 && totalAmt < 0) {
        this.mortgageTermSummary.prepaymentPaymentNo = i;
        totalAmt += mthPrincipal;         // rollback payment
        totalPrincipal -= mthPrincipal;  // rollback total principal amount
        this.mortgageTermSummary.prepaymentLastPayment = totalAmt;
        totalPrincipal += this.mortgageTermSummary.prepaymentLastPayment;   // adjust last payment
        break;
      }
    }
    this.mortgageTermSummary.principalPayments = +(totalPrincipal + (+this.mortgageTermSummary.prepaymentInfo.prepaymentAmount)).toFixed(2);
    this.mortgageTermSummary.interestPayments = +totalInterest.toFixed(2);
    this.mortgageTermSummary.totalCost = +(this.mortgageTermSummary.principalPayments + totalInterest).toFixed(2);
    this.mortgageTermSummary.prepaymentInterestSavings = totalInterestNoPrepayment - totalInterest;
  }

  calculateAmortizationPayments() {

    let mthInterest = 0;
    let mthInterestNoPrepayment = 0;
    let mthPrincipal = 0;
    let totalAmt = this.mortgageAmortizationSummary.mortgageAmount;
    let totalInterest = 0;
    let totalInterestNoPrepayment = 0;
    let totalPrincipal = 0;

    for(var i=1; i<=this.mortgageAmortizationSummary.numberOfPayments; i++) {
      if(i==1 && this.mortgageAmortizationSummary.prepaymentInfo.prepaymentAmount > 0)   // prepayment on first payment
        totalAmt -= this.mortgageAmortizationSummary.prepaymentInfo.prepaymentAmount;
      mthInterest = (totalAmt * ((this.mortgageInformation.term / 100) / this.mortgageInformation.paymentFrequency));         // this total includes prepayment
      mthInterestNoPrepayment = (this.mortgageAmortizationSummary.mortgageAmount * ((this.mortgageInformation.term / 100) / this.mortgageInformation.paymentFrequency));         // this total is for comparison
      mthPrincipal = this.mortgageAmortizationSummary.monthlyPayment - mthInterest;
      totalPrincipal += mthPrincipal;
      totalInterest += mthInterest;
      totalInterestNoPrepayment += mthInterestNoPrepayment;
      totalAmt -= mthPrincipal;
      if(this.mortgageAmortizationSummary.prepaymentInfo.prepaymentAmount > 0 && totalAmt < 0) {
        this.mortgageAmortizationSummary.prepaymentPaymentNo = i;
        totalAmt += mthPrincipal;         // rollback payment
        totalPrincipal -= mthPrincipal;  // rollback total principal amount
        this.mortgageAmortizationSummary.prepaymentLastPayment = totalAmt;
        totalPrincipal += this.mortgageAmortizationSummary.prepaymentLastPayment;   // adjust last payment
        break;
      }
    }
    this.mortgageAmortizationSummary.principalPayments = +(totalPrincipal + (+this.mortgageTermSummary.prepaymentInfo.prepaymentAmount)).toFixed(2);
    this.mortgageAmortizationSummary.interestPayments = +totalInterest.toFixed(2);
    this.mortgageAmortizationSummary.totalCost = +(this.mortgageAmortizationSummary.principalPayments + totalInterest).toFixed(2);
    this.mortgageAmortizationSummary.prepaymentInterestSavings = totalInterestNoPrepayment - totalInterest;
  }

  getMortgageTermCalSummary() : Observable<IMortgageCalculationSummary> {
    return of (this.mortgageTermSummary);
  }

  getMortgageAmrtCalSummary() : Observable<IMortgageCalculationSummary> {
    return of (this.mortgageAmortizationSummary);
  }
}
