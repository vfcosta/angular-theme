import { Restangular } from 'ngx-restangular';
import { Injectable } from "@angular/core";
import { RestangularService } from "./restangular_service";

@Injectable()
export class DomainService extends RestangularService<noosfero.Domain> {

    constructor(protected restangular: Restangular) {
        super(restangular);
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
