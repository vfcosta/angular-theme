import { Component, Inject, Input } from "ng-forward";
import { DesignModeService } from '../../../../app/shared/services/design-mode.service';
import { SectionImageEditorComponent } from "./section-image-editor.component";
import { BlockService } from "../../../../lib/ng-noosfero-api/http/block.service";

@Component({
    selector: "noosfero-section-block-plugin-section-block",
    templateUrl: "plugins/section/blocks/section-block/section-block.html"
})
@Inject(BlockService, "$scope", "$uibModal", DesignModeService)
export class SectionBlockComponent {

    @Input() block: any;
    @Input() owner: any;
    @Input() popupOpen = false;

    save() {
        this.popupOpen = false;
    }

    cancel() {
        this.popupOpen = false;
    }


    font_color: string;
    background_color: string;
    designMode = false;

    picFile: any;
    modalInstance: any;

    constructor(private blockService: BlockService,
        private $scope: ng.IScope,
        private $uibModal: ng.ui.bootstrap.IModalService,
        private designModeService: DesignModeService) {

        this.designModeService.onToggle.subscribe((designModeOn: boolean) => {
            this.designMode = designModeOn;
            this.$scope.$apply();
        });

        this.designMode = this.designModeService.isInDesignMode();
    }

    ngOnInit() {
        if (this.block && this.block.settings) {
            this.font_color = this.block.settings.font_color;
            this.background_color = this.block.settings.background_color;
        }
    }

    colors() {
        return (this.color('font', this.font_color) + ' ' + this.color('background', this.background_color));
    }

    color(color_type: string, color_value: string) {
        let css_property = '';

        if (color_type === 'font') {
            css_property = 'color:';
        }
        else {
            if (color_type === 'background') {
                css_property = 'background-color:';
            }
            else {
                return css_property;
            }
        }

        let css_style = '';

        if (color_value !== '') {
            css_style = css_property + ' #' + color_value + ';';
        }
        return css_style;
    }

    fileSelected(file: any, errFiles: any) {
        if (file) {
            this.picFile = file;
            this.modalInstance = this.$uibModal.open({
                templateUrl: 'app/profile/image/profile-image-editor.html',
                controller: SectionImageEditorComponent,
                controllerAs: 'ctrl',
                scope: this.$scope,
                bindToController: true,
                backdrop: 'static',
                resolve: {
                    picFile: this.picFile,
                    block: this.block,
                    blockService: this.blockService
                }
            });
        }
    }

    getSectionImage() {
        if (this.block.images && this.block.images.length >= 0) {
            return this.block.images[0];
        } else {
            return null;
        }
    }
}
