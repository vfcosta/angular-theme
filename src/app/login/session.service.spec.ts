import { Component } from "ng-forward";
import { SessionService } from "./session.service";
import { fixtures, createComponentFromClass, createProviderToValue } from "./../../spec/helpers";
import { INoosferoLocalStorage } from "./../shared/models/interfaces";
import { PersonService } from "../../lib/ng-noosfero-api/http/person.service";
import * as helpers from "../../spec/helpers";

describe("Services", () => {
    describe("Session Service", () => {

        let mocks = helpers.getMocks();
        let $log: any;
        let personService: PersonService = jasmine.createSpyObj("PersonService", ["getByIdentifier"]);

        beforeEach(() => {
            $log = jasmine.createSpyObj('$log', ['debug']);
            let promiseResult = helpers.mocks.promiseResultTemplate({ data: { name: "updated" } }, false);
            personService.getLoggedPerson = jasmine.createSpy("getLoggedPerson").and.returnValue(promiseResult);
        });

        it("method 'create()' saves the current user on mocks.localStorageService service", () => {
            let session = new SessionService(mocks.localStorageService, $log, personService);
            session.create(<noosfero.User>fixtures.user);
            expect(mocks.localStorageService.get('currentUser')).toEqual(fixtures.user);
        });

        it("method 'destroy()' clean the currentUser on mocks.localStorageService", () => {
            let session = new SessionService(mocks.localStorageService, $log, personService);
            mocks.localStorageService.set('currentUser', <noosfero.User>fixtures.user);
            session.destroy();
            expect(mocks.localStorageService.get('currentUser')).toBeUndefined();
        });

        it("method 'currentUser()' returns the user recorded on mocks.localStorageService service", () => {
            let session = new SessionService(mocks.localStorageService, $log, personService);
            mocks.localStorageService.set('currentUser', <noosfero.User>fixtures.user);
            expect(session.currentUser()).toEqual(mocks.localStorageService.get('currentUser'));
        });

        it("profile is updated when user is logged in", () => {
            mocks.localStorageService.set('currentUser', <noosfero.User>fixtures.user);
            let session = new SessionService(mocks.localStorageService, $log, personService);
            session.reloadUser();

            expect(personService.getLoggedPerson).toHaveBeenCalled();
            expect(mocks.localStorageService.get('currentUser').person).toEqual({ name: "updated" });
        });

        it("profile is not updated when user is not logged in", () => {
            let session = new SessionService(mocks.localStorageService, $log, personService);
            expect(personService.getLoggedPerson).not.toHaveBeenCalled();
        });

        it("logout when cannot obtain logged person", () => {
            mocks.localStorageService.set('currentUser', <noosfero.User>fixtures.user);
            personService.getLoggedPerson = jasmine.createSpy("getLoggedPerson").and.returnValue(helpers.mocks.promiseResultTemplate({}));
            let session = new SessionService(mocks.localStorageService, $log, personService);
            session.reloadUser();

            expect(personService.getLoggedPerson).toHaveBeenCalled();
            expect(mocks.localStorageService.get('currentUser')).toBeUndefined();
        });

        it("method 'currentPerson()' returns the person recorded on mocks.localStorageService service", () => {
            let session = new SessionService(mocks.localStorageService, $log, personService);
            mocks.localStorageService.set('currentUser', <noosfero.User>fixtures.user);
            expect(session.currentPerson()).toEqual(mocks.localStorageService.get('currentUser').person);
        });
    });

});
