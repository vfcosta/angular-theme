import { TranslateModule } from '@ngx-translate/core';
import { TranslatorService } from './../../../shared/services/translator.service';
import { SessionService } from './../../../login/session.service';
import { DateFormatPipe } from './../../../shared/pipes/date-format.pipe';
import { MomentModule } from 'angular2-moment';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import {LoginBlockComponent} from './login-block.component';
import * as helpers from './../../../../spec/helpers';
import { AuthService, AuthEvents } from './../../../login';

const htmlTemplate = '<noosfero-login-block></noosfero-login-block>';

describe("Components", () => {

    describe("Login Block Component", () => {
        const person: any = null;
        const mocks = helpers.getMocks();
        let fixture: ComponentFixture<LoginBlockComponent>;
        let component: LoginBlockComponent;

        const user = <noosfero.User>{ person: person };
        const sessionService = <any>mocks.sessionWithCurrentUser(user);

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [LoginBlockComponent, DateFormatPipe],
                providers: [
                    { provide: SessionService, useValue: sessionService },
                    { provide: AuthService, useValue: mocks.authService },
                    { provide: TranslatorService, useValue: mocks.translatorService }
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                imports: [FormsModule, MomentModule, TranslateModule.forRoot()]
            });
            fixture = TestBed.createComponent(LoginBlockComponent);
            component = fixture.componentInstance;
        }));

        it("expect person to be null with no logged in user", () => {
            expect(component.currentUser.person).toBeNull();
        });

        it("expect person to be defined when user login", () => {
            // Executes the login method on the component
            doComponentLogin();
            expect(component.currentUser.person).toBe(person);
        });

        it("expect person to be null when user logout", () => {
            // First do a login
            doComponentLogin();
            // The logout the user
            doComponentLogout();
            // Check if the current user was cleared
            expect(component.currentUser.person).toBeNull();
        });

        /**
         * Execute the logout method on the target component
         */
        function doComponentLogout() {
            // Create a mock for the AuthService logout method
            spyOn(component.authService, "logout");
            component.logout();
            expect(component.authService.logout).toHaveBeenCalled();
            // After the component logout method execution, fire the
            // AuthService event
            simulateLogoutEvent();
        }

        /**
         * Execute the login method on the target component
         */
        function doComponentLogin() {
            // Create a mock for the AuthService login method
            spyOn(component.authService, "login");
            component.login();
            expect(component.authService.login).toHaveBeenCalled();
            // After the component login method execution, fire the
            // AuthService event
            simulateLoginEvent();
        }

        /**
         * Simulate the AuthService loginSuccess event
         */
        function simulateLoginEvent() {
            const successEvent: string = AuthEvents[AuthEvents.loginSuccess];

            (<any>component.authService)[successEvent].next(user);
        }

        /**
         * Simulate the AuthService logoutSuccess event
         */
        function simulateLogoutEvent() {
            const successEvent: string = AuthEvents[AuthEvents.logoutSuccess];

            (<any>component.authService)[successEvent].next(user);
        }
    });

});
