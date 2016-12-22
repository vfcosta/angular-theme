import { BlockService } from "../../../../lib/ng-noosfero-api/http/block.service";

export class HighlightsBlockImageEditorComponent {

    croppedDataUrl: string;

    static $inject = ["picFile", "block", "slide", "blockService", "$uibModalInstance"];

    constructor(private picFile: any,
        private block: noosfero.Block,
        private slide: any,
        private blockService: BlockService,
        private modalInstance: ng.ui.bootstrap.IModalServiceInstance) {
    }

    uploadImage(dataUrl: any, name: any) {
        let base64ImagesJson = [this.getBase64ImageJson(dataUrl, name)];
        this.blockService.uploadImages(this.block, base64ImagesJson).then((result: any) => {
            this.block.images = result.data.images;
            if (result.data.images.length > 0) {
                let image = result.data.images[result.data.images.length - 1];
                this.slide.image_id = image.id;
                this.slide.image_src = image.url;
            }
            this.modalInstance.close(name);
        });
    }

    getBase64ImageJson(dataUrl: any, name: any): any {
        return {
            tempfile: this.getData(dataUrl),
            filename: this.getImageName(name),
            type: this.picFile.type
        };
    }

    getImageName(name: any): string {
        return this.block.id + "_" + name;
    }

    getData(dataUrl: any): string {
        return dataUrl.substring(dataUrl.indexOf('base64,') + 7);
    }

    cancel() {
        this.modalInstance.close();
    }
}
