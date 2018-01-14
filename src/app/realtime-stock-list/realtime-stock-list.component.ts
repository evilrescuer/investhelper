import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';

import { AppService } from '../app.service';

declare var $: any;
declare var APP: any;


@Component({
  selector: 'realtime-stock-list',
  templateUrl: './realtime-stock-list.component.html',
  styleUrls: ['./realtime-stock-list.component.less']
})
export class RealtimeStockListComponent implements OnInit {

  @ViewChild('textInput')
  textInput: ElementRef;  //输入框元素

  stockList: any; //股票列表

  constructor(private http: AppService) { }

  ngAfterViewInit() {
    this.searchRealtimeStockList();
  }

  ngOnInit() {
  }

  searchRealtimeStockList() {
    let text = this.textInput.nativeElement.value;
    this.http.touchstone_realtime(text).then((data) => {
      if (!data) return;

      //关键字过滤
      let srcData = data.result;
      let destData = [];
      for (let i=0; i<srcData.length; i++) {
        let temp = srcData[i];
        if ((temp["shortName"].indexOf(text) != -1) || (temp["_id"].indexOf(text) != -1)) {  // || (temp["companyName"].indexOf(text) != -1)

          //模拟造价-当前价格
          let currPrice = 5 + (Math.random() * 100);
          temp["currPrice"] = currPrice.toFixed(2);

          //模拟造价-涨跌幅
          let zdf = Math.random() * 10;
          let ran = Math.random();
          if (ran > 0.5) {
            zdf = zdf * -1;
          }
          zdf = Number(zdf.toFixed(2));
          temp["zdf"] = zdf;

          destData.push(temp);
        }
      }

      this.stockList = destData;

    });
  }

  goToStockDetail(stock) {
    APP.setLocalStorageInJSON("stockDetail", stock);
  }

}
