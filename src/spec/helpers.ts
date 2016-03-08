
import {ngClass, TestComponentBuilder, ComponentFixture} from 'ng-forward/cjs/testing/test-component-builder';
import {Injectable, Inject, Provider, Input, provide, Component} from 'ng-forward';
import {User, Person} from "./../app/models/interfaces";


export interface ComponentFixtureTemplate {
    providers?: any[];
    directives?: any[];
    template?: string;
}

let tcb: TestComponentBuilder = new TestComponentBuilder();

export function quickCreateComponent({
    providers = [],
    directives = [],
    template = '<div></div>'
}): Promise<ComponentFixture> {

    @Component({ selector: 'test', template, directives, providers })
    class Test { }

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

class AngularServiceFactory {
    fixtureComponentHookPoint: ComponentFixture;
    tcb: TestComponentBuilder = new TestComponentBuilder();

    constructor() {
        this.fixtureComponentHookPoint = (<any>this.tcb)["create"](AngularServiceHookComponent);
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

export var angularServiceFactory = new AngularServiceFactory();
/**
 * This help function allows get angular services to be used in integration tests
 * i.e: '$http', '$q', '$location', etc...
 */
export function getAngularService<T>(angularService: string) {
    return angularServiceFactory.getAngularService(angularService);
}

export function getQService(): ng.IQService {
    return angularServiceFactory.getQService();
}

export function getHttpBackendService(): ng.IHttpBackendService {
    return angularServiceFactory.getHttpBackendService();
}

// export function getResolvablePromise() {
//     let $q = getQService();
//
//     return null;
// }

export var fixtures = {
    user: {
        id: 1,
        login: 'user',
        email: 'user@company.com',
        person: <Person>{
            id: 1,
            identifier: 'user'
        },
        private_token: 'token',
        userRole: 'admin'
    }
};
