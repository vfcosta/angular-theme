import {Component, Input} from "ng-forward";

@Component({
    selector: "noosfero-raw-html-block",
    templateUrl: 'app/layout/blocks/raw-html/raw-html-block.html'
})

export class RawHTMLBlockComponent {

    @Input() block: any;
    @Input() owner: any;

    html: string;

    ngOnInit() {
        this.html = this.block.settings.html;
    }
}
