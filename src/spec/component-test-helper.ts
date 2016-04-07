import { Component } from "ng-forward";
import { TestComponentBuilder } from 'ng-forward/cjs/testing/test-component-builder';
import { INgForwardJQuery } from "ng-forward/cjs/util/jqlite-extensions";
import { ComponentFixture } from 'ng-forward/cjs/testing/test-component-builder';

export function createClass(template: any, directives: any, providers: any, properties: any): any {
    @Component({ selector: 'component-test-helper-container', template, directives, providers })
    class Test {
        constructor() {
            Object.keys(properties).forEach((key: any) => {
                (<any>this)[key] = <any>properties[key];
            });
        }
    }
    return Test;
}

export function rebuild(factory: any, done: any): any {
    return new ComponentTestHelper(factory, done);
}

/**
 * Helper class for creating tests. It encapsulates the TestComponentBuilder initialization,
 * allowing the test to be DRY. To use, one must declare a beforeEach function in the
 * test, and inside construct this object like:
 * 
 * let helper = let helper : ComponentTestHelper;
 * beforeEach( (done) => {
 *  helper = new ComponentTestHelper(cls, tcb);
 * }
 */
export class ComponentTestHelper {

    mockComponent: any;
    tcb: TestComponentBuilder;
    component: any;
    debugElement: INgForwardJQuery;

    constructor(mockComponent: any, done: any) {
        this.mockComponent = mockComponent;
        this.tcb = new TestComponentBuilder();
        this.init(done);
    }

    init(done: any): any {
        let promisse = this.tcb.createAsync(this.mockComponent) as any;
        return promisse.then((fixture: any) => {
            // Fire all angular events and parsing
            fixture.detectChanges();
            // The main debug element
            this.debugElement = fixture.debugElement;
            this.component = this.debugElement.componentViewChildren[0].componentInstance;
        }).then(() => {
            // Force the resolution of components and sync
            done();
        });
    }

    /**
     * Return all elements matching the given selector
     */
    all(selector: string): INgForwardJQuery[] {
        return this.debugElement.queryAll(selector);
    }

    find(selector: string): INgForwardJQuery {
        return this.all(selector)[0];
    }

    findChildren(parentSelector: string, childSelector: string) {
        let parentComponent = this.find(parentSelector);
        return parentComponent.find(childSelector)[0];
    }
}