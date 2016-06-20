import * as plugins from "../../plugins";
import {bundle, Component, StateConfig, Inject} from "ng-forward";
import {ArticleBlogComponent} from "./../article/types/blog/blog.component";

import {ArticleViewComponent} from "./../article/article-default-view.component";

import {ProfileComponent} from "../profile/profile.component";
import {BoxesComponent} from "../layout/boxes/boxes.component";
import {BlockContentComponent} from "../layout/blocks/block-content.component";
import {BlockComponent} from "../layout/blocks/block.component";
import {EnvironmentComponent} from "../environment/environment.component";
import {EnvironmentHomeComponent} from "../environment/environment-home.component";
import {PeopleBlockComponent} from "../layout/blocks/people/people-block.component";
import {DisplayContentBlockComponent} from "../layout/blocks/display-content/display-content-block.component";
import {LinkListBlockComponent} from "../layout/blocks/link-list/link-list-block.component";
import {RecentDocumentsBlockComponent} from "../layout/blocks/recent-documents/recent-documents-block.component";
import {ProfileImageBlockComponent} from "../layout/blocks/profile-image/profile-image-block.component";
import {RawHTMLBlockComponent} from "../layout/blocks/raw-html/raw-html-block.component";
import {StatisticsBlockComponent} from "../layout/blocks/statistics/statistics-block.component";
import {PersonTagsPluginInterestsBlockComponent} from "../layout/blocks/person-tags-plugin-interests/person-tags-plugin-interests-block.component";
import {TagsBlockComponent} from "../layout/blocks/tags/tags-block.component";
import {CustomContentComponent} from "../profile/custom-content/custom-content.component";

import {MembersBlockComponent} from "../layout/blocks/members/members-block.component";
import {CommunitiesBlockComponent} from "../layout/blocks/communities/communities-block.component";

import {LoginBlockComponent} from "../layout/blocks/login-block/login-block.component";

import {NoosferoTemplate} from "../shared/pipes/noosfero-template.filter";
import {DateFormat} from "../shared/pipes/date-format.filter";

import {AuthService} from "../login/auth.service";
import {SessionService} from "../login/session.service";
import {EnvironmentService} from "./../../lib/ng-noosfero-api/http/environment.service";
import {NotificationService} from "../shared/services/notification.service";

import {BodyStateClassesService} from "./../layout/services/body-state-classes.service";

import {Navbar} from "../layout/navbar/navbar";

import {SidebarComponent} from "../layout/sidebar/sidebar.component";

import {MainBlockComponent} from "../layout/blocks/main/main-block.component";
import {HtmlEditorComponent} from "../shared/components/html-editor/html-editor.component";
import {PermissionDirective} from "../shared/components/permission/permission.directive";
import {SearchComponent} from "../search/search.component";
import {SearchFormComponent} from "../search/search-form/search-form.component";

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
@Inject(BodyStateClassesService)
export class MainContentComponent {

    public themeSkin: string = 'skin-whbl';

    constructor(private bodyStateClassesService: BodyStateClassesService) {
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
 * NoosferoTemplate, DateFormat, RawHTMLBlock, PersonTagsPluginInterestsBlock
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
    template: '<ui-view></ui-view>',
    directives: [
        ArticleBlogComponent, ArticleViewComponent, BoxesComponent, BlockContentComponent,
        EnvironmentComponent, PeopleBlockComponent, DisplayContentBlockComponent,
        LinkListBlockComponent, CommunitiesBlockComponent, HtmlEditorComponent, ProfileComponent,
        MainBlockComponent, RecentDocumentsBlockComponent, Navbar, SidebarComponent, ProfileImageBlockComponent,
        MembersBlockComponent, NoosferoTemplate, DateFormat, RawHTMLBlockComponent, StatisticsBlockComponent,
        LoginBlockComponent, CustomContentComponent, PermissionDirective, SearchFormComponent, SearchComponent,
        PersonTagsPluginInterestsBlockComponent, TagsBlockComponent, BlockComponent
    ].concat(plugins.mainComponents).concat(plugins.hotspots),
    providers: [AuthService, SessionService, NotificationService, BodyStateClassesService,
        "ngAnimate", "ngCookies", "ngStorage", "ngTouch",
        "ngSanitize", "ngMessages", "ngAria", "restangular",
        "ui.router", "ui.bootstrap", "toastr", "ngCkeditor",
        "angular-bind-html-compile", "angularMoment", "angular.filter", "akoenig.deckgrid",
        "angular-timeline", "duScroll", "oitozero.ngSweetAlert",
        "pascalprecht.translate", "tmh.dynamicLocale", "angularLoad",
        "angular-click-outside", "toggle-switch", "ngTagCloud", "noosfero.init"]
})
@StateConfig([
    {
        url: '',
        component: MainContentComponent,
        abstract: true,
        name: 'main',
        resolve: {
            currentUser: function(AuthService: AuthService) {
                return AuthService.loginFromCookie();
            },
            currentEnvironment: function(EnvironmentService: EnvironmentService) {
                return EnvironmentService.get();
            }
        }
    },
    {
        url: '/',
        component: EnvironmentComponent,
        name: 'main.environment',
        abstract: true,
        views: {
            "content": {
                templateUrl: "app/environment/environment.html",
                controller: EnvironmentComponent,
                controllerAs: "vm"
            }
        }
    },
    {
        url: "^/:profile",
        abstract: true,
        component: ProfileComponent,
        name: 'main.profile',
        views: {
            "content": {
                templateUrl: "app/profile/profile.html",
                controller: ProfileComponent,
                controllerAs: "vm"
            }
        }
    }
])
export class MainComponent { }
