import { Component, Input } from "ng-forward";

@Component({
    selector: "noosfero-editable-link",
    templateUrl: "app/shared/components/editable-link/editable-link.html"
})
export class EditableLinkComponent {

    @Input() name: string;
    @Input() address: string;
    @Input() designMode: boolean;
    @Input() popupOpen = false;

    modifiedLink: any;

    ngOnInit() {
        this.copyLink();
    }

    save() {
        this.name = this.modifiedLink.name;
        this.address = this.modifiedLink.address;
        this.popupOpen = false;
    }

    cancel() {
        this.copyLink();
        this.popupOpen = false;
    }

    copyLink() {
        this.modifiedLink = { name: this.name, address: this.address };
    }
}
