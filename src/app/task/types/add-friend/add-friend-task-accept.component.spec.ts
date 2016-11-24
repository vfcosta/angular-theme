import { Provider, provide, Component } from 'ng-forward';
import * as helpers from "../../../../spec/helpers";
import { ComponentTestHelper, createClass } from '../../../../spec/component-test-helper';
import { AddFriendTaskAcceptComponent } from './add-friend-task-accept.component';

const htmlTemplate: string = '<add-friend-task-accept [task]="ctrl.task" [confirmation-task]="ctrl.confirmationTask"></add-friend-task-accept>';

describe("Components", () => {

    describe("Add Friend Task Accept Component", () => {

        let helper: ComponentTestHelper<AddFriendTaskAcceptComponent>;
        let task = <any>{ target: { id: 5 } };
        let confirmationTaskData = {
                group_for_friend: 'group1'
            };
        let taskService = jasmine.createSpyObj("taskService", ["put"]);
        taskService.get = jasmine.createSpy("put").and.returnValue(Promise.resolve({ headers: () => { }, data: confirmationTaskData }));

        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [AddFriendTaskAcceptComponent],
                providers: [
                    helpers.createProviderToValue("TaskService", taskService)
                ].concat(helpers.provideFilters("translateFilter")),
                properties: { task: task, confirmationTask: confirmationTaskData }
            });
            helper = new ComponentTestHelper<AddFriendTaskAcceptComponent>(cls, done);
        });

        it("should the add friend have a group named", () => {
            let group = 'group1';
            expect(helper.component.confirmationTask.group_for_friend).toEqual(group);
        });
    });

});