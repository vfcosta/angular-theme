import {Injectable, Inject} from "ng-forward";

@Injectable()
@Inject("$localStorage", "$log")
export class Session {
    constructor(private $localStorage, $log) {

    }

    create = function(data) {
        this.$localStorage.currentUser = data.user;
        this.$log.debug('User session created.', this.$localStorage.currentUser);
        return this.$localStorage.currentUser;
    };

    destroy = function() {
        delete this.$localStorage.currentUser;
        this.$log.debug('User session destroyed.');
    };

    getCurrentUser = function() {
        return this.$localStorage.currentUser;
    };

}