import { SessionService } from './session.service';
import { fixtures } from './../../spec/helpers';
import { PersonService } from '../../lib/ng-noosfero-api/http/person.service';
import * as helpers from '../../spec/helpers';

describe("Services", () => {
    describe("Session Service", () => {

        const mocks = helpers.getMocks();

        it("method 'create()' saves the current user on mocks.localStorageService service", () => {
            const session = new SessionService(<any>mocks.localStorageService);
            session.create(<noosfero.User>fixtures.user);
            expect(mocks.localStorageService.retrieve('currentUser')).toEqual(fixtures.user);
        });

        it("method 'destroy()' clean the currentUser on mocks.localStorageService", () => {
            const session = new SessionService(<any>mocks.localStorageService);
            mocks.localStorageService.store('currentUser', <noosfero.User>fixtures.user);
            session.destroy();
            expect(mocks.localStorageService.retrieve('currentUser')).toBeUndefined();
        });

        it("method 'currentUser()' returns the user recorded on mocks.localStorageService service", () => {
            const session = new SessionService(<any>mocks.localStorageService);
            mocks.localStorageService.store('currentUser', <noosfero.User>fixtures.user);
            expect(session.currentUser()).toEqual(mocks.localStorageService.retrieve('currentUser'));
        });

        it("method 'currentPerson()' returns the person recorded on mocks.localStorageService service", () => {
            const session = new SessionService(<any>mocks.localStorageService);
            mocks.localStorageService.store('currentUser', <noosfero.User>fixtures.user);
            expect(session.currentPerson()).toEqual(mocks.localStorageService.retrieve('currentUser').person);
        });
    });

});
