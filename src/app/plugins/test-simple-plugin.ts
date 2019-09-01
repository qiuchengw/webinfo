import { IPlugin } from './plugin-interface';

export class SimplePlugin extends IPlugin{
    constructor() {
        super();

        this._name = '测试插件';
    }

    static matchRule(): string[] {
        return [
            'www.baidu.com',
        ];
    }
}
