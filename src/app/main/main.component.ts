import {bundle, Component, StateConfig} from "ng-forward";
import {NoosferoArticleBlog} from "./../components/noosfero-articles/blog/blog.component.ts";

import {ArticleView} from "../components/noosfero-articles/article/article_view";

import {Profile} from "../profile/profile.component";
import {Boxes} from "../components/noosfero-boxes/boxes.component";
import {Block} from "../components/noosfero-blocks/block.component";
import {LinkListBlock} from "../components/noosfero-blocks/link-list/link-list.component";


import {AuthService} from "./../components/auth/auth_service";
import {Session} from "./../components/auth/session";

import {Navbar} from "../components/navbar";

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
    directives: [NoosferoArticleBlog, ArticleView, Boxes, Block, LinkListBlock, Navbar],
    providers: [AuthService, Session]
})
@StateConfig([
    {
        url: '/',
        component: MainContent,
        name: 'main',
        resolve: {
            currentUser: function(AuthService: AuthService) {
                return AuthService.loginFromCookie();
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
