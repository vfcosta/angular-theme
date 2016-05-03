import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
import {Injectable, Provider, provide} from "ng-forward";
import {ComponentTestHelper, createClass} from './../../../../spec/component-test-helper';
import {ComponentFixture} from 'ng-forward/cjs/testing/test-component-builder';
import {providers} from 'ng-forward/cjs/testing/providers';
import {LoginBlockComponent} from './login-block.component';
import * as helpers from "./../../../../spec/helpers";
import {SessionService, AuthService, AuthController, IAuthEvents, AUTH_EVENTS} from "./../../../login";

const htmlTemplate: string = '<noosfero-login-block></noosfero-login-block>';

describe("Components", () => {

    describe("Login Block Component", () => {
        let helper: ComponentTestHelper<LoginBlockComponent>;
        let person: any = null;

        /**
         * Mock objects
         */
        let authService: any = helpers.mocks.authService;
        let user = <noosfero.User>{ person: person };
        let sessionService: any = <any>helpers.mocks.sessionWithCurrentUser(user);
        let state = jasmine.createSpyObj("$state", ["go"]);
        let scope = helpers.mocks.scopeWithEvents;

        let providers = [
            new Provider('SessionService', { useValue: sessionService }),
            new Provider('$state', { useValue: state }),
            new Provider('AuthService', { useValue: authService }),
            new Provider('$scope', { useValue: scope })
        ];

        beforeEach( angular.mock.module("templates") );

        beforeEach( (done: Function) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [LoginBlockComponent],
                providers: providers,
                properties: {}
            });
            helper = new ComponentTestHelper<LoginBlockComponent>(cls, done);
        });

        it("expect person to be null with no logged in user", () => {
            expect(helper.component.currentUser).toBeNull;
        });

        it("expect person to be defined when user login", () => {
            // Executes the login method on the component
            doComponentLogin();
            expect(helper.component.currentUser.person).toBe(person);
        });

        it("expect person to be null when user logout", () => {
            // First do a login
            doComponentLogin();
            // The logout the user
            doComponentLogout();
            // Check if the current user was cleared
            expect(helper.component.currentUser).toBeNull;
        });

        /**
         * Execute the logout method on the target component
         */
        function doComponentLogout() {
            // Create a mock for the AuthService logout method
            spyOn(authService, "logout");
            helper.component.logout();
            expect(authService.logout).toHaveBeenCalled();
            // After the component logout method execution, fire the
            // AuthService event
            simulateLogoutEvent();
        }

        /**
         * Execute the login method on the target component
         */
        function doComponentLogin() {
            // Create a mock for the AuthService login method
            spyOn(authService, "login");
            helper.component.login();
            expect(authService.login).toHaveBeenCalled();
            // After the component login method execution, fire the
            // AuthService event
            simulateLoginEvent();
        }

        /**
         * Simulate the AuthService loginSuccess event
         */
        function simulateLoginEvent() {
            let localScope: ng.IScope = helper.component["$scope"];
            localScope.$emit(AUTH_EVENTS.loginSuccess);
        }

        /**
         * Simulate the AuthService logoutSuccess event
         */
        function simulateLogoutEvent() {
            let localScope: ng.IScope = helper.component["$scope"];
            localScope.$emit(AUTH_EVENTS.logoutSuccess);
        }
    });

});