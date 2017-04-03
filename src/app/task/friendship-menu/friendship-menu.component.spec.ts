import { FriendshipMenuComponent } from './friendship-menu.component';
import { Provider, provide, Component } from 'ng-forward';
import * as helpers from "../../../spec/helpers";
import { ComponentTestHelper, createClass } from '../../../spec/component-test-helper';
import { AuthEvents } from "./../../login";

const htmlTemplate: string = '<friendship-menu></friendship-menu>';

describe("Components", () => {
    describe("Add Friend Task Menu Component", () => {

        let helper: ComponentTestHelper<FriendshipMenuComponent>;
        let tasks = [{ id: 1 }, { id: 2 }];
        let taskService = jasmine.createSpyObj("taskService", ["getAllPending"]);
        let eventsHubService = jasmine.createSpyObj("eventsHubService", ["subscribeToEvent", "emitEvent"]);
        let $stateParams = jasmine.createSpyObj("$stateParams", ["profile", "taskTypes"]);

        beforeEach(() => {
            taskService.getAllPending = jasmine.createSpy("getAllPending").and.returnValue(Promise.resolve({ headers: () => { }, data: tasks }));
            $stateParams.taskTypes = 'AddFriend';
            beforeEach(angular.mock.module("templates"));
        });

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [FriendshipMenuComponent],
                providers: [
                    helpers.createProviderToValue("TaskService", taskService),
                    helpers.createProviderToValue("EventsHubService", eventsHubService),
                    helpers.createProviderToValue('SessionService', helpers.mocks.sessionWithCurrentUser({})),
                    helpers.createProviderToValue('AuthService', helpers.mocks.authService),
                    helpers.createProviderToValue('$stateParams', $stateParams)
                ]
            });
            helper = new ComponentTestHelper<FriendshipMenuComponent>(cls, done);
        });

        it("load person add friend tasks when receive a login event", () => {
            helper.component.loadTasks = jasmine.createSpy("loadTasks");
            helper.component.ngOnInit();
            (<any>helper.component['authService'])[AuthEvents[AuthEvents.loginSuccess]].next({});
            expect(helper.component.loadTasks).toHaveBeenCalled();
        });

        it("load person add friend tasks with page parameter", () => {
            expect(taskService.getAllPending).toHaveBeenCalledWith({content_type: $stateParams.taskTypes, per_page: 5 });
        });
    });
});
