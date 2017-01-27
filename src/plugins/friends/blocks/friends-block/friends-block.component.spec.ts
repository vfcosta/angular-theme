import { mocks } from './../../../../spec/mocks';
import { FriendsBlockComponent } from './friends-block.component';
import { provide } from 'ng-forward';
import { ComponentTestHelper, createClass } from './../../../../spec/component-test-helper';
import * as helpers from "../../../../spec/helpers";

const htmlTemplate: string = '<noosfero-friends-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-friends-block>';

describe("Components", () => {

    describe("Friends Block Component", () => {

        let helper: ComponentTestHelper<FriendsBlockComponent>;
        let blockServiceMock = jasmine.createSpyObj("BlockService", ["getApiContent"]);
        let friends = [{ id: 2 }, { id: 3 }, { id: 4 }];
        blockServiceMock.getApiContent = jasmine.createSpy("getApiContent").and.returnValue(helpers.mocks.promiseResultTemplate({ people: friends, '#': 3 }));

        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [FriendsBlockComponent],
                properties: {
                    block: { settings: { limit: 3 } },
                    owner: { id: 1 }
                },
                providers: [
                    helpers.createProviderToValue("BlockService", blockServiceMock)
                ]
            });
            helper = new ComponentTestHelper<FriendsBlockComponent>(cls, done);
        });

        it("call person service to return friends list", () => {
            expect(blockServiceMock.getApiContent).toHaveBeenCalledWith(helper.component.block);
        });

        it("list friends", () => {
            expect(helper.all(".friend-item").length).toEqual(3);
        });
    });
});
