import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MdCardModule } from '@angular/material';
import { ChartModule } from 'angular2-highcharts';
import {MdButtonModule, MdCheckboxModule, MdInputModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { IsotopeModule } from 'angular2-isotope';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { PoleComponent } from './pole/pole.component';
import { ChartComponent } from './chart/chart.component';
import { BookroomComponent } from './bookroom/bookroom.component';
import { ObjNgFor } from './pipes/objngfor.pipe';
import { ItemsComponent } from './items/items.component';
import { FetchItemsHelper } from './helpers/fetchitems.helper';

@NgModule({
  declarations: [
    AppComponent,
    PoleComponent,
    ChartComponent,
    BookroomComponent,
    ObjNgFor,
    ItemsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    IsotopeModule,
    NoopAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forRoot([
      {
        path: 'poles',
        component: PoleComponent
      },
      {
        path: 'chart',
        component: ChartComponent
      },
      {
        path: 'bookroom',
        component: BookroomComponent
      },
      {
        path: 'list',
        component: ItemsComponent
      },
      {
        path: '',
        component: ChartComponent
      }
    ]),
    MdCardModule,
    ChartModule.forRoot(require('highcharts'))
  ],
  providers: [FetchItemsHelper],
  bootstrap: [AppComponent]
})
export class AppModule { }
