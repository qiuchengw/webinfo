import { Component, OnInit } from '@angular/core';
import { NzTabChangeEvent } from 'ng-zorro-antd';


interface WebTab{
  url: string;
  title?: string;
  id: number;
}

@Component({
  selector: 'webtab',
  templateUrl: './tab-panel.component.html',
  styleUrls: ['./tab-panel.component.scss']
})
export class TabPanelComponent implements OnInit {
  private _index = 0;
  private _id = 1;
  private _tabs: WebTab[] = [];

  get currentWeb(){
    if (this._tabs.length == 0 || this._index < 0 
      || this._index >= this._tabs.length){
      return null; 
    }
    return this.web(this._tabs[this._index].id);
  }

  closeTab(id: number): void {
    for (let i = 0; i < this._tabs.length; ++i) {
      if (this._tabs[i].id == id) {
        this._tabs.splice(i, 1);
        break;
      }
    }
  }
 
  ngOnInit() {
    this.newTab("http://www.baidu.com");
  }

  newTab(url?: string): void {
    console.log("----> create tab:", url);
    
    this._tabs.push({
      url: url,
      title: url,
      id: this._id++,
    });
    this._index = this._tabs.length - 1;
  }

  web(id: number): any{
    return document.querySelector(`#web-${id}`);
  }

  navTo(url: string) {
    if (this._tabs.length === 0 || this._index < 0 || this._index > this._tabs.length) {
      return;
    }
  }

  onTabChanged(event: NzTabChangeEvent){
    console.log("--> the current web:", this.currentWeb);
  }
}
