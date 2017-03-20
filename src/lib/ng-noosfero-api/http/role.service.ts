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

    assign(profileId: number, personId: number, roleIds: number[], removeRoleIds: number[]): ng.IPromise<noosfero.RestResult<noosfero.Role[]>> {
        let headers = { 'Content-Type': 'application/json' };
        return <any>this.post('/roles/assign', this.restangularService.one("profiles", profileId), { person_id: personId, role_ids: roleIds, remove_role_ids: removeRoleIds }, headers);
    }
}
