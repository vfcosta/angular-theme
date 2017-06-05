import { Component, Input, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: "noosfero-raw-htmlblock",
    template: require('app/layout/blocks/raw-html/raw-html-block.html')
})

export class RawHTMLBlockComponent {

    @Input() block: any;
    @Input() owner: any;
    @ViewChild("container") container;

    constructor(private sanitizer: DomSanitizer) { }

    ngOnInit() {
        if (this.block && this.block.settings) {
            const range = document.createRange();
            range.selectNode(this.container.nativeElement);
            const fragment = range.createContextualFragment(this.block.settings.html);
            this.container.nativeElement.appendChild(fragment);
        }
    }

}
