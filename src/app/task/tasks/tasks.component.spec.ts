import { Provider, provide, Component } from 'ng-forward';
import * as helpers from "../../../spec/helpers";
import { ComponentTestHelper, createClass } from '../../../spec/component-test-helper';
import { TasksComponent } from './tasks.component';
import { AuthEvents } from "./../../login";

const htmlTemplate: string = '<tasks></tasks>';

describe("Components", () => {
    describe("Task Menu Component", () => {

        let helper: ComponentTestHelper<TasksComponent>;
        let taskService = jasmine.createSpyObj("taskService", ["getAllPending"]);
        let tasks = [{ id: 1 }, { id: 2 }];
        taskService.getAllPending = jasmine.createSpy("getAllPending").and.returnValue(Promise.resolve({ headers: () => { }, data: tasks }));
        let $stateParams = jasmine.createSpyObj("$stateParams", ["profile", "taskTypes"]);
        // $stateParams.taskTypes = 'AddMember,ApproveComment,ApproveArticle,AbuseComplaint,SuggestArticle,CreateCommunity,AddFriend';
        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [TasksComponent],
                providers: [
                    helpers.createProviderToValue("TaskService", taskService),
                    helpers.createProviderToValue("$stateParams", $stateParams)
                ]
            });
            helper = new ComponentTestHelper<TasksComponent>(cls, done);
        });

        it("load person tasks", () => {
            expect(taskService.getAllPending).toHaveBeenCalled();
        });

        it("load person tasks with page parameter", () => {
            expect(taskService.getAllPending).toHaveBeenCalledWith({ content_type: $stateParams.taskTypes, page: 1, per_page: 5 });
        });
    });
});
