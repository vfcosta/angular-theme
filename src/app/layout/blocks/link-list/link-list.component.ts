import {Component, Input} from "ng-forward";

@Component({
    selector: "noosfero-link-list-block",
    templateUrl: "app/layout/blocks/link-list/link-list.html"
})
export class LinkListBlockComponent {

    @Input() block: any;
    @Input() owner: any;

    links: any;

    ngOnInit() {
        if (this.block && this.block.settings) {
            this.links = this.block.settings.links;
        }
    }

}
