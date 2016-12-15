import { TestComponentBuilder } from 'ng-forward/cjs/testing/test-component-builder';
import { Pipe, Input, provide, Component } from 'ng-forward';
import { provideFilters } from '../../../../spec/helpers';

import { LinkListBlockComponent } from './link-list-block.component';

const tcb = new TestComponentBuilder();

const htmlTemplate: string = '<noosfero-link-list-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-link-list-block>';


describe("Components", () => {

    describe("Link List Block Component", () => {

        beforeEach(angular.mock.module("templates"));

        it("receives the block and the owner as inputs", done => {

            // Creating a container component (BlockContainerComponent) to include
            // the component under test (Block)
            @Component({ selector: 'test-container-component', template: htmlTemplate, directives: [LinkListBlockComponent] })
            class BlockContainerComponent {
                block = { type: 'Block' };
                owner = { name: 'profile-name' };
                constructor() {
                }
            }

            // uses the TestComponentBuilder instance to initialize the component
            // .overrideView(LinkListBlock, { template: 'asdasdasd', pipes: [NoosferoTemplate] })
            tcb.createAsync(BlockContainerComponent).then(fixture => {
                // and here we can inspect and run the test assertions
                let myComponent: LinkListBlockComponent = fixture.componentInstance;

                // assure the block object inside the Block matches
                // the provided through the parent component
                expect(myComponent.block.type).toEqual("Block");
                expect(myComponent.owner.name).toEqual("profile-name");
                done();
            });
        });


        it("display links stored in block settings", done => {

            @Component({
                selector: 'test-container-component',
                template: htmlTemplate,
                directives: [LinkListBlockComponent],
                providers: provideFilters("noosferoTemplateFilter", "translateFilter")
            })
            class CustomBlockType {
                block: any = { settings: { links: [{ name: 'link1', address: 'address1' }, { name: 'link2', address: 'address2' }] } };
                owner: any = { name: 'profile-name' };
            }
            tcb.createAsync(CustomBlockType).then(fixture => {
                expect(fixture.debugElement.queryAll(".link-list-block a").length).toEqual(2);
                done();
            });
        });

    });

});
