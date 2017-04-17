import { Inject, Input, Output, Component, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: "image-upload",
    template: require('app/shared/components/image-upload/image-upload.html')
})
export class ImageUploadComponent {

    @Input() cropEnabled = false;
    @Output() finished = new EventEmitter<any>();
    file: any;
    data: any = {};

    @ViewChild('staticModal')
    modal: ModalDirective;

    constructor(private elementRef: ElementRef) { }

    fileSelected($event: any) {
        if (!$event) return;
        let file: File = $event.target.files[0];
        if (!file) return;
        this.file = file;
    }

    finish() {
        this.modal.hide();
        if (!this.data.image) return;
        this.finished.emit(this.getBase64ImageJson(this.data.image, this.getFilename()));
    }

    getBase64ImageJson(dataUrl: any, name: any): any {
        let data = dataUrl.substring(dataUrl.indexOf('base64,') + 7);
        return {
            tempfile: data,
            filename: name
        };
    }

    getFilename() {
        let element = this.elementRef.nativeElement.querySelector('img-cropper input');
        if (!element) return null;
        let file = this.elementRef.nativeElement.querySelector('img-cropper input').value.split('\\');
        return file[file.length - 1];
    }
}
