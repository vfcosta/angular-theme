import { MomentModule } from 'angular2-moment';
import { TranslatePipe } from './../../shared/pipes/translate-pipe';
import { FormsModule } from '@angular/forms';
import { TaskListComponent } from './../task-list/task-list.component';
import { PaginationModule } from 'ngx-bootstrap';
import * as helpers from "../../../spec/helpers";
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { TasksComponent } from './tasks.component';
import { AuthEvents } from "./../../login";
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe("Components", () => {
    describe("Tasks Component", () => {
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<TasksComponent>;
        let component: TasksComponent;

        let tasks = [{ id: 1 }, { id: 2 }];

        beforeEach(async(() => {
            spyOn(mocks.taskService, 'getAllPending').and.returnValue(Promise.resolve({ headers: () => { }, data: tasks }));
            TestBed.configureTestingModule({
                declarations: [TasksComponent, TranslatePipe],
                providers: [
                    { provide: "translatorService", useValue: mocks.translatorService },
                    { provide: "taskService", useValue: mocks.taskService }
                ],
                schemas: [NO_ERRORS_SCHEMA],
                imports: [PaginationModule.forRoot(), FormsModule]
            });
            fixture = TestBed.createComponent(TasksComponent);
            component = fixture.componentInstance;
        }));

        it("load person tasks", () => {
            fixture.detectChanges();
            expect(TestBed.get('taskService').getAllPending).toHaveBeenCalled();
        });

        it("load person tasks with page parameter", () => {
            component.taskTypes = "AddFriend";
            fixture.detectChanges();
            expect(TestBed.get('taskService').getAllPending).toHaveBeenCalledWith({ content_type: component.taskTypes, page: 1, per_page: 5 });
        });
    });
});
