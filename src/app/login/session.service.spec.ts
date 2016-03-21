import {Component} from "ng-forward";
import {SessionService} from "./session.service";
import {fixtures, createComponentFromClass, createProviderToValue} from "./../../spec/helpers";
import {UserResponse, INoosferoLocalStorage} from "./../shared/models/interfaces";


describe("Services", () => {


    describe("Session Service", () => {

        let $localStorage: INoosferoLocalStorage = null;
        let $log: any;

        beforeEach(() => {
            $localStorage = <INoosferoLocalStorage>{ currentUser: null };
            $log = jasmine.createSpyObj('$log', ['debug']);
        });

        it("method 'create()' saves the current user on $localstorage service", () => {
            let session = new SessionService($localStorage, $log);
            let userResponse = <UserResponse>{
                user: fixtures.user
            };
            session.create(userResponse);
            expect($localStorage.currentUser).toEqual(userResponse.user);
        });

        it("method 'destroy()' clean the currentUser on $localstorage", () => {
            let session = new SessionService($localStorage, $log);
            let userResponse = <UserResponse>{
                user: fixtures.user
            };
            $localStorage.currentUser = fixtures.user;
            session.destroy();
            expect($localStorage.currentUser).toBeUndefined();
        });

        it("method 'currentUser()' returns the user recorded on $localstorage service", () => {
            let session = new SessionService($localStorage, $log);
            let userResponse = <UserResponse>{
                user: fixtures.user
            };
            $localStorage.currentUser = fixtures.user;
            expect(session.currentUser()).toEqual($localStorage.currentUser);
        });
    });

});