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
import { TaskListComponent } from './task/task-list/task-list.component';
import { LanguageSelectorComponent } from './layout/language-selector/language-selector.component';
import { FooterComponent } from './layout/footer/footer.component';
import { bundle, bootstrap, provide } from "ng-forward";
import { noosferoModuleConfig } from "./index.config";
import { noosferoAngularRunBlock } from "./index.run";
import { MainComponent } from "./main/main.component";
import { AuthEvents } from "./login/auth-events";

import { EVENTS_HUB_KNOW_EVENT_NAMES } from './shared/services/events-hub.service';
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

// Plugins imports
import { FriendsBlockComponent } from '../plugins/friends/blocks/friends-block/friends-block.component';

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
        downgradeComponent({ component: CommunitiesBlockComponent, inputs: ['block', 'owner']  }) as angular.IDirectiveFactory
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
    directive('profileFastEdition',
        downgradeComponent({component: ProfileFastEditionComponent, inputs: ['profile', 'environment'], outputs: ['finished']}) as angular.IDirectiveFactory
    ).
    directive('imageUploadCrop',
        downgradeComponent({component: ImageUploadCropComponent, inputs: ['file']}) as angular.IDirectiveFactory
    ).
    directive('imageUpload',
        downgradeComponent({component: ImageUploadComponent, inputs: ['cropEnabled'], outputs: ['finished']}) as angular.IDirectiveFactory
    ).
    directive('profileList',
        downgradeComponent({ component: ProfileListComponent, inputs: ['profiles'] }) as angular.IDirectiveFactory
    ).
    directive('htmlEditor',
        downgradeComponent({ component: HtmlEditorComponent, inputs: ['options', 'object', 'attribute'] }) as angular.IDirectiveFactory
    ).
    directive('profileConfiguration',
        downgradeComponent({ component: ProfileConfigurationComponent }) as angular.IDirectiveFactory
    ).
    directive('profileConfigurationMenu',
        downgradeComponent({ component: ProfileConfigurationMenuComponent, inputs: ['profile'] }) as angular.IDirectiveFactory
    ).
    directive('profilePersonalData',
        downgradeComponent({ component: ProfilePersonalDataComponent }) as angular.IDirectiveFactory
    );

export let noosferoApp = bundle('main', MainComponent, [
    provide(EVENTS_HUB_KNOW_EVENT_NAMES, { useClass: NoosferoKnownEvents })
]).publish();
