import { Component, Input, ViewChild, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: "noosfero-raw-htmlblock",
    templateUrl: './raw-html-block.html'
})

export class RawHTMLBlockComponent implements OnChanges, OnInit {

    @Input() block: any;
    @Input() owner: any;
    @Input() designMode: boolean;
    @ViewChild("container") container;

    constructor(private sanitizer: DomSanitizer) { }

    ngOnInit() {
        this.applyVisibility();
        if (this.block && this.block.settings) {
            const range = document.createRange();
            range.selectNode(this.container.nativeElement);
            const html = this.block.settings.html ? this.block.settings.html : '';
            const fragment = range.createContextualFragment(html);
            this.container.nativeElement.appendChild(fragment);
        }
    }

    ngOnChanges() {
        this.applyVisibility();
    }

    applyVisibility() {
        if (this.block) {
            if (this.block.settings && this.block.settings.html) {
                this.block.hide = false;
            } else {
                this.block.hide = true;
            }
        }
    }

}
