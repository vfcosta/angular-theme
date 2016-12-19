import { Component, Input } from "ng-forward";

@Component({
    selector: "noosfero-editable-link",
    templateUrl: "app/shared/components/editable-link/editable-link.html"
})
export class EditableLinkComponent {

    @Input() link: any;
    @Input() designMode: boolean;

}
