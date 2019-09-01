import { WebPageComponent } from '../components/web-page/web-page.component';

// 插件自动应用
enum AutoApply {
    LoadCommit = 0, // 开始加载时应用
    LoadFinished,   // 完成时候应用
    Manual, // 手动应用
}
// 插件基础抽象
export class IPlugin {
    protected _autoApply: AutoApply = AutoApply.Manual;
    protected _name: string; // 插件名称
    private _url: string;
    private _web: WebPageComponent;

    // 是否匹配
    // matchUrl(url: string): boolean;

    setWebPage(web: WebPageComponent){
        this._web = web;
    }

    setAutoApply(aa: AutoApply){
        this._autoApply = aa;
    }

    autoApply():AutoApply{
        return this._autoApply;
    }
}


