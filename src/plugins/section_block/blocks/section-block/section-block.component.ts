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

    font_color: string;
    background_color: string;

    constructor( @Inject('blockService') private blockService: BlockService) { }

    ngOnInit() {
        if (this.block && this.block.settings) {
            this.font_color = this.block.settings.font_color;
            this.background_color = this.block.settings.background_color;
        }
        this.copyLink();
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
        if (this.block.images && this.block.images.length >= 0) {
            return this.block.images[this.block.images.length - 1];
        } else {
            return null;
        }
    }
}
