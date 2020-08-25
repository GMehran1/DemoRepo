import { Component, OnInit, Input } from '@angular/core';
import { IMortgageCalculationSummary } from 'src/app/models/mortgage-calculation-summary.model';

@Component({
  selector: 'app-mortgage-summary',
  templateUrl: './mortgage-summary.component.html',
  styleUrls: ['./mortgage-summary.component.css']
})

export class MortgageSummaryComponent implements OnInit {
  // receive mortgagetermsummary and mortgageamrtsumary objects
  @Input() mortgageTermSummary: IMortgageCalculationSummary;
  @Input() mortgageAmrtSummary: IMortgageCalculationSummary;

  constructor() { }

  ngOnInit() {
  }

}
