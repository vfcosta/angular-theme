import { Provider, provide, Component } from 'ng-forward';
import * as helpers from "../../../spec/helpers";
import { ComponentTestHelper, createClass } from '../../../spec/component-test-helper';
import { TaskListComponent } from './task-list.component';

const htmlTemplate: string = '<task-list [task]="ctrl.task"></task-list>';

describe("Components", () => {
    describe("Task List Component", () => {

        let helper: ComponentTestHelper<TaskListComponent>;
        let taskService = jasmine.createSpyObj("taskService", ["getAllPending"]);
        let tasks = [{ id: 1 }, { id: 2 }];
        let modal = helpers.mocks.$modal;
        let eventsHubService = jasmine.createSpyObj("eventsHubService", ["subscribeToEvent", "emitEvent"]);
        taskService.getAllPending = jasmine.createSpy("getAllPending").and.returnValue(Promise.resolve({ headers: () => { }, data: tasks }));

        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [TaskListComponent],
                providers: [
                    helpers.createProviderToValue("TaskService", taskService),
                    helpers.createProviderToValue("EventsHubService", eventsHubService),
                    helpers.createProviderToValue('NotificationService', helpers.mocks.notificationService),
                    helpers.createProviderToValue('$uibModal', modal),
                ].concat(helpers.provideFilters("groupByFilter")),
                properties: { tasks: tasks }
            });
            helper = new ComponentTestHelper<TaskListComponent>(cls, done);
        });

        it("return specific template for a task", () => {
            let task = { type: "AddMember" };
            expect(helper.component.getTaskTemplate(<any>task)).toEqual("app/task/types/add-member/add-member.html");
        });

        it("return the default template for a task", () => {
            let task = { type: "" };
            expect(helper.component.getTaskTemplate(<any>task)).toEqual("app/task/types/default.html");
        });

        it("open confirmation modal when it has details to accept a task", () => {
            let task = { accept_details: true };
            helper.component.accept(<any>task);
            expect(modal.open).toHaveBeenCalled();
        });

        it("open confirmation modal when it has details to reject a task", () => {
            let task = { reject_details: true };
            helper.component.reject(<any>task);
            expect(modal.open).toHaveBeenCalled();
        });

        it("call api directly when it has no details to accept a task", () => {
            let task = { accept_details: false };
            helper.component.callAccept = jasmine.createSpy("callAccept");
            helper.component.accept(<any>task);
            expect(helper.component.callAccept).toHaveBeenCalled();
        });

        it("call api directly when it has no details to reject a task", () => {
            let task = { accept_details: false };
            helper.component.callReject = jasmine.createSpy("callReject");
            helper.component.reject(<any>task);
            expect(helper.component.callReject).toHaveBeenCalled();
        });

        it("call cancel and emit event when accept was called successfully", () => {
            helper.component.currentTask = <any>{ id: 1 };
            let result = helpers.mocks.promiseResultTemplate({ data: { id: 1 } });
            taskService.closeTask = jasmine.createSpy("closeTask").and.returnValue(result);
            helper.component.cancel = jasmine.createSpy("cancel");
            helper.component.callAccept();
            expect(helper.component.cancel).toHaveBeenCalled();
            expect((<any>helper.component)['eventsHubService'].emitEvent).toHaveBeenCalled();
        });

        it("call cancel and emit event when reject was called successfully", () => {
            helper.component.currentTask = <any>{ id: 1 };
            let result = helpers.mocks.promiseResultTemplate({ data: { id: 1 } });
            taskService.closeTask = jasmine.createSpy("closeTask").and.returnValue(result);
            helper.component.cancel = jasmine.createSpy("cancel");
            helper.component.callReject();
            expect(helper.component.cancel).toHaveBeenCalled();
            expect((<any>helper.component)['eventsHubService'].emitEvent).toHaveBeenCalled();
        });

        it("reset currentTask and close modal when call cancel", () => {
            let modalInstance = jasmine.createSpyObj("modalInstance", ["close"]);
            helper.component["modalInstance"] = modalInstance;
            helper.component.currentTask = <any>{ id: 1 };
            helper.component.cancel();
            expect(modalInstance.close).toHaveBeenCalled();
            expect(helper.component.currentTask).toBeNull();
        });

        it("not fail when call cancel with no modalInstance", () => {
            helper.component["modalInstance"] = null;
            helper.component.currentTask = null;
            helper.component.cancel();
        });
    });
});
