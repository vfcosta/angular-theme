import {Component, Input} from "ng-forward";

@Component({
    selector: "noosfero-link-list-block",
    templateUrl: "app/components/noosfero-blocks/link-list/link-list.html"
})
export class LinkListBlock {

    @Input() block: any;
    @Input() owner: any;

    links: any;

    ngOnInit() {
        this.links = this.block.settings.links;
    }

}
