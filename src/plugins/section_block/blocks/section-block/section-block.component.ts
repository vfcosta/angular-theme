import { Component, Inject, Input, ViewChild, OnChanges } from '@angular/core';
import { BlockService } from '../../../../lib/ng-noosfero-api/http/block.service';

@Component({
    selector: "noosfero-section-block-plugin-section-block",
    templateUrl: './section-block.html',
    styleUrls: ['./section-block.scss']
})
export class SectionBlockComponent implements OnChanges {

    @Input() block: any;
    @Input() owner: any;
    @Input() designMode: boolean;

    @ViewChild("popover") popover;

    modifiedLink: any;
    fontColor: string;
    backgroundColor: string;

    constructor(private blockService: BlockService) { }

    ngOnInit() {
        if (this.block && this.block.settings) {
            this.fontColor = this.block.settings.font_color;
            this.backgroundColor = this.block.settings.background_color;
        }
        this.copyLink();
        this.applyVisibility();
    }

    ngOnChanges() {
        this.applyVisibility();
    }

    applyVisibility() {
        if (this.block) {
            if (this.block.title || this.block.settings.name || this.block.settings.description || this.getSectionImage()) {
                this.block.hide = false;
            } else {
                this.block.hide = true;
            }
        }
    }

    setStyles() {
        let backgroundColor = (this.backgroundColor ? '#' + this.backgroundColor : 'inherit' );
        let fontColor = (this.fontColor ? '#' + this.fontColor : 'inherit' );

        let styles = {
          'background-color': backgroundColor,
          'color': fontColor
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
        this.applyVisibility();
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
