import { Input, Inject, Component, OnInit, forwardRef, Injector } from '@angular/core';
import { BlockService } from "../../../../lib/ng-noosfero-api/http/block.service";
import { BlockSettingsComponent } from '../block-settings.component';

@Component({
    selector: "noosfero-highlights-block-settings",
    template: require('app/layout/blocks/highlights/highlights-block-settings.html')
})
export class HighlightsBlockSettingsComponent implements OnInit {

    isCollapsed: any;
    images: any;
    parentBlock: BlockSettingsComponent;

    constructor(
        injector: Injector,
        private blockService: BlockService) {
        this.parentBlock = injector.get(BlockSettingsComponent);
    }

    ngOnInit() {
        this.isCollapsed = true;
        this.images = (<any>this.parentBlock.block.api_content || {}).slides || [];
        (<any>this.parentBlock.block.settings).block_images = this.images;

    }

    addSlide() {
        this.images.push({ image_src: "", title: "", address: "http://" });
        this.parentBlock.block.hide = false;
    }

    removeSlide(index: number) {
        this.images.splice(index, 1);
    }

    selectSlide(index: number) {
        (<any>this.parentBlock.block)['active'] = index;
    }

    upload(data: any, slide: any) {
        this.blockService.uploadImages(this.parentBlock.block, [data]).then((result: any) => {
            this.parentBlock.block.images = result.data.images;
            if (this.parentBlock.block.images.length > 0) {
                let image = this.parentBlock.block.images[this.parentBlock.block.images.length - 1];
                slide.image_id = image.id;
                slide.image_src = image.url;
            }
        });
    }
}
