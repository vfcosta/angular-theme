import { Input, Inject, Component, OnInit } from "@angular/core";
import { TranslatorService } from "../../../shared/services/translator.service";
import { BlockService } from "../../../../lib/ng-noosfero-api/http/block.service";

@Component({
    selector: "noosfero-highlights-block-settings",
    template: require('app/layout/blocks/highlights/highlights-block-settings.html')
})
export class HighlightsBlockSettingsComponent implements OnInit {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Profile;

    isCollapsed: any;
    images: any;

    constructor(@Inject("translatorService") private translatorService: TranslatorService,
        @Inject("blockService") private blockService: BlockService) { }

    ngOnInit() {
        this.isCollapsed = true;
        this.images = (<any>this.block.api_content || {}).slides || [];
        (<any>this.block.settings).block_images = this.images;
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

    upload(data: any, slide: any) {
        this.blockService.uploadImages(this.block, [data]).then((result: any) => {
            this.block.images = result.data.images;
            if (this.block.images.length > 0) {
                let image = this.block.images[this.block.images.length - 1];
                slide.image_id = image.id;
                slide.image_src = image.url;
            }
        });
    }
}
