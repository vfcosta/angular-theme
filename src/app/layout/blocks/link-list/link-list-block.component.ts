import { Component, Input, Inject } from "ng-forward";

@Component({
    selector: "noosfero-link-list-block",
    templateUrl: "app/layout/blocks/link-list/link-list-block.html"
})
export class LinkListBlockComponent {

    @Input() block: any;
    @Input() owner: any;
    @Input() designMode: boolean;

    links: any;

    ngOnInit() {
        if (this.block && this.block.settings) {
            this.links = this.block.settings.links;
        }
    }

    addLink() {
        this.links.push({ name: "", address: "http://" });
    }

    removeLink(index: number) {
        this.links.splice(index, 1);
    }
}
