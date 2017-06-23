import { MockBackend, MockConnection } from '@angular/http/testing';
import {ngClass, TestComponentBuilder, ComponentFixture} from 'ng-forward/cjs/testing/test-component-builder';
import {providers} from  'ng-forward/cjs/testing/providers';
import {Injectable, Inject, Provider, Input, Output, EventEmitter, provide, Component} from 'ng-forward';
import {ResponseOptions, Response, Http, Headers, RequestOptions, URLSearchParams, Request, RequestMethod, HttpModule, BaseRequestOptions} from "@angular/http";
import { RestangularModule, RestangularHttp, Restangular } from 'ngx-restangular';

export var ngforward = {
    providers: providers,
    TestComponentBuilder: TestComponentBuilder,
    ComponentFixture: ComponentFixture
};

export interface ComponentFixtureTemplate {
    providers?: any[];
    directives?: any[];
    template?: string;
}

export let tcb: TestComponentBuilder = new TestComponentBuilder();

export function quickCreateComponent({
    providers = <any[]>[],
    directives = <any[]>[],
    template = '<div></div>',
    properties = <any>{},
}): Promise<ComponentFixture> {

    @Component({ selector: 'test', template, directives, providers })
    class Test {

        constructor() {
            Object.keys(properties).forEach((key: any) => {
                (<any>this)[key] = <any>properties[key];
            });
        }
    }

    return tcb.createAsync(Test);
}

export function createComponentFromClass(yourClass: ngClass) {
    return tcb.createAsync(yourClass);
}

export function createProviderToValue(name: string, value: any) {
    return new Provider(name, { useValue: value });
}

export function provideEmptyObjects(...providedNames: string[]) {
    let providers: Provider[] = [];
    for (let name of providedNames) {
        providers.push(createProviderToValue(name, {}));
    }
    return providers;
}

export function provideFilters(...filters: string[]) {
    let providers: Provider[] = [];
    for (let filter of filters) {
        providers.push(new Provider(filter, { useValue: () => { } }));
    }
    return providers;
}

@Component({
    selector: 'helper_get_angular_service',
    template: 'not-used',
    providers: []
})
class AngularServiceHookComponent {
    constructor() {

    }
}


/**
 * This helper class allows get angular services to be used in integration tests
 * i.e: '$http', '$q', '$location', etc...
 */
export class AngularServiceFactory {

    private fixtureComponentHookPoint: ComponentFixture;

    constructor() {
        this.fixtureComponentHookPoint = (<any>tcb)["create"](AngularServiceHookComponent);
    }

    getAngularService<T>(angularService: string) {
        return this.fixtureComponentHookPoint.debugElement.getLocal(angularService);
    }

    getQService(): ng.IQService {
        return this.getAngularService<ng.IQService>("$q");
    }

    getHttpBackendService(): ng.IHttpBackendService {
        return this.getAngularService<ng.IHttpBackendService>("$httpBackend");
    }
}

export function provideMockBackend() {
    return <any>[
        BaseRequestOptions, MockBackend,
        {
            provide: RestangularHttp,
            useFactory: (http: Http) => {
                return new RestangularHttp(http);
            },
            deps: [Http]
        },
        {
            provide: Http,
            useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                return new Http(backendInstance, defaultOptions);
            },
            deps: [MockBackend, BaseRequestOptions]
        },
    ];
}

export function mockBackendConnection(backend: MockBackend, url, body: any = {}, headers: any = {}, status: number = 200) {
    backend.connections.subscribe((connection: MockConnection) => {
        if (connection.request.url === url) {
            let options = {
                // body: JSON.stringify(body),
                body: body,
                headers: new Headers(headers),
                status: status,
            };
            const response = new Response(new ResponseOptions(options));
            connection.mockRespond(response);
        }
    });
}

export function getAngularServiceFactory() {
    return new AngularServiceFactory();
}

export {mocks, getMocks} from "./mocks";

export var fixtures = {
    user: {
        id: 1,
        login: 'user',
        email: 'user@company.com',
        person: <noosfero.Person>{
            id: 1,
            identifier: 'user'
        },
        private_token: 'token',
        userRole: 'admin',
        permissions: []
    }
};
