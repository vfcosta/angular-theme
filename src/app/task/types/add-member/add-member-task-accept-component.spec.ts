import { Provider, provide, Component } from 'ng-forward';
import * as helpers from "../../../../spec/helpers";
import { ComponentTestHelper, createClass } from '../../../../spec/component-test-helper';
import { AddMemberTaskAcceptComponent } from './add-member-task-accept.component';

const htmlTemplate: string = '<add-member-task-accept [task]="ctrl.task" [confirmation-task]="ctrl.confirmationTask"></add-member-task-accept>';

describe("Components", () => {
    describe("Add Member Task Accept Component", () => {

        let helper: ComponentTestHelper<AddMemberTaskAcceptComponent>;
        let roleService = jasmine.createSpyObj("roleService", ["getByProfile"]);
        let roles = [{ id: 1 }, { id: 2 }];
        let task = <any>{ target: { id: 5 } };
        roleService.getByProfile = jasmine.createSpy("getByProfile").and.returnValue(Promise.resolve({ headers: () => { }, data: roles }));

        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [AddMemberTaskAcceptComponent],
                providers: [
                    helpers.createProviderToValue("RoleService", roleService)
                ].concat(helpers.provideFilters("translateFilter")),
                properties: { task: task, confirmationTask: task }
            });
            helper = new ComponentTestHelper<AddMemberTaskAcceptComponent>(cls, done);
        });

        it("insert role id in roles list when toggle selection", () => {
            let role = { id: 1 };
            helper.component.toggleSelection(<any>role);
            expect((<any>helper.component.confirmationTask)['roles']).toEqual([role.id]);
        });

        it("remove role id from roles list when toggle selection", () => {
            let role = { id: 1 };
            (<any>helper.component.confirmationTask)['roles'] = [role.id];
            helper.component.toggleSelection(<any>role);
            expect((<any>helper.component.confirmationTask)['roles']).toEqual([]);
        });
    });
});
