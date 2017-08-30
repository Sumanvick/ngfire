import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MdCardModule } from '@angular/material';
import { ChartModule } from 'angular2-highcharts';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { SimpleChartExample } from './chart/simple-chart.component'

@NgModule({
  declarations: [
    AppComponent,
    SimpleChartExample
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    MdCardModule,
    ChartModule.forRoot(require('highcharts'))
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
