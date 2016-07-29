import { Provider, provide, Component } from 'ng-forward';
import * as helpers from "../../../spec/helpers";
import { TaskAcceptComponent } from './task-accept.component';

const htmlTemplate: string = '<task-accept [task]="ctrl.task"></task-accept>';

describe("Components", () => {
    describe("Task Accept Component", () => {

        let task = { id: 1, type: "AddMember" };
        let roleService = jasmine.createSpyObj("roleService", ["getByProfile"]);

        beforeEach(angular.mock.module("templates"));

        function createComponent() {
            return helpers.quickCreateComponent({
                template: htmlTemplate,
                directives: [TaskAcceptComponent],
                properties: { task: task },
                providers: [
                    helpers.createProviderToValue("RoleService", roleService)
                ].concat(helpers.provideFilters("translateFilter"))
            });
        }

        it("replace element with the specific task accept component", (done: Function) => {
            createComponent().then(fixture => {
                expect(fixture.debugElement.queryAll("add-member-task-accept").length).toBe(1);
                done();
            });
        });
    });
});
