
class ScopeWithEvents {
    listeners =  {};
    constructor() {

    }

    public $on(eventName: string, func: Function) {
        console.log(this.listeners);
        if ((<any>this.listeners)[eventName]) {
            (<any>this.listeners)[eventName].push(func);
        } else {
            (<any>this.listeners)[eventName] = [func];
        }
        console.log(this.listeners);
    }

    public $emit(message: string, arg?: any) {
        console.log("Emitted " + message);
        if ( (<any>this.listeners)[message]) {
            console.log("LISTENERS:", (<any>this.listeners)[message]);
             (<any>this.listeners)[message].forEach((f: Function) => {
                f(arg);
            });
        }
    }
}
export var mocks = {
    scopeWithEvents: new ScopeWithEvents(),
    modalInstance: {
        close: () => { }
    },
    $modal: {
        open: (args: {}) => {
            return this.modalInstance;
        }
    },
    authService: {
        logout: () => { }
    },
    sessionWithCurrentUser: (user: any) => {
        return {
            currentUser: () => { return user; }
        };
    }

};