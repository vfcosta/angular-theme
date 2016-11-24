import { Input, Component } from 'ng-forward';
import { DisplayBoxes } from "./display-boxes.filter";
import { SetBoxLayout } from "./set-box-layout.filter";

@Component({
    selector: "noosfero-boxes",
    templateUrl: "app/layout/boxes/boxes.html",
    directives: [DisplayBoxes, SetBoxLayout]
})
export class BoxesComponent {

    @Input() boxes: noosfero.Box[];
    @Input() owner: noosfero.Profile | noosfero.Environment;
    @Input() layout: string;

    layouts = {
        "topleft": [{ size: 12 }, { size: 3 }, { size: 9 }],
        "leftbar": [{ size: 3 }, { size: 9 }],
        "default": [{ size: 3 }, { size: 6 }, { size: 3 }],
        "lefttopright": [{ size: 3 }, { size: 3, subcolumns: [{ size: 9 }, { size: 3 }] }],
        "2leftbars": [{ size: 3 }, { size: 3 }, { size: 6 }],
        "rightbar": [{ size: 9 }, { size: 3 }],
        "leftbottom": [{ size: 3 }, { size: 9 }, { size: 12 }],
        "nosidebars": [{ size: 12 }]
    }

    getLayout() {
        return this.layouts[this.layout];
    }

    getBox(index: number) {
        let layout = this.getLayout();
        let mainColumn = 1;
        if (index === mainColumn) {// layout[index].size >= 6) {
            return this.boxes[0];
        } else if (index < mainColumn) {
            return this.boxes[index + 1];
        }
        return this.boxes[index];
    }
}
