import { Component, AfterViewInit } from '@angular/core';
declare var initStyle: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  title = '投资帮手';

  selectedIndex: any = 0; //当前选中项索引

  navBarData: any = [  //navbar数据
    {
      text: '股票',
      routerLink: 'realtime',
      iconURLNormal: 'assets/images/navbar/nav1.png',
      iconURLHighLight: 'assets/images/navbar/nav1_hl.png'
    },
    {
      text: '观察',
      routerLink: 'attention',
      iconURLNormal: 'assets/images/navbar/nav2.png',
      iconURLHighLight: 'assets/images/navbar/nav2_hl.png'
    },
    {
      text: '我的',
      routerLink: 'account',
      iconURLNormal: 'assets/images/navbar/nav3.png',
      iconURLHighLight: 'assets/images/navbar/nav3_hl.png'
    }
  ];

  ngAfterViewInit() {
    initStyle();
  }
}
