import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { NewWinArgs } from './src/proto';

// 窗口管理器
class WinManager {
  private _topWin: BrowserWindow[] = [];

  constructor(private _serve: boolean) {

  }

  createWindow(weburl?: string): BrowserWindow {
    const electronScreen = screen;
    const size = electronScreen.getPrimaryDisplay().workAreaSize;

    // Create the browser window.
    const win = new BrowserWindow({
      x: 0,
      y: 0,
      width: size.width,
      height: size.height,
      webPreferences: {
        nodeIntegration: true,
        webviewTag: true,
      },
    });
    this._topWin.push(win);

    // console.log('---> create window server:', this._serve, weburl);

    const onSuccess = () => {
      // console.log('---> main.ts load url:', weburl);
      if (weburl) {
        win.webContents.send('load-url', weburl);
      }
    };

    const onFail = (v) => {
      console.log('----> main.ts error:', v);
    };

    if (this._serve) {
      require('electron-reload')(__dirname, {
        electron: require(`${__dirname}/node_modules/electron`)
      });
      win.loadURL('http://localhost:4200').then(onSuccess, onFail);
    } else {
      win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true
      })).then(onSuccess, onFail);
    }

    if (this._serve) {
      win.webContents.openDevTools();
    }

    const that = this;
    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store window
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      that.destroyWin(win);
    });
    return win;
  }

  destroyWin(win: BrowserWindow) {
    const idx = this._topWin.indexOf(win);
    if (idx >= 0) {
      this._topWin.splice(idx, 1);
    }
  }

  hasWindow() {
    return this._topWin.length > 0;
  }
}

let _man: WinManager;

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => {
    const args = process.argv.slice(1);
    const serve = args.some(val => val === '--serve');
    _man = new WinManager(serve);
    _man.createWindow();
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (!!_man && !_man.hasWindow()) {
      _man.createWindow();
    }
  });

  ipcMain.on('new-window', (evt: Electron.IpcMainEvent, ...arg: any[]) => {
    arg.forEach((t) => {
      const v = t as NewWinArgs;
      console.log('---> new-window: naviage to url xxx:', v);
      _man.createWindow(v.url);
    });
  });

} catch (e) {
  // Catch Error
  // throw e;
}
