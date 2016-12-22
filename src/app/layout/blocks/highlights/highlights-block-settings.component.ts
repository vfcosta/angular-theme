import { Input, Inject, Component } from "ng-forward";
import { TranslatorService } from "../../../shared/services/translator.service";
import { BlockService } from "../../../../lib/ng-noosfero-api/http/block.service";
import { HighlightsBlockImageEditorComponent } from "./highlights-block-image-editor.component";

@Component({
    selector: "noosfero-highlights-block-settings",
    templateUrl: 'app/layout/blocks/highlights/highlights-block-settings.html',
})
@Inject(TranslatorService, BlockService, "$scope", "$uibModal")
export class HighlightsBlockSettingsComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Profile;

    isCollapsed: any;
    images: any;

    constructor(private translatorService: TranslatorService,
        private blockService: BlockService,
        private $scope: ng.IScope,
        private $uibModal: ng.ui.bootstrap.IModalService) {
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
        this.$uibModal.open({
            templateUrl: 'app/layout/blocks/highlights/highlights-block-image-editor.html',
            controller: HighlightsBlockImageEditorComponent,
            controllerAs: 'ctrl',
            bindToController: true,
            backdrop: 'static',
            resolve: {
                picFile: file,
                slide: slide,
                block: this.block,
                blockService: this.blockService
            }
        });
    }
}
