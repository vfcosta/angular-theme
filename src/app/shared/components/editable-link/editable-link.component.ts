import { Component, Input, ElementRef, HostListener, ViewChild, Output, EventEmitter, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
    selector: "noosfero-editable-link",
    templateUrl: './editable-link.html',
    styleUrls: ['./editable-link.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class EditableLinkComponent implements OnInit {

    @Output() linkChange = new EventEmitter<any>();
    @Input() name: string;
    @Input() address: string;
    @Input() designMode: boolean;
    @Input() owner: noosfero.Profile;
    @ViewChild("popover") popover: any;
    @Input() popupOpen = false;

    modifiedLink: any;

    constructor(private elementRef: ElementRef) { }

    ngOnInit() {
        this.copyLink();
    }

    save() {
        this.name = this.modifiedLink.name;
        this.address = this.modifiedLink.address;
        this.linkChange.emit(this.modifiedLink);
        this.popover.hide();
    }

    cancel() {
        this.copyLink();
        this.popover.hide();
    }

    copyLink() {
        this.modifiedLink = { name: this.name, address: this.address };
    }

    @HostListener('document:click', ['$event'])
    onClick($event: any) {
        if (this.popover && !this.elementRef.nativeElement.contains($event.target)) {
            this.popover.hide();
        }
    }
}
