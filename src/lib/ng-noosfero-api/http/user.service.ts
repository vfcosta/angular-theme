import { Restangular } from 'ngx-restangular';
import { Injectable, Inject } from '@angular/core';
import { RestangularService } from './restangular_service';

@Injectable()
export class UserService extends RestangularService<noosfero.User> {

    constructor(protected restangular: Restangular) {
        super(restangular);
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
        new_password_confirmation: string): Promise<noosfero.RestResult<noosfero.User>> {
        const params = {current_password: current_password, new_password: new_password, new_password_confirmation: new_password_confirmation };
        return this.getElement(profile.id).customOperation("patch", null, null, null, params).toPromise();
    }
}
