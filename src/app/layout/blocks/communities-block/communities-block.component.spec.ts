import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
import {Provider, Input, provide, Component} from 'ng-forward';

import {CommunitiesBlockComponent} from './communities-block.component';

const htmlTemplate: string = '<noosfero-communities-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-communities-block>';

const tcb = new TestComponentBuilder();

describe("Components", () => {
    describe("Communities Block Component", () => {

        beforeEach(angular.mock.module("templates"));

        let state = jasmine.createSpyObj("state", ["go"]);
        let providers = [
            new Provider('truncateFilter', { useValue: () => { } }),
            new Provider('stripTagsFilter', { useValue: () => { } }),
            new Provider('$state', { useValue: state }),
            new Provider('CommunityService', {
                useValue: {
                    list: (profileId: number, params: any): any => {
                        return Promise.resolve({ data: [{ identifier: "community1" }] });
                    }
                }
            }),
        ];
        @Component({ selector: 'test-container-component', template: htmlTemplate, directives: [CommunitiesBlockComponent], providers: providers })
        class BlockContainerComponent {
            block = { type: 'Block', settings: {} };
            owner = { name: 'profile-name' };
        }

        it("get communities", done => {
            tcb.createAsync(BlockContainerComponent).then(fixture => {
                let block: CommunitiesBlockComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                expect(block.profiles).toEqual([{ identifier: "community1" }]);
                done();
            });
        });

        it("render the profile image for each community", done => {
            tcb.createAsync(BlockContainerComponent).then(fixture => {
                fixture.debugElement.getLocal("$rootScope").$apply();
                expect(fixture.debugElement.queryAll("noosfero-profile-image").length).toEqual(1);
                done();
            });
        });

    });
});
