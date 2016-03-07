import {bundle, Component, StateConfig} from "ng-forward";
import {ArticleBlog} from "./../components/noosfero-articles/blog/blog.component";

import {ArticleView} from "../components/noosfero-articles/article/article_view";

import {Profile} from "../profile/profile.component";
import {Boxes} from "../components/noosfero-boxes/boxes.component";
import {Block} from "../components/noosfero-blocks/block.component";
import {LinkListBlock} from "../components/noosfero-blocks/link-list/link-list.component";
import {RecentDocumentsBlock} from "../components/noosfero-blocks/recent-documents/recent-documents.component";
import {ProfileImageBlock} from "../components/noosfero-blocks/profile-image/profile-image.component";
import {MembersBlock} from "../components/noosfero-blocks/members-block/members-block.component";


import {AuthService} from "./../components/auth/auth_service";
import {Session} from "./../components/auth/session";


import {Navbar} from "../components/navbar/navbar";

import {MainBlock} from "../components/noosfero-blocks/main-block/main-block.component";


@Component({
    selector: 'main-content',
    templateUrl: "app/main/main.html",
    providers: [AuthService, Session]
})
export class MainContent {

}

@Component({
    selector: 'main',
    template: '<div ng-view></div>',
    directives: [
        ArticleBlog, ArticleView, Boxes, Block, LinkListBlock,
        MainBlock, RecentDocumentsBlock, Navbar, ProfileImageBlock, MembersBlock
    ],
    providers: [AuthService, Session]
})
@StateConfig([
    {
        url: '/',
        component: MainContent,
        name: 'main',
        resolve: {
            currentUser: function(AuthService: AuthService, $log: ng.ILogService) {
                $log.debug("Main URL service...");
                return AuthService.currentUser();
            }
        }
    },
    {
        url: "^/:profile",
        abstract: true,
        component: Profile,
        name: 'main.profile',
        views: {
            "content": {
                templateUrl: "app/profile/profile.html",
                controller: "ProfileController",
                controllerAs: "vm"
            }
        }
    }
])
export class Main {

}
