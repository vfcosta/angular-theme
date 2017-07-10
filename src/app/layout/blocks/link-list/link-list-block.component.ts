import { Component, Input, Inject, OnChanges } from '@angular/core';

@Component({
    selector: "noosfero-link-list-block",
    templateUrl: './link-list-block.html',
    styleUrls: ['./link-list-block.scss']
})
export class LinkListBlockComponent implements OnChanges {

    @Input() block: any;
    @Input() owner: any;
    @Input() designMode: boolean;

    links: any;
    newIndex = -1;

    dragulaOptions: any;

    constructor() { }

    ngOnInit() {
        this.dragulaOptions = {
            invalid: () => {
                return !this.designMode;
            }
        };
        if (!this.block.settings) this.block.settings = {};
        if (!this.block.settings.links) this.block.settings.links = [];
        this.links = this.block.settings.links;
        this.applyVisibility();
    }


    updateLink(i: number, item: any) {
        this.links[i].name = item.name;
        this.links[i].address = item.address;
    }


    updateIcon(i: number, icon: string) {
        this.links[i].icon = icon;
    }

    addLink() {
        this.links.push({ name: "", address: "http://", icon: "fa-file-o" });
        this.newIndex = this.links.length - 1;
    }

    isNewLink(index: number) {
        return index === this.newIndex;
    }

    removeLink(index: number) {
        this.links.splice(index, 1);
    }

    ngOnChanges() {
        this.applyVisibility();
    }

    applyVisibility() {
        if (this.links) {
            this.block.hide = this.links.length < 1;
        }
    }

}
