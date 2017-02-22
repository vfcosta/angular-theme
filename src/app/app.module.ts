import { ValidationMessageComponent } from './shared/components/validation-message/validation-message.component';
import { ProfileFastEditionComponent } from './profile/fast-edition/profile-fast-edition.component';
import { UiSrefDirective } from './shared/directives/ui-sref-directive';
import { ImageUploadComponent } from './shared/components/image-upload/image-upload.component';
import { ImageUploadCropComponent } from './shared/components/image-upload/image-upload-crop.component';
import { CommunitiesBlockComponent } from './layout/blocks/communities/communities-block.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { LanguageSelectorComponent } from './layout/language-selector/language-selector.component';
import { TranslatePipe } from './shared/pipes/translate-pipe';
import { FooterComponent } from './layout/footer/footer.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { UpgradeModule } from '@angular/upgrade/static';
import { ProfileImageComponent } from "./profile/image/profile-image.component";
import { RawHTMLBlockComponent } from './layout/blocks/raw-html/raw-html-block.component';
import { StatisticsBlockComponent } from "./layout/blocks/statistics/statistics-block.component";
import { UpgradeUtils } from "./shared/upgrade-utils";
import { DynamicComponentModule } from "ng-dynamic";
import { MomentModule } from 'angular2-moment';
import { ImageCropperModule } from 'ng2-img-cropper';
import { ModalModule } from 'ng2-bootstrap';
import { ListProfilesComponent } from './profile/lists/list-profiles.component';

@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        UpgradeModule,
        MomentModule,
        DynamicComponentModule.forRoot({imports: [AppModule]}),
        ModalModule.forRoot(),
        ImageCropperModule
    ],
    exports: [TranslatePipe],
    declarations: [FooterComponent, TranslatePipe, LanguageSelectorComponent, RawHTMLBlockComponent, StatisticsBlockComponent,
                   ProfileImageComponent, TaskListComponent, CommunitiesBlockComponent, UiSrefDirective, ProfileFastEditionComponent, ValidationMessageComponent, ImageUploadCropComponent, ImageUploadComponent, ListProfilesComponent],
    entryComponents: [ListProfilesComponent, FooterComponent, LanguageSelectorComponent, RawHTMLBlockComponent, StatisticsBlockComponent, ProfileImageComponent, TaskListComponent, CommunitiesBlockComponent, ProfileFastEditionComponent, ImageUploadComponent, ImageUploadCropComponent],
    providers: UpgradeUtils.provideAngular1Services(['AuthService', 'SessionService', '$state', 'TranslatorService', 'ArticleService',
        'BlockService', 'ProfileService', 'PermissionService', 'EventsHubService', '$uibModal', '$scope', 'NotificationService',
        '$log', 'SweetAlert', 'toastr', 'TaskService'])
})
export class AppModule {
    ngDoBootstrap() {
    }
}
