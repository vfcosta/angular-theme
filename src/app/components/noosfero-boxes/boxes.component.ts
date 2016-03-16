import {Input, Inject, Component} from 'ng-forward';

@Component({
    selector: "noosfero-boxes",
    templateUrl: "app/components/noosfero-boxes/boxes.html"
})
export class Boxes {

    @Input() boxes: noosfero.Box[];
    @Input() owner: noosfero.Profile;

    boxesOrder(box: noosfero.Box) {
        if (box.position === 2) return 0;
        return box.position;
    }
}
