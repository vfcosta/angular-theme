import { TasksComponent } from './task/tasks/tasks.component';
import { ProfileLinkComponent } from './profile/profile-link/profile-link.component';
import { DesignModeTogglerComponent } from './layout/design-mode-toggler/design-mode-toggler.component';
import { ProfileActionsComponent } from './profile/actions/profile-actions.component';
import { ConfigBarComponent } from './layout/config-bar/config-bar.component';
import { LayoutConfigComponent } from './layout/layout-config/layout-config.component';
import { ContextBarComponent } from './layout/context-bar/context-bar.component';
import { ProfileHeaderComponent } from "./profile/header/profile-header.component";
import { PostCommentComponent } from './article/comment/post-comment/post-comment.component';
import { AddBlockComponent } from './layout/boxes/add-block/add-block.component';
import { TopProfileImageComponent } from './profile/top-image/top-profile-image.component';
import { BlockEditionComponent } from './layout/blocks/block-edition/block-edition.component';
import { TagsBlockComponent } from './layout/blocks/tags/tags-block.component';
import { DisplayContentBlockComponent } from './layout/blocks/display-content/display-content-block.component';
import { EventPluginEventBlockComponent } from './../plugins/event/blocks/event-plugin-event/event-plugin-event-block.component';
import { HighlightsBlockSettingsComponent } from './layout/blocks/highlights/highlights-block-settings.component';
import { HighlightsBlockComponent } from './layout/blocks/highlights/highlights-block.component';
import { PersonTagsPluginInterestsBlockComponent } from './../plugins/person_tags/blocks/person-tags-plugin-interests/person-tags-plugin-interests-block.component';
import { RecentActivitiesPluginActivitiesBlockComponent } from './../plugins/recent_activities/blocks/recent-activities-block/recent-activities-plugin-activities-block.component';
import { LoginBlockComponent } from './layout/blocks/login-block/login-block.component';
import { IconPickerComponent } from './shared/components/icon-picker/icon-picker.component';
import { EditableLinkComponent } from './shared/components/editable-link/editable-link.component';
import { LinkListBlockComponent } from './layout/blocks/link-list/link-list-block.component';
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
import { ProfileConfigurationComponent } from './profile/configuration/profile-configuration.component';
import { HtmlEditorComponent } from './shared/components/html-editor/html-editor.component';
import { ProfileFastEditionComponent } from './profile/fast-edition/profile-fast-edition.component';
import { ImageUploadComponent } from './shared/components/image-upload/image-upload.component';
import { ImageUploadCropComponent } from './shared/components/image-upload/image-upload-crop.component';
import { CommunitiesBlockComponent } from './layout/blocks/communities/communities-block.component';
import { MembersBlockComponent } from './layout/blocks/members/members-block.component';
import { PeopleBlockComponent } from './layout/blocks/people/people-block.component';
import { CommunityMembersComponent } from './profile/community-members/community-members.component';
import { InviteComponent } from './profile/configuration/communities/invite.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { LanguageSelectorComponent } from './layout/language-selector/language-selector.component';
import { FooterComponent } from './layout/footer/footer.component';
import { bundle, bootstrap, provide } from "ng-forward";
import { noosferoModuleConfig } from "./index.config";
import { noosferoAngularRunBlock } from "./index.run";
import { MainComponent } from "./main/main.component";
import { AuthEvents } from "./login/auth-events";

import { NoosferoKnownEvents } from './known-events';

import { AuthService } from "./login/auth.service";
import { SessionService } from "./login/session.service";
import { NotificationService } from "./shared/services/notification.service";
import { BodyStateClassesService } from "./shared/services/body-state-classes.service";
import { downgradeComponent } from '@angular/upgrade/static';
import { ProfileImageComponent } from "./profile/image/profile-image.component";
import { RawHTMLBlockComponent } from "./layout/blocks/raw-html/raw-html-block.component";
import { StatisticsBlockComponent } from "./layout/blocks/statistics/statistics-block.component";
import { ProfileListComponent } from './profile/profile-list/profile-list.component';
import { ProfileJoinComponent } from './profile/profile-join/profile-join.component';
import { RecentDocumentsBlockComponent } from "./layout/blocks/recent-documents/recent-documents-block.component";
import { ProfileImageBlockComponent } from "./layout/blocks/profile-image/profile-image-block.component";

// Plugins imports
import { FriendsBlockComponent } from '../plugins/friends/blocks/friends-block/friends-block.component';
import { ProfileImagesBlockComponent } from '../plugins/profile_images/blocks/profile-images-block/profile-images-block.component';
import { BlockSettingsComponent } from './layout/blocks/block-settings.component';
import { SectionBlockComponent } from '../plugins/section_block/blocks/section-block/section-block.component';
import { VideoBlockComponent } from '../plugins/video/blocks/video-block/video-block.component';

declare var moment: any;

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
    constant("moment", moment).
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
    );

export let noosferoApp = bundle('main', MainComponent, []).publish();
