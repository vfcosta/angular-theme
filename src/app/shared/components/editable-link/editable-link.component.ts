import { Component, Input, ElementRef, HostListener, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
    selector: "noosfero-editable-link",
    template: require("app/shared/components/editable-link/editable-link.html")
})
export class EditableLinkComponent {

    @Input() link: any;
    @Output() linkChange = new EventEmitter<any>();
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
        this.popover.hide();
        this.linkChange.emit(this.modifiedLink);
    }

    cancel() {
        this.copyLink();
        this.popover.hide();
    }

    copyLink() {
        this.modifiedLink = { name: this.link.name, address: this.link.address };
    }

    @HostListener('document:click', ['$event'])
    onClick($event: any) {
        if (this.popover && !this.elementRef.nativeElement.contains(event.target)) {
            this.popover.hide();
        }
    }
}
