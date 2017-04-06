import { Injectable, Inject } from "ng-forward";
import { RestangularService } from "./restangular_service";


@Injectable()
@Inject("Restangular", "$q")
export class UserService extends RestangularService<noosfero.User> {

    constructor(private restangular: restangular.IService, $q: ng.IQService, $log: ng.ILogService) {
        super(restangular, $q, $log);
    }

    getResourcePath() {
        return "users";
    }

    getDataKeys() {
        return {
            singular: 'user',
            plural: 'users'
        };
    }

    changePassword(profile: noosfero.Profile,
        current_password: string,
        new_password: string,
        new_password_confirmation: string): ng.IPromise<noosfero.RestResult<noosfero.User>> {
        let params = {current_password: current_password, new_password: new_password, new_password_confirmation: new_password_confirmation };
        return this.getElement(profile.id).customOperation("patch", null, null, null, params);
    }
}
