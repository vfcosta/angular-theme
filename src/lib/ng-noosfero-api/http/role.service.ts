import { Restangular } from 'ngx-restangular';
import { Injectable, Inject } from '@angular/core';
import { RestangularService } from './restangular_service';

@Injectable()
export class RoleService extends RestangularService<noosfero.Role> {

    constructor(protected restangular: Restangular) {
        super(restangular);
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
        return this.list(this.restangular.one("profiles", profileId), params);
    }

    assign(profileId: number, personId: number, roleIds: number[], removeRoleIds: number[]): Promise<noosfero.RestResult<noosfero.Role[]>> {
        let headers = { 'Content-Type': 'application/json' };
        return <any>this.post('/roles/assign', this.restangular.one("profiles", profileId), { person_id: personId, role_ids: roleIds, remove_role_ids: removeRoleIds }, headers);
    }
}
