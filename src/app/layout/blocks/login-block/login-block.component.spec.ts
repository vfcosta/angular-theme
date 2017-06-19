import { AuthService } from './../../../login/auth.service';
import { SessionService } from './../../../login/session.service';
import { DateFormatPipe } from './../../../shared/pipes/date-format.pipe';
import { MomentModule } from 'angular2-moment';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { TranslatePipe } from './../../../shared/pipes/translate-pipe';
import {Injectable, Provider, provide} from "ng-forward";
import {ComponentTestHelper, createClass} from './../../../../spec/component-test-helper';
import {LoginBlockComponent} from './login-block.component';
import * as helpers from "./../../../../spec/helpers";
import { AuthService, AuthController, AuthEvents } from "./../../../login";
import { UiSrefDirective } from "../../../shared/directives/ui-sref-directive";

const htmlTemplate: string = '<noosfero-login-block></noosfero-login-block>';

describe("Components", () => {

    describe("Login Block Component", () => {
        let person: any = null;
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<LoginBlockComponent>;
        let component: LoginBlockComponent;

        let user = <noosfero.User>{ person: person };
        let sessionService = <any>mocks.sessionWithCurrentUser(user);

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [LoginBlockComponent, TranslatePipe, UiSrefDirective, DateFormatPipe],
                providers: [
                    { provide: SessionService, useValue: sessionService },
                    { provide: "$state", useValue: mocks.stateService },
                    { provide: AuthService, useValue: mocks.authService },
                    { provide: "translatorService", useValue: mocks.translatorService }
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                imports: [FormsModule, MomentModule]
            });
            fixture = TestBed.createComponent(LoginBlockComponent);
            component = fixture.componentInstance;
        }));

        it("expect person to be null with no logged in user", () => {
            expect(component.currentUser).toBeNull;
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
            expect(component.currentUser).toBeNull;
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
            let successEvent: string = AuthEvents[AuthEvents.loginSuccess];

            (<any>component.authService)[successEvent].next(user);
        }

        /**
         * Simulate the AuthService logoutSuccess event
         */
        function simulateLogoutEvent() {
            let successEvent: string = AuthEvents[AuthEvents.logoutSuccess];

            (<any>component.authService)[successEvent].next(user);
        }
    });

});