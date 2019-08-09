import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plugin-container',
  templateUrl: './plugin-container.component.html',
  styleUrls: ['./plugin-container.component.scss']
})
export class PluginContainerComponent implements OnInit {
  private _web: Element = null;
  constructor() { }

  ngOnInit() {
  }

  setWebview(v :Element){
    this._web = v;

    console.log("---> the webview:", this._web);
  }

}
