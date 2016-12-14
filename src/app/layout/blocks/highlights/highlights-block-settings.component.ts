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

    ngOnInit() {
        this.isCollapsed = true;
    }

    switchCollapsed() {
        this.isCollapsed = !this.isCollapsed;
    }
}
