// plugin 工厂
import { IPlugin } from './plugin-interface';
import { Injectable } from '@angular/core';

// 插件匹配
type _PluginC = (url: string) => IPlugin;

class PluginCreator {
    private _cs: _PluginC[] = [];
    private _exp: RegExp;

    constructor(exp: string) {
        this._exp = new RegExp(exp);
    }

    expStr(): string {
        return this._exp.source;
    }

    test(url: string): boolean {
        return this._exp.test(url);
    }

    add<T extends IPlugin>(c: new(url: string) => T) {
        this._cs.push((url: string) => {
            return new c(url);
        });
    }

    make(url: string): IPlugin[] {
        return this._cs.map((cb) => {
            return cb(url);
        });
    }
}

// 插件匹配
interface PluginMatcher {
    // url 匹配规则，对应对象创建器
    // urlRule 正则表达式
    [urlRule: string]: PluginCreator;
}

@Injectable({
    providedIn: 'root',
})
export class PluginManager {
    private _plugins: PluginMatcher = {};

    constructor() {

    }

    // 注册类型
    registerPlugin<T extends IPlugin>(c: new(url: string) => T, urlRules: string[]) {
        const that = this;
        urlRules.forEach((rule) => {
            let pc = that._plugins[rule];
            if (!pc) {
                pc = new PluginCreator(rule);
                that._plugins[rule] = pc;
            }
            pc.add(c);
        });
    }

    // 生成实例
    makePlugin(url: string): IPlugin[] {
        const arr: IPlugin[] = [];
        // tslint:disable-next-line: forin
        for (const k in this._plugins) {
            const v = this._plugins[k];
            const matched = v.test(url);
            console.log('---> match url plugin:[%s], expr:[%s], url:[%s]', matched, v.expStr(), url);
            if (matched) {
                arr.push(...(v.make(url)));
            }
        }
        return arr;
    }
}

