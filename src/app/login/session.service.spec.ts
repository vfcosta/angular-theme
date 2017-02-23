import { Component } from "ng-forward";
import { SessionService } from "./session.service";
import { fixtures, createComponentFromClass, createProviderToValue } from "./../../spec/helpers";
import { INoosferoLocalStorage } from "./../shared/models/interfaces";
import { ProfileService } from "../../lib/ng-noosfero-api/http/profile.service";
import * as helpers from "../../spec/helpers";


describe("Services", () => {


    describe("Session Service", () => {

        let $localStorage: INoosferoLocalStorage = null;
        let $log: any;
        let profileService: ProfileService = jasmine.createSpyObj("ProfileService", ["getByIdentifier"]);

        beforeEach(() => {
            $localStorage = <INoosferoLocalStorage>{ currentUser: null, settings: null };
            $log = jasmine.createSpyObj('$log', ['debug']);
            profileService.getByIdentifier = jasmine.createSpy("getByIdentifier").and.returnValue(helpers.mocks.promiseResultTemplate({
                name: "updated"
            }));
        });

        it("method 'create()' saves the current user on $localstorage service", () => {
            let session = new SessionService($localStorage, $log, profileService);
            session.create(fixtures.user);
            expect($localStorage.currentUser).toEqual(fixtures.user);
        });

        it("method 'destroy()' clean the currentUser on $localstorage", () => {
            let session = new SessionService($localStorage, $log, profileService);
            $localStorage.currentUser = fixtures.user;
            session.destroy();
            expect($localStorage.currentUser).toBeUndefined();
        });

        it("method 'currentUser()' returns the user recorded on $localstorage service", () => {
            let session = new SessionService($localStorage, $log, profileService);
            $localStorage.currentUser = fixtures.user;
            expect(session.currentUser()).toEqual($localStorage.currentUser);
        });

        it("profile is updated when user is logged in", () => {
            $localStorage.currentUser = fixtures.user;
            let session = new SessionService($localStorage, $log, profileService);
            session.reloadUser();

            expect(profileService.getByIdentifier).toHaveBeenCalled();
            expect($localStorage.currentUser.person).toEqual({ name: "updated" });
        });

        it("profile is not updated when user is not logged in", () => {
            let session = new SessionService($localStorage, $log, profileService);
            expect(profileService.getByIdentifier).not.toHaveBeenCalled();
        });
    });

});
