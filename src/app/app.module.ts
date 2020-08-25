import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MortgageInfoComponent } from './mortgage-info/mortgage-info.component';
import { MortgageInfoDetailsComponent } from './mortgage-info/mortgage-info-details/mortgage-info-details.component';
import { MortgageInfoPrepaymentComponent } from './mortgage-info/mortgage-info-prepayment/mortgage-info-prepayment.component';
import { MortgageInfoSummaryComponent } from './mortgage-info/mortgage-info-summary/mortgage-info-summary.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MortgageCalculationSummaryComponent } from './mortgage-info/mortgage-info-summary/mortgage-calculation-summary/mortgage-calculation-summary.component';
import { MortgageSummaryComponent } from './mortgage-info/mortgage-info-summary/mortgage-summary/mortgage-summary.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    MortgageInfoComponent,
    MortgageInfoDetailsComponent,
    MortgageInfoPrepaymentComponent,
    MortgageInfoSummaryComponent,
    MortgageCalculationSummaryComponent,
    MortgageSummaryComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
