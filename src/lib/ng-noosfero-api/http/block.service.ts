import { Injectable, Inject } from "ng-forward";
import { RestangularService } from "./restangular_service";
import { ProfileService } from "./profile.service";

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

    getApiContent(block: noosfero.Block, params?: any) {
        let apiContentPromise = this.$q.defer();
        if (block) {
            if (block.api_content) {
                apiContentPromise.resolve(block.api_content);
            } else {
                this.get(block.id, null, params)
                    .then((result: noosfero.RestResult<noosfero.Block>) => {
                        block = result.data;
                        apiContentPromise.resolve(block.api_content);
                    });
            }
        }
        return apiContentPromise.promise;
    }

    getBlock<T extends noosfero.Block>(blockId: number): ng.IPromise<T> {
        let deferred = this.$q.defer<T>();
        this.get(blockId)
            .then((result: noosfero.RestResult<T>) => {
                deferred.resolve(result.data);
            })
            .catch(reason => deferred.reject(reason));
        return deferred.promise;
    }

    update(block: noosfero.Block) {
        let element = this.getElement(block.id);
        let headers = {
            'Content-Type': 'application/json'
        };
        return this.post(null, element, { block: block }, headers);
    }

    updateAll(blocks: noosfero.Block[]) {
        let headers = {
            'Content-Type': 'application/json'
        };
        return this.patch({ blocks: blocks }, headers);
    }

    uploadImages(block: noosfero.Block, base64ImagesJson: any) {
        let element = this.getElement(block.id);
        let headers = { 'Content-Type': 'application/json' };
        let attributesToUpdate: any = {
            block: { images_builder: base64ImagesJson }
        };
        return this.post(null, element, attributesToUpdate, headers);
    }
}
