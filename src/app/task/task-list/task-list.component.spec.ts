import { TranslateModule } from '@ngx-translate/core';
import { NotificationService } from './../../shared/services/notification.service';
import { EventsHubService } from './../../shared/services/events-hub.service';
import { TaskService } from './../../../lib/ng-noosfero-api/http/task.service';
import { TaskComponent } from './../task.component';
import { MomentModule } from 'angular2-moment';
import { Directive, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { ProfileImageComponent } from './../../profile/image/profile-image.component';
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
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<TaskListComponent>;
        let component: TaskListComponent;

        let taskService = jasmine.createSpyObj("taskService", ["getAllPending"]);
        let tasks = [{ id: 1 }, { id: 2 }];
        taskService.getAllPending = jasmine.createSpy("getAllPending").and.returnValue(Promise.resolve({ headers: () => { }, data: tasks }));

        beforeEach(async(() => {
            spyOn(mocks.eventsHubService, 'emitEvent');
            spyOn(mocks.$modal, 'open');
            let scope = helpers.mocks.scopeWithEvents;
            let profileService = jasmine.createSpyObj("profileService", ["upload"]);

            TestBed.configureTestingModule({
                imports: [MomentModule, TranslateModule.forRoot()],
                declarations: [TaskListComponent, ProfileImageComponent, DynamicComponentMock],
                providers: [
                    { provide: TaskService, useValue: taskService },
                    { provide: EventsHubService, useValue: mocks.eventsHubService },
                    { provide: NotificationService, useValue: helpers.mocks.notificationService },
                    { provide: "$uibModal", useValue: mocks.$modal },
                    { provide: "$scope", useValue: helpers.mocks.scopeWithEvents }
                ],
                schemas: [NO_ERRORS_SCHEMA]
            });
            fixture = TestBed.createComponent(TaskListComponent);
            component = fixture.componentInstance;
            component.tasks = <any>tasks;
        }));

        it("open confirmation modal when it has details to accept a task", () => {
            let task = { accept_details: true };
            component.accept(<any>task);
            expect(mocks.$modal.open).toHaveBeenCalled();
        });

        it("open confirmation modal when it has details to reject a task", () => {
            let task = { reject_details: true };
            component.reject(<any>task);
            expect(mocks.$modal.open).toHaveBeenCalled();
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
