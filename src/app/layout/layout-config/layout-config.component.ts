import { Inject, Input, Component } from 'ng-forward';
import { TranslatorService } from '../../shared/services/translator.service';
import { BoxesComponent } from '../boxes/boxes.component';

@Component({
    selector: "layout-config",
    templateUrl: "app/layout/layout-config/layout-config.html"
})
@Inject(TranslatorService)
export class LayoutConfigComponent {

    @Input() owner: noosfero.Profile | noosfero.Environment;

    constructor(private translatorService: TranslatorService) { }

    changeLayout(layout: string) {
        this.owner.layout_template = layout;
    }

    layouts() {
        return BoxesComponent.layouts;
    }
}
