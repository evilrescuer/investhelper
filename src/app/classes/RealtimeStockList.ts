
export class RealtimeStockList {
  "result" : RealtimeStock[] ;
  "currentPage" : number ;
  "totalPages" : number ;
  "pageSize" : number ;
  "totalRows" : number ;
  "start" : number;
}

class RealtimeStock {
  "_id" : string;
  "shortName" : string;
  "zd" : number;
  "zdf" : number ;
  "ZRSP" : number ;
  "ZJCJ" : number ;
  "CJJE" : number ;
  "CJSL" : number ;
  "ZGCJ" : number ;
  "ZDCJ" : number ;
  "type" : number ;
  "updateDate" : string ; //"2018-01-13"
  "updateTime" : string ; //"00:00:04"
  "province" : string ; //"北京市"
  "address" : string ;  //"北京市西城区宣武门外大街6、8、10、12、16、18号10号楼1937-1943A"
  "registCapi" : number ; //5625.0
  "companyName" : string ;  //"世纪保险经纪股份有限公司"
  "operName" : string ; //"钟金海"
  "upDate" : string ; //"2017-02-03"
  "totalStock" : number ; //56250000
  "categoryStr" : string; //保险业

}
