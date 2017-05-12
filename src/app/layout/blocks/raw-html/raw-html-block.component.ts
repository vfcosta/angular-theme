import {Component, Input} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: "noosfero-raw-htmlblock",
    template: require('app/layout/blocks/raw-html/raw-html-block.html')
})

export class RawHTMLBlockComponent {

    @Input() block: any;
    @Input() owner: any;

    constructor(private sanitizer: DomSanitizer) { }

    html() {
        if (this.block && this.block.settings) {
            return this.sanitizer.bypassSecurityTrustHtml(this.block.settings.html);
        }
    }

}
