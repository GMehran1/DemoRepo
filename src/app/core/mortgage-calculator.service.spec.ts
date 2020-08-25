import { TestBed } from '@angular/core/testing';
import { MortgageCalculatorService } from './mortgage-calculator.service';
import { MortgageRepoService } from './mortgage-repo.service';
import { IMortgageCalculationSummary } from '../models/mortgage-calculation-summary.model';


describe('TestserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MortgageCalculatorService = TestBed.get(MortgageCalculatorService);
    expect(service).toBeTruthy();
  });
  it('calculate mortgage monthly payment', () => {
    const service: MortgageCalculatorService = TestBed.get(MortgageCalculatorService);
    const reposervice: MortgageRepoService = TestBed.get(MortgageRepoService);
    const mortgageinfo = reposervice.getMockedMortgageInformation();
    let mortgageTermSummary: IMortgageCalculationSummary = null;
    service.mortgageTermObs.subscribe(objTerm => mortgageTermSummary = objTerm);
    service.calculateMortgage(mortgageinfo);
    expect(mortgageTermSummary.monthlyPayment).toEqual(581.60);
  });
  it('calculate interest and principal amounts monthly payment', () => {
    const service: MortgageCalculatorService = TestBed.get(MortgageCalculatorService);
    const reposervice: MortgageRepoService = TestBed.get(MortgageRepoService);
    const mortgageinfo = reposervice.getMockedMortgageInformation();
    let mortgageTermSummary: IMortgageCalculationSummary = null;
    service.mortgageTermObs.subscribe(objTerm => mortgageTermSummary = objTerm);
    service.calculateMortgage(mortgageinfo);
    expect(mortgageTermSummary.interestPayments).toEqual(23679.53);
    expect(mortgageTermSummary.principalPayments).toEqual(11216.47);
  });
});
