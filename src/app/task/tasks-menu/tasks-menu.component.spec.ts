import { Provider, provide, Component } from 'ng-forward';
import * as helpers from "../../../spec/helpers";
import { ComponentTestHelper, createClass } from '../../../spec/component-test-helper';
import { TasksMenuComponent } from './tasks-menu.component';
import { AuthEvents } from "./../../login";

const htmlTemplate: string = '<tasks-menu></tasks-menu>';

describe("Components", () => {
    describe("Task Menu Component", () => {
        let mocks = helpers.getMocks();
        let helper: ComponentTestHelper<TasksMenuComponent>;
        let taskService = jasmine.createSpyObj("taskService", ["getAllPending"]);
        let tasks = [{ id: 1 }, { id: 2 }];
        taskService.getAllPending = jasmine.createSpy("getAllPending").and.returnValue(Promise.resolve({ headers: () => { }, data: tasks }));
        let $stateParams = jasmine.createSpyObj("$stateParams", ["profile", "taskTypes"]);
        $stateParams.taskTypes = 'AddMember,ApproveComment,ApproveArticle,AbuseComplaint,SuggestArticle,CreateCommunity';
        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [TasksMenuComponent],
                providers: [
                    helpers.createProviderToValue("TaskService", taskService),
                    helpers.createProviderToValue("EventsHubService", mocks.eventsHubService),
                    helpers.createProviderToValue('SessionService', helpers.mocks.sessionWithCurrentUser({})),
                    helpers.createProviderToValue('AuthService', helpers.mocks.authService),
                    helpers.createProviderToValue('$stateParams', $stateParams)
                ]
            });
            helper = new ComponentTestHelper<TasksMenuComponent>(cls, done);
        });

        it("load person tasks", () => {
            expect(taskService.getAllPending).toHaveBeenCalled();
        });

        it("load person tasks when receive a login event", () => {
            helper.component.loadTasks = jasmine.createSpy("loadTasks");
            helper.component.ngOnInit();
            (<any>helper.component['authService'])[AuthEvents[AuthEvents.loginSuccess]].next({});
            expect(helper.component.loadTasks).toHaveBeenCalled();
        });


        it("load person tasks with page parameter", () => {
            expect(taskService.getAllPending).toHaveBeenCalledWith({content_type: $stateParams.taskTypes, per_page: 5 });
        });
    });
});
