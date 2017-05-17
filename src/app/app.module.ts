import { ArticleIconComponent } from './article/article-icon/article-icon.component';
import { BasicEditorComponent } from './article/cms/basic-editor/basic-editor.component';
import { SuggestArticleTaskAcceptComponent } from './task/types/suggest-article/suggest-article-task-accept.component';
import { ApproveArticleTaskAcceptComponent } from './task/types/approve-article/approve-article-task-accept.component';
import { SearchFormComponent } from './search/search-form/search-form.component';
import { AbuseComplaintTaskAcceptComponent } from "./task/types/abuse-complaint/abuse-complaint-task-accept.component";
import { TasksMenuComponent } from './task/tasks-menu/tasks-menu.component';
import { TasksComponent } from './task/tasks/tasks.component';
import { ProfileLinkComponent } from './profile/profile-link/profile-link.component';
import { TaskComponent } from './task/task.component';
import { ProfileActionsComponent } from './profile/actions/profile-actions.component';
import { DesignModeTogglerComponent } from './layout/design-mode-toggler/design-mode-toggler.component';
import { ConfigBarComponent } from './layout/config-bar/config-bar.component';
import { LayoutConfigComponent } from './layout/layout-config/layout-config.component';
import { ContextBarComponent } from './layout/context-bar/context-bar.component';
import { ProfileHeaderComponent } from './profile/header/profile-header.component';
import { CommentFormHotspotComponent } from './hotspot/comment-form-hotspot.component';
import { PostCommentComponent } from './article/comment/post-comment/post-comment.component';
import { AddBlockComponent } from './layout/boxes/add-block/add-block.component';
import { TopProfileImageComponent } from './profile/top-image/top-profile-image.component';
import { DiscussionBlockUpgradeDirective } from './../plugins/comment_paragraph/block/discussion/discussion-block.upgrade.directive';
import { BlockEditionComponent } from './layout/blocks/block-edition/block-edition.component';
import { BreadcrumbsBlockComponent } from './../plugins/breadcrumbs/blocks/breadcrumbs-block/breadcrumbs-block.component';
import { DisplayContentBlockComponent } from './layout/blocks/display-content/display-content-block.component';
import { HighlightsBlockComponent } from './layout/blocks/highlights/highlights-block.component';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { TagsBlockComponent } from './layout/blocks/tags/tags-block.component';
import { LoginBlockComponent } from './layout/blocks/login-block/login-block.component';
import { NoosferoTemplatePipe } from './shared/pipes/noosfero-template.ng2.filter';
import { IconPickerComponent } from './shared/components/icon-picker/icon-picker.component';
import { EditableLinkComponent } from './shared/components/editable-link/editable-link.component';
import { LinkListBlockComponent } from './layout/blocks/link-list/link-list-block.component';
import { MainBlockUpgradeDirective } from './layout/blocks/main/main-block.upgrade.directive';
import { MenuBlockComponent } from './layout/blocks/menu/menu-block.component';
import { ProfileSummaryComponent } from './profile/summary/profile-summary.component';
import { NewCommunityComponent } from './profile/configuration/communities/new-community.component';
import { EditCommunityComponent } from './profile/configuration/communities/edit-community.component';
import { PersonCommunitiesComponent } from './profile/configuration/communities/person-communities.component';
import { ChangePasswordComponent } from './profile/configuration/change-password/change-password.component';
import { PersonFriendsComponent } from './profile/configuration/friends/person-friends.component';
import { CommunityMembersMyProfileComponent } from './profile/configuration/communities/community-members-my-profile.component';
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
import { CommunitiesBlockComponent } from './layout/blocks/communities/communities-block.component';
import { MembersBlockComponent } from './layout/blocks/members/members-block.component';
import { PeopleBlockComponent } from './layout/blocks/people/people-block.component';
import { ProfileImageBlockComponent } from './layout/blocks/profile-image/profile-image-block.component';
import { CommunityMembersComponent } from './profile/community-members/community-members.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { LanguageSelectorComponent } from './layout/language-selector/language-selector.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { UpgradeModule } from '@angular/upgrade/static';
import { ProfileImageComponent } from "./profile/image/profile-image.component";
import { RawHTMLBlockComponent } from './layout/blocks/raw-html/raw-html-block.component';
import { StatisticsBlockComponent } from "./layout/blocks/statistics/statistics-block.component";
import { UpgradeUtils } from "./shared/upgrade-utils";
import { MomentModule } from 'angular2-moment';
import { ImageCropperModule } from 'ng2-img-cropper';
import { PopoverModule, ModalModule, TypeaheadModule, PaginationModule, BsDropdownModule, CarouselModule, CollapseModule } from 'ngx-bootstrap';
import { ProfileListComponent } from './profile/profile-list/profile-list.component';
import { ProfileJoinComponent } from './profile/profile-join/profile-join.component';
import { NgPipesModule } from 'ngx-pipes';
import { CKEditorModule } from 'ng2-ckeditor';
import { DragulaModule, DragulaService } from 'ng2-dragula';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InviteComponent } from './profile/configuration/communities/invite.component';
import { RecentDocumentsBlockComponent } from './layout/blocks/recent-documents/recent-documents-block.component';
import * as plugins from "../plugins";
import { SharedModule } from './shared.module';

