import { Provider, Component } from '@angular/core';
import * as helpers from "../../../../spec/helpers";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { TranslatePipe } from './../../../shared/pipes/translate-pipe';
import { DateFormatPipe } from './../../../shared/pipes/date-format.ng2.filter';
import { AbuseComplaintTaskAcceptComponent } from './abuse-complaint-task-accept.component';
import { NgPipesModule } from 'ngx-pipes';
import { MomentModule } from 'angular2-moment';

const htmlTemplate: string = '<abuse-complaint-task-accept [task]="ctrl.task"></abuse-complaint-task-accept>';

describe("Components", () => {

    describe("Abuse Complaint Task Accept Component", () => {

        let task = <noosfero.AbuseComplaint>{
                abuse_reports: [{ reason: 'Testing reason message!', reporter: { name: 'User Tester 1', created_at: '2016-01-02 12:30:00' }},
                                { reason: 'Another testing reason message!', reporter: { name: 'User Tester 2', created_at: '2016-02-01 13:00:00' }}
        ]};
        let fixture: ComponentFixture<AbuseComplaintTaskAcceptComponent>;
        let component: AbuseComplaintTaskAcceptComponent;
        let mocks = helpers.getMocks();
        
        beforeEach(async(() => {
            spyOn(mocks.taskService, 'get').and.returnValue(Promise.resolve( task ));

            TestBed.configureTestingModule({
                imports: [NgPipesModule, MomentModule],
                declarations: [AbuseComplaintTaskAcceptComponent, TranslatePipe, DateFormatPipe],
                providers: [
                    { provide: "taskService", useValue: mocks.taskService },
                    { provide: "translatorService", useValue: mocks.translatorService },
                    { provide: "amParseFilter", useValue: mocks.amParseFilter }
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            });
            fixture = TestBed.createComponent(AbuseComplaintTaskAcceptComponent);
            component = fixture.componentInstance;
            component.task = task;
        }));


        it("should the abuse complaint have an abuse report with an reason message", () => {
            let reason = 'Testing reason message!';
            expect(component.task.abuse_reports[0].reason).toEqual(reason);
        });

        it("should the abuse complaint have an abuse report with an reporter", () => {
            let reporter_name = 'User Tester 1';
            expect(component.task.abuse_reports[0].reporter.name).toEqual(reporter_name);
        });

        it("should the abuse complaint have an abuse report with an create date", () => {
            let created_at = '2016-01-02 12:30:00';
            expect(component.task.abuse_reports[0].reporter.created_at).toEqual(created_at);
        });

        it("should the abuse complaint have more than one abuse report", () => {
            expect(component.task.abuse_reports.length).toBeGreaterThan(1);
        });

        it("should not call taskservice get if task target is setted", fakeAsync(() => {
            component.task = <any>{ target: false };
            component.ngOnInit();
            fixture.detectChanges();
            tick();
            expect(mocks.taskService.get).not.toHaveBeenCalled();
        }));

        it("should set task when task target is setted", fakeAsync(() => {
            component.ngOnInit();
            fixture.detectChanges();
            tick(2000);
            expect(component.task).toEqual(task);
        }));
    });
});