import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RealtimeStockListComponent } from './realtime-stock-list/realtime-stock-list.component';
import { AttentionStockListComponent } from './attention-stock-list/attention-stock-list.component';
import { MyAccountComponent } from './my-account/my-account.component';

import { RealtimeStockDetailComponent } from './realtime-stock-detail/realtime-stock-detail.component';
import { MyStockListComponent } from './my-stock-list/my-stock-list.component';
import { TradeHistoryComponent } from './trade-history/trade-history.component';




const appRoutes: Routes = [
  { path: '', redirectTo: 'realtime', pathMatch: 'full' },
  { path: 'realtime',
    children: [
      { path: '', component: RealtimeStockListComponent },
      { path: 'detail/:id', component: RealtimeStockDetailComponent }
    ]
  },
  { path: 'attention', component: AttentionStockListComponent },
  { path: 'account',
    children: [
      { path: '', component: MyAccountComponent },
      { path: 'my-stock-list', component: MyStockListComponent },
      { path: 'trade-history', component: TradeHistoryComponent },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  declarations: []
})
export class AppRoutingModule { }
