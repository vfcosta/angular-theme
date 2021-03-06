import { ValidationMessageComponent } from './../shared/components/validation-message/validation-message.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationService } from './../shared/services/notification.service';
import { TranslatorService } from './../shared/services/translator.service';
import { PasswordService } from './../../lib/ng-noosfero-api/http/password.service';
import { FormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';
import * as helpers from '../../spec/helpers';
import { PasswordComponent } from './new-password.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe("New Password Component", () => {
    let data: any;
    const mocks = helpers.getMocks();
    let fixture: ComponentFixture<PasswordComponent>;
    let component: PasswordComponent;

    beforeEach(async(() => {
        spyOn(mocks.passwordService, 'newPassword').and.callThrough();
        spyOn(mocks.notificationService, 'success').and.callThrough();
        spyOn(mocks.notificationService, 'error').and.callThrough();
        spyOn(mocks.$state, 'transitionTo').and.callThrough();

        TestBed.configureTestingModule({
            declarations: [PasswordComponent, ValidationMessageComponent],
            providers: [
                { provide: PasswordService, useValue: mocks.passwordService },
                { provide: NotificationService, useValue: mocks.notificationService },
                { provide: TranslatorService, useValue: mocks.translatorService }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [RouterTestingModule, NgPipesModule, FormsModule, TranslateModule.forRoot()]
        });
        fixture = TestBed.createComponent(PasswordComponent);
        component = fixture.componentInstance;
    }));


    it('new password page was rendered', () => {
        expect(fixture.debugElement.queryAll(By.css('div.new-password-page')).length).toEqual(1);
    });

    it("changes the user password", fakeAsync(() => {
        data = {
            code: '1234567890',
            password: 'test',
            passwordConfirmation: 'test'
        };

        component.code = data.code;
        component.password = data.password;
        component.passwordConfirmation = data.passwordConfirmation;
        fixture.detectChanges();
        component.sendNewPassword();
        tick();
        expect(mocks.passwordService.newPassword).toHaveBeenCalledWith('1234567890', 'test', 'test');
        expect(mocks.notificationService.success).toHaveBeenCalled();
    }));

    it("fails when try to change the user password", fakeAsync(() => {
        data = {
            code: '1234567890',
            password: 'test',
            passwordConfirmation: 'test-invalid'
        };
        component.code = data.code;
        component.password = data.password;
        component.passwordConfirmation = data.passwordConfirmation;

        TestBed.get(PasswordService).newPassword = jasmine.createSpy("newPassword").and.returnValue(Promise.reject({ data: { message: 'Error' } }));
        component.passwordConfirmErrors = jasmine.createSpyObj("passwordConfirmErrors", ["setBackendErrors"]);
        component.passwordErrors = jasmine.createSpyObj("passwordErrors", ["setBackendErrors"]);
        fixture.detectChanges();
        component.sendNewPassword();
        tick();
        expect(TestBed.get(PasswordService).newPassword).toHaveBeenCalledWith('1234567890', 'test', 'test-invalid');
        expect(mocks.notificationService.error).toHaveBeenCalled();
    }));

});
