import { Input, Component } from 'ng-forward';
import { BoxesComponent } from '../boxes/boxes.component';

@Component({
    selector: "layout-config",
    templateUrl: "app/layout/layout-config/layout-config.html"
})
export class LayoutConfigComponent {

    @Input() owner: noosfero.Profile | noosfero.Environment;

    changeLayout(layout: string) {
        this.owner.layout_template = layout;
    }

    layouts() {
        return BoxesComponent.layouts;
    }

    isSelected(layout: string) {
        return this.owner && this.owner.layout_template === layout;
    }
}
