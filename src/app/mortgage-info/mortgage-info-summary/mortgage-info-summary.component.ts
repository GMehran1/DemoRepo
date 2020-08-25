import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MortgageCalculatorService } from 'src/app/core/mortgage-calculator.service';
import { IMortgageCalculationSummary } from 'src/app/models/mortgage-calculation-summary.model';

@Component({
  selector: 'app-mortgage-info-summary',
  templateUrl: './mortgage-info-summary.component.html',
  styleUrls: ['./mortgage-info-summary.component.css']
})
export class MortgageInfoSummaryComponent implements OnInit {

  mortgageAmrtSummary: IMortgageCalculationSummary;
  mortgageTermSummary: IMortgageCalculationSummary;

  constructor(private mortgageCalService: MortgageCalculatorService) {
  }

  ngOnInit() {
    this.mortgageCalService.mortgageAmrtObs.subscribe(objAmrtSummary => this.mortgageAmrtSummary = objAmrtSummary);
    this.mortgageCalService.mortgageTermObs.subscribe(objTermSummary => {
      this.mortgageTermSummary = objTermSummary;
      console.log('changed term');
    });
  }
}
