import { Directive, Input } from '@angular/core';
import { ProfileImageComponent } from './../../profile/image/profile-image.component';
import { TranslatePipe } from './../../shared/pipes/translate-pipe';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import * as helpers from "../../../spec/helpers";
import { TaskListComponent } from './task-list.component';


@Directive({ selector: '[dynamicComponent]' })
class DynamicComponentMock {
    @Input('dynamicComponent') template: string;
    @Input('dynamicComponentContext') context: any;
}

describe("Components", () => {
    describe("Task List Component", () => {

        let fixture: ComponentFixture<TaskListComponent>;
        let component: TaskListComponent;

        let taskService = jasmine.createSpyObj("taskService", ["getAllPending"]);
        let tasks = [{ id: 1 }, { id: 2 }];
        let modal = helpers.mocks.$modal;
        let eventsHubService = jasmine.createSpyObj("eventsHubService", ["subscribeToEvent", "emitEvent"]);
        taskService.getAllPending = jasmine.createSpy("getAllPending").and.returnValue(Promise.resolve({ headers: () => { }, data: tasks }));

        beforeEach(async(() => {
            let scope = helpers.mocks.scopeWithEvents;
            let profileService = jasmine.createSpyObj("profileService", ["upload"]);
            let permissionService = jasmine.createSpyObj("permissionService", ["isAllowed"]);

            TestBed.configureTestingModule({
                declarations: [TaskListComponent, TranslatePipe, ProfileImageComponent, DynamicComponentMock],
                providers: [
                    { provide: "taskService", useValue: taskService },
                    { provide: "eventsHubService", useValue: eventsHubService },
                    { provide: "notificationService", useValue: helpers.mocks.notificationService },
                    { provide: "$uibModal", useValue: helpers.mocks.$modal },
                    { provide: "$scope", useValue: helpers.mocks.scopeWithEvents }
                ]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(TaskListComponent);
                component = fixture.componentInstance;
                component.tasks = <any>tasks;
            });
        }));

        it("return specific template for a task", () => {
            let task = { type: "AddMember" };
            expect(component.getTaskTemplate(<any>task)).toMatch("task-icon fa fa-fw fa-user-plus");
        });

        it("return the default template for a task", () => {
            let task = { type: "" };
            expect(component.getTaskTemplate(<any>task)).toMatch('not implemented yet');
        });

        it("open confirmation modal when it has details to accept a task", () => {
            let task = { accept_details: true };
            component.accept(<any>task);
            expect(modal.open).toHaveBeenCalled();
        });

        it("open confirmation modal when it has details to reject a task", () => {
            let task = { reject_details: true };
            component.reject(<any>task);
            expect(modal.open).toHaveBeenCalled();
        });

        it("call api directly when it has no details to accept a task", () => {
            let task = { accept_details: false };
            component.callAccept = jasmine.createSpy("callAccept");
            component.accept(<any>task);
            expect(component.callAccept).toHaveBeenCalled();
        });

        it("call api directly when it has no details to reject a task", () => {
            let task = { accept_details: false };
            component.callReject = jasmine.createSpy("callReject");
            component.reject(<any>task);
            expect(component.callReject).toHaveBeenCalled();
        });

        it("call cancel and emit event when accept was called successfully", () => {
            component.currentTask = <any>{ id: 1 };
            let result = helpers.mocks.promiseResultTemplate({ data: { id: 1 } });
            component['taskService'].closeTask = jasmine.createSpy("closeTask").and.returnValue(result);
            component.cancel = jasmine.createSpy("cancel");
            component.callAccept();
            expect(component.cancel).toHaveBeenCalled();
            expect((<any>component)['eventsHubService'].emitEvent).toHaveBeenCalled();
        });

        it("call cancel and emit event when reject was called successfully", () => {
            component.currentTask = <any>{ id: 1 };
            let result = helpers.mocks.promiseResultTemplate({ data: { id: 1 } });
            component['taskService'].closeTask = jasmine.createSpy("closeTask").and.returnValue(result);
            component.cancel = jasmine.createSpy("cancel");
            component.callReject();
            expect(component.cancel).toHaveBeenCalled();
            expect((<any>component)['eventsHubService'].emitEvent).toHaveBeenCalled();
        });

        it("reset currentTask and close modal when call cancel", () => {
            let modalInstance = jasmine.createSpyObj("modalInstance", ["close"]);
            component["modalInstance"] = modalInstance;
            component.currentTask = <any>{ id: 1 };
            component.cancel();
            expect(modalInstance.close).toHaveBeenCalled();
            expect(component.currentTask).toBeNull();
        });

        it("not fail when call cancel with no modalInstance", () => {
            component["modalInstance"] = null;
            component.currentTask = null;
            component.cancel();
        });
    });
});
