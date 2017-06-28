import { BoxesComponent } from './layout/boxes/boxes.component';
import { BlockComponent } from './layout/blocks/block.component';
import { BlockContentComponent } from './layout/blocks/block-content.component';
import { NotificationService } from './shared/services/notification.service';
import { EventsHubService } from './shared/services/events-hub.service';
import { TranslatorService } from './shared/services/translator.service';
import { ThemeService } from './shared/services/theme.service';
import { BodyStateClassesService } from './shared/services/body-state-classes.service';
import { DesignModeService } from './shared/services/design-mode.service';
import { AuthService } from './login/auth.service';
import { SessionService } from './login/session.service';
import { PersonService } from './../lib/ng-noosfero-api/http/person.service';
import { BlockService } from './../lib/ng-noosfero-api/http/block.service';
import { DomainService } from './../lib/ng-noosfero-api/http/domain.service';
import { ProfileService } from './../lib/ng-noosfero-api/http/profile.service';
import { EnvironmentService } from './../lib/ng-noosfero-api/http/environment.service';
import { ArticleService } from './../lib/ng-noosfero-api/http/article.service';
import { ArticleViewComponent } from './article/article-view.component';
import { ActivityComponent } from './profile/activities/activity/activity.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { ArticleEditorComponent } from './article/cms/article-editor/article-editor.component';
import { ActivityHeaderComponent } from './profile/activities/activity/header/activity-header.component';
import { CustomContentComponent } from './profile/custom-content/custom-content.component';
import { ArticleDefaultViewComponent } from './article/types/default/article-default.component';
import { FolderComponent } from './article/types/folder/folder.component';
import { ArticleBlogComponent } from './article/types/blog/blog.component';
import { DiscussionBlockComponent } from './../plugins/comment_paragraph/block/discussion/discussion-block.component';
import { TaskAcceptComponent } from './task/task-list/task-accept.component';
import { ArticleContentHotspotComponent } from './hotspot/article-content-hotspot.component';
import { DiscussionPeriodComponent } from './../plugins/comment_paragraph/article/discussion-period/discussion-period.component';
import { BasicOptionsComponent } from './article/cms/basic-options/basic-options.component';
import { ArticleToolbarHotspotComponent } from './hotspot/article-toolbar-hotspot.component';
import { BreadcrumbsBlockComponent } from './../plugins/breadcrumbs/blocks/breadcrumbs-block/breadcrumbs-block.component';
import { ThemeFooterComponent } from './layout/theme-footer/theme-footer.component';
import { ThemeHeaderComponent } from './layout/theme-header/theme-header.component';
import { RegisterComponent } from './account';
import { DiscussionEditorComponent } from './../plugins/comment_paragraph/article/cms/discussion-editor/discussion-editor.component';
import { PasswordComponent } from './login/new-password.component';
import { SearchComponent } from './search/search.component';
import { AllowCommentComponent } from './../plugins/comment_paragraph/allow-comment/allow-comment.component';
import { CommentComponent } from './article/comment/comment.component';
import { CommentsComponent } from './article/comment/comments.component';
import { ArticleIconComponent } from './article/article-icon/article-icon.component';
import { ApproveCommentTaskAcceptComponent } from './task/types/approve-comment/approve-comment-task-accept.component';
import { BasicEditorComponent } from './article/cms/basic-editor/basic-editor.component';
import { SearchFormComponent } from './search/search-form/search-form.component';
import { TasksMenuComponent } from './task/tasks-menu/tasks-menu.component';
import { TasksComponent } from './task/tasks/tasks.component';
import { FriendsBlockComponent } from '../plugins/friends/blocks/friends-block/friends-block.component';
import {
    ProfileImagesBlockComponent
} from '../plugins/profile_images/blocks/profile-images-block/profile-images-block.component';
import { SectionBlockComponent } from '../plugins/section_block/blocks/section-block/section-block.component';
import { VideoBlockComponent } from '../plugins/video/blocks/video-block/video-block.component';
import {
    EventPluginEventBlockComponent
} from './../plugins/event/blocks/event-plugin-event/event-plugin-event-block.component';
import {
    PersonTagsPluginInterestsBlockComponent
} from './../plugins/person_tags/blocks/person-tags-plugin-interests/person-tags-plugin-interests-block.component';
import {
    RecentActivitiesPluginActivitiesBlockComponent
} from './../plugins/recent_activities/blocks/recent-activities-block/recent-activities-plugin-activities-block.component';
import { PostCommentComponent } from './article/comment/post-comment/post-comment.component';
import { noosferoModuleConfig } from './index.config';
import { noosferoAngularRunBlock } from './index.run';
import { BlockEditionComponent } from './layout/blocks/block-edition/block-edition.component';
import { BlockSettingsComponent } from './layout/blocks/block-settings.component';
import { CommunitiesBlockComponent } from './layout/blocks/communities/communities-block.component';
import { DisplayContentBlockComponent } from './layout/blocks/display-content/display-content-block.component';
import { HighlightsBlockSettingsComponent } from './layout/blocks/highlights/highlights-block-settings.component';
import { HighlightsBlockComponent } from './layout/blocks/highlights/highlights-block.component';
import { LinkListBlockComponent } from './layout/blocks/link-list/link-list-block.component';
import { LoginBlockComponent } from './layout/blocks/login-block/login-block.component';
import { MembersBlockComponent } from './layout/blocks/members/members-block.component';
import { MenuBlockComponent } from './layout/blocks/menu/menu-block.component';
import { PeopleBlockComponent } from './layout/blocks/people/people-block.component';
import { ProfileImageBlockComponent } from './layout/blocks/profile-image/profile-image-block.component';
import { RawHTMLBlockComponent } from './layout/blocks/raw-html/raw-html-block.component';
import { RecentDocumentsBlockComponent } from './layout/blocks/recent-documents/recent-documents-block.component';
import { StatisticsBlockComponent } from './layout/blocks/statistics/statistics-block.component';
import { TagsBlockComponent } from './layout/blocks/tags/tags-block.component';
import { AddBlockComponent } from './layout/boxes/add-block/add-block.component';
import { ConfigBarComponent } from './layout/config-bar/config-bar.component';
import { ContextBarComponent } from './layout/context-bar/context-bar.component';
import { DesignModeTogglerComponent } from './layout/design-mode-toggler/design-mode-toggler.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LanguageSelectorComponent } from './layout/language-selector/language-selector.component';
import { LayoutConfigComponent } from './layout/layout-config/layout-config.component';
import { AuthEvents } from './login/auth-events';
import { MainComponent } from './main/main.component';
import { ProfileActionsComponent } from './profile/actions/profile-actions.component';
import { CommunityMembersComponent } from './profile/community-members/community-members.component';
import { ChangePasswordComponent } from './profile/configuration/change-password/change-password.component';
import {
    CommunityMembersMyProfileComponent
} from './profile/configuration/communities/community-members-my-profile.component';
import { EditCommunityComponent } from './profile/configuration/communities/edit-community.component';
import { InviteComponent } from './profile/configuration/communities/invite.component';
import { NewCommunityComponent } from './profile/configuration/communities/new-community.component';
import { PersonCommunitiesComponent } from './profile/configuration/communities/person-communities.component';
import { PersonFriendsComponent } from './profile/configuration/friends/person-friends.component';
import { ProfileConfigurationMenuComponent } from './profile/configuration/menu/profile-configuration-menu.component';
import { ProfilePersonalDataComponent } from './profile/configuration/personal-data/profile-personal-data.component';
import { ProfileFastEditionComponent } from './profile/fast-edition/profile-fast-edition.component';
import { ProfileHeaderComponent } from './profile/header/profile-header.component';
import { ProfileImageComponent } from './profile/image/profile-image.component';
import { ProfileJoinComponent } from './profile/profile-join/profile-join.component';
import { ProfileLinkComponent } from './profile/profile-link/profile-link.component';
import { ProfileListComponent } from './profile/profile-list/profile-list.component';
import { ProfileSummaryComponent } from './profile/summary/profile-summary.component';
import { TopProfileImageComponent } from './profile/top-image/top-profile-image.component';
import { EditableLinkComponent } from './shared/components/editable-link/editable-link.component';
import { HtmlEditorComponent } from './shared/components/html-editor/html-editor.component';
import { IconPickerComponent } from './shared/components/icon-picker/icon-picker.component';
import { ImageUploadCropComponent } from './shared/components/image-upload/image-upload-crop.component';
import { ImageUploadComponent } from './shared/components/image-upload/image-upload.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { downgradeComponent, downgradeInjectable } from '@angular/upgrade/static';
import { bundle } from 'ng-forward';
import { BootstrapResizableDirective } from './shared/components/bootstrap-resizable/bootstrap-resizable.directive';

