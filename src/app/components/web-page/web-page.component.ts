import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { WebviewDirective } from '../../shared/directives';
import { IPlugin } from '../../plugins/plugin-interface';
import {  } from 'electron';

@Component({
  selector: 'app-web-page',
  templateUrl: './web-page.component.html',
  styleUrls: ['./web-page.component.scss']
})
export class WebPageComponent implements OnInit {
  @Input() url = 'about:blank';
  @Output() showHome: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild(WebviewDirective, {static: true}) _web!: WebviewDirective;

  constructor() {
  }

  ngOnInit() {
  }

  onSearch(url: string) {
    this._web.navigateTo(url);
  }

  onActivePlugin(plugin: IPlugin) {
    plugin.active();
  }

  onDeactivePlugin(plugin: IPlugin) {
    plugin.deactive();
  }

  goBack() {
    console.log('---> back');

    const web = this._web.nativeWeb;
    if (web.canGoBack()) {
      web.goBack();
    }
  }

  goForward() {
    const web = this._web.nativeWeb;
    if (web.canGoForward()) {
      web.goForward();
    }
  }

  goHome() {
    this.showHome.emit('about:blank');
  }

  reload() {
    this._web.nativeWeb.reload();
  }

  savePage() {
    console.log('--->> save page');
    const web = this._web;
    const cont = web.nativeWeb.getWebContents();
    cont.savePage('/Users/fz/test/x.html', 'HTMLComplete');
    // cont.savePage('/Users/fz/test/y.html', 'MHTML');
  }
}
