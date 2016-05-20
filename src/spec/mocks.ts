const DEBUG = false;

let log = (message: string, ...args: any[]) => {
    if (DEBUG) {
        console.log(message);
    }
};

class ScopeWithEvents {
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
        log("Emitted " + message);
        if ((<any>this.listeners)[message]) {
            log("LISTENERS:", (<any>this.listeners)[message]);
            (<any>this.listeners)[message].forEach((f: Function) => {
                f.apply(this, args);
            });
        }
    }
}
export var mocks: any = {
    scopeWithEvents: (): ScopeWithEvents => new ScopeWithEvents(),
    modalInstance: {
        close: () => { }
    },
    $modal: {
        open: (args: {}) => {
            return this.modalInstance;
        }
    },
    authService: {
        loginSuccess: {
            event: Function,
            subscribe: (fn: Function) => {
                mocks.authService['loginSuccess'].event = fn;
            },
            next: (param: any) => {
                mocks.authService['loginSuccess'].event(param);
            }
        },
        loginFailed: {
            event: Function,
            subscribe: (fn: Function) => {
                mocks.authService['loginFailed'].event = fn;
            },
            next: (param: any) => {
                mocks.authService['loginFailed'].event(param);
            }
        },
        logoutSuccess: {
            event: Function,
            subscribe: (fn: Function) => {
                mocks.authService['logoutSuccess'].event = fn;
            },
            next: (param: any) => {
                mocks.authService['logoutSuccess'].event(param);
            }
        },
        login: () => { },
        logout: () => { },
        subscribe: (eventName: string, fn: Function) => {
            mocks.authService[eventName].subscribe(fn);
        },
        isAuthenticated: () => { }
    },
    articleService: {
        events: [
            {
                event: Function,
                subscribe: (fn: Function) => {
                    mocks.articleService.events[0].event = fn;
                },
                next: (param: any) => {
                    mocks.articleService.events[0].event(param);
                }
            }
        ],
        removeArticle: (article: noosfero.Article) => {
            return {
                catch: (func?: Function) => {
                }
            };
        },
        notifyArticleRemovedListeners: (article: noosfero.Article) => {
            mocks.articleService.events[0].next(article);
        },
        subscribe: (eventType: any, fn: Function) => {
            mocks.articleService.events[0].subscribe(fn);
        },
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
        getArticleByProfileAndPath: (profile: noosfero.Profile, path: string) => {
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
        },
        setCurrent: (article: noosfero.Article) => { },
        getCurrent: () => { return Promise.resolve({}); }
    },
    environmentService: {
        getEnvironmentPeople: (params: any) => {
            return mocks.promiseResultTemplate({
                people: {}
            });
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
    commentService: {
        getByArticle: (article: noosfero.Article) => {
            return Promise.resolve({ data: {} });
        }
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
        instant: (text: string) => { return text; }
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
        };
    },
    $log: {
        debug: () => { }
    },
    translatorService: {
        currentLanguage: () => { },
        changeLanguage: (lang: string) => { },
        translate: (text: string) => { return text; }
    },
    notificationService: {
        success: () => { }
    }
};
