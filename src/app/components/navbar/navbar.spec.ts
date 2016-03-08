import {
createComponentFromClass,
quickCreateComponent,
provideEmptyObjects
} from "./../../../spec/helpers";
import {
Navbar
} from "./navbar";
import {
AUTH_EVENTS
} from "./../auth";
import {
User
} from "./../../models/interfaces";
import {
Injectable,
Provider,
provide
} from "ng-forward";

import {Session, AuthService, AuthController, IAuthEvents} from "./../auth";

describe("Components", () => {

    describe("Navbar Component", () => {

        let $rootScope: ng.IRootScopeService;

        let user = <User>{
            id: 1,
            login: "user"
        };

        let scope = {
            eventCalledHook: () => { },
            $on: (eventName: string, func: Function) => {
                this.eventCalledHook = func;
            }
        }

        let modalInstance = {
            close: () => { }
        }

        let $modal = {
            open: (args: {}) => {
                return modalInstance;
            }
        }

        let authService = {
            logout: () => { }
        }

        let stateService = jasmine.createSpyObj("$state", ["go"]);
        let providers = [
            new Provider('moment', { useValue: {} }),
            new Provider('$modal', { useValue: $modal }),
            new Provider('AuthService', { useValue: authService }),
            new Provider('Session', {
                useValue: {
                    currentUser: () => { return user }
                }
            }),
            new Provider('$scope', { useValue: scope }),
            new Provider('$state', { useValue: stateService }),
            new Provider('AUTH_EVENTS', { useValue: { AUTH_EVENTS } })
        ];


        beforeEach(angular.mock.module("templates"));

        // beforeEach(inject((_$rootScope_: ng.IRootScopeService) => {
        //     $rootScope = _$rootScope_;
        // }));

        it('should get the loggedIn user', (done: Function) => {

            let scope = jasmine.createSpyObj("scope", ["$on"]);
            let providers = [
                provideEmptyObjects('moment', '$modal', 'AuthService', '$state'),
                new Provider('Session', {
                    useValue: {
                        currentUser: () => {
                            return user;
                        }
                    }
                }),
                new Provider('$scope', {
                    useValue: scope
                }),
                new Provider('AUTH_EVENTS', {
                    useValue: {
                        AUTH_EVENTS
                    }
                })
            ];

            quickCreateComponent({
                providers: providers,
                template: "<acme-navbar></acme-navbar>",
                directives: [Navbar]
            }).then(fixture => {
                let navbarInstance: Navbar = fixture.debugElement.componentViewChildren[0].componentInstance;
                expect(navbarInstance).toBeDefined();
                expect(navbarInstance["currentUser"]).toEqual(user)
                done();
            });
        });

        it('should open on click', (done: Function) => {

            quickCreateComponent({
                providers: providers,
                template: "<acme-navbar></acme-navbar>",
                directives: [Navbar]
            })
                .then(fixture => {
                    let navbarComp: Navbar = <Navbar>fixture.debugElement.componentViewChildren[0].componentInstance;
                    spyOn($modal, "open");
                    navbarComp.openLogin();
                    expect($modal.open).toHaveBeenCalled();
                    expect($modal.open).toHaveBeenCalledWith({
                        templateUrl: 'app/components/auth/login.html',
                        controller: AuthController,
                        controllerAs: 'vm',
                        bindToController: true
                    });
                    done();
                })
        });

        it('should logout', (done: Function) => {

            quickCreateComponent({
                providers: providers,
                template: "<acme-navbar></acme-navbar>",
                directives: [Navbar]
            })
                .then(fixture => {
                    let navbarComp: Navbar = <Navbar>fixture.debugElement.componentViewChildren[0].componentInstance;
                    spyOn(authService, "logout");
                    navbarComp.logout();
                    expect(authService.logout).toHaveBeenCalled();
                    done();
                })
        });


        it('should not activate user when logged in', (done: Function) => {
            quickCreateComponent({
                providers: providers,
                template: "<acme-navbar></acme-navbar>",
                directives: [Navbar]
            })
                .then(fixture => {
                    let navbarComp: Navbar = <Navbar>fixture.debugElement.componentViewChildren[0].componentInstance;
                    spyOn(navbarComp, "openLogin");
                    navbarComp.activate();
                    expect((<any>navbarComp.openLogin).calls.count()).toBe(0);
                    done();
                })

        });

        it('should activate when user not logged in', (done: Function) => {
            user = null;
            quickCreateComponent({
                providers: providers,
                template: "<acme-navbar></acme-navbar>",
                directives: [Navbar]
            })
                .then(fixture => {
                    let navbarComp: Navbar = <Navbar>fixture.debugElement.componentViewChildren[0].componentInstance;
                    spyOn(navbarComp, "openLogin");
                    navbarComp.activate();
                    expect(navbarComp.openLogin).toHaveBeenCalled();
                    done();
                })
        });
        

        // it('closes the modal the login', (done: Function) => {
        //     let scope = {
        //         eventCalledHook: () => { },
        //         $on: (eventName: string, func: Function) => {
        //             console.log("ON Called!");
        //             this.eventCalledHook = func;
        //         }
        //     }
        //
        //     let modalInstance = {
        //         close: () => {
        //             console.log("CLOSE Called!");
        //         }
        //     }
        //
        //     let $modal = {
        //         $open: (args: {}) => {
        //             return modalInstance;
        //         }
        //     }
        //
        //     let stateService = jasmine.createSpyObj("$state", ["go"]);
        //     let providers = [
        //         new Provider('moment', { useValue: {} }),
        //         new Provider('$modal', { useValue: $modal }),
        //         new Provider('AuthService', { useValue: {} }),
        //         new Provider('Session', {
        //             useValue: {
        //                 currentUser: () => { return user }
        //             }
        //         }),
        //         new Provider('$scope', { useValue: scope }),
        //         new Provider('$state', { useValue: stateService }),
        //         new Provider('AUTH_EVENTS', { useValue: { AUTH_EVENTS } })
        //     ];
        //     spyOn(modalInstance, "close");
        //
        //     quickCreateComponent({
        //         providers: providers,
        //         template: "<acme-navbar></acme-navbar>",
        //         directives: [Navbar]
        //     })
        //         .then(fixture => {
        //             let navbarComp: Navbar = <Navbar>fixture.debugElement.componentViewChildren[0].componentInstance;
        //             navbarComp.activate();
        //             navbarComp.openLogin
        //
        //             expect($modal.open).toHaveBeenCalledWith({})
        //             scope.eventCalledHook();
        //             expect(modalInstance.close).toHaveBeenCalled();
        //             done();
        //         })
        //     //done();
        // });
    });
});
