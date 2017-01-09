import { Injectable, Inject } from "ng-forward";
import { RestangularService } from "./restangular_service";

@Injectable()
@Inject("Restangular", "$q", "$log")
export class DomainService extends RestangularService<noosfero.Domain> {

    constructor(Restangular: restangular.IService, $q: ng.IQService, $log: ng.ILogService) {
        super(Restangular, $q, $log);
    }

    getResourcePath() {
        return "domains";
    }

    getDataKeys() {
        return {
            singular: 'domain',
            plural: 'domains'
        };
    }

}
