import { CommentParagraphEventService } from './../../plugins/comment_paragraph/events/comment-paragraph-event.service';
import * as plugins from '../../plugins';
import { RegisterComponent } from '../account/register.component';
import { DomainComponent } from '../domain/domain.component';
import { BlockContentComponent } from '../layout/blocks/block-content.component';
import { BlockComponent } from '../layout/blocks/block.component';
import { MainBlockComponent } from '../layout/blocks/main/main-block.component';
import { BoxesComponent } from '../layout/boxes/boxes.component';
import { PasswordComponent } from '../login/new-password.component';
import { ProfileComponent } from '../profile/profile.component';
import { SearchComponent } from '../search/search.component';
import { BootstrapResizableDirective } from '../shared/components/bootstrap-resizable/bootstrap-resizable.directive';
import { PermissionDirective } from '../shared/components/permission/permission.directive';
import { NoosferoTemplate } from '../shared/pipes/noosfero-template.filter';
import { EventsHubService } from '../shared/services/events-hub.service';
import { NotificationService } from '../shared/services/notification.service';
import { BodyStateClassesService } from './../shared/services/body-state-classes.service';
import { Component, Inject, provide } from 'ng-forward';
/**
 * @ngdoc controller
 * @name main.MainContentComponent
 * @descrition
 *  This controller actually contains the main content of Noosfero Angular Theme:
 *  - the navbar
 *  - the {@link Main} view content
 *
 */
@Component({
    selector: 'main-content',
    templateUrl: "app/main/main.html",
})
@Inject(BodyStateClassesService)
export class MainContentComponent {

    public themeSkin: string = 'skin-default';

    constructor(
        private bodyStateClassesService: BodyStateClassesService,
        eventsHubService: EventsHubService) {
        bodyStateClassesService.start({
            skin: this.themeSkin
        });
    }
}

@Component({
    selector: 'environment-content',
    templateUrl: "app/main/main.html",
})
export class EnvironmentContent {

}

/**
 * @ngdoc controller
 * @name main.Main
 * @requires AuthService, Session, Notification, ArticleBlog, ArticleView, Boxes, Block, LinkListBlock,
 * MainBlock, RecentDocumentsBlock, Navbar, ProfileImageBlock, MembersBlock,
 * NoosferoTemplate, RawHTMLBlock, PersonTagsPluginInterestsBlock,
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
        BoxesComponent, BlockContentComponent,
        ProfileComponent, MainBlockComponent, NoosferoTemplate,
        PermissionDirective,
        BlockComponent,
        BootstrapResizableDirective,
        DomainComponent,
    ].concat(plugins.mainComponents).concat(plugins.hotspots),
    providers: [NotificationService, BodyStateClassesService, CommentParagraphEventService,
        "ngAnimate", "ngCookies", "LocalStorageModule", "ngTouch", "ngSanitize", "ngMessages", "ngAria",
        "ui.router", "ui.bootstrap", "toastr", "angular-bind-html-compile", "angularMoment",
        "angular.filter", "akoenig.deckgrid", "angular-timeline", "duScroll", "oitozero.ngSweetAlert",
        "pascalprecht.translate", "tmh.dynamicLocale", "angularLoad", "angular-click-outside", "ngTagCloud",
        "noosfero.init", "ngFileUpload", "ngImgCrop", "angular-ladda", "focus-if",
        "xeditable", "com.2fdevs.videogular", "com.2fdevs.videogular.plugins.controls", "com.2fdevs.videogular.plugins.overlayplay",
        "com.2fdevs.videogular.plugins.poster", "com.2fdevs.videogular.plugins.buffering",
        "info.vietnamcode.nampnq.videogular.plugins.youtube", "dndLists", "angular-loading-bar",
        provide('bodyStateClassesService', { useClass: BodyStateClassesService }),
        provide('eventsHubService', { useClass: EventsHubService })
    ]
})
@Inject("environmentService")
export class MainComponent {

}