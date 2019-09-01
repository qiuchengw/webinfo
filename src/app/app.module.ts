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

import { AppComponent } from './app.component';

import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { PageNotFoundComponent } from './shared/components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { WebPageComponent } from './components/web-page/web-page.component';
import { UrlHistoryComponent } from './components/url-history/url-history.component';
import { PluginManager } from './plugins/plugin-man';
import { SimplePlugin } from './plugins/test-simple-plugin';
import { WebviewDirective } from './shared/directives';
import { ElectronService } from './core/services';
import { PluginsComponent } from './components/plugins/plugins.component';

registerLocaleData(zh);

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    WebviewDirective,
    PageNotFoundComponent,
    WebPageComponent,
    WebviewDirective,
    UrlHistoryComponent,
    PluginsComponent,
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
  constructor(private _plugins: PluginManager) {
    // tslint:disable-next-line: quotemark
    console.log("---> AppModule loaded!");
    _plugins.registerPlugin<SimplePlugin>(SimplePlugin, SimplePlugin.matchRule());
  }
}
