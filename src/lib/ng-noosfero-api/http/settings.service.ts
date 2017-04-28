import { Injectable, Inject } from "ng-forward";
import { RestangularService } from "./restangular_service";

@Injectable()
@Inject("Restangular", "$q", "$log")
export class SettingsService extends RestangularService<noosfero.Block> {

    constructor(Restangular: restangular.IService, $q: ng.IQService, $log: ng.ILogService) {
        super(Restangular, $q, $log);
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
            restRequest = this.restangularService.one("environments", owner.id);
        } else {
            restRequest = this.restangularService.one("profiles", owner.id);
        }
        return restRequest.all("settings").get("available_blocks");
    }
}
