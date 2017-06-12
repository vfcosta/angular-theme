import { Injectable, Inject } from "ng-forward";
import { INoosferoLocalStorage } from "./../shared/models/interfaces";
import { PersonService } from "../../lib/ng-noosfero-api/http/person.service";

@Injectable()
@Inject("localStorageService", "$log", PersonService)
export class SessionService {

    constructor(private localStorageService: any, private $log: ng.ILogService, private personService: PersonService) {
    }

    reloadUser() {
        if (this.currentUser() && this.currentUser().person) {
            this.personService.getLoggedPerson().then((result: noosfero.RestResult<noosfero.Person>) => {
                this.currentUser().person = result.data;
            }).catch((error: any) => {
                this.destroy();
            });
        }
    }

    create(user: noosfero.User): noosfero.User {
        this.localStorageService.set('currentUser', user);
        return this.localStorageService.get('currentUser');
    };

    destroy() {
        this.localStorageService.remove('currentUser');
        this.localStorageService.remove('settings');
    };

    currentUser(): noosfero.User {
        return this.localStorageService.get('currentUser');
    };

    currentPerson(): noosfero.Person {
        return this.currentUser() ? this.currentUser().person : null;        
    };

}
