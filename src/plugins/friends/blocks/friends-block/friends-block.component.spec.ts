import { mocks } from './../../../../spec/mocks';
import { FriendsBlockComponent } from './friends-block.component';
import { provide } from 'ng-forward';
import { ComponentTestHelper, createClass } from './../../../../spec/component-test-helper';
import * as helpers from "../../../../spec/helpers";

const htmlTemplate: string = '<noosfero-friends-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-friends-block>';

describe("Components", () => {

    describe("Friends Block Component", () => {

        let helper: ComponentTestHelper<FriendsBlockComponent>;
        let personServiceMock = jasmine.createSpyObj("PersonService", ["getFriends"]);
        let friends = [{id: 2}, {id: 3}, {id: 4}];
        personServiceMock.getFriends = jasmine.createSpy("getFriends").and.returnValue(helpers.mocks.promiseResultTemplate({data: {people: friends}}));

        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [FriendsBlockComponent],
                properties: {
                    block: { settings: {limit: 3} },
                    owner: {id: 1}
                },
                providers: [
                    helpers.createProviderToValue("PersonService", personServiceMock)
                ]
            });
            helper = new ComponentTestHelper<FriendsBlockComponent>(cls, done);
        });

        it("call person service to return friends list", () => {
            expect(personServiceMock.getFriends).toHaveBeenCalledWith(1, { limit: 3 });
        });

        it("list friends", () => {
            expect(helper.all(".friend-item").length).toEqual(3);
        });
    });
});
