import { Input, Inject, Component } from "ng-forward";

declare var _: any;

@Component({
    selector: "noosfero-highlights-block-settings",
    templateUrl: 'app/layout/blocks/highlights/highlights-block-settings.html',
})
export class HighlightsBlockSettingsComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Profile;

    isCollapsed: any;
    images: any;

    ngOnInit() {
        this.isCollapsed = true;
        this.images = (<any>this.block.settings).block_images;
    }

}
