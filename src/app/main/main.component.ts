import { UserService } from './../../lib/ng-noosfero-api/http/user.service';
import { TranslateProfile } from './../shared/pipes/translate-profile.filter';
import { ArticleEditorComponent } from './../article/cms/article-editor/article-editor.component';
import { BasicOptionsComponent } from './../article/cms/basic-options/basic-options.component';
import { BasicEditorComponent } from './../article/cms/basic-editor/basic-editor.component';
import { TaskAcceptComponent } from './../task/task-list/task-accept.component';
import * as plugins from "../../plugins";
import * as theme from "../../../themes";
import { provide, bundle, Component, Inject } from "ng-forward";
import { ArticleBlogComponent } from "./../article/types/blog/blog.component";
import { FolderComponent } from "./../article/types/folder/folder.component";
import { ArticleIconComponent } from "./../article/article-icon/article-icon.component";
import { ArticleViewComponent } from "./../article/article-default-view.component";

import { PasswordComponent } from "../login/new-password.component";
import { ProfileComponent } from "../profile/profile.component";
import { BoxesComponent } from "../layout/boxes/boxes.component";
import { BlockContentComponent } from "../layout/blocks/block-content.component";
import { BlockSettingsComponent } from "../layout/blocks/block-settings.component";
import { BlockComponent } from "../layout/blocks/block.component";
import { EnvironmentHomeComponent } from "../environment/environment-home.component";
import { DisplayContentBlockComponent } from "../layout/blocks/display-content/display-content-block.component";
import { LinkListBlockComponent } from "../layout/blocks/link-list/link-list-block.component";
import { MenuBlockComponent } from "../layout/blocks/menu/menu-block.component";
import { ProfileImageBlockComponent } from "../layout/blocks/profile-image/profile-image-block.component";
import { TopProfileImageComponent } from "../profile/top-image/top-profile-image.component";
import { ProfileSummaryComponent } from "../profile/summary/profile-summary.component";
import { ProfileHeaderComponent } from "../profile/header/profile-header.component";
import { StatisticsBlockComponent } from "../layout/blocks/statistics/statistics-block.component";
import { TagsBlockComponent } from "../layout/blocks/tags/tags-block.component";
import { CustomContentComponent } from "../profile/custom-content/custom-content.component";
import { EventPluginEventBlockComponent } from "../layout/blocks/event-plugin-event/event-plugin-event-block.component";
import { RegisterComponent } from "../account/register.component";
import { HighlightsBlockComponent } from "../layout/blocks/highlights/highlights-block.component";
import { EditableLinkComponent } from "../shared/components/editable-link/editable-link.component";
import { IconPickerComponent } from "../shared/components/icon-picker/icon-picker.component";

import { NoosferoTemplate } from "../shared/pipes/noosfero-template.filter";
import { NoosferoUrl } from "../shared/pipes/noosfero-url.filter";
import { DateFormat } from "../shared/pipes/date-format.filter";

import { AuthService } from "../login/auth.service";
import { SessionService } from "../login/session.service";
import { EnvironmentService } from "./../../lib/ng-noosfero-api/http/environment.service";
import { CommunityService } from "./../../lib/ng-noosfero-api/http/community.service";
import { NotificationService } from "../shared/services/notification.service";
import { RegisterService } from "./../../lib/ng-noosfero-api/http/register.service";
import { DomainService } from "../../lib/ng-noosfero-api/http/domain.service";

import { BodyStateClassesService } from "./../shared/services/body-state-classes.service";

import { Navbar } from "../layout/navbar/navbar";

import { MainBlockComponent } from "../layout/blocks/main/main-block.component";
import { PermissionDirective } from "../shared/components/permission/permission.directive";
import { BootstrapResizableDirective } from "../shared/components/bootstrap-resizable/bootstrap-resizable.directive";
import { EditableDirective } from "../shared/components/editable/editable.directive";
import { SearchComponent } from "../search/search.component";
import { SearchFormComponent } from "../search/search-form/search-form.component";
import { EVENTS_HUB_KNOW_EVENT_NAMES, EventsHubService } from "../shared/services/events-hub.service";
import { NoosferoKnownEvents } from "../known-events";
import { TasksMenuComponent } from "../task/tasks-menu/tasks-menu.component";
import { ThemeHeaderComponent } from "../layout/theme-header/theme-header.component";
import { ThemeFooterComponent } from "../layout/theme-footer/theme-footer.component";
import { LayoutConfigComponent } from "../layout/layout-config/layout-config.component";
import { ConfigBarComponent } from "../layout/config-bar/config-bar.component";
import { ContextBarComponent } from "../layout/context-bar/context-bar.component";
import { DomainComponent } from "../domain/domain.component";

import { HeaderService } from "./../shared/services/header.service";

