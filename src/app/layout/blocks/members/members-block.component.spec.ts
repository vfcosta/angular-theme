import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
import {Provider, Input, provide, Component} from 'ng-forward';
import {MembersBlockComponent} from './members-block.component';
import {ComponentTestHelper, createClass} from './../../../../spec/component-test-helper';

const htmlTemplate: string = '<noosfero-members-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-members-block>';

const tcb = new TestComponentBuilder();

describe("Components", () => {
    describe("Members Block Component", () => {

        let helper: ComponentTestHelper<MembersBlockComponent>;

        let providers = [
            new Provider('ProfileService', {
                useValue: {
                    getProfileMembers: (profileId: number, filters: any): any => {
                        return Promise.resolve({ data: { people: [{ identifier: "person1" }] } });
                    }
                }
            }),
        ];

        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            // Custom properties for the component
            let properties = { owner: { id: 1 } };
            // Create the component bed for the test.
            let cls = createClass({
                template: htmlTemplate,
                directives: [MembersBlockComponent],
                providers: providers,
                properties: properties
            });
            helper = new ComponentTestHelper<MembersBlockComponent>(cls, done);
        });

        it("get members of the block owner", () => {
            expect(helper.component.members[0].identifier).toEqual("person1");
        });

        it("render the profile image for each member", () => {
            expect(helper.all("noosfero-profile-image").length).toEqual(1);
        });

    });
});
