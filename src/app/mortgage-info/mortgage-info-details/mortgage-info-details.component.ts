import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic';
import { MortgageCalculationSummaryComponent } from '../mortgage-info-summary/mortgage-calculation-summary/mortgage-calculation-summary.component';
import { MortgageCalculatorService } from 'src/app/core/mortgage-calculator.service';
import { MortgageRepoService } from 'src/app/core/mortgage-repo.service';

@Component({
  selector: 'app-mortgage-info-details',
  templateUrl: './mortgage-info-details.component.html',
  styleUrls: ['./mortgage-info-details.component.css']
})
export class MortgageInfoDetailsComponent implements OnInit {
  fgMortgageDetailsForm: FormGroup;
  fcMortgageAmount = new FormControl('', Validators.required);
  fcInterestRate = new FormControl('', Validators.required);
  fcAmortizationPeriodYear = new FormControl('', Validators.required);
  fcAmortizationPeriodMonth = new FormControl('');
  fcPaymentFrequency = new FormControl('', Validators.required);
  fcTerm = new FormControl('', Validators.required);
  amrtPeriodYear = null;
  amrtPeriodMonth = null;
  paymentFrequency = null;
  term = null;
  constructor(private fb: FormBuilder, private mortgageRepoService: MortgageRepoService) {
    // initialize form with blank controls
    this.initMortgageDetailsForm();
    // get data from repo service
    this.amrtPeriodYear = this.mortgageRepoService.getAmortizationPeriodYear();
    this.amrtPeriodMonth = this.mortgageRepoService.getAmortizationPeriodMonths();
    this.paymentFrequency = this.mortgageRepoService.getPaymentFrequency();
    this.term = this.mortgageRepoService.getTerm();
  }

  ngOnInit() {
  }

  initMortgageDetailsForm() {
    this.fgMortgageDetailsForm = this.fb.group({
      MortgageAmount: this.fcMortgageAmount,
      InterestRate: this.fcInterestRate,
      AmortizationPeriodYear: this.fcAmortizationPeriodYear,
      AmortizationPeriodMonth: this.fcAmortizationPeriodMonth,
      PaymentFrequency: this.fcPaymentFrequency,
      Term: this.fcTerm
    })
  }

}
