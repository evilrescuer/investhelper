import { Injectable } from '@angular/core';
import {Http, Jsonp, URLSearchParams, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

declare var APP: any;


import { RealtimeStockList } from './classes/RealtimeStockList';
import { RealtimeStockDetail } from './classes/RealtimeStockDetail';

@Injectable()
export class AppService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(public jsonp: Jsonp, public http: Http) { }


  /**
   * 公共接口返回值检查
   * @param response
   * @returns {boolean}
   */
  checkResponse(response: any): boolean {
    let json = response.json();
    return "error_code" in json && json["error_code"] == "0"; //0表示成功
  }


  /** ******************** 股票 ******************** **/

  /**
   * 获取实时股票列表
   * @param id 股票关键字
   * @returns {Promise<R>|Promise<U>}
   */
  touchstone_realtime(id: any): Promise<void | RealtimeStockList> {

    //真实接口(可用，但需要提交域名)
    // var url = APP.config.interfacePrefix + 'touchstone.api.juhe.cn/ajax/data/realtime?' + "pageIndex=&id="
    //   +id+ "&key=70a2047834b21a27786ee24a6016eaf6";

    //虚拟接口: 某次调用真实接口得到的静态数据
    var url = "./assets/json/touchstone_realtime.json";

    return this.http.get(url).toPromise()
      .then(
        (response) => {
          if (this.checkResponse(response)) {
            return response.json().result as RealtimeStockList;

          }
        }
      )
      .catch(() => console.log('信息请求失败'));
  }

  /**
   * 获取实时股票列表
   * @param id 股票的_id
   * @returns {Promise<R>|Promise<U>}
   */
  touchstone_realtimeById(_id: any): Promise<void | RealtimeStockList> {

    var url = "./assets/json/touchstone_realtime.json";

    return this.http.get(url).toPromise()
      .then(
        (response) => {
          if (this.checkResponse(response)) {
            // console.log(response.json());
            // return response.json().result as RealtimeStockList;


            //模拟：过滤关键字
            let dest = [];
            let data = response.json().result;
            let arr = data.result;
            for (let i=0; i<arr.length; i++) {
              if (arr[i]['_id'] == _id) {
                dest = arr[i];
              }
            }
            response.json().result.result = dest;

            return response.json().result as RealtimeStockList;

          }
        }
      )
      .catch(() => console.log('信息请求失败'));
  }


  /**
   * 查询某支股票信息
   * @param originCode
   * @returns {Promise<R>|Promise<U>}
   */
  finance_realtime_hs(id: any): Promise<void | RealtimeStockDetail> {

    //真实接口(需要提交域名)

    // var url = APP.config.interfacePrefix
    //   + 'http://web.juhe.cn:8080/finance/stock/hs?'
    //   + "type=0&key=73ab1a90ce5e19a1859cca74fde7bc18?gid="
    //   + id;

    //虚拟接口: 调用真实得到的静态数据
    var url = "./assets/json/finance_realtime_hs.json";

    return this.http.get(url).toPromise()
      .then(
        (response) => {
          if (this.checkResponse(response)) {
            return response.json().result as RealtimeStockDetail;
          }
        }
      )
      .catch(() => console.log('信息请求失败'));
  }

  // /**
  //  * 查询个人持有股票信息
  //  * @param originCode
  //  * @returns {Promise<R>|Promise<U>}
  //  */
  // get_my_stocklist(id: any): Promise<void | RealtimeStockDetail> {
  //
  //   //读取本地缓存
  //   var url = "./assets/json/finance_realtime_hs.json";
  //
  //   return this.http.get(url).toPromise()
  //     .then(
  //       (response) => {
  //         if (this.checkResponse(response)) {
  //           return response.json().result as RealtimeStockDetail;
  //         }
  //       }
  //     )
  //     .catch(() => console.log('信息请求失败'));
  // }


  /**
   * 查询我的股票
   */
  searchStockList(): Promise<any> {

    //读取本地缓存

    let mystockList = APP.getLocalStorageToJSON('myStockList'); //json

    let promiseArr = [];

    if (!mystockList) return new Promise(()=>{});

    mystockList.map((myStock) => {
      promiseArr.push(
        this.finance_realtime_hs(myStock.id).then((stockDetail) => {
          myStock = Object.assign({}, myStock, stockDetail);
        })
      );

    });

    return Promise.all(promiseArr).then(() => {
      return mystockList;
    });
  }

  /**
   * 修改账户余额（扣款1，还款2）
   * return {error_code: 0: 成功， 1：余额不足，10：未知错误}
   */
  updateAccount(amount, operaType) {
    let res = {"error_code": 0, "msg": "成功"};

    let myAccount = APP.getLocalStorageToJSON('myAccount'); //json

    if (!myAccount) {
      myAccount = { balance: 25000.00, unit: "$" };
    }

    if (operaType == '1') { //扣款
      if (myAccount.balance < amount) {
        res = {"error_code": 1, "msg": "余额不足"};
      }
      else {
        myAccount.balance -= amount;
      }
    }
    else {
      myAccount.balance += amount;
    }


    APP.setLocalStorageInJSON('myAccount', myAccount);

    return res;
  }

  /**
   * 查询账户余额
   */
  queryAccount() {
    return APP.getLocalStorageToJSON('myAccount'); //json
  }

  /**
   * 查询我持有的某支股票信息
   */
  queryMyHoldById(id) {
    let res = null;
    let myStockList = APP.getLocalStorageToJSON("myStockList");
    if (!myStockList) return res;
    myStockList.map((item) => {
      if (item.id == id) {
        res = item;
      }
    });
    return res;

  }

  /**
   * 查询个人对某只股票的观察状态
   */
  queryAttentionFlagById(id) {
    return APP.findInLocalStorage("attentionIdStr", id);
  }

  /**
   * 增加观察 某只股票
   */
  addAttentionById(id) {
    APP.AddInLocalStorage('attentionIdStr', id);
  }

  /**
   * 删除观察 某只股票
   */
  removeAttentionById(id) {
    APP.RemoveFromLocalStorage('attentionIdStr', id);
  }


  /**
   * 存储我的股票
   */
  saveMyStockList(id, shortName, dateStr, timeStr, amount, operaType) {
    let myStockList = APP.getLocalStorageToJSON('myStockList'); //json
    let findFlag = false;
    if (myStockList && myStockList.length > 0) {  //买过股票
      myStockList.map((stock) => {
        if (stock["id"] == id) { //购买已持有的股票
          findFlag = true;
          operaType == '1' ?  (stock.amount += amount ) : (stock.amount -= amount );
        }
      });
      if (!findFlag) myStockList.push({"id": id, "shortName": shortName, "amount": amount, date: dateStr, time: timeStr, operaType: operaType}); //购买新股
    }
    else {  //第一次购买
      myStockList = [{"id": id, "shortName": shortName, "amount": amount, date: dateStr, time: timeStr, operaType: operaType}];
    }


    APP.setLocalStorageInJSON('myStockList', myStockList);
  }

  /**
   * 存储交易历史
   */
  saveTradeHistory(id, shortName, datestr, timeStr, price, amount, balance, operaType) {

    let tradeHistory = APP.getLocalStorageToJSON('tradeHistory'); //json

    let tradeItem = {
      "stockId": id,
      "shortName": shortName,
      "date": datestr,
      "time": timeStr,
      "amount": amount,
      "unitPrice": price,
      "unit": "$",
      "totalPrice": price * amount,
      balance: balance,
      "operaType": operaType
    };

    if (!tradeHistory) tradeHistory = [];

    tradeHistory.push(tradeItem);

    APP.setLocalStorageInJSON('tradeHistory', tradeHistory);
  }

  /**
   * 查询交易历史
   */
  queryTradeHistory() {
    return APP.getLocalStorageToJSON('tradeHistory') || [];
  }




}
