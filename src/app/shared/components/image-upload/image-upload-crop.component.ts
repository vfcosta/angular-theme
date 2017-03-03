import { Inject, Input, Output, Component, EventEmitter, OnInit } from '@angular/core';
import { CropperSettings } from 'ng2-img-cropper';

@Component({
    selector: "image-upload-crop",
    template: require('app/shared/components/image-upload/image-upload-crop.html')
})
export class ImageUploadCropComponent implements OnInit {

    @Input() file: any;
    @Input() data = {};
    cropperSettings: CropperSettings;

    ngOnInit() {
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 100;
        this.cropperSettings.height = 100;
        this.cropperSettings.croppedWidth = 100;
        this.cropperSettings.croppedHeight = 100;
        this.cropperSettings.canvasWidth = 400;
        this.cropperSettings.canvasHeight = 300;
        this.cropperSettings.noFileInput = this.file != null;
    }
}
