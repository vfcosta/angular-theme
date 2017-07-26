import { TranslateModule } from '@ngx-translate/core';
import { TranslatorService } from './../../../shared/services/translator.service';
import { TaskService } from './../../../../lib/ng-noosfero-api/http/task.service';
import { TaskAcceptComponent } from './../../task-list/task-accept.component';
import { Provider, Component } from '@angular/core';
import * as helpers from '../../../../spec/helpers';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { DateFormatPipe } from './../../../shared/pipes/date-format.pipe';
import { AbuseComplaintTaskAcceptComponent } from './abuse-complaint-task-accept.component';
import { NgPipesModule } from 'ngx-pipes';
import { MomentModule } from 'angular2-moment';

const htmlTemplate = '<abuse-complaint-task-accept [task]="ctrl.task"></abuse-complaint-task-accept>';

describe("Components", () => {

    describe("Abuse Complaint Task Accept Component", () => {

        const task = <noosfero.AbuseComplaint>{
                abuse_reports: [{ reason: 'Testing reason message!', reporter: { name: 'User Tester 1', created_at: '2016-01-02 12:30:00' }},
                                { reason: 'Another testing reason message!', reporter: { name: 'User Tester 2', created_at: '2016-02-01 13:00:00' }}
        ]};
        let fixture: ComponentFixture<AbuseComplaintTaskAcceptComponent>;
        let component: AbuseComplaintTaskAcceptComponent;
        const mocks = helpers.getMocks();

        beforeEach(async(() => {
            spyOn(mocks.taskService, 'get').and.returnValue(Promise.resolve( { data: task } ));
            const taskAcceptComponent = {task: task, confirmationTask: {}};
            TestBed.configureTestingModule({
                imports: [NgPipesModule, MomentModule, TranslateModule.forRoot()],
                declarations: [AbuseComplaintTaskAcceptComponent, DateFormatPipe],
                providers: [
                    { provide: TaskService, useValue: mocks.taskService },
                    { provide: TranslatorService, useValue: mocks.translatorService },
                    { provide: "amParseFilter", useValue: mocks.amParseFilter },
                    { provide: TaskAcceptComponent, useValue: taskAcceptComponent },
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            });
            fixture = TestBed.createComponent(AbuseComplaintTaskAcceptComponent);
            component = fixture.componentInstance;
            component.task = task;
        }));


        it("should the abuse complaint have an abuse report with an reason message", () => {
            const reason = 'Testing reason message!';
            expect(component.task['abuse_reports'][0].reason).toEqual(reason);
        });

        it("should the abuse complaint have an abuse report with an reporter", () => {
            const reporter_name = 'User Tester 1';
            expect(component.task['abuse_reports'][0].reporter.name).toEqual(reporter_name);
        });

        it("should the abuse complaint have an abuse report with an create date", () => {
            const created_at = '2016-01-02 12:30:00';
            expect(component.task['abuse_reports'][0].reporter.created_at).toEqual(created_at);
        });

        it("should the abuse complaint have more than one abuse report", () => {
            expect(component.task['abuse_reports'].length).toBeGreaterThan(1);
        });

        it("should not call taskservice get if task target is setted", fakeAsync(() => {
            component.parent.task = <any>{ target: null };
            fixture.detectChanges();
            tick();
            expect(mocks.taskService.get).not.toHaveBeenCalled();
        }));

        it("should set task when task target is setted", fakeAsync(() => {
            component.parent.task = <any>{ target: { identifier: 'test' } };
            fixture.detectChanges();
            tick();
            expect(component.task).toEqual(task);
        }));
    });
});
