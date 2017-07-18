import { ScopeWithEvents } from './scope-with-events';
import { EventEmitter } from '@angular/core';
import { NoosferoKnownEvents } from './../app/known-events';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

const DEBUG = false;

export function getMocks() {
    const mocks = {
        scopeWithEvents: (): ScopeWithEvents => new ScopeWithEvents(),
        modalInstance: {
            close: () => { }
        },
        $modal: {
            open: (args: {}) => {
                return this.modalInstance;
            }
        },
        $transitions: {
            onSuccess: () => { }
        },
        $state: {
            href: () => { },
            go: () => { },
            transitionTo: (param: string) => { }
        },
        $stateParams: {
            href: () => { },
            go: () => { }
        },
        $scope: {
            $watch: (param: string, f: Function) => { f(); },
            $apply: () => { }
        },
        profile: {
            id: 1,
            identifier: 'profile-id',
            top_image: null
        },
        injector: {
            get: (obj: any) => ({ block: { identifier: 'identifier', settings: '', api_content: '' } })
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
        taskService: {
            getAllPending: () => {},
            get: (id: any) => {
                return Promise.resolve({ headers: () => { }, data: { group_for_friend: 'group1' } });
            },
            put: () => {
                return Promise.resolve({ headers: () => { }, data: { group_for_friend: 'group1' } });
            }
        },
        registerService: {
            createAccount: (user: noosfero.User) => {
                return Promise.resolve({ status: 201 });
            }
        },
        authService: {
            loginSuccess: {
                subscribe: (fn: Function) => { },
                next: (param: any) => { }
            },
            loginFailed: {
                subscribe: (fn: Function) => { },
                next: (param: any) => { }
            },
            logoutSuccess: {
                subscribe: (fn: Function) => { },
                next: (param: any) => { }
            },
            login: () => { },
            logout: () => { },
            subscribe: (eventName: string, fn: Function) => {
                mocks.authService[eventName].subscribe(fn);
            },
            isAuthenticated: () => { },
            forgotPassword: () => {}
        },
        articleService: {
            subscribeToModelRemoved: (fn: Function) => { },
            subscribeToModelAdded: (fn: Function) => { },
            get: () => Promise.resolve({}),
            modelRemovedEventEmitter:
            {
                subscribe: (fn: Function) => { },
                next: (param: any) => { }
            },
            modelAddedEventEmitter:
            {
                subscribe: (fn: Function) => { },
                next: (param: any) => { }
            },
            remove: (article: noosfero.Article) => {
                return {
                    catch: (func?: Function) => {
                    }
                };
            },
            getByProfile: (profileId: number, params?: any) => {
                return {
                    then: (func?: Function) => {
                        if (func) {
                            func({
                                data: {
                                    article: null
                                }
                            });
                        }
                    }
                };
            },
            getArticleByProfileAndPath: (profile: noosfero.Profile, path: string) => {
                return {
                    then: (func?: Function) => {
                        if (func) {
                            func({
                                data: {
                                    article: null
                                }
                            });
                        }
                    }
                };
            },
            getChildren: (articleId: number, params?: any) => {
                return {
                    then: (func?: Function) => { if (func) func(); }
                };
            },
            setCurrent: (article: noosfero.Article) => { },
            getCurrent: () => Promise.resolve({}),
            search: (filter: any) => Promise.resolve({}),
            createInParent: () => { },
            updateArticle: () => { },
        },
        environmentService: {
            getEnvironmentPeople: (params: any) => {
                return mocks.promiseResultTemplate({
                    people: {}
                });
            },
            getCurrentEnvironment: (): any => {
                return Promise.resolve({
                    id: 1,
                    settings: {},
                    layout_template: '',
                    signup_intro: 'Welcome to Noosfero',
                    host: 'http://localhost'
                });
            },
            update: (environment: noosfero.Environment) => Promise.resolve({ id: 2 }),
            get: (environment: string) => Promise.resolve({id: 2}),
            getBoxes: () => {}
        },
        profileService: {
            getCurrentProfile: () => Promise.resolve(mocks.profile),
            instant: () => { },
            update: (profile: noosfero.Profile) => Promise.resolve(mocks.profile),
            remove: () => Promise.resolve({data: {success: true}}),
            getBlockTemplate: (id: any, type: string) => Promise.resolve({api_content: [] }),
            getTags: () => { },
            getHomePage: () => {},
            getNetworkActivities: () => {},
            isMember: () => Promise.resolve(true),
            addMember: () => Promise.resolve({ data: {} }),
            removeMember: () => Promise.resolve({ data: {} })
            // getMembershipState: (profileId: noosfero.Person, friendId: noosfero.Profile) => { return Promise.resolve({ }) }
        },
        personService: {
            search: () => Observable.of([mocks.profile]),
            getFriendshipState: () => Promise.resolve({ }),
            addFriend: () => Promise.resolve({ data: {} }),
            removeFriend: () => Promise.resolve({ data: {} })
        },
        communityService: {
            sendInvitations: (communityId: number, people: noosfero.Person[]) => Observable.of({ success: true }),
            createNewCommunity: (community: noosfero.Community) => Promise.resolve({}),
            getMembershipState: () => Promise.resolve({ })
        },
        sessionService: {
            currentUser: () => <noosfero.User>{ person: { id: 1, identifier: 'test_user' } },
            currentPerson: () => <noosfero.Person>{ id: 1 },
            destroy: () => {}
        },
        commentService: {
            subscribeToModelRemoved: (fn: Function) => { },
            subscribeToModelAdded: (fn: Function) => { },
            modelRemovedEventEmitter:
            {
                subscribe: (fn: Function) => { },
                next: (param: any) => { }
            },
            modelAddedEventEmitter:
            {
                subscribe: (fn: Function) => { },
                next: (param: any) => { }
            },
            getByArticle: (article: noosfero.Article) => {
                return Promise.resolve({ data: {} });
            },
            createInArticle: (article: noosfero.Article, comment: noosfero.Comment) => {
                return Promise.resolve({ data: {} });
            },
        },
        sessionWithCurrentUser: (user: any) => {
            return {
                currentUser: () => user,
                localStorage: {}
            };
        },
        inDesignMode: false,
        designModeService: {
            onToggle: new EventEmitter(),
            isInDesignMode: () => mocks.inDesignMode,
            setInDesignMode: (value: boolean) => { mocks.inDesignMode = value; }
        },
        translateService: {
            use: (lang?: string) => {
                return lang ? Promise.resolve(lang) : "en";
            },
            instant: (text: string) => text,
            getBrowserLang: () => 'en',
            setDefaultLang: (lang: string) => { },
        },
        tmhDynamicLocale: {
            get: () => { },
            set: (lang: string) => { }
        },
        amMoment: {
            changeLocale: () => { }
        },
        promiseResultTemplate: (response?: {}) => {
            const callback = (func?: (response: any) => any) => {
                if (func) {
                    const ret = func(response);
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
        translatorService: {
            currentLanguage: () => { },
            changeLanguage: (lang: string) => { },
            translate: (text: string) => text,
            hasTranslation: (text: string) => text
        },
        passwordService: {
            new_password: (param: any) => {
                return Promise.resolve({ status: 201 });
            },
            newPassword: (param: any) => {
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
            getApiContent: (block: noosfero.Block, params?: any) => Promise.resolve({}),
            uploadImages: () => { },
        },
        settingsService: {
            getAvailableBlocks: () => { }
        },
        noosferoTemplateFilter: (text: string, options: any) => {
            return text;
        },
        stateService: {
            transitionTo: () => { }
        },
        eventsHubService: {
            subscribeToEvent: () => { },
            emitEvent: () => { },
            knownEvents: new NoosferoKnownEvents()
        },
        permissionService: {
            isAllowed: () => true
        },
        amParseFilter: () => {
            return {
                toISOString: () => { }
            };
        },
        localStorageService: {
            storage: {},
            remove: (key: string) => { delete mocks.localStorageService.storage[key]; },
            get: (key: string) => mocks.localStorageService.storage[key],
            set: (key: string, value: any) => { mocks.localStorageService.storage[key] = value; }
        },
        themeService: {
            verifyTheme: (theme: string) => { }
        },
        roleService: {
            getByProfile: (profileId: number, params: any = {}) => { }
        },
        headerService: {
            setEnvironmentTitle: () => {}
        },
        route: {
            snapshot: { data: {}, queryParams: {}, params: {} },
            parent: {
                snapshot: { data: {}, queryParams: {}, params: {} }
            }
        },
        window: {
            location: {
                reload: () => {},
                pathname: ""
            }
        },
        router: {
            navigate: () => {}
        },
        bodyStateClassesService: {
            start: () => {},
            changeClasses: new EventEmitter()
        }
    };
    return mocks;
};
