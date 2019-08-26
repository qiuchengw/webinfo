import { Directive, ElementRef } from '@angular/core';
import { WebviewTag } from 'electron';

@Directive({
  selector: 'webview'
})
export class WebviewDirective {

  constructor(private _web: ElementRef<WebviewTag>) {
    console.log("---? theeee", _web);
    this._web.nativeElement.addEventListener('load-commit', (t)=>{
      console.log("--->", t);
    });
  }

}
