import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationService } from './../shared/services/notification.service';
import { TranslatorService } from './../shared/services/translator.service';
import { RegisterService } from './../../lib/ng-noosfero-api/http/register.service';
import { EnvironmentService } from './../../lib/ng-noosfero-api/http/environment.service';
import { ValidationMessageComponent } from '../shared/components/validation-message/validation-message.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import * as helpers from '../../spec/helpers';
import { RegisterComponent } from './register.component';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { tick, fakeAsync, async, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

describe("Register Component", () => {
    let fixture: ComponentFixture<RegisterComponent>;
    let component: RegisterComponent;

    const mocks = helpers.getMocks();
    let user_data: any;
    const nameErrors = jasmine.createSpyObj('nameErrors', ['setBackendErrors']);
    const userNameErrors = jasmine.createSpyObj('userNameErrors', ['setBackendErrors']);
    const emailErrors = jasmine.createSpyObj('emailErrors', ['setBackendErrors']);
    const passwordErrors = jasmine.createSpyObj('passwordErrors', ['setBackendErrors']);
    const passwordConfirmErrors = jasmine.createSpyObj('passwordConfirmErrors', ['setBackendErrors']);
    beforeEach(async(() => {
        spyOn(mocks.environmentService, 'get').and.returnValue(Promise.resolve({ data: { id: 1, name: 'Noosfero', terms_of_use: '' } }));
        spyOn(mocks.registerService, 'createAccount').and.returnValue(Promise.resolve({ status: 201, data: {} }));
        spyOn(mocks.notificationService, 'success').and.callThrough();
        spyOn(mocks.notificationService, 'error').and.callThrough();

        TestBed.configureTestingModule({
            imports: [RouterTestingModule, FormsModule, ModalModule.forRoot(), TranslateModule.forRoot()],
            declarations: [RegisterComponent, ValidationMessageComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                { provide: RegisterService, useValue: mocks.registerService },
                { provide: NotificationService, useValue: mocks.notificationService },
                { provide: EnvironmentService, useValue: mocks.environmentService },
                { provide: TranslatorService, useValue: mocks.translatorService }
            ]
        });

    }));
    function init() {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        component.nameErrors = nameErrors;
        component.emailErrors = emailErrors;
        component.userNameErrors = userNameErrors;
        component.passwordConfirmErrors = passwordConfirmErrors;
        component.passwordErrors = passwordErrors;
        fixture.detectChanges();
        tick();
    }
    it('register page was rendered', fakeAsync(() => {
        init();
        expect(fixture.debugElement.queryAll(By.css('.register-page')).length).toEqual(1);
    }));

    it("registers a new user", fakeAsync(() => {
        init();
        spyOn(component['router'], 'navigate');
        user_data = { username: "username", password: "password", password_confirmation: "password", email: "user@company.com" };

        component.account = user_data;

        component.signup();
        tick();
        expect(mocks.registerService.createAccount).toHaveBeenCalledWith(user_data);
        expect(TestBed.get(Router).navigate).toHaveBeenCalledWith(['/']);
        expect(mocks.notificationService.success).toHaveBeenCalled();
    }));

    it("gives error when registration fails", fakeAsync(() => {
        init();
        spyOn(component['router'], 'navigate');
        user_data = { password: "pas" };
        component.account = user_data;
        TestBed.get(RegisterService).createAccount = jasmine.createSpy('createAccount').and.returnValue(Promise.reject({ status: 422, errors: [] }));
        fixture.detectChanges();
        component.signup();
        tick();
        expect(TestBed.get(RegisterService).createAccount).toHaveBeenCalledWith(user_data);
        expect(component['router'].navigate).not.toHaveBeenCalledWith(['/']);
        expect(component.nameErrors.setBackendErrors).toHaveBeenCalled();
    }));
});
