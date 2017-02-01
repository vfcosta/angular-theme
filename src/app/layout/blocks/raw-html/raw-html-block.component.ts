import {Component, Input} from '@angular/core';

@Component({
    selector: "noosfero-raw-htmlblock",
    template: require('app/layout/blocks/raw-html/raw-html-block.html')
})

export class RawHTMLBlockComponent {

    @Input() block: any;
    @Input() owner: any;

    html() {
        if (this.block && this.block.settings) {
            return this.block.settings.html;
        }
    }

}
