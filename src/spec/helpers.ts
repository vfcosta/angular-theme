
import {ngClass, TestComponentBuilder, ComponentFixture} from 'ng-forward/cjs/testing/test-component-builder';
import {quickFixture} from 'ng-forward/cjs/tests/utils';
import {Provider, Input, provide, Component} from 'ng-forward';
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