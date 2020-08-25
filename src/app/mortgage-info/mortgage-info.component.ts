import { Component, OnInit, ViewChild } from '@angular/core';
import { MortgageCalculatorService } from '../core/mortgage-calculator.service';
import { IMortgageInformation } from '../models/mortgage-information.model';

@Component({
  selector: 'app-mortgage-info',
  templateUrl: './mortgage-info.component.html',
  styleUrls: ['./mortgage-info.component.css']
})
export class MortgageInfoComponent implements OnInit {
@ViewChild('mortgageInfoRef', {static: true}) mortgageInfoRef;
@ViewChild('mortgageInfoPrepaymentRef', {static: true}) mortgageInfoPrepaymentRef;

  mortgageInfo: IMortgageInformation = null;
  showSummary = false;

  constructor(private mortgageCalService: MortgageCalculatorService) { }

  ngOnInit() {
  }

  calculateMortgage() {
    // read data from mortgageinfo and mortgageinfoprepayment forms
    this.mortgageInfo = { mortgageAmount: this.mortgageInfoRef.fcMortgageAmount.value, interestRate: this.mortgageInfoRef.fcInterestRate.value,
    amortizationPeriodYear: this.mortgageInfoRef.fcAmortizationPeriodYear.value,
    amortizationPeriodMonth: this.mortgageInfoRef.fcAmortizationPeriodMonth.value === "" ? 0 : this.mortgageInfoRef.fcAmortizationPeriodMonth.value,
    paymentFrequency: this.mortgageInfoRef.fcPaymentFrequency.value, term: this.mortgageInfoRef.fcTerm.value,
    prepaymentInfo: { prepaymentAmount: this.mortgageInfoPrepaymentRef.fcPrepaymentAmount.value === "" ? 0 : this.mortgageInfoPrepaymentRef.fcPrepaymentAmount.value,
    prepaymentFrequency: this.mortgageInfoPrepaymentRef.fcPrepaymentFrequency.value, startWithPayment: this.mortgageInfoPrepaymentRef.fcStartWithPayment.value } };
    this.mortgageCalService.calculateMortgage(this.mortgageInfo);
  }
}
