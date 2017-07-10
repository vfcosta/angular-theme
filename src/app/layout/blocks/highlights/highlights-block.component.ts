import { Input, Inject, Component } from '@angular/core';
import * as _ from "lodash";

@Component({
    selector: "noosfero-highlights-block",
    templateUrl: './highlights-block.html',
    styleUrls: ['./highlights-block.scss']
})
export class HighlightsBlockComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Profile;
    @Input() designMode: boolean;

    images: any;

    ngOnInit() {
        this.images = (<any>this.block.api_content || {}).slides || [];
        if (!this.block.settings) this.block.settings = <any>{};
        if ((<any>this.block.settings).shuffle) {
            this.images = _.shuffle(this.images);
        }
        this.block.hide = (<any>this.images == null || <any>this.images.length === 0);
    }

    getTarget(image: any) {
        if (image.new_window) {
            return "_blank";
        }
        return "";
    }

    getTransitionInterval() {
        if (this.designMode) return 0;
        return (<any>this.block.settings).interval * 1000;
    }

    hideControls() {
        return !(<any>this.block.settings).navigation;
    }

    updateLink(i: number, item: any) {
        this.images[i].title = item.name;
        this.images[i].address = item.address;
    }
}
