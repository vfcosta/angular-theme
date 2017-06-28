import { TranslatePipe } from './../shared/pipes/translate-pipe';
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
import { PermissionDirective } from '../shared/components/permission/permission.directive';
import { NoosferoTemplate } from '../shared/pipes/noosfero-template.filter';
import { EventsHubService } from '../shared/services/events-hub.service';
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
@Inject("bodyStateClassesService", "eventsHubService")
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
        ProfileComponent, MainBlockComponent, NoosferoTemplate, TranslatePipe,
        PermissionDirective,
        BlockComponent,
        DomainComponent,
    ].concat(plugins.mainComponents).concat(plugins.hotspots),
    providers: [
        "ngAnimate", "ngCookies", "ngTouch", "ngSanitize", "ngMessages", "ngAria",
        "ui.router", "ui.bootstrap", "angular-bind-html-compile",
        "angular.filter", "akoenig.deckgrid", "angular-timeline", "duScroll",
        "angular-click-outside", "ngTagCloud",
        "noosfero.init", "ngFileUpload", "ngImgCrop", "angular-ladda", "focus-if",
        "xeditable", "com.2fdevs.videogular", "com.2fdevs.videogular.plugins.controls", "com.2fdevs.videogular.plugins.overlayplay",
        "com.2fdevs.videogular.plugins.poster", "com.2fdevs.videogular.plugins.buffering",
        "info.vietnamcode.nampnq.videogular.plugins.youtube", "dndLists", "angular-loading-bar"
    ]
})
@Inject("environmentService")
export class MainComponent {

}