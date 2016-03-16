import {Injectable, Inject} from "ng-forward";
import {UserResponse, INoosferoLocalStorage} from "./../../models/interfaces";

@Injectable()
@Inject("$localStorage", "$log")
export class Session {

    constructor(private $localStorage: INoosferoLocalStorage, private $log: ng.ILogService) {

    }

    create(data: UserResponse): noosfero.User {
        this.$localStorage.currentUser = data.user;
        this.$log.debug('User session created.', this.$localStorage.currentUser);
        return this.$localStorage.currentUser;
    };

    destroy() {
        delete this.$localStorage.currentUser;
        this.$log.debug('User session destroyed.');
    };

    currentUser(): noosfero.User {
        return this.$localStorage.currentUser;
    };

}