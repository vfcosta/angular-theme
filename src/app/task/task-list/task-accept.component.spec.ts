import { TranslatorService } from './../../shared/services/translator.service';
import { RoleService } from './../../../lib/ng-noosfero-api/http/role.service';
import { By } from '@angular/platform-browser';
import { TranslatePipe } from './../../shared/pipes/translate-pipe';
import { TaskAcceptComponent } from './task-accept.component';
import * as helpers from "../../../spec/helpers";
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe("Components", () => {
    describe("Task Accept Component", () => {
        let mocks = helpers.getMocks();
        let task = <noosfero.Task>{ id: 1, type: "AddMember" };
        let fixture: ComponentFixture<TaskAcceptComponent>;
        let component: TaskAcceptComponent;

        beforeEach(async(() => {
            let taskAcceptComponent = {task: task, confirmationTask: {}};
            TestBed.configureTestingModule({
                declarations: [TaskAcceptComponent],
                providers: [
                    { provide: TranslatorService, useValue: mocks.translatorService },
                    { provide: RoleService, useValue: mocks.roleService },
                ],
                schemas: [NO_ERRORS_SCHEMA],
            });
            fixture = TestBed.createComponent(TaskAcceptComponent);
            component = fixture.componentInstance;
            component.task = task;
        }));

        it("replace element with the specific task accept component", () => {
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css('add-member-task-accept')).length).toEqual(1);
        });
    });
});
