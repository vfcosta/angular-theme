import * as helpers from "./../../../spec/helpers";
import {Navbar} from "./navbar";
import {AUTH_EVENTS} from "./../auth";
import {User} from "./../../models/interfaces";
import {Injectable, Provider, provide} from "ng-forward";

import {ComponentFixture} from 'ng-forward/cjs/testing/test-component-builder';

import {Session, AuthService, AuthController, IAuthEvents} from "./../auth";


describe("Components", () => {

    describe("Navbar Component", () => {

        let user: User = null;
        let scope: any;
        let $rootScope: ng.IRootScopeService;

        let modalInstance: any;
        let $modal: any;
        let authService: any;
        let stateService: any;
        let sessionService: Session;

        let provideFunc = provide;

        // before Each -> loading mocks on locals variables 
        beforeEach(() => {
            user = <User>{
                id: 1,
                login: "user"
            };
            scope = helpers.mocks.scopeWithEvents;
            modalInstance = helpers.mocks.modalInstance;
            $modal = helpers.mocks.$modal;
            authService = helpers.mocks.authService;
            stateService = jasmine.createSpyObj("$state", ["go"]);
            sessionService = <any>helpers.mocks.sessionWithCurrentUser(user);
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
                    provide('$modal', {
                        useValue: $modal
                    }),
                    provide('AuthService', {
                        useValue: authService
                    }),
                    helpers.provideEmptyObjects('moment'),
                    provide('$state', {
                        useValue: stateService
                    }),
                    provide("$scope", {
                        useValue: scope
                    }),
                    provide('Session', {
                        useValue: sessionService
                    }),
                    provide('AUTH_EVENTS', {
                        useValue: {
                            AUTH_EVENTS
                        }
                    }),
                    provide('TranslatorService', {
                        useValue: helpers.mocks.translatorService
                    })
                ].concat(helpers.provideFilters("translateFilter")),
                directives: [Navbar],
                template: '<acme-navbar></acme-navbar>'
            });
        }


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
                    templateUrl: 'app/components/auth/login.html',
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
            modalInstance = jasmine.createSpyObj("modalInstance", ["close"]);
            modalInstance.close = jasmine.createSpy("close");

            $modal.open = () => {
                return modalInstance;
            };

            buildComponent().then((fixture: ComponentFixture) => {
                let navbarComp: Navbar = <Navbar>fixture.debugElement.componentViewChildren[0].componentInstance;
                let localScope: ng.IScope = navbarComp["$scope"];

                navbarComp.openLogin();
                localScope.$emit(AUTH_EVENTS.loginSuccess);
                expect(modalInstance.close).toHaveBeenCalled();
                done();
            });
        });

        it('updates current user on logout', (done: Function) => {
            buildComponent().then((fixture: ComponentFixture) => {
                let navbarComp: Navbar = <Navbar>fixture.debugElement.componentViewChildren[0].componentInstance;
                let localScope: ng.IScope = navbarComp["$scope"];

                // init navbar  currentUser with some user
                navbarComp["currentUser"] = user;

                // changes the current User to return null,
                // and emmit the 'logoutSuccess' event
                // just what happens when user logsout
                sessionService.currentUser = () => { return null; };
                localScope.$emit(AUTH_EVENTS.logoutSuccess);
                expect(navbarComp["currentUser"]).toBeNull();
                done();
            });
        });


    });
});
