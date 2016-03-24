import { Injectable, Inject } from "ng-forward";
import {RestangularService} from "./restangular_service";

@Injectable()
@Inject("Restangular", "$q", "$log")
export class CommunityService extends RestangularService<noosfero.Community> {

    constructor(Restangular: restangular.IService, $q: ng.IQService, $log: ng.ILogService) {
        super(Restangular, $q, $log);
    }

    getResourcePath() {
        return "communities";
    }

    getDataKeys() {
        return {
            singular: 'community',
            plural: 'communities'
        };
    }

}
