import { Injectable, Inject } from "@angular/core";
import { PersonService } from "../../lib/ng-noosfero-api/http/person.service";
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class SessionService {

    constructor(private localStorageService: LocalStorageService) { }

    create(user: noosfero.User): noosfero.User {
        this.localStorageService.set('currentUser', user);
        return this.localStorageService.get<noosfero.User>('currentUser');
    };

    destroy() {
        this.localStorageService.remove('currentUser');
        this.localStorageService.remove('settings');
    };

    currentUser(): noosfero.User {
        return this.localStorageService.get<noosfero.User>('currentUser');
    };

    currentPerson(): noosfero.Person {
        return this.currentUser() ? this.currentUser().person : null;
    };

}
