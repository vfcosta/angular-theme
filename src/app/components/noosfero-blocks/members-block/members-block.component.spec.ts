import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
import {Provider, Input, provide, Component} from 'ng-forward';

import {MembersBlock} from './members-block.component';

const htmlTemplate: string = '<noosfero-members-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-members-block>';

const tcb = new TestComponentBuilder();

describe("Members Block Component", () => {

    beforeEach(angular.mock.module("templates"));

    let state = jasmine.createSpyObj("state", ["go"]);
    let providers = [
        new Provider('truncateFilter', { useValue: () => { } }),
        new Provider('stripTagsFilter', { useValue: () => { } }),
        new Provider('$state', { useValue: state }),
        new Provider('ProfileService', {
            useValue: {
                getProfileMembers: (profileId: number, filters: any): any => {
                    return Promise.resolve({ data: { people: [{ identifier: "person1" }] } });
                }
            }
        }),
    ];
    @Component({ selector: 'test-container-component', template: htmlTemplate, directives: [MembersBlock], providers: providers })
    class BlockContainerComponent {
        block = { type: 'Block', settings: {} };
        owner = { name: 'profile-name' };
        constructor() {
        }
    }

    it("get members of the block owner", done => {
        tcb.createAsync(BlockContainerComponent).then(fixture => {
            let block: MembersBlock = fixture.debugElement.componentViewChildren[0].componentInstance;
            expect(block.members).toEqual([{ identifier: "person1" }]);
            done();
        });
    });

    it("render the profile image for each member", done => {
        tcb.createAsync(BlockContainerComponent).then(fixture => {
            fixture.debugElement.getLocal("$rootScope").$apply();
            expect(fixture.debugElement.queryAll("noosfero-profile-image").length).toEqual(1);
            done();
        });
    });

});
