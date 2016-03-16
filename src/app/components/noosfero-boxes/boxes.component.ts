import {Input, Inject, Component} from 'ng-forward';
import {Box, Profile} from "./../../models/interfaces";

@Component({
    selector: "noosfero-boxes",
    templateUrl: "app/components/noosfero-boxes/boxes.html"
})
export class Boxes {

    @Input() boxes: Box[];
    @Input() owner: Profile;

    boxesOrder(box: Box) {
        if (box.position === 2) return 0;
        return box.position;
    }
}
