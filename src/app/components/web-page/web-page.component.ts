import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { WebviewDirective } from '../../shared/directives';
import { IPlugin } from '../../plugins/plugin-interface';

@Component({
  selector: 'app-web-page',
  templateUrl: './web-page.component.html',
  styleUrls: ['./web-page.component.scss']
})
export class WebPageComponent implements OnInit {
  @Input('url') url: string;
  @ViewChild(WebviewDirective, {static: true}) _web!: WebviewDirective;

  constructor() {
  }

  ngOnInit() {
    console.log('---> the web:', this._web);

    // this._web.nativeElement.addEventListener('load-commit', (t)=>{
    //   console.log("--->", t);
    // });
    // this._web.addEventListener();
  }

  onActive(plugin: IPlugin){
    plugin.active();
  }

  onDeactive(plugin: IPlugin){
    plugin.deactive();
  }
}
