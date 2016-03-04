import {Injectable, Inject} from "ng-forward";
import {UserResponse, User, INoosferoLocalStorage} from "./../../models/interfaces";

@Injectable()
@Inject("$localStorage", "$log")
export class Session {

    constructor(private $localStorage: INoosferoLocalStorage, private $log: ng.ILogService) {

    }

    create(data: UserResponse): User {
        this.$localStorage.currentUser = data.user;
        this.$log.debug('User session created.', this.$localStorage.currentUser);
        return this.$localStorage.currentUser;
    };

    destroy() {
        delete this.$localStorage.currentUser;
        this.$log.debug('User session destroyed.');
    };

    currentUser(): User {
        return this.$localStorage.currentUser;
    };

}