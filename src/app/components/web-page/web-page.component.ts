import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { WebviewDirective } from '../../directives/webview.directive';
import { WebviewTag } from 'electron';

@Component({
  selector: 'app-web-page',
  templateUrl: './web-page.component.html',
  styleUrls: ['./web-page.component.scss']
})
export class WebPageComponent implements OnInit {
  @Input("url") url:string;
  @ViewChild(WebviewDirective, {static: true}) _web!: WebviewDirective;
  
  constructor() { }

  ngOnInit() {
    console.log("---> the web:", this._web);

    // this._web.nativeElement.addEventListener('load-commit', (t)=>{
    //   console.log("--->", t);
    // });
    // this._web.addEventListener();
  }

}
