import { ArticleViewComponent } from './article/article-view.component';
import { ActivityComponent } from './profile/activities/activity/activity.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { ArticleEditorComponent } from './article/cms/article-editor/article-editor.component';
import { ActivityHeaderComponent } from './profile/activities/activity/header/activity-header.component';
import { CustomContentComponent } from './profile/custom-content/custom-content.component';
import { ValidationMessageComponent } from './shared/components/validation-message/validation-message.component';
import { AllowCommentComponent } from './../plugins/comment_paragraph/allow-comment/allow-comment.component';
import { ArticleDefaultViewComponent } from './article/types/default/article-default.component';
import { FolderComponent } from './article/types/folder/folder.component';
import { ArticleBlogComponent } from './article/types/blog/blog.component';
import { TaskAcceptComponent } from './task/task-list/task-accept.component';
import { ArticleContentHotspotComponent } from './hotspot/article-content-hotspot.component';
import { BasicOptionsComponent } from './article/cms/basic-options/basic-options.component';
import { ArticleToolbarHotspotComponent } from './hotspot/article-toolbar-hotspot.component';
import { ThemeFooterComponent } from './layout/theme-footer/theme-footer.component';
import * as theme from '../../themes';
import { ThemeHeaderComponent } from './layout/theme-header/theme-header.component';
import { RegisterComponent } from './account/register.component';
import { SearchComponent } from './search/search.component';
import { PasswordComponent } from './login/new-password.component';
import { ArticleIconComponent } from './article/article-icon/article-icon.component';
import { SearchFormComponent } from './search/search-form/search-form.component';
import { TasksMenuComponent } from './task/tasks-menu/tasks-menu.component';
import { TasksComponent } from './task/tasks/tasks.component';
import { TaskComponent } from './task/task.component';
import { ProfileActionsComponent } from './profile/actions/profile-actions.component';
import { DesignModeTogglerComponent } from './layout/design-mode-toggler/design-mode-toggler.component';
import { ConfigBarComponent } from './layout/config-bar/config-bar.component';
import { LayoutConfigComponent } from './layout/layout-config/layout-config.component';
import { ContextBarComponent } from './layout/context-bar/context-bar.component';
import { ProfileHeaderComponent } from './profile/header/profile-header.component';
import { AddBlockComponent } from './layout/boxes/add-block/add-block.component';
import { TopProfileImageComponent } from './profile/top-image/top-profile-image.component';
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
import { NoosferoUrlPipe } from './shared/pipes/noosfero-url.pipe';
import { ProfileListEditionComponent } from './profile/profile-list/edition/profile-list-edition.component';
import { ProfileFastEditionComponent } from './profile/fast-edition/profile-fast-edition.component';
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
import { RawHTMLBlockComponent } from './layout/blocks/raw-html/raw-html-block.component';
import { StatisticsBlockComponent } from "./layout/blocks/statistics/statistics-block.component";
import { UpgradeUtils } from "./shared/upgrade-utils";
import { ImageCropperModule } from 'ng2-img-cropper';
import { PopoverModule, ModalModule, TypeaheadModule, BsDropdownModule, CarouselModule, CollapseModule } from 'ngx-bootstrap';
import { ProfileListComponent } from './profile/profile-list/profile-list.component';
import { ProfileJoinComponent } from './profile/profile-join/profile-join.component';
import { DragulaModule, DragulaService } from 'ng2-dragula';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InviteComponent } from './profile/configuration/communities/invite.component';
import { RecentDocumentsBlockComponent } from './layout/blocks/recent-documents/recent-documents-block.component';
import * as plugins from "../plugins";
import { SharedModule } from './shared.module';
import { MyDatePickerModule } from 'mydatepicker';
import { DynamicHTMLModule, DynamicComponentModule } from 'ng-dynamic';

