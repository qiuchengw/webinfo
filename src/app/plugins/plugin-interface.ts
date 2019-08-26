import { WebPageComponent } from "../components/web-page/web-page.component";

// 插件基础抽象

export class IPlugin{
    private _url: string;
    private _web: WebPageComponent;

    // 是否匹配
    // matchUrl(url: string): boolean;
    
    setWebPage(web: WebPageComponent){
        this._web = web;
    }
}


