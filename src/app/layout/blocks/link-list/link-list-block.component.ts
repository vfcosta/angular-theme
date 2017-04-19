import { Component, Input, Inject } from "@angular/core";

@Component({
    selector: "noosfero-link-list-block",
    template: require("app/layout/blocks/link-list/link-list-block.html")
})
export class LinkListBlockComponent {

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

        if (this.block && this.block.settings) {
            this.links = this.block.settings.links;
        }
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
}
