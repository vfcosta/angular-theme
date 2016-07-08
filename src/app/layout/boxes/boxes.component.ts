import {Input, Component} from 'ng-forward';
import {DisplayBoxes} from "./display-boxes.filter";
import {SetBoxLayout} from "./set-box-layout.filter";

@Component({
    selector: "noosfero-boxes",
    templateUrl: "app/layout/boxes/boxes.html",
    directives: [DisplayBoxes, SetBoxLayout]
})
export class BoxesComponent {

    @Input() boxes: noosfero.Box[];
    @Input() owner: noosfero.Profile | noosfero.Environment;
    @Input() layout: string;

}
