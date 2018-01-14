import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-no-content',
  templateUrl: './app-no-content.component.html',
  styleUrls: ['./app-no-content.component.less']
})
export class AppNoContentComponent implements OnInit {

  @Input() imageURL: any; //图片路径

  constructor() { }

  ngOnInit() {
  }

}
