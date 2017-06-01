import { FormsModule } from '@angular/forms';
import { TranslatePipe } from './../../../shared/pipes/translate-pipe';
import * as helpers from "../../../../spec/helpers";
import { AddMemberTaskAcceptComponent } from './add-member-task-accept.component';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe("Components", () => {
    describe("Add Member Task Accept Component", () => {
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<AddMemberTaskAcceptComponent>;
        let component: AddMemberTaskAcceptComponent;
        let roles = [{ id: 1 }, { id: 2 }];
        let task = <any>{ target: { id: 5 } };
        beforeEach(async(() => {
            spyOn(mocks.roleService, "getByProfile").and.returnValue(Promise.resolve({ headers: () => { }, data: roles }));
            TestBed.configureTestingModule({
                declarations: [AddMemberTaskAcceptComponent, TranslatePipe],
                providers: [
                    { provide: "translatorService", useValue: mocks.translatorService },
                    { provide: "articleService", useValue: mocks.articleService },
                    { provide: "roleService", useValue: mocks.roleService }
                ],
                schemas: [NO_ERRORS_SCHEMA],
                imports: [FormsModule]
            });
            fixture = TestBed.createComponent(AddMemberTaskAcceptComponent);
            component = fixture.componentInstance;
            component.task = task;
            component.confirmationTask = task;
        }));

        it("insert role id in roles list when toggle selection", () => {
            fixture.detectChanges();
            let role = { id: 1 };
            component.toggleSelection(<any>role);
            expect(component.confirmationTask.roles).toEqual([role.id]);
        });

        it("remove role id from roles list when toggle selection", () => {
            let role = { id: 1 };
            component.confirmationTask.roles = [role.id];
            component.toggleSelection(<any>role);
            expect(component.confirmationTask.roles).toEqual([]);
        });
    });
});
