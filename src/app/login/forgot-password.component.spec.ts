import { ForgotPasswordComponent } from './forgot-password.component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NotificationService } from './../shared/services/notification.service';
import { AuthService } from './auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import * as helpers from "../../spec/helpers";

describe("Components", () => {
    describe("Forgot Password Component", () => {
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<ForgotPasswordComponent>;
        let component: ForgotPasswordComponent;

        beforeEach(async(() => {
            spyOn(mocks.authService, "forgotPassword").and.returnValue(Promise.resolve());
            spyOn(mocks.notificationService, "info");
            spyOn(mocks.notificationService, "error");
            TestBed.configureTestingModule({
                declarations: [ForgotPasswordComponent],
                providers: [
                    { provide: AuthService, useValue: mocks.authService },
                    { provide: NotificationService, useValue: mocks.notificationService },
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                imports: [TranslateModule.forRoot(), ModalModule.forRoot(), FormsModule]
            });
            fixture = TestBed.createComponent(ForgotPasswordComponent);
            component = fixture.componentInstance;
        }));

        it("calls forgotPassword on AuthService when sendPasswdInfo called", () => {
            component.username = "john";
            component.sendPasswdInfo();
            expect(mocks.authService.forgotPassword).toHaveBeenCalledWith("john");
        });

        it("calls info on NotificationService when sendPasswdInfo was sucessfully", fakeAsync(() => {
            component.username = "john";
            component.sendPasswdInfo();
            tick();
            expect(mocks.notificationService.info).toHaveBeenCalled();
        }));

        it("calls error on NotificationService when sendPasswdInfo was not sucessfully", fakeAsync(() => {
            TestBed.get(AuthService).forgotPassword = jasmine.createSpy("forgotPassword").and.returnValue(Promise.reject({}));
            component.username = "john";
            component.sendPasswdInfo();
            tick();
            expect(mocks.notificationService.error).toHaveBeenCalled();
        }));
    });
});
