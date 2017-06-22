import { CKEditorModule } from 'ng2-ckeditor';
import { HtmlEditorComponent } from './shared/components/html-editor/html-editor.component';
import { BasicEditorComponent } from './article/cms/basic-editor/basic-editor.component';
import { CommentFormHotspotComponent } from './hotspot/comment-form-hotspot.component';
import { ProfileImageComponent } from './profile/image/profile-image.component';
import { PaginationModule } from 'ngx-bootstrap';
import { NgPipesModule } from 'ngx-pipes';
import { PostCommentComponent } from './article/comment/post-comment/post-comment.component';
import { DateFormatPipe } from './shared/pipes/date-format.pipe';
import { ProfileLinkComponent } from './profile/profile-link/profile-link.component';
import { MomentModule } from 'angular2-moment';
import { CommentsComponent } from './article/comment/comments.component';
import { CommentComponent } from './article/comment/comment.component';
import { UiSrefDirective } from './shared/directives/ui-sref-directive';
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
import * as plugins from "../plugins";

@NgModule({
    exports: [TranslatePipe,
        ImageUploadComponent,
        ImageUploadCropComponent,
        FormsModule,
        CommonModule,
        BlockSettingsComponent,
        PermissionNg2Directive,
        UiSrefDirective,
        CommentComponent,
        CommentsComponent,
        ProfileLinkComponent,
        DateFormatPipe,
        PostCommentComponent,
        NgPipesModule,
        MomentModule,
        PaginationModule,
        ProfileImageComponent,
        CommentFormHotspotComponent,
        BasicEditorComponent,
        HtmlEditorComponent,
    ].concat(plugins.ng2SharedComponents),
    declarations: [TranslatePipe,
        ImageUploadComponent,
        ImageUploadCropComponent,
        BlockSettingsComponent,
        PermissionNg2Directive,
        UiSrefDirective,
        CommentComponent,
        CommentsComponent,
        ProfileLinkComponent,
        DateFormatPipe,
        PostCommentComponent,
        ProfileImageComponent,
        CommentFormHotspotComponent,
        BasicEditorComponent,
        HtmlEditorComponent,
    ].concat(plugins.ng2SharedComponents),
    entryComponents: [
        ImageUploadComponent,
        ImageUploadCropComponent,
        BlockSettingsComponent,
        CommentComponent,
        CommentsComponent,
        ProfileLinkComponent,
        PostCommentComponent,
        ProfileImageComponent,
        BasicEditorComponent,
        HtmlEditorComponent,
    ].concat(plugins.ng2SharedComponents),
    imports: [ModalModule.forRoot(),
        ImageCropperModule,
        CommonModule,
        FormsModule,
        MomentModule,
        NgPipesModule,
        PaginationModule.forRoot(),
        CKEditorModule,
    ]
})
export class SharedModule { }
