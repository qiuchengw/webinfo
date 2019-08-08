import { Component, OnInit, ViewChild } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd';
import { TabPanelComponent } from '../tab-panel/tab-panel.component';
// const  { * as TabGroup } from 'electron-tabs';
const TabGroup = require('electron-tabs');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('webs',{static: true})
  private _webs: TabPanelComponent;
  private _url: string;
  constructor() { }

  ngOnInit() {
    // const tabGroup = new TabGroup();
    // let tab = tabGroup.addTab({
    //     title: "Electron",
    //     src: "http://electron.atom.io",
    //     visible: true
    // });
  }

  isURL(str_url:string) {
    let strRegex = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
    let re = new RegExp(strRegex); 
    return re.test(str_url);
  }

  onKeyEnter(url: string){
    this._url = url;
    this.onSearch(url);
  }

  onSearch(url: string) {
    console.log("---> the val:", url);
    if (!this.isURL(url)){
      // alert("Not a correct URL!");
      return;
    }
    // 创建一个webview
    this._webs.newTab(url);
  }
}
