import {Injectable, Inject} from "ng-forward";
import {UserResponse, INoosferoLocalStorage} from "./../shared/models/interfaces";

@Injectable()
@Inject("$localStorage", "$log")
export class SessionService {

    constructor(private $localStorage: INoosferoLocalStorage, private $log: ng.ILogService) {

    }

    create(data: UserResponse): noosfero.User {
        this.$localStorage.currentUser = data.user;
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