@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        UpgradeModule,
        MomentModule,
        ModalModule.forRoot(),
        ImageCropperModule,
        NgPipesModule,
        CKEditorModule,
        PaginationModule.forRoot(),
        PopoverModule.forRoot(),
        DragulaModule,
        TypeaheadModule.forRoot(),
        BsDropdownModule.forRoot(),
        CarouselModule.forRoot(),
        CollapseModule.forRoot(),
        BrowserAnimationsModule,
        TagCloudModule,
        SharedModule
    ],
    declarations: [
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
        ProfileImageBlockComponent,
        CommunityMembersComponent,
        UiSrefDirective,
        ProfileFastEditionComponent,
        ValidationMessageComponent,
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
        CommunityMembersMyProfileComponent,
        EditCommunityComponent,
        PersonCommunitiesComponent,
        MenuBlockComponent,
        PermissionNg2Directive,
        InviteComponent,
        MainBlockUpgradeDirective,
        ProfileSummaryComponent,
        PermissionNg2Directive,
        LoginBlockComponent,
        LinkListBlockComponent,
        EditableLinkComponent,
        IconPickerComponent,
        NoosferoTemplatePipe,
        HighlightsBlockComponent,
        DisplayContentBlockComponent,
        TagsBlockComponent,
        BreadcrumbsBlockComponent,
        DiscussionBlockUpgradeDirective,
        BlockEditionComponent,
        AddBlockComponent,
        TopProfileImageComponent,
        PostCommentComponent,
        CommentFormHotspotComponent,
        ProfileHeaderComponent,
        ContextBarComponent,
        LayoutConfigComponent,
        ProfileActionsComponent,
        ConfigBarComponent,
        DesignModeTogglerComponent,
        TaskComponent,
        ProfileLinkComponent,
        TasksComponent,
        TasksMenuComponent,
        SearchFormComponent,
        ApproveArticleTaskAcceptComponent,
        AbuseComplaintTaskAcceptComponent,
        SuggestArticleTaskAcceptComponent,
        BasicEditorComponent,
        ArticleIconComponent,
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
        ProfileImageBlockComponent,
        CommunityMembersComponent,
        ProfileFastEditionComponent,
        HtmlEditorComponent,
        ProfileConfigurationMenuComponent,
        ProfilePersonalDataComponent,
        ProfileListComponent,
        ProfileJoinComponent,
        NewCommunityComponent,
        EditCommunityComponent,
        PersonFriendsComponent,
        CommunityMembersMyProfileComponent,
        PersonCommunitiesComponent,
        ChangePasswordComponent,
        MenuBlockComponent,
        PersonCommunitiesComponent,
        ProfileJoinComponent,
        InviteComponent,
        ProfileSummaryComponent,
        ProfileJoinComponent,
        LoginBlockComponent,
        LinkListBlockComponent,
        EditableLinkComponent,
        IconPickerComponent,
        DisplayContentBlockComponent,
        HighlightsBlockComponent,
        TagsBlockComponent,
        BreadcrumbsBlockComponent,
        BlockEditionComponent,
        AddBlockComponent,
        TopProfileImageComponent,
        PostCommentComponent,
        ProfileHeaderComponent,
        ContextBarComponent,
        LayoutConfigComponent,
        ProfileActionsComponent,
        ConfigBarComponent,
        DesignModeTogglerComponent,
        ProfileLinkComponent,
        TasksComponent,
        TasksMenuComponent,
        SearchFormComponent,
        ApproveArticleTaskAcceptComponent,
        AbuseComplaintTaskAcceptComponent,
        SuggestArticleTaskAcceptComponent,
        BasicEditorComponent,
        ArticleIconComponent,
    ].concat(plugins.ng2MainComponents),
    providers: UpgradeUtils.provideAngular1Services([
        'AuthService',
        'SessionService',
        '$state',
        'TranslatorService',
        'ArticleService',
        'BlockService',
        'SettingsService',
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
        'EnvironmentService',
        'CommentService',
        'DesignModeService',
        '$sce',
        'ThemeService',
    ])
})

export class AppModule {
    ngDoBootstrap() {
    }
}
