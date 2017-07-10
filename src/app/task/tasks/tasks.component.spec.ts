import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { TranslatorService } from './../../shared/services/translator.service';
import { TaskService } from './../../../lib/ng-noosfero-api/http/task.service';
import { MomentModule } from 'angular2-moment';
import { FormsModule } from '@angular/forms';
import { TaskListComponent } from './../task-list/task-list.component';
import { PaginationModule } from 'ngx-bootstrap';
import * as helpers from '../../../spec/helpers';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { TasksComponent } from './tasks.component';
import { AuthEvents } from './../../login';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe("Components", () => {
    describe("Tasks Component", () => {
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<TasksComponent>;
        let component: TasksComponent;

        let tasks = [{ id: 1 }, { id: 2 }];

        beforeEach(async(() => {
            spyOn(mocks.taskService, 'getAllPending').and.returnValue(Promise.resolve({ headers: { get: () => { } }, data: tasks }));
            TestBed.configureTestingModule({
                declarations: [TasksComponent],
                providers: [
                    { provide: TranslatorService, useValue: mocks.translatorService },
                    { provide: TaskService, useValue: mocks.taskService }
                ],
                schemas: [NO_ERRORS_SCHEMA],
                imports: [RouterTestingModule, PaginationModule.forRoot(), FormsModule, TranslateModule.forRoot()]
            });
            fixture = TestBed.createComponent(TasksComponent);
            component = fixture.componentInstance;
        }));

        it("load person tasks", () => {
            fixture.detectChanges();
            expect(TestBed.get(TaskService).getAllPending).toHaveBeenCalled();
        });

        it("load person tasks with page parameter", () => {
            component.types = "AddFriend";
            fixture.detectChanges();
            expect(TestBed.get(TaskService).getAllPending).toHaveBeenCalledWith({ content_type: component.types, page: 1, per_page: 5 });
        });
    });
});