@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        UpgradeModule,
        ModalModule.forRoot(),
        ImageCropperModule,
        PopoverModule.forRoot(),
        DragulaModule,
        TypeaheadModule.forRoot(),
        BsDropdownModule.forRoot(),
        CarouselModule.forRoot(),
        CollapseModule.forRoot(),
        BrowserAnimationsModule,
        TagCloudModule,
        SharedModule,
        MyDatePickerModule,
        DynamicHTMLModule.forRoot({
            components: plugins.macros
        }),
    ],
    declarations: [
        FooterComponent,
        LanguageSelectorComponent,
        RawHTMLBlockComponent,
        RecentDocumentsBlockComponent,
        StatisticsBlockComponent,
        TaskListComponent,
        CommunitiesBlockComponent,
        MembersBlockComponent,
        PeopleBlockComponent,
        ProfileImageBlockComponent,
        CommunityMembersComponent,
        ProfileFastEditionComponent,
        ValidationMessageComponent,
        ProfileListComponent,
        ProfileJoinComponent,
        ProfileConfigurationMenuComponent,
        ProfilePersonalDataComponent,
        NoosferoUrlPipe,
        ProfileListEditionComponent,
        NewCommunityComponent,
        ChangePasswordComponent,
        PersonFriendsComponent,
        CommunityMembersMyProfileComponent,
        EditCommunityComponent,
        PersonCommunitiesComponent,
        MenuBlockComponent,
        InviteComponent,
        MainBlockUpgradeDirective,
        ProfileSummaryComponent,
        LoginBlockComponent,
        LinkListBlockComponent,
        EditableLinkComponent,
        IconPickerComponent,
        NoosferoTemplatePipe,
        HighlightsBlockComponent,
        DisplayContentBlockComponent,
        TagsBlockComponent,
        BreadcrumbsBlockComponent,
        BlockEditionComponent,
        AddBlockComponent,
        TopProfileImageComponent,
        ProfileHeaderComponent,
        ContextBarComponent,
        LayoutConfigComponent,
        ProfileActionsComponent,
        ConfigBarComponent,
        DesignModeTogglerComponent,
        TaskComponent,
        TasksComponent,
        TasksMenuComponent,
        SearchFormComponent,
        ArticleIconComponent,
        SearchComponent,
        PasswordComponent,
        RegisterComponent,
        ThemeHeaderComponent,
        ThemeFooterComponent,
        ArticleToolbarHotspotComponent,
        BasicOptionsComponent,
        TaskAcceptComponent,
        ArticleContentHotspotComponent,
        ArticleBlogComponent,
        FolderComponent,
        ArticleDefaultViewComponent,
        CustomContentComponent,
        ActivityHeaderComponent,
        ArticleEditorComponent,
        NavbarComponent,
        ActivityComponent,
        ArticleViewComponent,
    ].concat(plugins.ng2MainComponents).concat(theme.components),
    entryComponents: [
        FooterComponent,
        LanguageSelectorComponent,
        RawHTMLBlockComponent,
        RecentDocumentsBlockComponent,
        StatisticsBlockComponent,
        TaskListComponent,
        CommunitiesBlockComponent,
        MembersBlockComponent,
        PeopleBlockComponent,
        ProfileImageBlockComponent,
        CommunityMembersComponent,
        ProfileFastEditionComponent,
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
        ProfileHeaderComponent,
        ContextBarComponent,
        LayoutConfigComponent,
        ProfileActionsComponent,
        ConfigBarComponent,
        DesignModeTogglerComponent,
        TasksComponent,
        TasksMenuComponent,
        SearchFormComponent,
        ArticleIconComponent,
        SearchComponent,
        PasswordComponent,
        RegisterComponent,
        ThemeHeaderComponent,
        ThemeFooterComponent,
        ArticleToolbarHotspotComponent,
        BasicOptionsComponent,
        TaskAcceptComponent,
        ArticleContentHotspotComponent,
        ArticleBlogComponent,
        FolderComponent,
        ArticleDefaultViewComponent,
        CustomContentComponent,
        ActivityHeaderComponent,
        ArticleEditorComponent,
        NavbarComponent,
        ActivityComponent,
        ArticleViewComponent,
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
        'CommentParagraphEventService',
        'CommentParagraphService',
        'PasswordService',
        'RegisterService',
        'angularLoad',
        '$location',
        '$anchorScroll',
        'bodyStateClassesService',
        '$window',
    ])
})

export class AppModule {
    ngDoBootstrap() {
    }
}
