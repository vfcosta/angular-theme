import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationService } from './../../../shared/services/notification.service';
import { TranslatorService } from './../../../shared/services/translator.service';
import { UserService } from './../../../../lib/ng-noosfero-api/http/user.service';
import { ChangePasswordComponent } from './change-password.component';
import { By } from '@angular/platform-browser';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as helpers from '../../../../spec/helpers';
import { FormsModule } from '@angular/forms';

describe("Components", () => {
    describe("Change user password", () => {
        const mocks = helpers.getMocks();
        let fixture: ComponentFixture<ChangePasswordComponent>;
        let component: ChangePasswordComponent;
        const userService = jasmine.createSpyObj("userService", ["changePassword"]);
        const $event = jasmine.createSpyObj("$event", ["preventDefault"]);
        $event.preventDefault = jasmine.createSpy("preventDefault");
        userService.changePassword = jasmine.createSpy("changePassword").and.returnValue(Promise.resolve({}));
        const newPasswordConfirmation = jasmine.createSpyObj("newPasswordConfirmation", ["setBackendErrors"]);
        newPasswordConfirmation.pushError = jasmine.createSpy("pushError");

        beforeEach(async(() => {
            mocks.route.parent.snapshot.data = { profile: <noosfero.Profile>{ id: 1, identifier: 'profile1' } };
            TestBed.configureTestingModule({
                imports: [RouterTestingModule, FormsModule, TranslateModule.forRoot()],
                declarations: [ChangePasswordComponent],
                providers: [
                    { provide: UserService, useValue: userService },
                    { provide: NotificationService, useValue: mocks.notificationService },
                    { provide: TranslatorService, useValue: mocks.translatorService },
                    { provide: ActivatedRoute, useValue: mocks.route },
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            });
            fixture = TestBed.createComponent(ChangePasswordComponent);
            component = fixture.componentInstance;
        }));

        it("change password successfully", fakeAsync(done => {
            spyOn(component['router'], 'navigate');
            component.current_password = 'teste';
            component.new_password = 'teste123';
            component.new_password_confirmation = 'teste123';
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
