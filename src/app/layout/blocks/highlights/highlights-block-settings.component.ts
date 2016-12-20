import { Input, Inject, Component } from "ng-forward";
import { TranslatorService } from "../../../shared/services/translator.service";

declare var _: any;

@Component({
    selector: "noosfero-highlights-block-settings",
    templateUrl: 'app/layout/blocks/highlights/highlights-block-settings.html',
})
@Inject(TranslatorService)
export class HighlightsBlockSettingsComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Profile;

    isCollapsed: any;
    images: any;

    ngOnInit() {
        this.isCollapsed = true;
        this.images = (<any>this.block.settings).block_images || [];
    }

    constructor(private translatorService: TranslatorService) {

    }

    addSlide() {
        this.images.push({ image_src: "", title: this.translatorService.translate("edit.inline.title"), address: "http://" });
    }

    removeSlide(index: number) {
        this.images.splice(index, 1);
    }

    selectSlide(index: number) {
        (<any>this.block)['active'] = index;
    }
}
