import { Provider, provide, Component } from 'ng-forward';
import * as helpers from "../../../../spec/helpers";
import { ComponentTestHelper, createClass } from '../../../../spec/component-test-helper';
import { AddFriendTaskAcceptComponent } from './add-friend-task-accept.component';

const htmlTemplate: string = '<abuse-complaint-task-accept [task]="ctrl.task"></abuse-complaint-task-accept>';

describe("Components", () => {

    describe("Add Friend Task Accept Component", () => {

        let helper: ComponentTestHelper<AddFriendTaskAcceptComponent>;
        let confirmationTask = {
                group_for_friend: 'group1'
            };
        let taskService = jasmine.createSpyObj("taskService", ["get"]);
        taskService.get = jasmine.createSpy("get").and.returnValue(Promise.resolve({ headers: () => { }, data: confirmationTask }));

        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [AddFriendTaskAcceptComponent],
                providers: [
                    helpers.createProviderToValue("TaskService", taskService)
                ].concat(helpers.provideFilters("translateFilter")),
                properties: { task: confirmationTask }
            });
            helper = new ComponentTestHelper<AddFriendTaskAcceptComponent>(cls, done);
        });

        it("should the add friend have a group named", () => {
            let reason = 'group1';
            expect(helper.component.confirmationTask.group_for_friend).toEqual(reason);
        });
    });

});