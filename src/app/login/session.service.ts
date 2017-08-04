import { Injectable, Inject } from '@angular/core';
import { PersonService } from '../../lib/ng-noosfero-api/http/person.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Injectable()
export class SessionService {

    constructor(private localStorageService: LocalStorageService) { }

    create(user: noosfero.User): noosfero.User {
        this.localStorageService.store('currentUser', user);
        return this.localStorageService.retrieve('currentUser');
    };

    destroy() {
        this.localStorageService.clear('currentUser');
        this.localStorageService.clear('settings');
    };

    currentUser(): noosfero.User {
        return this.localStorageService.retrieve('currentUser');
    };

    currentPerson(): noosfero.Person {
        return this.currentUser() ? this.currentUser().person : null;
    };

}
