import { Component, Input } from "ng-forward";

@Component({
    selector: "noosfero-editable-link",
    templateUrl: "app/shared/components/editable-link/editable-link.html"
})
export class EditableLinkComponent {

    @Input() link: any;
    @Input() designMode: boolean;
    @Input() popupOpen = false;

    modifiedLink: any;

    ngOnInit() {
        this.copyLink();
    }

    save() {
        this.link.name = this.modifiedLink.name;
        this.link.address = this.modifiedLink.address;
        this.popupOpen = false;
    }

    cancel() {
        this.copyLink();
        this.popupOpen = false;
    }

    copyLink() {
        this.modifiedLink = JSON.parse(JSON.stringify(this.link));
    }
}
