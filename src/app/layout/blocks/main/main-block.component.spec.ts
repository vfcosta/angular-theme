import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
import {Input, provide, Component} from 'ng-forward';
import {MainBlockComponent} from './main-block.component';


const tcb = new TestComponentBuilder();

const htmlTemplate: string = '<noosfero-main-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-main-block>';

describe("Components", () => {
    describe("Main Block Component", () => {

        // the karma preprocessor html2js transform the templates html into js files which put
        // the templates to the templateCache into the module templates
        // we need to load the module templates here as the template for the
        // component Block will be load on our tests
        beforeEach(angular.mock.module("templates"));

        it("check if the main block has a tag with ui-view attribute", done => {

            // Creating a container component (BlockContainerComponent) to include
            // the component under test (Block)
            @Component({ selector: 'test-container-component', template: htmlTemplate, directives: [MainBlockComponent] })
            class BlockContainerComponent {
            }

            // uses the TestComponentBuilder instance to initialize the component
            tcb.createAsync(BlockContainerComponent).then(fixture => {
                // and here we can inspect and run the test assertions
                // let myComponent: MainBlockComponent = fixture.componentInstance;

                // assure the block object inside the Block matches
                // the provided through the parent component
                expect(fixture.debugElement.queryAll('[ui-view="mainBlockContent"]').length).toEqual(1);
                done();
            });
        });
    });
});
