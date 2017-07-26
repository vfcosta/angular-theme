export class ScopeWithEvents {
    listeners = {};
    constructor() {

    }

    public $on(eventName: string, func: Function) {
        if ((<any>this.listeners)[eventName]) {
            (<any>this.listeners)[eventName].push(func);
        } else {
            (<any>this.listeners)[eventName] = [func];
        }
    }

    public $emit(message: string, ...args: any[]) {
        if ((<any>this.listeners)[message]) {
            (<any>this.listeners)[message].forEach((f: Function) => {
                f.apply(this, args);
            });
        }
    }

    public $watch(fn1: Function, fn2: Function) {

    }

    public $apply() {

    }
}
