import { Component, ChangeDetectorRef } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { ipcRenderer } from 'electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private _showWeb = true;
  private _url = '';

  constructor(
    public electronService: ElectronService,
    private translate: TranslateService,
    private _ref: ChangeDetectorRef
  ) {
    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }

    const that = this;
    ipcRenderer.on('load-url', (evt: Electron.IpcRendererEvent, ...args: any[]) => {
      // console.log('---> app component:', evt, args);
      if (args.length > 0) {
        that.onSearch(args[0]);
      }
    });
  }

  onSearch(url: string) {
    // console.log('---load url:', url);

    this._url = url;
    this._showWeb = true;

    this._ref.detectChanges();
  }
}
