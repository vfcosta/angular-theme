import { Input, Inject, Component, OnInit, forwardRef, Injector, ViewEncapsulation } from '@angular/core';
import { BlockService } from '../../../../lib/ng-noosfero-api/http/block.service';
import { BlockSettingsComponent } from '../block-settings.component';

@Component({
    selector: "noosfero-highlights-block-settings",
    templateUrl: './highlights-block-settings.html',
    styleUrls: ['./highlights-block-settings.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class HighlightsBlockSettingsComponent implements OnInit {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Profile | noosfero.Environment;

    isCollapsed: any;
    images: any;

    constructor(
        injector: Injector,
        private blockService: BlockService) {
    }

    ngOnInit() {
        this.isCollapsed = true;
        this.images = (<any>this.block.api_content || {}).slides || [];
        (<any>this.block.settings).block_images = this.images;
    }

    addSlide() {
        this.images.push({ image_src: "", title: "", address: "http://" });
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
                const image = this.block.images[this.block.images.length - 1];
                slide.image_id = image.id;
                slide.image_src = image.url;
            }
        });
    }

    getInterval() {
        return this.block &&  this.block.settings &&  this.block.settings['interval'] ? this.block.settings['interval'] : 0;
    }
}
