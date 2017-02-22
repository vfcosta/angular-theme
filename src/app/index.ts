import { ProfileFastEditionComponent } from './profile/fast-edition/profile-fast-edition.component';
import { ImageUploadComponent } from './shared/components/image-upload/image-upload.component';
import { ImageUploadCropComponent } from './shared/components/image-upload/image-upload-crop.component';
import { CommunitiesBlockComponent } from './layout/blocks/communities/communities-block.component';
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
import { ListProfilesComponent } from './profile/lists/list-profiles.component';


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
        downgradeComponent({ component: ListProfilesComponent, inputs: ['profiles'] }) as angular.IDirectiveFactory
    );

export let noosferoApp = bundle('main', MainComponent, [
    provide(EVENTS_HUB_KNOW_EVENT_NAMES, { useClass: NoosferoKnownEvents })
]).publish();
