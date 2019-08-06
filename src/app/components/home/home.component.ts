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
    let strRegex = "^((https|http|ftp|rtsp|mms)?://)"
      + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@ 
      + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184 
      + "|" // 允许IP和DOMAIN（域名）
      + "([0-9a-z_!~*'()-]+\.)*" // 域名- www. 
      + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名 
      + "[a-z]{2,6})" // first level domain- .com or .museum 
      + "(:[0-9]{1,4})?" // 端口- :80 
      + "((/?)|" // a slash isn't required if there is no file name 
      + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"; 
    
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
