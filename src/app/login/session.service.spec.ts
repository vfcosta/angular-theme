import { SessionService } from "./session.service";
import { fixtures, createComponentFromClass, createProviderToValue } from "./../../spec/helpers";
import { PersonService } from "../../lib/ng-noosfero-api/http/person.service";
import * as helpers from "../../spec/helpers";

describe("Services", () => {
    describe("Session Service", () => {

        let mocks = helpers.getMocks();

        beforeEach(() => {
            let promiseResult = helpers.mocks.promiseResultTemplate({ data: { name: "updated" } }, false);
        });

        it("method 'create()' saves the current user on mocks.localStorageService service", () => {
            let session = new SessionService(<any>mocks.localStorageService);
            session.create(<noosfero.User>fixtures.user);
            expect(mocks.localStorageService.get('currentUser')).toEqual(fixtures.user);
        });

        it("method 'destroy()' clean the currentUser on mocks.localStorageService", () => {
            let session = new SessionService(<any>mocks.localStorageService);
            mocks.localStorageService.set('currentUser', <noosfero.User>fixtures.user);
            session.destroy();
            expect(mocks.localStorageService.get('currentUser')).toBeUndefined();
        });

        it("method 'currentUser()' returns the user recorded on mocks.localStorageService service", () => {
            let session = new SessionService(<any>mocks.localStorageService);
            mocks.localStorageService.set('currentUser', <noosfero.User>fixtures.user);
            expect(session.currentUser()).toEqual(mocks.localStorageService.get('currentUser'));
        });

        it("method 'currentPerson()' returns the person recorded on mocks.localStorageService service", () => {
            let session = new SessionService(<any>mocks.localStorageService);
            mocks.localStorageService.set('currentUser', <noosfero.User>fixtures.user);
            expect(session.currentPerson()).toEqual(mocks.localStorageService.get('currentUser').person);
        });
    });

});
