import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mortgage-info-prepayment',
  templateUrl: './mortgage-info-prepayment.component.html',
  styleUrls: ['./mortgage-info-prepayment.component.css']
})
export class MortgageInfoPrepaymentComponent implements OnInit {
fgMortgagePrepayment: FormGroup;
fcPrepaymentAmount: FormControl = new FormControl('');
fcPrepaymentFrequency: FormControl = new FormControl('');
fcStartWithPayment: FormControl = new FormControl('');
  constructor(private fb: FormBuilder) {
    // initialize form with blank controls
    this.initMortgagePrepayment() }

  ngOnInit() {
  }

  initMortgagePrepayment() {
    this.fgMortgagePrepayment = this.fb.group({
      PrepaymentAmount: this.fcPrepaymentAmount,
      PrepaymentFrequency: this.fcPrepaymentFrequency,
      StartWithPayment: this.fcStartWithPayment
    });
  }

}