/**
 * @ngdoc controller
 * @name main.MainContentComponent
 * @requires AuthService, Session
 * @descrition
 *  This controller actually contains the main content of Noosfero Angular Theme:
 *  - the navbar
 *  - the {@link Main} view content
 *
 */
@Component({
    selector: 'main-content',
    templateUrl: "app/main/main.html",
    providers: [AuthService, SessionService]
})
@Inject(BodyStateClassesService, HeaderService, EVENTS_HUB_KNOW_EVENT_NAMES)
export class MainContentComponent {

    public themeSkin: string = 'skin-default';

    constructor(
        private bodyStateClassesService: BodyStateClassesService,
        private headerService: HeaderService,
        eventsNames: NoosferoKnownEvents,
        eventsHubService: EventsHubService) {
        bodyStateClassesService.start({
            skin: this.themeSkin
        });
    }
}

@Component({
    selector: 'environment-content',
    templateUrl: "app/main/main.html",
    providers: [AuthService, SessionService]
})
export class EnvironmentContent {

}

/**
 * @ngdoc controller
 * @name main.Main
 * @requires AuthService, Session, Notification, ArticleBlog, ArticleView, Boxes, Block, LinkListBlock,
 * MainBlock, RecentDocumentsBlock, Navbar, ProfileImageBlock, MembersBlock,
 * NoosferoTemplate, DateFormat, RawHTMLBlock, PersonTagsPluginInterestsBlock,
 * RecentActivitiesPluginActivitiesBlock, ProfileImagesPluginProfileImages, EventPluginEvent
 * @description
 *  The Main controller for the Noosfero Angular Theme application.
 *
 *  The main route '/' is defined as the URL for this controller, which routes
 * requests to the {@link main.MainContentComponent} controller and also, the '/profile' route,
 * which routes requests to the {@link profile.Profile} controller. See {@link profile.Profile}
 * for more details on how various Noosfero profiles are rendered.
 */
@Component({
    selector: 'main',
    template: '<ui-view/>',
    directives: [
        ArticleBlogComponent, ArticleViewComponent, BoxesComponent, BlockContentComponent,
        BlockSettingsComponent, DisplayContentBlockComponent,
        ProfileComponent, MainBlockComponent, Navbar, NoosferoTemplate, NoosferoUrl, DateFormat, PasswordComponent,
        CustomContentComponent, PermissionDirective, SearchFormComponent, SearchComponent,
        TagsBlockComponent,
        BlockComponent, RegisterComponent, TasksMenuComponent,
        EventPluginEventBlockComponent, ThemeHeaderComponent, ThemeFooterComponent, TaskAcceptComponent,
        FolderComponent, ArticleIconComponent, LayoutConfigComponent, ConfigBarComponent, BootstrapResizableDirective,
        EditableDirective,
        DomainComponent, ContextBarComponent, TopProfileImageComponent, ProfileHeaderComponent,
        ArticleEditorComponent, BasicOptionsComponent, BasicEditorComponent, TranslateProfile
    ].concat(plugins.mainComponents).concat(plugins.hotspots).concat(theme.components["angular-default"]),
    providers: [AuthService, SessionService, NotificationService, BodyStateClassesService, CommunityService, UserService,
        "ngAnimate", "ngCookies", "ngStorage", "ngTouch", "ngSanitize", "ngMessages", "ngAria", "restangular",
        "ui.router", "ui.bootstrap", "toastr", "angular-bind-html-compile", "angularMoment",
        "angular.filter", "akoenig.deckgrid", "angular-timeline", "duScroll", "oitozero.ngSweetAlert",
        "pascalprecht.translate", "tmh.dynamicLocale", "angularLoad", "angular-click-outside", "ngTagCloud",
        "noosfero.init", "ngFileUpload", "ngImgCrop", "flexcalendar", "angular-ladda", "focus-if",
        "xeditable", "com.2fdevs.videogular", "com.2fdevs.videogular.plugins.controls", "com.2fdevs.videogular.plugins.overlayplay",
        "com.2fdevs.videogular.plugins.poster", "com.2fdevs.videogular.plugins.buffering",
        "info.vietnamcode.nampnq.videogular.plugins.youtube", "dndLists", "angular-loading-bar",
        provide('bodyStateClassesService', { useClass: BodyStateClassesService }),
        provide('headerService', { useClass: HeaderService }),
        provide('eventsNames', { useClass: NoosferoKnownEvents }),
        provide('environmentService', { useClass: EnvironmentService })
    ]
})
@Inject(EnvironmentService)
export class MainComponent {

    constructor(environmentService: EnvironmentService) {
        environmentService.get('default').then((result: noosfero.RestResult<noosfero.Environment>) => {
            let environment = result.data;
            environmentService.setCurrentEnvironment(environment);
            return environment;
        });
    }
}
