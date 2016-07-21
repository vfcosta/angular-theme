import { Injectable, Inject } from "ng-forward";
import { RestangularService } from "./restangular_service";

@Injectable()
@Inject("Restangular", "$q", "$log")
export class RoleService extends RestangularService<noosfero.Role> {

    constructor(Restangular: restangular.IService, $q: ng.IQService, $log: ng.ILogService) {
        super(Restangular, $q, $log);
    }

    getResourcePath() {
        return "roles";
    }

    getDataKeys() {
        return {
            singular: 'role',
            plural: 'roles'
        };
    }

    getByProfile(profileId: number, params: any = {}) {
        return this.list(this.restangularService.one("profiles", profileId), params);
    }

}
