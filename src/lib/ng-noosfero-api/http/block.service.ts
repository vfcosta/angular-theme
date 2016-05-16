import { Injectable, Inject } from "ng-forward";
import {RestangularService} from "./restangular_service";
import {ProfileService} from "./profile.service";

@Injectable()
@Inject("Restangular", "$q", "$log")
export class BlockService extends RestangularService<noosfero.Block> {

    constructor(Restangular: restangular.IService, $q: ng.IQService, $log: ng.ILogService) {
        super(Restangular, $q, $log);
    }

    getResourcePath() {
        return "blocks";
    }

    getDataKeys() {
        return {
            singular: 'block',
            plural: 'blocks'
        };
    }

    getApiContent(block: noosfero.Block) {
        let apiContentPromise = this.$q.defer();
        if (block) {
            if (block.api_content) {
                apiContentPromise.resolve(block.api_content);
            } else {
                this.get(block.id)
                    .then((result: noosfero.RestResult<noosfero.Block>) => {
                        block = result.data;
                        apiContentPromise.resolve(block.api_content);
                    });
            }
        }
        return apiContentPromise.promise;
    }

}
