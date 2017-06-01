import { DateFormatPipe } from './shared/pipes/date-format.ng2.filter';
import { MomentModule } from 'angular2-moment';
import { PermissionNg2Directive } from './shared/components/permission/permission.ng2.directive';
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
import * as plugins from "../plugins";

@NgModule({
    exports: [TranslatePipe,
        ImageUploadComponent,
        ImageUploadCropComponent,
        FormsModule,
        CommonModule,
        BlockSettingsComponent,
        TruncatePipe,
        PermissionNg2Directive,
        DateFormatPipe,
        MomentModule,
    ].concat(plugins.ng2SharedComponents),
    declarations: [TranslatePipe,
        ImageUploadComponent,
        ImageUploadCropComponent,
        BlockSettingsComponent,
        TruncatePipe,
        DateFormatPipe,
        PermissionNg2Directive,
    ].concat(plugins.ng2SharedComponents),
    entryComponents: [
        ImageUploadComponent,
        ImageUploadCropComponent,
        BlockSettingsComponent,
    ].concat(plugins.ng2SharedComponents),
    imports: [ModalModule.forRoot(),
        ImageCropperModule,
        CommonModule,
        FormsModule,
        MomentModule,
    ]
})
export class SharedModule { }
