import { CommentService } from './../../lib/ng-noosfero-api/http/comment.service';
import { CommentParagraphService } from './../../plugins/comment_paragraph/http/comment-paragraph.service';
import { CommentParagraphEventService } from './../../plugins/comment_paragraph/events/comment-paragraph-event.service';
import { PermissionService } from './../shared/services/permission.service';
import * as theme from '../../../themes';
import * as plugins from '../../plugins';
import { RegisterComponent } from '../account/register.component';
import { DomainComponent } from '../domain/domain.component';
import { BlockContentComponent } from '../layout/blocks/block-content.component';
import { BlockComponent } from '../layout/blocks/block.component';
import { MainBlockComponent } from '../layout/blocks/main/main-block.component';
import { BoxesComponent } from '../layout/boxes/boxes.component';
import { Navbar } from '../layout/navbar/navbar';
<<<<<<< HEAD
<<<<<<< 4362cb61dfa62b4c6d1702acf4250cf7ac93fb15
import { ThemeFooterComponent } from '../layout/theme-footer/theme-footer.component';
=======
=======
>>>>>>> 3b2a38ceb4e133d437ebeafda9b5a415c9e76fbf
import { ThemeHeaderComponent } from '../layout/theme-header/theme-header.component';
>>>>>>> Migrate theme footer component to angular 2
import { AuthService } from '../login/auth.service';
import { PasswordComponent } from '../login/new-password.component';
import { SessionService } from '../login/session.service';
import { CustomContentComponent } from '../profile/custom-content/custom-content.component';
import { ProfileComponent } from '../profile/profile.component';
import { SearchComponent } from '../search/search.component';
import { BootstrapResizableDirective } from '../shared/components/bootstrap-resizable/bootstrap-resizable.directive';
import { EditableDirective } from '../shared/components/editable/editable.directive';
import { PermissionDirective } from '../shared/components/permission/permission.directive';
import { DateFormat } from '../shared/pipes/date-format.filter';
import { NoosferoTemplate } from '../shared/pipes/noosfero-template.filter';
import { NoosferoUrl } from '../shared/pipes/noosfero-url.filter';
import { EventsHubService } from '../shared/services/events-hub.service';
import { NotificationService } from '../shared/services/notification.service';
import { CommunityService } from './../../lib/ng-noosfero-api/http/community.service';
import { EnvironmentService } from './../../lib/ng-noosfero-api/http/environment.service';
import { SettingsService } from './../../lib/ng-noosfero-api/http/settings.service';
import { UserService } from './../../lib/ng-noosfero-api/http/user.service';
import { ArticleViewComponent } from './../article/article-default-view.component';
import { ArticleEditorComponent } from './../article/cms/article-editor/article-editor.component';
import { BasicOptionsComponent } from './../article/cms/basic-options/basic-options.component';
import { ArticleBlogComponent } from './../article/types/blog/blog.component';
import { FolderComponent } from './../article/types/folder/folder.component';
import { TranslateProfile } from './../shared/pipes/translate-profile.filter';
import { BodyStateClassesService } from './../shared/services/body-state-classes.service';
import { HeaderService } from './../shared/services/header.service';
import { TaskAcceptComponent } from './../task/task-list/task-accept.component';
import { Component, Inject, provide } from 'ng-forward';

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
@Inject(BodyStateClassesService, HeaderService)
export class MainContentComponent {

    public themeSkin: string = 'skin-default';

    constructor(
        private bodyStateClassesService: BodyStateClassesService,
        private headerService: HeaderService,
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
        ProfileComponent, MainBlockComponent, Navbar, NoosferoTemplate, NoosferoUrl, DateFormat, PasswordComponent,
        CustomContentComponent, PermissionDirective, SearchComponent,
        BlockComponent, RegisterComponent, TaskAcceptComponent,
        FolderComponent, BootstrapResizableDirective,
        EditableDirective,
        DomainComponent,
        ArticleEditorComponent, BasicOptionsComponent, TranslateProfile
    ].concat(plugins.mainComponents).concat(plugins.hotspots).concat(theme.components["angular-default"]),
    providers: [AuthService, SessionService, NotificationService, BodyStateClassesService, CommunityService, UserService,
        PermissionService, CommentParagraphEventService, CommentParagraphService, CommentService,
        "ngAnimate", "ngCookies", "LocalStorageModule", "ngTouch", "ngSanitize", "ngMessages", "ngAria", "restangular",
        "ui.router", "ui.bootstrap", "toastr", "angular-bind-html-compile", "angularMoment",
        "angular.filter", "akoenig.deckgrid", "angular-timeline", "duScroll", "oitozero.ngSweetAlert",
        "pascalprecht.translate", "tmh.dynamicLocale", "angularLoad", "angular-click-outside", "ngTagCloud",
        "noosfero.init", "ngFileUpload", "ngImgCrop", "angular-ladda", "focus-if",
        "xeditable", "com.2fdevs.videogular", "com.2fdevs.videogular.plugins.controls", "com.2fdevs.videogular.plugins.overlayplay",
        "com.2fdevs.videogular.plugins.poster", "com.2fdevs.videogular.plugins.buffering",
        "info.vietnamcode.nampnq.videogular.plugins.youtube", "dndLists", "angular-loading-bar",
        provide('bodyStateClassesService', { useClass: BodyStateClassesService }),
        provide('headerService', { useClass: HeaderService }),
        provide('SettingsService', { useClass: SettingsService }),
        provide('environmentService', { useClass: EnvironmentService })
    ]
})
@Inject(EnvironmentService)
export class MainComponent {

}
