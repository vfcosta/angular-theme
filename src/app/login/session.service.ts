import { Injectable, Inject } from "ng-forward";
import { INoosferoLocalStorage } from "./../shared/models/interfaces";
import { PersonService } from "../../lib/ng-noosfero-api/http/person.service";

@Injectable()
@Inject("$localStorage", "$log", PersonService)
export class SessionService {

    constructor(private $localStorage: INoosferoLocalStorage, private $log: ng.ILogService, private personService: PersonService) {
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
        this.$localStorage.currentUser = user;
        return this.$localStorage.currentUser;
    };

    destroy() {
        delete this.$localStorage.currentUser;
        delete this.$localStorage.settings;
    };

    currentUser(): noosfero.User {
        return this.$localStorage.currentUser;
    };

}
