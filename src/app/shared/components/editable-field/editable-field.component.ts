import { Component, Input, ElementRef, HostListener, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
    selector: "noosfero-editable-field",
    templateUrl: './editable-field.html',
    styleUrls: ['./editable-field.scss']
})
export class EditableFieldComponent {

    @Output() textChange = new EventEmitter<any>();
    @Input() text: string;
    @Input() designMode: boolean;
    @Input() owner: noosfero.Profile;
    @ViewChild("popover") popover: any;
    @Input() popupOpen = false;

    modifiedText: any;

    constructor(private elementRef: ElementRef) { }

    ngOnInit() {
        this.copyText();
    }

    save() {
        this.text = this.modifiedText;
        this.textChange.emit(this.modifiedText);
        this.popover.hide();
    }

    cancel() {
        this.copyText();
        this.popover.hide();
    }

    copyText() {
        this.modifiedText = this.text ;
    }

    @HostListener('document:click', ['$event'])
    onClick($event: any) {
        if (this.popover && !this.elementRef.nativeElement.contains($event.target)) {
            this.popover.hide();
        }
    }
}
