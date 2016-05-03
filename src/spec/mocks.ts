const DEBUG = false;

let log = (message: string, ...args:  any[]) => {
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
export var mocks = {
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
        logout: () => { },
        login: () => { }
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
        }
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
