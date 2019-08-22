import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartsService } from './services/charts.service';
import { CountriesChartComponent } from './countries-chart/countries-chart.component';
import { VietnamChartComponent } from './vietnam-chart/vietnam-chart.component';
import { NorthkoreaChartComponent } from './northkorea-chart/northkorea-chart.component';
import { ChinaChartComponent } from './china-chart/china-chart.component';

@NgModule({
   declarations: [
      AppComponent,
      CountriesChartComponent,
      ChinaChartComponent,
      NorthkoreaChartComponent,
      VietnamChartComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule
   ],
   providers: [
      ChartsService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
