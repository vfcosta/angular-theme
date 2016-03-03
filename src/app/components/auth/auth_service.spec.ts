

import {AuthService, AUTH_EVENTS} from "./";
import {User, Credentials} from "./../../models/interfaces";

describe("Auth Service", () => {

    let $httpBackend: ng.IHttpBackendService;
    let authService: AuthService;
    let credentials: Credentials;
    let $rootScope: ng.IRootScopeService;
    let user: User;

    beforeEach(angular.mock.module("noosferoApp"));

    beforeEach(inject((_$httpBackend_: ng.IHttpBackendService, _$rootScope_: ng.IRootScopeService, _AuthService_: AuthService) => {
        $httpBackend = _$httpBackend_;
        authService = _AuthService_;
        $rootScope = _$rootScope_;

        user = <User>{
            id: 1,
            login: "user"
        };
    }));


    describe("Succesffull login", () => {

        beforeEach(() => {
            credentials = { username: "user", password: "password" };

            $httpBackend.expectPOST("/api/v1/login", "login=user&password=password").respond(200, { user: user });
        });

        it("should return loggedUser", (done) => {
            authService.login(credentials).then((loggedUser) => {
                expect(loggedUser).toBeDefined();
                done();
            });
            $httpBackend.flush();
            expect($httpBackend.verifyNoOutstandingRequest());
        });


        it("should emit event loggin successful with user logged data", () => {

            authService.login(credentials);

            let eventEmmited: boolean = false;
            $rootScope.$on(AUTH_EVENTS.loginSuccess, (event: ng.IAngularEvent, userThroughEvent: User) => {
                eventEmmited = true;
                expect(userThroughEvent).toEqual(user)
            });

            $httpBackend.flush();

            expect(eventEmmited).toBeTruthy(AUTH_EVENTS.loginSuccess + " was not emmited!");
        });

    });




});
    