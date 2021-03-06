import { TranslateModule } from '@ngx-translate/core';
import { TranslatorService } from './../../../shared/services/translator.service';
import { TaskService } from './../../../../lib/ng-noosfero-api/http/task.service';
import { TaskAcceptComponent } from './../../task-list/task-accept.component';
import { FormsModule } from '@angular/forms';
import { Provider, Component } from '@angular/core';
import * as helpers from '../../../../spec/helpers';
import { AddFriendTaskAcceptComponent } from './add-friend-task-accept.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';

describe("Components", () => {

    describe("Add Friend Task Accept Component", () => {
        const confirmationTaskData = {
                group_for_friend: 'group1'
            };
        const mocks = helpers.getMocks();
        const peopleToInvite = [<noosfero.Person>{ "id": 1, "name": "Person 1" }, <noosfero.Person>{ "id": 3, "name": "Person 3" }];
        let fixture: ComponentFixture<AddFriendTaskAcceptComponent>;
        let component: AddFriendTaskAcceptComponent;

        beforeEach(async(() => {
            spyOn(mocks.taskService, 'get').and.callThrough();
            const taskAcceptComponent = {task: {target: { id: 5 }} , confirmationTask: {}};

            TestBed.configureTestingModule({
                declarations: [AddFriendTaskAcceptComponent],
                providers: [
                    { provide: TaskService, useValue: mocks.taskService },
                    { provide: TranslatorService, useValue: mocks.translatorService },
                    { provide: TaskAcceptComponent, useValue: taskAcceptComponent },
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                imports: [FormsModule, TranslateModule.forRoot()]
            });
            fixture = TestBed.createComponent(AddFriendTaskAcceptComponent);
            component = fixture.componentInstance;
            component.task = <any>{ target: { id: 5 } };
            component.confirmationTask = <noosfero.AddFriend>confirmationTaskData;
        }));

        it("should the add friend have a group named", () => {
            const group = 'group1';
            expect(component.confirmationTask['group_for_friend']).toEqual(group);
        });

        it("should not call taskservice get if task target is setted", () => {
            TestBed.get(TaskAcceptComponent).task = <any>{ target: null };
            fixture.detectChanges();
            expect(mocks.taskService.get).not.toHaveBeenCalled();
        });

        it("should set task when task target is setted", fakeAsync(() => {
            component.ngOnInit();
            fixture.detectChanges();
            tick();
            expect(component.task).toEqual(<any>confirmationTaskData);
        }));
    });

});
