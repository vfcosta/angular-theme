import { Component } from "ng-forward";
import { TestComponentBuilder, ngClass } from 'ng-forward/cjs/testing/test-component-builder';
import { INgForwardJQuery } from "ng-forward/cjs/util/jqlite-extensions";
import { ComponentFixture } from 'ng-forward/cjs/testing/test-component-builder';

/**
 * @ngdoc object
 * @name spec.ComponentTestHelper
 * @description
 *
 * Helper class for creating tests. It encapsulates the TestComponentBuilder initialization,
 * allowing the test to be DRY. To use, one must declare a beforeEach function in the
 * test, and inside construct this object like:
 *
 * <pre>
 * let helper = let helper : ComponentTestHelper;
 * beforeEach( (done) => {
 *  helper = new ComponentTestHelper(cls, tcb);
 * }
 * </pre>
 */
export class ComponentTestHelper<T extends any> {

    /**
     * @ngdoc property
     * @name mockComponent
     * @propertyOf spec.ComponentTestHelper
     * @description
     *  The component we are mocking.
     */
    mockComponent: ngClass;
    /**
     * @ngdoc property
     * @name tcb
     * @propertyOf spec.ComponentTestHelper
     * @description
     *  The NgForward TestComponentBuilder
     */
    tcb: TestComponentBuilder;
    /**
     * @ngdoc property
     * @name component
     * @propertyOf spec.ComponentTestHelper
     * @description
     *  The parsed component instance
     */
    component: T;
    /**
     * @ngdoc property
     * @name debugElement
     * @propertyOf spec.ComponentTestHelper
     * @description
     *  The debugElement representing a JQuery element attached to the component
     * on mock page.
     */
    debugElement: INgForwardJQuery;

    /**
     * @ngdoc method
     * @name constructor
     * @methodOf spec.ComponentTestHelper
     * @description
     *  The constructor for this component.
     */
    constructor(mockComponent: ngClass, done: Function) {
        this.mockComponent = mockComponent;
        this.tcb = new TestComponentBuilder();
        this.init(done);
    }

    /**
     * @ngdoc method
     * @name init
     * @methodOf spec.ComponentTestHelper
     * @description
     *  The initializer function. It is called inside the constructor
     */
    init(done: Function): any {
        let promisse = this.tcb.createAsync(this.mockComponent) as Promise<ComponentFixture>;
        return promisse.then((fixture: any) => {
            // Fire all angular events and parsing
            fixture.detectChanges();
            // The main debug element
            this.debugElement = fixture.debugElement;
            this.component = <T>this.debugElement.componentViewChildren[0].componentInstance;
            let mockObj = new this.mockComponent();
            Object.keys(mockObj).forEach((key: any) => {
                (<any>this.component)[key] = <any>mockObj[key];
            });

        }).then(() => {
            // Force the resolution of components and sync
            done();
        });
    }

    /**
     * @ngdoc method
     * @name all
     * @methodOf spec.ComponentTestHelper
     * @description
     *  Return all elements matching the given selector
     */
    all(selector: string): INgForwardJQuery[] {
        return this.debugElement.queryAll(selector);
    }

    /**
     * @ngdoc method
     * @name find
     * @methodOf spec.ComponentTestHelper
     * @description
     *  Return the first element matching the given selector
     */
    find(selector: string): INgForwardJQuery {
        return this.all(selector)[0];
    }

    /**
     * @ngdoc method
     * @name findChildren
     * @methodOf spec.ComponentTestHelper
     * @description
     *  Return the first element of parent element that matches the given selector
     */
    findChildren(parentSelector: string, childSelector: string) {
        let parentComponent = this.find(parentSelector);
        return parentComponent.find(childSelector)[0];
    }
}

export function createClass({
    template = '<div></div>',
    directives = <any[]>[],
    providers = <any[]>[],
    properties = <any>{}
}): any {
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
