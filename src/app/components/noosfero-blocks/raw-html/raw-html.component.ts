import {Component, Input} from "ng-forward";

@Component({
    selector: "noosfero-raw-html-block",
    templateUrl: 'app/components/noosfero-blocks/raw-html/raw-html.html'
})

export class RawHtmlBlock {

    @Input() block: any;
    @Input() owner: any;

    html: string;

    ngOnInit() {
        this.html = this.block.settings.html;
    }
}
