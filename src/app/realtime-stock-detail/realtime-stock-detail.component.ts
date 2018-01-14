import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { AppService } from '../app.service';

import { RealtimeStockDetail } from '../classes/RealtimeStockDetail';

declare var APP: any;
declare var $: any;

@Component({
  selector: 'realtime-stock-detail',
  templateUrl: './realtime-stock-detail.component.html',
  styleUrls: ['./realtime-stock-detail.component.less']
})
export class RealtimeStockDetailComponent implements OnInit {

  @ViewChild('price')
  priceInput: ElementRef;
  @ViewChild('amount')
  amountInput: ElementRef;
  @ViewChild('holdAmount')
  holdAmountInput: ElementRef;
  @ViewChild('buyBtn')
  buyBtn: ElementRef;

  /** 数据 **/
  stockId: any; //股票id
  stockDetail: any; //股票详情
  buyFlag: any = true; //买入标志，true为买入，false为卖出
  myHoldAmount: any = 0; //我持有的数量
  attentionFlag: any = false; //观察标志

  constructor(private route: ActivatedRoute, private router: Router, private http: AppService, private changeRef: ChangeDetectorRef) {
    this.stockId = this.route.snapshot.params["id"];
  }

  ngAfterViewInit() {
    this.searchMyHoldAmount(); //查找我持有的数目
    this.searchRealtimeStockDetail();
    this.searchAttentionFlag(); //查找观察标志
  }

  ngOnInit() {
  }

  searchMyHoldAmount() {
    let stockHis = this.http.queryMyHoldById(this.stockId);
    this.myHoldAmount = stockHis ? stockHis.amount : 0;
  }

  searchRealtimeStockDetail() {
    this.http.finance_realtime_hs(this.stockId).then((data) => {
      if (!data) return;

      //加入列表数据
      let stock = APP.getLocalStorageToJSON("stockDetail");

      let stockDetail = Object.assign({}, data, stock);

      console.log(this.stockId);
      if (this.stockId) {

      }

      //模拟辩变化，浮动价格
      let randomPrice = stockDetail.nowpri * (2 * Math.random());
      stockDetail.nowpri = randomPrice.toFixed(2);
      this.stockDetail = stockDetail;

    });
  }

  /**
   * 查询观察标志
   */
  searchAttentionFlag() {
    this.attentionFlag = this.http.queryAttentionFlagById(this.stockId);
  }

  /**
   * 加入观察
   */
  addAttention() {
    this.http.addAttentionById(this.stockId);
    this.searchAttentionFlag();
  }

  /**
   * 删除观察
   */
  removeAttention() {
    this.http.removeAttentionById(this.stockId);
    this.searchAttentionFlag();
  }

  /**
   * 购买/卖出 股票
   */
  buyOrSellStock(id) {
    let price = this.priceInput ? Number(this.priceInput.nativeElement.value) : 0;
    let amount = this.amountInput ? Number(this.amountInput.nativeElement.value) : 0;
    let holdAmount = this.holdAmountInput ? Number(this.holdAmountInput.nativeElement.value) : 0;

    if (!amount || Number(amount) <=0) {
      this.amountInput.nativeElement.style.border = "1px red solid";
      return;
    }

    if (!this.buyFlag && (Number(amount) > Number(holdAmount))) {  //卖出情况
      this.amountInput.nativeElement.style.border = "1px red solid";
      return;
    }

    let date = new Date();
    let dateStr = date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate();
    let timeStr = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let operaType = this.buyFlag ? "1" : "2";

    //1.账户扣/还款
    let res = this.http.updateAccount(price * amount, operaType);

    if (res.error_code == 0) {  //成功算账
      //2.存储我的股票
      this.http.saveMyStockList(id, this.stockDetail.shortName, dateStr, timeStr, amount, operaType);  //1：购买股票，  2：卖出股票
      //3.存储交易记录
      let myAccount = this.http.queryAccount();
      let banalce = myAccount ? myAccount.balance : "25000.00";
      this.http.saveTradeHistory(id, this.stockDetail.shortName, dateStr, timeStr, price, amount, banalce, operaType);

      alert('操作成功');

      //清空输入框
      if (this.amountInput && this.amountInput.nativeElement) this.amountInput.nativeElement.value = '';

      //重新请求数据
      this.searchMyHoldAmount(); //查找我持有的数目
      this.searchRealtimeStockDetail(); //查询股票详情

      //如果发现已经不持有，模拟点击，切换到“买入”选项卡
      if (this.myHoldAmount <= 0) {
        if(this.buyBtn) this.buyBtn.nativeElement.click();
      }
    }
    else {
      alert(res.msg);
    }


  }



}
