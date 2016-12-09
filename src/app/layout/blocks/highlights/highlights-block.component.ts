import { Input, Inject, Component } from "ng-forward";

declare var _: any;

@Component({
    selector: "noosfero-highlights-block",
    templateUrl: 'app/layout/blocks/highlights/highlights-block.html',
})
export class HighlightsBlockComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Profile;

    images: any;

    ngOnInit() {
        this.images = (<any>this.block.settings).block_images;
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
        return (<any>this.block.settings).interval * 1000;
    }

    hideControls() {
        return !(<any>this.block.settings).navigation;
    }
}
