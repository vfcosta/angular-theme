import {Component, Input} from "ng-forward";

@Component({
    selector: "noosfero-raw-htmlblock",
    templateUrl: 'app/layout/blocks/raw-html/raw-html.html'
})

export class RawHTMLBlockComponent {

    @Input() block: any;
    @Input() owner: any;

    html: string;

    ngOnInit() {
        this.html = this.block.settings.html;
    }
}
