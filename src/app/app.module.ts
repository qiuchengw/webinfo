import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';

import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { TabPanelComponent } from './components/tab-panel/tab-panel.component';
import { PluginContainerComponent } from './components/plugin-container/plugin-container.component';
import { PageNotFoundComponent } from './shared/components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { WebPageComponent } from './components/web-page/web-page.component';
import { UrlHistoryComponent } from './components/url-history/url-history.component';
import { UserViewDirective } from './directives/user-view.directive';
import { PluginManager } from './plugins/plugin-man';
import { SimplePlugin } from './plugins/test-simple-plugin';

registerLocaleData(zh);

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    WebviewDirective,
    TabPanelComponent,
    PluginContainerComponent,
    PageNotFoundComponent,
    WebPageComponent,
    UrlHistoryComponent,
    UserViewDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgZorroAntdModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [
    ElectronService,
    PluginManager,
    { provide: NZ_I18N, useValue: zh_CN }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private _plugins: PluginManager){
    _plugins.registerPlugin<SimplePlugin>(SimplePlugin, ['*.baidu.com']);
  }
}
