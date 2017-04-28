import { NoosferoKnownEvents } from './../app/known-events';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/of";

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

    public $watch(fn1: Function, fn2: Function) {

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
    profile: {
        id: 1
    },
    registerService: {
        createAccount: (user: noosfero.User) => {
            return Promise.resolve({ status: 201 });
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
        articleRemovedFn: null,
        articleAddedFn: null,
        subscribeToModelRemoved: (fn: Function) => {
            mocks.articleService.articleRemovedFn = fn;
        },
        subscribeToModelAdded: (fn: Function) => {
            mocks.articleService.articleAddedFn = fn;
        },
        modelRemovedEventEmitter:
        {
            subscribe: (fn: Function) => {
                mocks.articleService.articleRemovedFn = fn;
            },
            next: (param: any) => {
                mocks.articleService.articleRemovedFn(param);
            }
        }
        ,
        modelAddedEventEmitter:
        {
            subscribe: (fn: Function) => {
                mocks.articleService.articleAddedFn = fn;
            },
            next: (param: any) => {
                mocks.articleService.articleAddedFn(param);
            }
        }
        ,
        remove: (article: noosfero.Article) => {
            return {
                catch: (func?: Function) => {
                }
            };
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
        },
        getCurrentEnvironment: (): any => {
            return {
                id: 1,
                settings: {},
                layout_template: '',
                signup_intro: 'Welcome to Noosfero',
                host: 'http://localhost'
            };
        }
    },
    profileService: {
        getCurrentProfile: () => Promise.resolve(mocks.profile),
        instant: () => { }
    },
    personService: {
        search: () => Observable.of([mocks.profile])
    },
    communityService: {
        sendInvitations: (communityId: number, people: noosfero.Person[]) => { }
    },
    commentService: {
        commentRemovedFn: null,
        commentAddedFn: null,
        subscribeToModelRemoved: (fn: Function) => {
            mocks.commentService.commentRemovedFn = fn;
        },
        subscribeToModelAdded: (fn: Function) => {
            mocks.commentService.commentAddedFn = fn;
        },
        modelRemovedEventEmitter:
        {
            subscribe: (fn: Function) => {
                mocks.commentService.commentRemovedFn = fn;
            },
            next: (param: any) => {
                mocks.commentService.commentRemovedFn(param);
            }
        }
        ,
        modelAddedEventEmitter:
        {
            subscribe: (fn: Function) => {
                mocks.articleService.commentAddedFn = fn;
            },
            next: (param: any) => {
                mocks.articleService.commentAddedFn(param);
            }
        }
        ,
        getByArticle: (article: noosfero.Article) => {
            return Promise.resolve({ data: {} });
        }
    },
    sessionWithCurrentUser: (user: any) => {
        return {
            currentUser: () => { return user; },
            localStorage: {}
        };
    },
    designModeService: {
        modeFn: null,
        onToggle: {
            subscribe: (fn: Function) => {
                mocks.designModeService.modeFn = fn;
            },
            next: (param: any) => {
                mocks.designModeService.modeFn(param);
            }
        },
        isInDesignMode: () => { return false; }
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
    promiseResultTemplate: (response?: {}, callCatch = true) => {
        let callback = (func?: (response: any) => any) => {
            if (func) {
                let ret = func(response);
                if (ret && typeof ret.then === "function") return ret;
            }
            return mocks.promiseResultTemplate(response, callCatch);
        };
        let catchCallback = callback;
        if (!callCatch) catchCallback = () => { };
        return {
            then: callback,
            finally: callback,
            catch: catchCallback
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
    passwordService: {
        new_password: (param: any) => {
            return Promise.resolve({ status: 201 });
        }
    },
    notificationService: {
        success: () => { },
        confirmation: () => { },
        info: () => { },
        error: () => { }
    },
    blockService: {
        getBlock: (id: number) => { },
        getAvailableBlocks: () => {}
    },
    noosferoTemplateFilter: (text: string, options: any) => {
        return text;
    }
};


export function getMocks() {
    return {
        scopeWithEvents: (): ScopeWithEvents => new ScopeWithEvents(),
        modalInstance: {
            close: () => { }
        },
        $modal: {
            open: (args: {}) => {
                return this.modalInstance;
            }
        },
        $state: {
            href: () => { },
            go: () => { }
        },
        profile: {
            id: 1
        },
        injector: {
            get: (obj: any) => { return { block: {identifier: 'identifier', settings: '', api_content: ''} }; }
        },
        community: {
            id: 1,
            closed: true,
            identifier: 'community-id',
            name: 'community-id'
        },
        person: <noosfero.Person>{
            id: 1
        },
        popover: {
            hide: () => { }
        },
        registerService: {
            createAccount: (user: noosfero.User) => {
                return Promise.resolve({ status: 201 });
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
            articleRemovedFn: () => { },
            articleAddedFn: () => { },
            subscribeToModelRemoved: (fn: Function) => {
                mocks.articleService.articleRemovedFn = fn;
            },
            subscribeToModelAdded: (fn: Function) => {
                mocks.articleService.articleAddedFn = fn;
            },
            modelRemovedEventEmitter:
            {
                subscribe: (fn: Function) => {
                    mocks.articleService.articleRemovedFn = fn;
                },
                next: (param: any) => {
                    mocks.articleService.articleRemovedFn(param);
                }
            }
            ,
            modelAddedEventEmitter:
            {
                subscribe: (fn: Function) => {
                    mocks.articleService.articleAddedFn = fn;
                },
                next: (param: any) => {
                    mocks.articleService.articleAddedFn(param);
                }
            }
            ,
            remove: (article: noosfero.Article) => {
                return {
                    catch: (func?: Function) => {
                    }
                };
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
            },
            getCurrentEnvironment: (): any => {
                return {
                    id: 1,
                    settings: {},
                    layout_template: '',
                    signup_intro: 'Welcome to Noosfero',
                    host: 'http://localhost'
                };
            }
        },
        profileService: {
            getCurrentProfile: () => Promise.resolve(mocks.profile),
            instant: () => { },
            update: (profile: noosfero.Profile) => Promise.resolve(mocks.profile)
        },
        personService: {
            search: () => Observable.of([mocks.profile]),
            getTags: () => { }
        },
        communityService: {
            sendInvitations: (communityId: number, people: noosfero.Person[]) => Observable.of({ success: true }),
            createNewCommunity: (community: noosfero.Community) => Promise.resolve({ })
        },
        sessionService: {
            currentUser: () => <noosfero.User>{person: {id: 1, identifier: 'test_user'} }
        },
        commentService: {
            commentRemovedFn: () => { },
            commentAddedFn: () => { },
            subscribeToModelRemoved: (fn: Function) => {
                mocks.commentService.commentRemovedFn = fn;
            },
            subscribeToModelAdded: (fn: Function) => {
                mocks.commentService.commentAddedFn = fn;
            },
            modelRemovedEventEmitter:
            {
                subscribe: (fn: Function) => {
                    mocks.commentService.commentRemovedFn = fn;
                },
                next: (param: any) => {
                    mocks.commentService.commentRemovedFn(param);
                }
            }
            ,
            modelAddedEventEmitter:
            {
                subscribe: (fn: Function) => {
                    mocks.articleService.commentAddedFn = fn;
                },
                next: (param: any) => {
                    mocks.articleService.commentAddedFn(param);
                }
            }
            ,
            getByArticle: (article: noosfero.Article) => {
                return Promise.resolve({ data: {} });
            }
        },
        sessionWithCurrentUser: (user: any) => {
            return {
                currentUser: () => { return user; },
                localStorage: {}
            };
        },
        designModeService: {
            modeFn: () => { },
            onToggle: {
                subscribe: (fn: Function) => {
                    mocks.designModeService.modeFn = fn;
                },
                next: (param: any) => {
                    mocks.designModeService.modeFn(param);
                }
            },
            isInDesignMode: () => { return false; }
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
            let callback = (func?: (response: any) => any) => {
                if (func) {
                    let ret = func(response);
                    if (ret && typeof ret.then === "function") return ret;
                }
                return mocks.promiseResultTemplate(response);
            };
            return {
                then: callback,
                finally: callback,
                catch: callback
            };
        },
        $log: {
            debug: () => { }
        },
        translatorService: {
            currentLanguage: () => { },
            changeLanguage: (lang: string) => { },
            translate: (text: string) => { return text; },
            hasTranslation: (text: string) => {return text; }
        },
        passwordService: {
            new_password: (param: any) => {
                return Promise.resolve({ status: 201 });
            }
        },
        notificationService: {
            success: () => { },
            confirmation: () => { },
            info: () => { },
            error: () => { }
        },
        blockService: {
            getBlock: (id: number) => { },
            getApiContent: (block: noosfero.Block, params?: any) => { return Promise.resolve({}); },
            uploadImages: () => { },
        },
        settingsService: {
            getAvailableBlocks: () => {}
        },
        noosferoTemplateFilter: (text: string, options: any) => {
            return text;
        },
        stateService: {
            transitionTo: () => { }
        },
        eventsHubService: {
            subscribeToEvent: () => {},
            emitEvent: () => {},
            knownEvents: new NoosferoKnownEvents()
        },
        amParseFilter: () => {
            return {
                toISOString: () => {}
            };
        }
    };
};
