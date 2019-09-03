import { WebviewTag } from 'electron';
import { ElementRef } from '@angular/core';

// 插件自动应用
export enum AutoApply {
    LoadCommit = 0, // 开始加载时应用
    LoadFinished,   // 完成时候应用
    Manual, // 手动应用
}

export enum PluginStatus {
    Bad = 0,    // 错误
    Inactive = 1,
    Active = 2,
}
// 插件基础抽象
export class IPlugin {
    protected _autoApply: AutoApply = AutoApply.Manual;
    protected _name: string; // 插件名称
    private _url: string;
    private _web: ElementRef<WebviewTag>;
    private _status: PluginStatus = PluginStatus.Inactive;

    get status() {
        return this._status;
    }

    get name() {
        return this._name;
    }

    // 是否匹配
    // matchUrl(url: string): boolean;
    setAutoApply(aa: AutoApply) {
        this._autoApply = aa;
    }

    autoApply(): AutoApply {
        return this._autoApply;
    }

    apply2Web(web: ElementRef<WebviewTag>) {
        this._web = web;
    }

    active() {

    }

    deactive() {

    }
}


