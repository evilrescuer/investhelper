import { Component, OnInit, AfterViewInit } from '@angular/core';

import { AppService } from '../app.service';

declare var require: any;
declare var $: any;



@Component({
  selector: 'trade-history',
  templateUrl: './trade-history.component.html',
  styleUrls: ['./trade-history.component.less'],
})
export class TradeHistoryComponent implements OnInit {

  /** 数据 **/
  tradeList: any;
  textFlag: any = true;  //是否为文字模式，(false: 图表模式)

  constructor(private http: AppService) { }

  //ngAfterContentChecked
  ngAfterViewChecked() {

  }

  ngOnInit() {
    $('.app-chart').width($(window).width() - 40); 
    this.tradeList = this.http.queryTradeHistory();

    this.initChartData1();
    this.initChartData2();
    this.initChartData3();

  }

  initChartData1 () {
    let tradeHisList = this.http.queryTradeHistory();

    if (!tradeHisList || tradeHisList.length == 0) return;
    let categories = [];
    let dataBuy = [];
    let dataSell = [];
    tradeHisList.map((item) => {
      categories.push(item.date + " " + item.time);
      item.operaType == 1 ? dataBuy.push(item.amount) : dataSell.push(item.amount);
    });

    let chartData: any = {
      chart: {
        type: 'scatter'
      },
      title: '股票交易数目趋势图',
      xAxis: {
        categories: categories
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
      series: [
        {
          name: '购买股票数',
          data: dataBuy
        },
        {
          name: '卖出股票数',
          data: dataSell
        },
      ]
    };



    const Highcharts = require('highcharts');

    setTimeout(() => {
      Highcharts.chart('chart1', chartData);
    }, 200)

  }

  initChartData2 () {
    let tradeHisList = this.http.queryTradeHistory();

    if (!tradeHisList || tradeHisList.length == 0) return;
    let categories = [];
    let moneyIn = [];
    let moneyOut = [];
    tradeHisList.map((item) => {
      categories.push(item.date + " " + item.time);
      item.operaType == 1 ? moneyOut.push(item.totalPrice) : moneyIn.push(item.totalPrice);
    });

    let chartData: any = {
      chart: {
        type: 'line'
      },
      title: '股票交易数目趋势图',
      xAxis: {
        categories: categories
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
      series: [
        {
          name: '扣款',
          data: moneyOut
        },
        {
          name: '退款',
          data: moneyIn
        }
      ]
    };



    const Highcharts = require('highcharts');

    setTimeout(() => {
      Highcharts.chart('chart2', chartData);
    }, 200)

  }

  initChartData3 () {
    let tradeHisList = this.http.queryTradeHistory();

    if (!tradeHisList || tradeHisList.length == 0) return;
    let categories = [];
    let balance = [];
    tradeHisList.map((item) => {
      categories.push(item.date + " " + item.time);
      balance.push(item.balance);
    });

    let chartData: any = {
      chart: {
        type: 'column'
      },
      title: '余额',
      xAxis: {
        categories: categories
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
      series: [
        {
          name: '余额',
          data: balance
        }
      ]
    };



    const Highcharts = require('highcharts');

    setTimeout(() => {
      Highcharts.chart('chart3', chartData);
    }, 200)

  }

}
