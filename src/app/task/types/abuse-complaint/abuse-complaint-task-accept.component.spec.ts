import { Provider, provide, Component } from 'ng-forward';
import * as helpers from "../../../../spec/helpers";
import { ComponentTestHelper, createClass } from '../../../../spec/component-test-helper';
import { AbuseComplaintTaskAcceptComponent } from './abuse-complaint-task-accept.component';

const htmlTemplate: string = '<abuse-complaint-task-accept [task]="ctrl.task"></abuse-complaint-task-accept>';

describe("Components", () => {

    describe("Abuse Complaint Task Accept Component", () => {

        let helper: ComponentTestHelper<AbuseComplaintTaskAcceptComponent>;
        let task = {
                abuse_reports: [{ reason: 'Testing reason message!', reporter: { name: 'User Tester 1', created_at: '2016-01-02 12:30:00' }},
                                { reason: 'Another testing reason message!', reporter: { name: 'User Tester 2', created_at: '2016-02-01 13:00:00' }}
        ]};
        let taskService = jasmine.createSpyObj("taskService", ["get"]);
        taskService.get = jasmine.createSpy("get").and.returnValue(Promise.resolve({ headers: () => { }, data: task }));

        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [AbuseComplaintTaskAcceptComponent],
                providers: [
                    helpers.createProviderToValue("TaskService", taskService)
                ].concat(helpers.provideFilters("translateFilter")),
                properties: { task: task }
            });
            helper = new ComponentTestHelper<AbuseComplaintTaskAcceptComponent>(cls, done);
        });

        it("should the abuse complaint have an abuse report with an reason message", () => {
            let reason = 'Testing reason message!';
            expect(helper.component.task.abuse_reports[0].reason).toEqual(reason);
        });

        it("should the abuse complaint have an abuse report with an reporter", () => {
            let reporter_name = 'User Tester 1';
            expect(helper.component.task.abuse_reports[0].reporter.name).toEqual(reporter_name);
        });

        it("should the abuse complaint have an abuse report with an create date", () => {
            let created_at = '2016-01-02 12:30:00';
            expect(helper.component.task.abuse_reports[0].reporter.created_at).toEqual(created_at);
        });

        it("should the abuse complaint have more than one abuse report", () => {
            expect(helper.component.task.abuse_reports.length).toBeGreaterThan(1);
        });

    });

});