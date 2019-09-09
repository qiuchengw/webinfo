import { Directive, ElementRef } from '@angular/core';
import { WebviewTag, shell, ipcRenderer } from 'electron';
import { NewWinArgs } from '../../../../proto';
import { PluginManager } from '../../../plugins/plugin-man';
import { IPlugin, AutoApply } from '../../../plugins/plugin-interface';
import { SimplePlugin } from '../../../plugins/test-simple-plugin';

@Directive({
  selector: 'webview'
})
export class WebviewDirective {
  private _plugins: IPlugin[] = []; // 当前可用的plugins
  private _historyUrls: string[] = []; // 历史地址

  constructor(private _web: ElementRef<WebviewTag>, private _pluginMan: PluginManager) {
    // console.log('---? theeee', _web);
    this.initEvents(this._web.nativeElement);
  }

  navigateTo(url: string) {
    this._web.nativeElement.src = url;
  }

  get plugins(): IPlugin[] {
    return this._plugins;
  }

  get nativeWeb(): WebviewTag {
    return this._web.nativeElement;
  }

  get historyUrls() {
    return this._historyUrls;
  }

  applyPlugin(aa: AutoApply) {
    this.plugins.forEach(p => {
      if (p.autoApply() === aa) {
        p.apply2Web(this._web);
      }
    });
  }

  initEvents(web: WebviewTag) {
    const that = this;
    web.addEventListener('load-commit', (t) => {
      console.log('--->load-commit', t);
      that._plugins = that._pluginMan.makePlugin(t.url);
      that._historyUrls.push(t.url);
      that.applyPlugin(AutoApply.LoadCommit);
    });

    web.addEventListener('did-finish-load', (t) => {
      console.log('--->did-finish-load', t);
      that.applyPlugin(AutoApply.LoadFinished);
      // that._plugins = that._pluginMan.makePlugin(that._web.nativeElement.getURL());
    });

    web.addEventListener('did-fail-load', (t) => {
      console.log('--->did-fail-load', t);
    });

    web.addEventListener('new-window', /*async*/ (e) => {
      console.log('--->new-window', e);
      const protocol = require('url').parse(e.url).protocol;
        if (protocol === 'http:' || protocol === 'https:') {
          const arg: NewWinArgs = {
            url: e.url
          };
          ipcRenderer.send('new-window', arg);
          // await shell.openExternal(e.url)
        }
    });

    web.addEventListener('will-navigate', async (e) => {
      console.log('--->will-navigate', e);
      // 跳转新的url
      that._plugins = that._pluginMan.makePlugin(e.url);
    });

    web.addEventListener('close', async (e) => {
      console.log('--->close', e);
    });
  }

}
