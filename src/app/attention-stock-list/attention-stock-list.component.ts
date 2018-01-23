import { Component, OnInit, AfterViewInit } from '@angular/core';

import { AppService } from '../app.service';

declare var APP: any;

@Component({
  selector: 'attention-stock-list',
  templateUrl: './attention-stock-list.component.html',
  styleUrls: ['./attention-stock-list.component.less']
})
export class AttentionStockListComponent implements OnInit {

  stockList: any = []; //股票列表

  constructor(private http: AppService) { }

  ngAfterViewInit() {
    this.searchAttentionStockList();
  }

  ngOnInit() {
  }

  searchAttentionStockList() {
    let idStr = window.localStorage.getItem("attentionIdStr");
    let idArr = [];
    if (!idStr) return;

    idArr = idStr.split(",");

    this.http.touchstone_realtime('').then((res) => {
      if (!res) return;
      //处理
      let data = res.result;
      let attenArr = [];

      for (let i=0; i<idArr.length; i++) {
        let temp = idArr[i];
        for (let j=0; j<data.length; j++) {
          if (data[j]['_id'] == temp) {
            attenArr.push(data[j]);
          }
        }

      }
      console.log(attenArr);
      this.stockList = attenArr;

    });

  }

  /**
   * 取消观察
   */
  removeAttention(event, _id, idx) {
    event.stopPropagation();  //阻止冒泡
    event.preventDefault();   //取消默认行为

    // this.stockList.splice(idx, 1);
    // APP.RemoveFromLocalStorage('attentionIdStr', _id);

    this.stockList.splice(idx, 1);
    this.http.removeAttentionById(_id);

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
