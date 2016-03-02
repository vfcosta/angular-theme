import { Input, Inject, Component } from 'ng-forward';
import {Box} from "./../../models/interfaces";
@Component({
    selector: "noosfero-boxes",
    templateUrl: "app/components/noosfero-boxes/boxes.html"
})
export class Boxes {

    @Input() boxes: any;
    @Input() owner: any;

    boxesOrder(box: Box) {
        if (box.position === 2) return 0;
        return box.position;
    }
}
