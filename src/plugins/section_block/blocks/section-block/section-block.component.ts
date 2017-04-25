import { Component, Inject, Input, ViewChild } from '@angular/core';
import { BlockService } from '../../../../lib/ng-noosfero-api/http/block.service';

@Component({
    selector: "noosfero-section-block-plugin-section-block",
    template: require('plugins/section_block/blocks/section-block/section-block.html')
})
export class SectionBlockComponent {

    @Input() block: any;
    @Input() owner: any;
    @Input() designMode: boolean;

    @ViewChild("popover") popover;

    modifiedLink: any;
    fontColor: string;
    backgroundColor: string;

    constructor( @Inject('blockService') private blockService: BlockService) { }

    ngOnInit() {
        if (this.block && this.block.settings) {
            this.fontColor = this.block.settings.fontColor;
            this.backgroundColor = this.block.settings.backgroundColor;
        }
        this.copyLink();
    }

    setStyles() {
        let styles = {
            'background-color': ('#' + this.backgroundColor || 'inherit'),
            'color': ('#' + this.fontColor || 'inherit')
        };
        return styles;
    }


    upload(data: any) {
        this.blockService.uploadImages(this.block, [data]).then((result: noosfero.RestResult<noosfero.Block>) => {
            this.block = result.data;
        });
    }

    save() {
        this.block.settings.name = this.modifiedLink.name;
        this.block.settings.description = this.modifiedLink.description;
        this.popover.hide();
    }

    cancel() {
        this.copyLink();
        this.popover.hide();
    }

    copyLink() {
        this.modifiedLink = { name: this.block.settings.name, description: this.block.settings.description };
    }

    getSectionImage() {
        if (this.block.images && this.block.images.length > 0) {
            return this.block.images[this.block.images.length - 1];
        } else {
            return null;
        }
    }
}
