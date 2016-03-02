import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
import {Input, provide, Component} from 'ng-forward';

import {Block} from './block.component';

const tcb = new TestComponentBuilder();

const htmlTemplate: string = '<noosfero-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-block>';


describe("Block Component", () => {

    // the karma preprocessor html2js transform the templates html into js files which put
    // the templates to the templateCache into the module templates
    // we need to load the module templates here as the template for the 
    // component Block will be load on our tests
    beforeEach(angular.mock.module("templates"));

    it("receives the block and the owner as inputs", done => {

        // Creating a container component (BlockContainerComponent) to include 
        // the component under test (Block)  
        @Component({ selector: 'test-container-component', template: htmlTemplate, directives: [Block] })
        class BlockContainerComponent {
            block = { type: 'Block' };
            owner = { name: 'profile-name' };
            constructor() {
            }
        }

        // uses the TestComponentBuilder instance to initialize the component
        tcb
            .createAsync(BlockContainerComponent).then(fixture => {
                // and here we can inspect and run the test assertions 
                let myComponent: Block = fixture.componentInstance;

                // assure the block object inside the Block matches
                // the provided through the parent component
                expect(myComponent.block.type).toEqual("Block");
                expect(myComponent.owner.name).toEqual("profile-name");
                done();
            });
    });


    it("renders a component which matches to the block type", done => {
        // CustomBlock component created to check if it will be used
        // when a block with type 'CustomBlock' is provided to the noosfero-block (Block)
        // *** Important *** - the selector is what ng-forward uses to define the name of the directive provider
        @Component({ selector: 'noosfero-custom-block', template: "<h1>My Custom Block</h1>" })
        class CustomBlock {
            @Input() block: any;
            @Input() owner: any;
        }

        @Component({ selector: 'test-container-component', template: htmlTemplate, directives: [Block, CustomBlock] })
        class CustomBlockType {
            block = { type: 'CustomBlock' };
            owner = { name: 'profile-name' };
            constructor() {
            }
        }
        tcb
            .createAsync(CustomBlockType).then(fixture => {
                let myComponent: CustomBlockType = fixture.componentInstance;
                expect(myComponent.block.type).toEqual("CustomBlock");
                expect(fixture.debugElement.componentViewChildren[0].text()).toEqual("My Custom Block");
                done();
            });
    });


    it("renders the default block when hasn't defined a block type", done => {
        @Component({ selector: 'test-container-component', template: htmlTemplate, directives: [Block] })
        class CustomBlockType {
            block: any = { type: null };
            owner: any = { name: 'profile-name' };
            constructor() {
            }
        }
        tcb
            .createAsync(CustomBlockType).then(fixture => {
                let myComponent: CustomBlockType = fixture.componentInstance;
                expect(myComponent.block.type).toBeNull();
                expect(!!fixture.debugElement.nativeElement.querySelector("noosfero-default-block")).toBeTruthy();
                done();
            });
    });

});
