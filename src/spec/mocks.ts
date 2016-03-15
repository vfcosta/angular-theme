
class ScopeWithEvents {
    listeners = {};
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
        if ((<any>this.listeners)[message]) {
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
    articleService: {
        getByProfile: (profileId: number, params?: any) => {
            return {
                then: (func?: Function) => {
                    if (func) func({
                        data: {
                            article: null
                        }
                    });
                }
            };
        },
        getChildren: (articleId: number, params?: any) => {
            return {
                then: (func?: Function) => { if (func) func(); }
            };
        }
    },
    profileService: {
        getCurrentProfile: (profile: any) => {
            return mocks.promiseResultTemplate({
                profile: profile
            });
        },
        instant: () => { }
    },
    sessionWithCurrentUser: (user: any) => {
        return {
            currentUser: () => { return user; }
        };
    },
    $translate: {
        use: (lang?: string) => {
            return lang ? Promise.resolve(lang) : "en";
        },
        instant: () => { }
    },
    tmhDynamicLocale: {
        get: () => { },
        set: (lang: string) => { }
    },
    amMoment: {
        changeLocale: () => { }
    },
    angularLoad: {
        loadScript: (script?: string) => {
            return Promise.resolve();
        }
    },
    promiseResultTemplate: (response?: {}) => {

        return {
            then: (func?: (response: any) => void) => {
                if (func) { return func(response); }
            }
        }
    }
};
