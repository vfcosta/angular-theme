import * as helpers from "./../../../spec/helpers";
import { Navbar } from "./navbar";
import { Injectable, Provider, provide, EventEmitter } from "ng-forward";
import { ComponentFixture } from 'ng-forward/cjs/testing/test-component-builder';
import { SessionService, AuthService, AuthController, AuthEvents } from "./../../login";
import events from 'ng-forward/cjs/events/events';
import { DesignModeService } from '../../shared/services/design-mode.service';
import { INoosferoLocalStorage } from "../../shared/models/interfaces";

describe("Components", () => {

    describe("Navbar Component", () => {

        let user: noosfero.User = null;
        let scope: any;
        let $rootScope: ng.IRootScopeService;

        let modalInstance: any;
        let $modal: any;
        let authService: any;
        let stateService: any;
        let sessionService: SessionService;
        let designModeService: DesignModeService;
        let provideFunc = provide;
        let $transitions = jasmine.createSpyObj("$transitions", ["onSuccess"]);
        let environmentService = jasmine.createSpyObj("EnvironmentService", ["getCurrentEnvironment"]);
        environmentService.getCurrentEnvironment = jasmine.createSpy("getCurrentEnvironment").and.returnValue(helpers.mocks.promiseResultTemplate({ id: 1, name: 'Noosfero' }));

        // before Each -> loading mocks on locals variables
        beforeEach(() => {
            user = <noosfero.User>{
                id: 1,
                login: "user"
            };
            scope = helpers.mocks.scopeWithEvents;
            modalInstance = helpers.mocks.modalInstance;
            $modal = helpers.mocks.$modal;
            authService = helpers.mocks.authService;
            stateService = jasmine.createSpyObj("$state", ["go"]);
            sessionService = <any>helpers.mocks.sessionWithCurrentUser(user);
            designModeService = helpers.mocks.designModeService;
        });


        // loading the templates
        beforeEach(angular.mock.module("templates"));


        // this function allow build the fixture of the container component
        // and is reused in each test
        // The main idea behing not prebuild it on a general beforeEach block is
        // to allow tests configure the mock services accordilly their own needs
        let buildComponent = (): Promise<ComponentFixture> => {
            return helpers.quickCreateComponent({
                providers: [
                    provide('$uibModal', {
                        useValue: $modal
                    }),
                    provide(AuthService, {
                        useValue: authService
                    }),
                    helpers.provideEmptyObjects('moment'),
                    provide('$state', {
                        useValue: stateService
                    }),
                    provide('SessionService', {
                        useValue: sessionService
                    }),
                    provide('AuthEvents', {
                        useValue: {
                            AuthEvents
                        }
                    }),
                    provide('EnvironmentService', {
                        useValue: environmentService
                    }),
                    provide('TranslatorService', {
                        useValue: helpers.mocks.translatorService
                    }),
                    provide('DesignModeService', {
                        useValue: helpers.mocks.designModeService
                    }),
                    provide('$localStorage', {
                        useValue: <INoosferoLocalStorage>{ currentUser: null, settings: { designMode: false } }
                    }),
                    provide('$transitions', {
                        useValue: $transitions
                    })
                ].concat(helpers.provideFilters("translateFilter")),
                directives: [Navbar],
                template: '<acme-navbar></acme-navbar>'
            });
        };


        it('should get the loggedIn user', (done: Function) => {
            buildComponent().then((fixture: ComponentFixture) => {
                let navbarInstance: Navbar = fixture.debugElement.componentViewChildren[0].componentInstance;
                expect(navbarInstance).toBeDefined();
                expect(navbarInstance["currentUser"]).toEqual(user);
                done();
            });
        });

        it('should open on click', (done: Function) => {
            spyOn($modal, "open");
            buildComponent().then((fixture: ComponentFixture) => {
                let navbarComp: Navbar = <Navbar>fixture.debugElement.componentViewChildren[0].componentInstance;
                navbarComp.openLogin();
                expect($modal.open).toHaveBeenCalled();
                expect($modal.open).toHaveBeenCalledWith({
                    templateUrl: 'app/login/login.html',
                    controller: AuthController,
                    controllerAs: 'vm',
                    bindToController: true
                });
                done();
            });
        });

        it('should logout', (done: Function) => {
            buildComponent().then((fixture: ComponentFixture) => {
                let navbarComp: Navbar = <Navbar>fixture.debugElement.componentViewChildren[0].componentInstance;
                spyOn(authService, "logout");
                try {
                    navbarComp.logout();
                    expect(authService.logout).toHaveBeenCalled();
                    done();
                } catch (e) {
                    console.error(e);
                    fail(e.message);
                    done();
                }
            });
        });


        it('should not activate user when logged in', (done: Function) => {
            buildComponent().then((fixture: ComponentFixture) => {
                let navbarComp: Navbar = <Navbar>fixture.debugElement.componentViewChildren[0].componentInstance;
                spyOn(navbarComp, "openLogin");
                navbarComp.activate();
                expect((<any>navbarComp.openLogin).calls.count()).toBe(0);
                done();
            });
        });

        it('should activate when user not logged in', (done: Function) => {
            spyOn(sessionService, 'currentUser').and.returnValue(null);
            buildComponent().then((fixture: ComponentFixture) => {
                let navbarComp: Navbar = <Navbar>fixture.debugElement.componentViewChildren[0].componentInstance;
                spyOn(navbarComp, "openLogin");
                navbarComp.activate();
                expect(navbarComp.openLogin).toHaveBeenCalled();
                done();
            });
        });


        it('closes the modal after login', (done: Function) => {
            modalInstance = {};
            modalInstance.close = jasmine.createSpy("close");

            $modal.open = () => {
                return modalInstance;
            };

            buildComponent().then((fixture: ComponentFixture) => {
                let navbarComp: Navbar = <Navbar>fixture.debugElement.componentViewChildren[0].componentInstance;

                navbarComp.openLogin();
                let successEvent: string = AuthEvents[AuthEvents.loginSuccess];

                (<any>navbarComp.authService)[successEvent].next(user);

                expect(modalInstance.close).toHaveBeenCalled();
                done();
            });

        });

        it('updates current user on logout', (done: Function) => {
            buildComponent().then((fixture: ComponentFixture) => {
                let navbarComp: Navbar = <Navbar>fixture.debugElement.componentViewChildren[0].componentInstance;

                // init navbar  currentUser with some user
                navbarComp["currentUser"] = user;

                // changes the current User to return null,
                // and emmit the 'logoutSuccess' event
                // just what happens when user logsout
                sessionService.currentUser = () => { return null; };
                let successEvent: string = AuthEvents[AuthEvents.logoutSuccess];

                (<any>navbarComp.authService)[successEvent].next(user);

                done();
                expect(navbarComp["currentUser"]).toBeNull();

            });
        });
    });
});
