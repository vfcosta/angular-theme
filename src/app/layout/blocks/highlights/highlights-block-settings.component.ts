import { Input, Inject, Component } from "ng-forward";
import { TranslatorService } from "../../../shared/services/translator.service";
import { BlockService } from "../../../../lib/ng-noosfero-api/http/block.service";

@Component({
    selector: "noosfero-highlights-block-settings",
    templateUrl: 'app/layout/blocks/highlights/highlights-block-settings.html',
})
@Inject(TranslatorService, BlockService, "$scope", "Upload")
export class HighlightsBlockSettingsComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Profile;

    isCollapsed: any;
    images: any;

    constructor(private translatorService: TranslatorService,
        private blockService: BlockService,
        private $scope: ng.IScope,
        private Upload: angular.angularFileUpload.IUploadService) {
    }

    ngOnInit() {
        this.isCollapsed = true;
        this.images = (<any>this.block.api_content || {}).slides || [];
        this.$scope.$watch(() => {
            return this.images;
        }, () => {
            (<any>this.block.settings).block_images = this.images;
        });
    }

    addSlide() {
        this.images.push({ image_src: "", title: this.translatorService.translate("edit.inline.title"), address: "http://" });
        this.block.hide = false;
    }

    removeSlide(index: number) {
        this.images.splice(index, 1);
    }

    selectSlide(index: number) {
        (<any>this.block)['active'] = index;
    }

    fileSelected(file: any, slide: any, errFiles: any) {
        if (!file) return;
        this.Upload.dataUrl(file, true).then((dataUrl: any) => {
            let base64ImagesJson = [this.getBase64ImageJson(dataUrl, file)];
            this.blockService.uploadImages(this.block, base64ImagesJson).then((result: any) => {
                this.block.images = result.data;
                if (result.data.length > 0) {
                    let image = result.data[result.data.length - 1];
                    slide.image_id = image.id;
                    slide.image_src = image.url;
                }
            });
        });
    }

    getBase64ImageJson(dataUrl: any, file: any): any {
        return {
            tempfile: this.getData(dataUrl),
            filename: this.getImageName(file.name),
            type: file.type
        };
    }

    getImageName(name: any): string {
        return this.block.id + "_" + name;
    }

    getData(dataUrl: any): string {
        return dataUrl.substring(dataUrl.indexOf('base64,') + 7);
    }
}
