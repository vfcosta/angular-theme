import { EventsHubService } from './../../shared/services/events-hub.service';
import { AuthService } from './../../login/auth.service';
import { TaskService } from './../../../lib/ng-noosfero-api/http/task.service';
import { SessionService } from './../../login/session.service';
import { TranslatePipe } from './../../shared/pipes/translate-pipe';
import * as helpers from "../../../spec/helpers";
import { TasksMenuComponent } from './tasks-menu.component';
import { AuthEvents } from "./../../login";
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe("Components", () => {
    describe("Task Menu Component", () => {
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<TasksMenuComponent>;
        let component: TasksMenuComponent;
        let tasks = [{ id: 1 }, { id: 2 }];

        beforeEach(async(() => {
            spyOn(mocks.taskService, 'getAllPending').and.returnValue(Promise.resolve({ headers: () => { }, data: tasks }));
            TestBed.configureTestingModule({
                declarations: [TasksMenuComponent, TranslatePipe],
                providers: [
                    { provide: "translatorService", useValue: mocks.translatorService },
                    { provide: TaskService, useValue: mocks.taskService },
                    { provide: SessionService, useValue: mocks.sessionService },
                    { provide: AuthService, useValue: mocks.authService },
                    { provide: EventsHubService, useValue: mocks.eventsHubService }
                ],
                schemas: [NO_ERRORS_SCHEMA],
                imports: []
            });
            fixture = TestBed.createComponent(TasksMenuComponent);
            component = fixture.componentInstance;
        }));

        it("load person tasks", () => {
            fixture.detectChanges();
            expect(TestBed.get(TaskService).getAllPending).toHaveBeenCalled();
        });

        it("load person tasks when receive a login event", () => {
            component.loadTasks = jasmine.createSpy("loadTasks");
            component.ngOnInit();
            (<any>component['authService'])[AuthEvents[AuthEvents.loginSuccess]].next({});
            expect(component.loadTasks).toHaveBeenCalled();
        });

        it("load person tasks with page parameter", () => {
            component.taskTypes = ['AddFriend'];
            fixture.detectChanges();
            expect(TestBed.get(TaskService).getAllPending).toHaveBeenCalledWith({content_type: 'AddFriend', per_page: 5 });
        });
    });
});
