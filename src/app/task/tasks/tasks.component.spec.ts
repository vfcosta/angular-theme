import { Provider, provide, Component } from 'ng-forward';
import * as helpers from "../../../spec/helpers";
import { ComponentTestHelper, createClass } from '../../../spec/component-test-helper';
import { TasksComponent } from './tasks.component';
import { AuthEvents } from "./../../login";

const htmlTemplate: string = '<tasks></tasks>';

describe("Components", () => {
    describe("Task Menu Component", () => {

        let helper: ComponentTestHelper<TasksComponent>;
        let taskService = jasmine.createSpyObj("taskService", ["getAllPending"]);
        let tasks = [{ id: 1 }, { id: 2 }];
        taskService.getAllPending = jasmine.createSpy("getAllPending").and.returnValue(Promise.resolve({ headers: () => { }, data: tasks }));

        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [TasksComponent],
                providers: [
                    helpers.createProviderToValue("TaskService", taskService)
                ]
            });
            helper = new ComponentTestHelper<TasksComponent>(cls, done);
        });

        it("load person tasks", () => {
            expect(taskService.getAllPending).toHaveBeenCalled();
        });
    });
});
