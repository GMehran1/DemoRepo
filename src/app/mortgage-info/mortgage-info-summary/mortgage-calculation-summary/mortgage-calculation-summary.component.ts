import { Component, OnInit, Input } from '@angular/core';
import { MortgageCalculatorService } from 'src/app/core/mortgage-calculator.service';
import { IMortgageCalculationSummary } from 'src/app/models/mortgage-calculation-summary.model';

@Component({
  selector: 'app-mortgage-calculation-summary',
  templateUrl: './mortgage-calculation-summary.component.html',
  styleUrls: ['./mortgage-calculation-summary.component.css']
})
export class MortgageCalculationSummaryComponent implements OnInit {
// receive mortgagtermsummary and mortgageamrtsummary objects
  @Input() mortgageTermSummary: IMortgageCalculationSummary;
  @Input() mortgageAmrtSummary: IMortgageCalculationSummary;
  constructor() {
  }

  ngOnInit() {
  }

}
