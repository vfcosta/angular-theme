import { Restangular } from 'ngx-restangular';
import { Injectable, Inject } from "@angular/core";
import { RestangularService } from "./restangular_service.ng2";

@Injectable()
export class SettingsService extends RestangularService<noosfero.Block> {

    constructor(protected restangular: Restangular) {
        super(restangular);
    }

    getResourcePath() {
        return "settings";
    }

    getDataKeys() {
        return {
            singular: 'setting',
            plural: 'settings'
        };
    }

    getAvailableBlocks(owner: noosfero.Profile | noosfero.Environment): ng.IPromise<noosfero.RestResult<noosfero.BlockDefinition[]>> {
        let restRequest;
        if (owner.type === 'Environment') {
            restRequest = this.restangular.one("environments", owner.id);
        } else {
            restRequest = this.restangular.one("profiles", owner.id);
        }
        return restRequest.all("settings").get("available_blocks").toPromise();
    }
}