// FIXME see a better way to declare template modules for dev mode
try {
    angular.module('noosfero.templates.app');
} catch (error) {
    angular.module('noosfero.templates.app', []);
}
try {
    angular.module('noosfero.templates.plugins');
} catch (error) {
    angular.module('noosfero.templates.plugins', []);
}

angular.module('noosfero.init', ['noosfero.templates.app', 'noosfero.templates.plugins']).
    config(noosferoModuleConfig).
    run(noosferoAngularRunBlock).
    constant("AuthEvents", AuthEvents).
    directive('noosferoFooter',
    downgradeComponent({ component: FooterComponent }) as angular.IDirectiveFactory
    ).
    directive('noosferoRawHtmlblock',
    downgradeComponent({ component: RawHTMLBlockComponent, inputs: ['block', 'owner'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoStatisticsBlock',
    downgradeComponent({ component: StatisticsBlockComponent, inputs: ['block', 'owner'] }) as angular.IDirectiveFactory
    ).
    directive('languageSelector',
    downgradeComponent({ component: LanguageSelectorComponent }) as angular.IDirectiveFactory
    ).
    directive('noosferoProfileImage',
    downgradeComponent({ component: ProfileImageComponent, inputs: ['profile', 'iconSize', 'editable'] }) as angular.IDirectiveFactory
    ).
    directive('taskList',
    downgradeComponent({ component: TaskListComponent, inputs: ['tasks'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoCommunitiesBlock',
    downgradeComponent({ component: CommunitiesBlockComponent, inputs: ['block', 'owner'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoMembersBlock',
    downgradeComponent({ component: MembersBlockComponent, inputs: ['block', 'owner'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoPeopleBlock',
    downgradeComponent({ component: PeopleBlockComponent, inputs: ['block', 'owner'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoCommunityMembers',
    downgradeComponent({ component: CommunityMembersComponent }) as angular.IDirectiveFactory
    ).
    directive('noosferoFriendsBlock',
    downgradeComponent({ component: FriendsBlockComponent, inputs: ['block', 'owner'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoRecentDocumentsBlock',
    downgradeComponent({ component: RecentDocumentsBlockComponent, inputs: ['block', 'owner'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoProfileImagesPluginProfileImagesBlock',
    downgradeComponent({ component: ProfileImagesBlockComponent, inputs: ['block', 'owner'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoSectionBlockPluginSectionBlock',
    downgradeComponent({ component: SectionBlockComponent, inputs: ['block', 'owner'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoVideoPluginVideoBlock',
    downgradeComponent({ component: VideoBlockComponent, inputs: ['block', 'owner'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoProfileImageBlock',
    downgradeComponent({ component: ProfileImageBlockComponent, inputs: ['block', 'owner'] }) as angular.IDirectiveFactory
    ).
    directive('profileFastEdition',
    downgradeComponent({ component: ProfileFastEditionComponent, inputs: ['profile', 'environment'], outputs: ['finished'] }) as angular.IDirectiveFactory
    ).
    directive('imageUploadCrop',
    downgradeComponent({ component: ImageUploadCropComponent, inputs: ['file'] }) as angular.IDirectiveFactory
    ).
    directive('imageUpload',
    downgradeComponent({ component: ImageUploadComponent, inputs: ['cropEnabled'], outputs: ['finished'] }) as angular.IDirectiveFactory
    ).
    directive('profileList',
    downgradeComponent({ component: ProfileListComponent, inputs: ['profiles'] }) as angular.IDirectiveFactory
    ).
    directive('profileJoin',
    downgradeComponent({ component: ProfileJoinComponent, inputs: ['profile'] }) as angular.IDirectiveFactory
    ).
    directive('htmlEditor',
    downgradeComponent({ component: HtmlEditorComponent, inputs: ['options', 'object', 'attribute'] }) as angular.IDirectiveFactory
    ).
    directive('profileConfigurationMenu',
    downgradeComponent({ component: ProfileConfigurationMenuComponent, inputs: ['profile'] }) as angular.IDirectiveFactory
    ).
    directive('profilePersonalData',
    downgradeComponent({ component: ProfilePersonalDataComponent, inputs: ['profile'] }) as angular.IDirectiveFactory
    ).
    directive('personFriends',
    downgradeComponent({ component: PersonFriendsComponent, inputs: ['profile'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoCommunityMembersMyProfile',
    downgradeComponent({ component: CommunityMembersMyProfileComponent, inputs: ['profile'] }) as angular.IDirectiveFactory
    ).
    directive('newCommunity',
    downgradeComponent({ component: NewCommunityComponent, inputs: ['profile'] }) as angular.IDirectiveFactory
    ).
    directive('editCommunity',
    downgradeComponent({ component: EditCommunityComponent, inputs: ['profile'] }) as angular.IDirectiveFactory
    ).
    directive('personCommunities',
    downgradeComponent({ component: PersonCommunitiesComponent, inputs: ['profile'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoProfileSummary',
    downgradeComponent({ component: ProfileSummaryComponent, inputs: ['profile'] }) as angular.IDirectiveFactory
    ).
    directive('changePassword',
    downgradeComponent({ component: ChangePasswordComponent, inputs: ['profile'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoMenuBlock',
    downgradeComponent({ component: MenuBlockComponent, inputs: ['block', 'owner', 'designMode'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoInviteComponent',
    downgradeComponent({ component: InviteComponent, inputs: ['people'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoLoginBlock',
    downgradeComponent({ component: LoginBlockComponent }) as angular.IDirectiveFactory
    ).
    directive('noosferoRecentActivitiesPluginActivitiesBlock',
    downgradeComponent({ component: RecentActivitiesPluginActivitiesBlockComponent, inputs: ['block', 'owner', 'designMode'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoInterestTagsBlock',
    downgradeComponent({ component: PersonTagsPluginInterestsBlockComponent, inputs: ['block', 'owner', 'designMode'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoLinkListBlock',
    downgradeComponent({ component: LinkListBlockComponent, inputs: ['block', 'owner', 'designMode'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoEditableLink',
    downgradeComponent({ component: EditableLinkComponent, inputs: ['name', 'address', 'designMode', 'owner'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoIconPicker',
    downgradeComponent({ component: IconPickerComponent, inputs: ['currentIcon'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoHighlightsBlock',
    downgradeComponent({ component: HighlightsBlockComponent, inputs: ['block', 'owner', 'designMode'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoDisplayContentBlock',
    downgradeComponent({ component: DisplayContentBlockComponent, inputs: ['block', 'owner'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoHighlightsBlockSettings',
    downgradeComponent({ component: HighlightsBlockSettingsComponent, inputs: ['block', 'owner'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoEventPluginEventBlock',
    downgradeComponent({ component: EventPluginEventBlockComponent, inputs: ['block', 'owner'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoTagsCloudBlock',
    downgradeComponent({ component: TagsBlockComponent, inputs: ['block', 'owner'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoBlockSettings',
    downgradeComponent({ component: BlockSettingsComponent, inputs: ['block', 'owner'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoBlockEdition',
    downgradeComponent({ component: BlockEditionComponent, inputs: ['block', 'owner'] }) as angular.IDirectiveFactory
    ).
    directive('addBlock',
    downgradeComponent({ component: AddBlockComponent, inputs: ['box', 'owner'], outputs: ['onAdd'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoTopProfileImage',
    downgradeComponent({ component: TopProfileImageComponent, inputs: ['profile', 'editable'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoPostComment',
        downgradeComponent({ component: PostCommentComponent, inputs: ['article', 'parent', 'comment'], outputs: ['commentSaved'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoProfileHeader',
    downgradeComponent({ component: ProfileHeaderComponent, inputs: ['profile'] }) as angular.IDirectiveFactory
    ).
    directive('contextBar',
    downgradeComponent({ component: ContextBarComponent, inputs: ['owner', 'permissionAction'] }) as angular.IDirectiveFactory
    ).
    directive('layoutConfig',
    downgradeComponent({ component: LayoutConfigComponent, inputs: ['owner'] }) as angular.IDirectiveFactory
    ).
    directive('configBar',
    downgradeComponent({ component: ConfigBarComponent, inputs: ['owner', 'permissionAction'] }) as angular.IDirectiveFactory
    ).
    directive('profileActions',
    downgradeComponent({ component: ProfileActionsComponent, inputs: ['profile'] }) as angular.IDirectiveFactory
    ).
    directive('designToggler',
    downgradeComponent({ component: DesignModeTogglerComponent }) as angular.IDirectiveFactory
    ).
    directive('profileLink',
        downgradeComponent({ component: ProfileLinkComponent, inputs: ['profile', 'displayImage', 'displayName', 'truncate'] }) as angular.IDirectiveFactory
    ).
    directive('tasks',
        downgradeComponent({ component: TasksComponent, inputs: ['taskTypes'] }) as angular.IDirectiveFactory
    ).
    directive('tasksMenu',
        downgradeComponent({ component: TasksMenuComponent, inputs: ['taskTypes'] }) as angular.IDirectiveFactory
    ).
    directive('searchForm',
        downgradeComponent({ component: SearchFormComponent }) as angular.IDirectiveFactory
    ).
    directive('articleBasicEditor',
        downgradeComponent({ component: BasicEditorComponent, inputs: ['article', 'options'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoComment',
        downgradeComponent({ component: CommentComponent, inputs: ['comment', 'article', 'displayActions', 'displayReplies'], outputs: ['commentRemoved'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoComments',
        downgradeComponent({ component: CommentsComponent, inputs: ['showForm', 'article', 'parent', 'fullPagination'] }) as angular.IDirectiveFactory
    ).
    directive('commentParagraphPluginAllowComment',
        downgradeComponent({ component: AllowCommentComponent, inputs: ['content', 'paragraphUuid', 'article'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoArticleIcon',
        downgradeComponent({ component: ArticleIconComponent, inputs: ['article'] }) as angular.IDirectiveFactory
    ).
    directive('approveCommentTaskAccept',
        downgradeComponent({ component: ApproveCommentTaskAcceptComponent, inputs: ['task', 'confirmationTask'] }) as angular.IDirectiveFactory
    ).
    directive('search',
        downgradeComponent({ component: SearchComponent }) as angular.IDirectiveFactory
    ).
    directive('newPassword',
        downgradeComponent({ component: PasswordComponent, inputs: ['code'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoRegister',
        downgradeComponent({ component: RegisterComponent, inputs: ['account'] }) as angular.IDirectiveFactory
    ).
    directive('commentParagraphPluginDiscussionEditor',
        downgradeComponent({ component: DiscussionEditorComponent, inputs: ['article', 'options'] }) as angular.IDirectiveFactory
    ).
    directive('themeHeader',
        downgradeComponent({ component: ThemeHeaderComponent }) as angular.IDirectiveFactory
    ).
    directive('themeFooter',
        downgradeComponent({ component: ThemeFooterComponent }) as angular.IDirectiveFactory
    ).
    directive('noosferoBreadcrumbsPluginContentBreadcrumbsBlock',
        downgradeComponent({ component: BreadcrumbsBlockComponent, inputs: ['block', 'owner'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoHotspotArticleToolbar',
        downgradeComponent({ component: ArticleToolbarHotspotComponent, inputs: ['article'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoHotspotArticleContent',
        downgradeComponent({ component: ArticleContentHotspotComponent, inputs: ['article'] }) as angular.IDirectiveFactory
    ).
    directive('articleBasicOptions',
        downgradeComponent({ component: BasicOptionsComponent, inputs: ['article'] }) as angular.IDirectiveFactory
    ).
    directive('discussionPeriod',
        downgradeComponent({ component: DiscussionPeriodComponent, inputs: ['article'] }) as angular.IDirectiveFactory
    ).
    directive('taskAccept',
        downgradeComponent({ component: TaskAcceptComponent, inputs: ['task', 'confirmationTask'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoCommentParagraphPluginDiscussionBlock',
        downgradeComponent({ component: DiscussionBlockComponent, inputs: ['block', 'owner'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoBlog',
        downgradeComponent({ component: ArticleBlogComponent, inputs: ['article', 'profile'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoFolder',
        downgradeComponent({ component: FolderComponent, inputs: ['article', 'profile'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoDefaultArticle',
        downgradeComponent({ component: ArticleDefaultViewComponent, inputs: ['article', 'profile'] }) as angular.IDirectiveFactory
    ).
    directive('customContent',
        downgradeComponent({ component: CustomContentComponent, inputs: ['attribute', 'profile', 'label'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoActivityHeader',
        downgradeComponent({ component: ActivityHeaderComponent, inputs: ['activity', 'desc', 'profiles', 'iconalt', 'iconclass'] }) as angular.IDirectiveFactory
    ).
    directive('articleEditor',
        downgradeComponent({ component: ArticleEditorComponent, inputs: ['article', 'profile', 'path'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoNavbar',
        downgradeComponent({ component: NavbarComponent }) as angular.IDirectiveFactory
    ).
    directive('noosferoActivity',
        downgradeComponent({ component: ActivityComponent, inputs: ['activity'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoArticle',
        downgradeComponent({ component: ArticleViewComponent, inputs: ['article', 'profile'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoBlockContent',
        downgradeComponent({ component: BlockContentComponent, inputs: ['block', 'owner', 'designMode'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoBlock',
        downgradeComponent({ component: BlockComponent, inputs: ['block', 'owner', 'box'] }) as angular.IDirectiveFactory
    ).
    directive('noosferoBoxes',
        downgradeComponent({ component: BoxesComponent, inputs: ['boxes', 'owner', 'layout', 'columns', 'startIndex'] }) as angular.IDirectiveFactory
    )
    .factory('articleService', downgradeInjectable(ArticleService))
    .factory('environmentService', downgradeInjectable(EnvironmentService))
    .factory('profileService', downgradeInjectable(ProfileService))
    .factory('domainService', downgradeInjectable(DomainService))
    .factory('blockService', downgradeInjectable(BlockService))
    .factory('personService', downgradeInjectable(PersonService))
    .factory('sessionService', downgradeInjectable(SessionService))
    .factory('authService', downgradeInjectable(AuthService))
    .factory('designModeService', downgradeInjectable(DesignModeService))
    .factory('bodyStateClassesService', downgradeInjectable(BodyStateClassesService))
    .factory('themeService', downgradeInjectable(ThemeService))
    .factory('eventsHubService', downgradeInjectable(EventsHubService))
    .factory('translatorService', downgradeInjectable(TranslatorService))
    .factory('notificationService', downgradeInjectable(NotificationService));

export let noosferoApp = bundle('main', MainComponent, []).publish();