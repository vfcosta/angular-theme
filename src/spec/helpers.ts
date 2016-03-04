
import {ngClass, TestComponentBuilder, ComponentFixture} from 'ng-forward/cjs/testing/test-component-builder';
import {quickFixture} from 'ng-forward/cjs/tests/utils';
import {Provider, Input, provide, Component} from 'ng-forward';



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

export function provideFilters(...filters: string[]) {
    let providers: Provider[] = [];
    for (var filter of filters) {
        providers.push(new Provider(filter, { useValue: () => { } }));
    }
    return providers;
}