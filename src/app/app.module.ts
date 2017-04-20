import { LoginBlockComponent } from './layout/blocks/login-block/login-block.component';
import { MainBlockUpgradeDirective } from './layout/blocks/main/main-block.upgrade.directive';
import { MenuBlockComponent } from './layout/blocks/menu/menu-block.component';
import { ProfileSummaryComponent } from './profile/summary/profile-summary.component';
import { NewCommunityComponent } from './profile/configuration/communities/new-community.component';
import { EditCommunityComponent } from './profile/configuration/communities/edit-community.component';
import { PersonCommunitiesComponent } from './profile/configuration/communities/person-communities.component';
import { ChangePasswordComponent } from './profile/configuration/change-password/change-password.component';
import { PersonFriendsComponent } from './profile/configuration/friends/person-friends.component';
import { ProfilePersonalDataComponent } from './profile/configuration/personal-data/profile-personal-data.component';
import { ProfileConfigurationMenuComponent } from './profile/configuration/menu/profile-configuration-menu.component';
import { PermissionNg2Directive } from './shared/components/permission/permission.ng2.directive';
import { DateFormatPipe } from './shared/pipes/date-format.ng2.filter';
import { NoosferoUrlPipe } from './shared/pipes/noosfero-url.ng2.filter';
import { ProfileListEditionComponent } from './profile/profile-list/edition/profile-list-edition.component';
import { HtmlEditorComponent } from './shared/components/html-editor/html-editor.component';
import { ValidationMessageComponent } from './shared/components/validation-message/validation-message.component';
import { ProfileFastEditionComponent } from './profile/fast-edition/profile-fast-edition.component';
import { UiSrefDirective } from './shared/directives/ui-sref-directive';
import { ImageUploadComponent } from './shared/components/image-upload/image-upload.component';
import { ImageUploadCropComponent } from './shared/components/image-upload/image-upload-crop.component';
import { CommunitiesBlockComponent } from './layout/blocks/communities/communities-block.component';
import { MembersBlockComponent } from './layout/blocks/members/members-block.component';
import { PeopleBlockComponent } from './layout/blocks/people/people-block.component';
import { CommunityMembersComponent } from './profile/community-members/community-members.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { LanguageSelectorComponent } from './layout/language-selector/language-selector.component';
import { TranslatePipe } from './shared/pipes/translate-pipe';
import { FooterComponent } from './layout/footer/footer.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { UpgradeModule } from '@angular/upgrade/static';
import { ProfileImageComponent } from "./profile/image/profile-image.component";
import { RawHTMLBlockComponent } from './layout/blocks/raw-html/raw-html-block.component';
import { StatisticsBlockComponent } from "./layout/blocks/statistics/statistics-block.component";
import { UpgradeUtils } from "./shared/upgrade-utils";
import { DynamicComponentModule } from "ng-dynamic";
import { MomentModule } from 'angular2-moment';
import { ImageCropperModule } from 'ng2-img-cropper';
import { PopoverModule, ModalModule, TypeaheadModule, PaginationModule } from 'ngx-bootstrap';
import { ProfileListComponent } from './profile/profile-list/profile-list.component';
import { ProfileJoinComponent } from './profile/profile-join/profile-join.component';
import { NgPipesModule } from 'ngx-pipes';
import { CKEditorModule } from 'ng2-ckeditor';
import { DragulaModule, DragulaService } from 'ng2-dragula';
import { InviteComponent } from './profile/community-members/invite.component';
import { RecentDocumentsBlockComponent } from './layout/blocks/recent-documents/recent-documents-block.component';
import * as plugins from "../plugins";

@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        UpgradeModule,
        MomentModule,
        DynamicComponentModule.forRoot({ imports: [AppModule] }),
        ModalModule.forRoot(),
        ImageCropperModule,
        NgPipesModule,
        CKEditorModule,
        PaginationModule.forRoot(),
        PopoverModule.forRoot(),
        DragulaModule,
        TypeaheadModule.forRoot()
    ],
    exports: [TranslatePipe],
    declarations: [
        FooterComponent,
        TranslatePipe,
        LanguageSelectorComponent,
        RawHTMLBlockComponent,
        RecentDocumentsBlockComponent,
        StatisticsBlockComponent,
        ProfileImageComponent,
        TaskListComponent,
        CommunitiesBlockComponent,
        MembersBlockComponent,
        PeopleBlockComponent,
        CommunityMembersComponent,
        UiSrefDirective,
        ProfileFastEditionComponent,
        ValidationMessageComponent,
        ImageUploadComponent,
        ImageUploadCropComponent,
        ProfileListComponent,
        ProfileJoinComponent,
        HtmlEditorComponent,
        ProfileConfigurationMenuComponent,
        ProfilePersonalDataComponent,
        DateFormatPipe,
        NoosferoUrlPipe,
        ProfileListEditionComponent,
        NewCommunityComponent,
        ChangePasswordComponent,
        PermissionNg2Directive,
        PersonFriendsComponent,
        EditCommunityComponent,
        PersonCommunitiesComponent,
        MenuBlockComponent,
        PermissionNg2Directive,
        InviteComponent,
        MainBlockUpgradeDirective,
        ProfileSummaryComponent,
        PermissionNg2Directive,
        LoginBlockComponent,
    ].concat(plugins.ng2MainComponents),
    entryComponents: [
        FooterComponent,
        LanguageSelectorComponent,
        RawHTMLBlockComponent,
        RecentDocumentsBlockComponent,
        StatisticsBlockComponent,
        ProfileImageComponent,
        TaskListComponent,
        CommunitiesBlockComponent,
        MembersBlockComponent,
        PeopleBlockComponent,
        CommunityMembersComponent,
        ProfileFastEditionComponent,
        HtmlEditorComponent,
        ProfileConfigurationMenuComponent,
        ProfilePersonalDataComponent,
        ImageUploadComponent,
        ImageUploadCropComponent,
        ProfileListComponent,
        ProfileJoinComponent,
        NewCommunityComponent,
        EditCommunityComponent,
        PersonFriendsComponent,
        PersonCommunitiesComponent,
        ChangePasswordComponent,
        MenuBlockComponent,
        PersonCommunitiesComponent,
        ProfileJoinComponent,
        InviteComponent,
        ProfileSummaryComponent,
        ProfileJoinComponent,
        LoginBlockComponent,
    ].concat(plugins.ng2MainComponents),
    providers: UpgradeUtils.provideAngular1Services([
        'AuthService',
        'SessionService',
        '$state',
        'TranslatorService',
        'ArticleService',
        'BlockService',
        'profileService',
        'PersonService',
        'CommunityService',
        'PermissionService',
        'EventsHubService',
        '$uibModal',
        '$scope',
        'NotificationService',
        '$log',
        'SweetAlert',
        'toastr',
        'TaskService',
        '$transitions',
        '$stateParams',
        'amParseFilter',
        'RoleService',
        'PersonService',
        'UserService',
        'EnvironmentService'
    ])
})
export class AppModule {
    ngDoBootstrap() {
    }
}
