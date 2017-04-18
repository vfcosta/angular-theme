import { Component } from "ng-forward";
import { SessionService } from "./session.service";
import { fixtures, createComponentFromClass, createProviderToValue } from "./../../spec/helpers";
import { INoosferoLocalStorage } from "./../shared/models/interfaces";
import { PersonService } from "../../lib/ng-noosfero-api/http/person.service";
import * as helpers from "../../spec/helpers";


describe("Services", () => {


    describe("Session Service", () => {

        let $localStorage: INoosferoLocalStorage = null;
        let $log: any;
        let personService: PersonService = jasmine.createSpyObj("PersonService", ["getByIdentifier"]);

        beforeEach(() => {
            $localStorage = <INoosferoLocalStorage>{ currentUser: null, settings: null };
            $log = jasmine.createSpyObj('$log', ['debug']);
            let promiseResult = helpers.mocks.promiseResultTemplate({ data: { name: "updated" } }, false);
            personService.getLoggedPerson = jasmine.createSpy("getLoggedPerson").and.returnValue(promiseResult);
        });

        it("method 'create()' saves the current user on $localstorage service", () => {
            let session = new SessionService($localStorage, $log, personService);
            session.create(<noosfero.User>fixtures.user);
            expect($localStorage.currentUser).toEqual(fixtures.user);
        });

        it("method 'destroy()' clean the currentUser on $localstorage", () => {
            let session = new SessionService($localStorage, $log, personService);
            $localStorage.currentUser = <noosfero.User>fixtures.user;
            session.destroy();
            expect($localStorage.currentUser).toBeUndefined();
        });

        it("method 'currentUser()' returns the user recorded on $localstorage service", () => {
            let session = new SessionService($localStorage, $log, personService);
            $localStorage.currentUser = <noosfero.User>fixtures.user;
            expect(session.currentUser()).toEqual($localStorage.currentUser);
        });

        it("profile is updated when user is logged in", () => {
            $localStorage.currentUser = <noosfero.User>fixtures.user;
            let session = new SessionService($localStorage, $log, personService);
            session.reloadUser();

            expect(personService.getLoggedPerson).toHaveBeenCalled();
            expect($localStorage.currentUser.person).toEqual({ name: "updated" });
        });

        it("profile is not updated when user is not logged in", () => {
            let session = new SessionService($localStorage, $log, personService);
            expect(personService.getLoggedPerson).not.toHaveBeenCalled();
        });

        it("logout when cannot obtain logged person", () => {
            $localStorage.currentUser = <noosfero.User>fixtures.user;
            personService.getLoggedPerson = jasmine.createSpy("getLoggedPerson").and.returnValue(helpers.mocks.promiseResultTemplate({}));
            let session = new SessionService($localStorage, $log, personService);
            session.reloadUser();

            expect(personService.getLoggedPerson).toHaveBeenCalled();
            expect($localStorage.currentUser).toBeUndefined();
        });
    });

});
