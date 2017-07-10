import { Restangular } from 'ngx-restangular';
import { Injectable, Inject } from "@angular/core";
import { RestangularService } from "./restangular_service";

@Injectable()
export class BlockService extends RestangularService<noosfero.Block> {

    constructor(protected restangular: Restangular) {
        super(restangular);
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
        if (!block.id) return Promise.resolve({}); // return empty when block is not persisted yet
        if (block) {
            if (block.api_content) {
                return Promise.resolve(block.api_content);
            } else {
                return this.get(block.id, null, params)
                    .then((result: noosfero.RestResult<noosfero.Block>) => {
                        block = result.data;
                        return Promise.resolve(block.api_content);
                    });
            }
        }
    }

    getBlock<T extends noosfero.Block>(blockId: number) {
        return this.get(blockId).then((result: any) => {
            return Promise.resolve(result.data);
        });
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

    getAvailableBlocks(owner: noosfero.Profile | noosfero.Environment): Promise<noosfero.RestResult<noosfero.BlockDefinition[]>> {
        let restRequest;
        if (owner.type === 'Environment') {
            restRequest = this.restangular.one("environments", owner.id);
        } else {
            restRequest = this.restangular.one("profiles", owner.id);
        }
        return restRequest.all("blocks").get("available_blocks").toPromise();
    }
}
