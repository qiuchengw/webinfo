import { Directive, ElementRef } from '@angular/core';
import { WebviewTag, shell, ipcRenderer } from 'electron';

@Directive({
  selector: 'webview'
})
export class WebviewDirective {

  constructor(private _web: ElementRef<WebviewTag>) {
    console.log('---? theeee', _web);
    this.initEvents(this._web.nativeElement);
  }

  initEvents(web: WebviewTag) {
    web.addEventListener('load-commit', (t) => {
      console.log('--->load-commit', t);
    });

    web.addEventListener('did-finish-load', (t) => {
      console.log('--->did-finish-load', t);
    });

    web.addEventListener('did-fail-load', (t) => {
      console.log('--->did-fail-load', t);
    });

    web.addEventListener('new-window', /*async*/ (e) => {
      console.log('--->new-window', e);
      const protocol = require('url').parse(e.url).protocol;
        if (protocol === 'http:' || protocol === 'https:') {
          ipcRenderer.send('new-window', {
            url: e.url,
          });
          // await shell.openExternal(e.url)
        }
    });

    web.addEventListener('will-navigate', async (e) => {
      console.log('--->will-navigate', e);
    });

    web.addEventListener('close', async (e) => {
      console.log('--->close', e);
    });
  }

}
