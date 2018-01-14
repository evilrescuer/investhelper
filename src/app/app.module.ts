import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// import { Ng2HighchartsModule } from 'ng2-highcharts';

//路由
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

//httpClient
//防止刷新报404错误
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppService } from './app.service';

import { AppComponent } from './app.component';
import { RealtimeStockListComponent } from './realtime-stock-list/realtime-stock-list.component';
import { AttentionStockListComponent } from './attention-stock-list/attention-stock-list.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { RealtimeStockDetailComponent } from './realtime-stock-detail/realtime-stock-detail.component';
import { MyStockListComponent } from './my-stock-list/my-stock-list.component';
import { TradeHistoryComponent } from './trade-history/trade-history.component';
import { AppNoContentComponent } from './app-no-content/app-no-content.component';

declare var require: any;

@NgModule({
  declarations: [
    AppComponent,
    RealtimeStockListComponent,
    AttentionStockListComponent,
    MyAccountComponent,
    RealtimeStockDetailComponent,
    MyStockListComponent,
    TradeHistoryComponent,
    AppNoContentComponent
  ],
  imports: [
    NgbModule.forRoot(),  //bootstrap

    AppRoutingModule,

    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    JsonpModule,

  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AppService
  ],
  bootstrap: [AppComponent]

})

export class AppModule { }
