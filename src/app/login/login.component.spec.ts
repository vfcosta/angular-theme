import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NotificationService } from './../shared/services/notification.service';
import { AuthService } from './auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from './login.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import * as helpers from "../../spec/helpers";

describe("Components", () => {
    describe("Login Component", () => {
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<LoginComponent>;
        let component: LoginComponent;

        beforeEach(async(() => {
            spyOn(mocks.authService, "login").and.returnValue(Promise.resolve());
            spyOn(mocks.notificationService, "info");
            spyOn(mocks.notificationService, "error");
            TestBed.configureTestingModule({
                declarations: [LoginComponent],
                providers: [
                    { provide: AuthService, useValue: mocks.authService },
                    { provide: NotificationService, useValue: mocks.notificationService },
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                imports: [TranslateModule.forRoot(), ModalModule.forRoot(), FormsModule]
            });
            fixture = TestBed.createComponent(LoginComponent);
            component = fixture.componentInstance;
        }));

        it("calls login on AuthService when login called", () => {
            let credentials = { username: "username", password: "password" };
            component.credentials = credentials;
            component.login();
            expect(mocks.authService.login).toHaveBeenCalledWith(credentials);
        });

        it('should open forgot password on click', () => {
            component.openForgotPassword();
            expect(component.showForgotPasswordModal).toBeTruthy();
            expect(component.show).toBeFalsy();
        });

        it("calls info on NotificationService when login was sucessfully", fakeAsync(() => {
            component.login();
            tick();
            expect(mocks.notificationService.info).toHaveBeenCalled();
        }));

        it("calls error on NotificationService when login was not sucessfully", fakeAsync(() => {
            TestBed.get(AuthService).login = jasmine.createSpy("login").and.returnValue(Promise.reject({}));
            component.login();
            tick();
            expect(mocks.notificationService.error).toHaveBeenCalled();
        }));
    });
});
