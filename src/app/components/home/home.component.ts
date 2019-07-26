import { Component, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd';
// const  { * as TabGroup } from 'electron-tabs';
const TabGroup = require('electron-tabs');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // const tabGroup = new TabGroup();
    // let tab = tabGroup.addTab({
    //     title: "Electron",
    //     src: "http://electron.atom.io",
    //     visible: true
    // });
  }

}
