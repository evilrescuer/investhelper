import { Component, OnInit, AfterViewInit } from '@angular/core';

import { AppService } from '../app.service';

declare var APP: any;

@Component({
  selector: 'my-stock-list',
  templateUrl: './my-stock-list.component.html',
  styleUrls: ['./my-stock-list.component.less']
})
export class MyStockListComponent implements OnInit {

  stockList: any;

  constructor(private http: AppService) { }

  ngAfterViewInit() {
    this.queryMyStockList();
  }


  ngOnInit() {
  }

  queryMyStockList() {
    this.http.searchStockList().then((list) => {
      this.stockList = list;
    });
  }

  saveStockDetail(stock) {

    //模拟造价-当前价格
    let currPrice = 5 + (Math.random() * 100);
    stock["currPrice"] = currPrice.toFixed(2);

    //模拟造价-涨跌幅
    let zdf = Math.random() * 10;
    let ran = Math.random();
    if (ran > 0.5) {
      zdf = zdf * -1;
    }
    zdf = Number(zdf.toFixed(2));
    stock["zdf"] = zdf;
    APP.setLocalStorageInJSON('stockDetail', stock);
  }

}
