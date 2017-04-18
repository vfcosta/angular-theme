import { Component, Input, ElementRef, HostListener, ViewChild } from "@angular/core";

@Component({
    selector: "noosfero-editable-link",
    template: require("app/shared/components/editable-link/editable-link.html")
})
export class EditableLinkComponent {

    @Input() name: string;
    @Input() address: string;
    @Input() designMode: boolean;
    @Input() popupOpen = false;
    @Input() owner: noosfero.Profile;
    @ViewChild("popover") popover;

    modifiedLink: any;

    constructor(private elementRef: ElementRef) { }

    ngOnInit() {
        this.copyLink();
    }

    save() {
        this.name = this.modifiedLink.name;
        this.address = this.modifiedLink.address;
        this.popover.hide();
    }

    cancel() {
        this.copyLink();
        this.popover.hide();
    }

    copyLink() {
        console.log(this.name, this.address);
        this.modifiedLink = { name: this.name, address: this.address };
    }

    @HostListener('document:click', ['$event'])
    onClick($event: any) {
        if (this.popover && !this.elementRef.nativeElement.contains(event.target)) {
            this.popover.hide();
        }
    }
}
