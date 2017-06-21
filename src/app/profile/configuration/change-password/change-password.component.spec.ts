import { TranslatorService } from './../../../shared/services/translator.service';
import { UserService } from './../../../../lib/ng-noosfero-api/http/user.service';
import { ChangePasswordComponent } from './change-password.component';
import { TranslatePipe } from './../../../shared/pipes/translate-pipe';
import { By } from '@angular/platform-browser';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as helpers from "../../../../spec/helpers";
import {
    FormsModule, NG_VALIDATORS, AbstractControl,
    NgForm, FormControl
} from '@angular/forms';

describe("Components", () => {

    describe("Change user password", () => {
        let fixture: ComponentFixture<ChangePasswordComponent>;
        let component: ChangePasswordComponent;
        let userService = jasmine.createSpyObj("userService", ["changePassword"]);
        let $state = jasmine.createSpyObj("$state", ["go"]);
        let $event = jasmine.createSpyObj("$event", ["preventDefault"]);
        $event.preventDefault = jasmine.createSpy("preventDefault");
        userService.changePassword = jasmine.createSpy("changePassword").and.returnValue(Promise.resolve({}));
        let newPasswordConfirmation = jasmine.createSpyObj("newPasswordConfirmation", ["setBackendErrors"]);
        newPasswordConfirmation.pushError = jasmine.createSpy("pushError");

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule],
                declarations: [ChangePasswordComponent, TranslatePipe],
                providers: [
                    { provide: UserService, useValue: userService },
                    { provide: "notificationService", useValue: helpers.mocks.notificationService },
                    { provide: TranslatorService, useValue: helpers.mocks.translatorService },
                    { provide: "$state", useValue: $state },
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(ChangePasswordComponent);
                component = fixture.componentInstance;
                component.profile = <noosfero.Profile>{ id: 1, identifier: 'profile1' };
            });
        }));

        it("change password successfully", fakeAsync(done => {
            component.current_password = 'teste';
            component.new_password = 'teste123';
            component.new_password_confirmation = 'teste123';
             // component.newPasswordConfirmation = newPasswordConfirmation;
            fixture.detectChanges();
            component.save($event);
            tick();
            expect(component.errors).toBeNull();
        }));

        it("new password must be equals to new confirmation password", fakeAsync(done => {
            component.current_password = 'teste';
            component.new_password = 'teste123';
            component.new_password_confirmation = 'teste1234';
            component.newPasswordConfirmation = newPasswordConfirmation;
            fixture.detectChanges();
            tick();
            expect(component.save($event)).toEqual(false);
        }));

    });
});