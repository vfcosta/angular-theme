import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
import {Provider, Input, provide, Component} from 'ng-forward';

import {PeopleBlockComponent} from './people-block.component';

const htmlTemplate: string = '<noosfero-people-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-people-block>';

const tcb = new TestComponentBuilder();

describe("Components", () => {
    describe("People Block Component", () => {

        beforeEach(angular.mock.module("templates"));

        let state = jasmine.createSpyObj("state", ["go"]);
        let providers = [
            new Provider('truncateFilter', { useValue: () => { } }),
            new Provider('stripTagsFilter', { useValue: () => { } }),
            new Provider('$state', { useValue: state }),
            new Provider('EnvironmentService', {
                useValue: {
                    getEnvironmentPeople: (filters: any): any => {
                        return Promise.resolve([{ identifier: "person1" }]);
                    }
                }
            }),
        ];
        @Component({ selector: 'test-container-component', template: htmlTemplate, directives: [PeopleBlockComponent], providers: providers })
        class BlockContainerComponent {
            block = { type: 'Block', settings: {} };
            owner = { name: 'profile-name' };
            constructor() {
            }
        }

        it("get people of the block owner", done => {
            tcb.createAsync(BlockContainerComponent).then(fixture => {
                let block: PeopleBlockComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                expect(block.people).toEqual([{ identifier: "person1" }]);
                done();
            });
        });

        it("render the profile image for each person", done => {
            tcb.createAsync(BlockContainerComponent).then(fixture => {
                fixture.debugElement.getLocal("$rootScope").$apply();
                expect(fixture.debugElement.queryAll("noosfero-profile-image").length).toEqual(1);
                done();
            });
        });

    });
});