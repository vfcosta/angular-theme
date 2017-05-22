import { NgModule } from '@angular/core';
import { TranslatePipe } from './shared/pipes/translate-pipe';
import { ImageUploadComponent } from './shared/components/image-upload/image-upload.component';
import { ImageUploadCropComponent } from './shared/components/image-upload/image-upload-crop.component';
import { ModalDirective, ModalModule } from 'ngx-bootstrap';
import { ImageCropperModule } from 'ng2-img-cropper';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlockSettingsComponent } from './layout/blocks/block-settings.component';
import { TruncatePipe } from './shared/pipes/truncate';

@NgModule({
    exports: [TranslatePipe,
        ImageUploadComponent,
        ImageUploadCropComponent,
        FormsModule,
        CommonModule,
        BlockSettingsComponent,
        TruncatePipe
    ],
    declarations: [TranslatePipe,
        ImageUploadComponent,
        ImageUploadCropComponent,
        BlockSettingsComponent,
        TruncatePipe
    ],
    entryComponents: [
        ImageUploadComponent,
        ImageUploadCropComponent,
        BlockSettingsComponent,
    ],
    imports: [ModalModule.forRoot(),
        ImageCropperModule,
        CommonModule,
        FormsModule,
    ]
})
export class SharedModule { }
