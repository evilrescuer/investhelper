import { Component, OnInit, AfterViewInit } from '@angular/core';

import { AppService } from '../app.service';

declare var APP: any;

@Component({
  selector: 'my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.less']
})
export class MyAccountComponent implements OnInit {

  /** 显示数据 **/
  myAccount: any = {"balance": 25000.00, "unit": "$"}; //账户余额

  constructor(private http: AppService) { }

  ngAfterViewInit() {

  }

  ngOnInit() {
    let myAccount = this.http.queryAccount();
    if (myAccount && 'balance' in myAccount) {
      myAccount.balance = myAccount.balance.toFixed(2);
      this.myAccount = myAccount;
    }
  }

}
