import { Injectable, Inject } from "ng-forward";
import { UserResponse, INoosferoLocalStorage } from "./../shared/models/interfaces";
import { ProfileService } from "../../lib/ng-noosfero-api/http/profile.service";

@Injectable()
@Inject("$localStorage", "$log", ProfileService)
export class SessionService {

    constructor(private $localStorage: INoosferoLocalStorage, private $log: ng.ILogService, private profileService: ProfileService) {
    }

    reloadUser() {
        if (this.currentUser() && this.currentUser().person) {
            this.profileService.getByIdentifier(this.currentUser().person.identifier).then((profile: noosfero.Profile) => {
                this.currentUser().person = <noosfero.Person>profile;
            });
        }
    }

    create(user: UserResponse): noosfero.User {
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
