import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CKEditorModule } from 'ng2-ckeditor';
import { HtmlEditorComponent } from './shared/components/html-editor/html-editor.component';
import { EmptyLink } from './shared/components/empty-link/empty-link.directive';
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
import { PermissionNg2Directive } from './shared/components/permission/permission.ng2.directive';
import { NgModule } from '@angular/core';
import { ImageUploadComponent } from './shared/components/image-upload/image-upload.component';
import { ImageUploadCropComponent } from './shared/components/image-upload/image-upload-crop.component';
import { ModalDirective, ModalModule } from 'ngx-bootstrap';
import { ImageCropperModule } from 'ng2-img-cropper';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as plugins from '../plugins';

@NgModule({
    exports: [
        ImageUploadComponent,
        ImageUploadCropComponent,
        FormsModule,
        CommonModule,
        PermissionNg2Directive,
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
        TranslateModule,
        EmptyLink,
    ].concat(plugins.ng2SharedComponents),
    declarations: [
        ImageUploadComponent,
        ImageUploadCropComponent,
        PermissionNg2Directive,
        CommentComponent,
        CommentsComponent,
        ProfileLinkComponent,
        DateFormatPipe,
        PostCommentComponent,
        ProfileImageComponent,
        CommentFormHotspotComponent,
        BasicEditorComponent,
        HtmlEditorComponent,
        EmptyLink,
    ].concat(plugins.ng2SharedComponents),
    entryComponents: [
        ImageUploadComponent,
        ImageUploadCropComponent,
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
        TranslateModule.forChild(),
        RouterModule,
    ]
})
export class SharedModule { }
