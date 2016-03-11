import {bundle, Component, StateConfig} from "ng-forward";
import {ArticleBlog} from "./../components/noosfero-articles/blog/blog.component";

import {ArticleView} from "../components/noosfero-articles/article/article_view";

import {Profile} from "../profile/profile.component";
import {Boxes} from "../components/noosfero-boxes/boxes.component";
import {Block} from "../components/noosfero-blocks/block.component";
import {LinkListBlock} from "../components/noosfero-blocks/link-list/link-list.component";
import {RecentDocumentsBlock} from "../components/noosfero-blocks/recent-documents/recent-documents.component";
import {ProfileImageBlock} from "../components/noosfero-blocks/profile-image-block/profile-image-block.component";
import {RawHTMLBlock} from "../components/noosfero-blocks/raw-html/raw-html.component";

import {MembersBlock} from "../components/noosfero-blocks/members-block/members-block.component";
import {NoosferoTemplate} from "../components/noosfero/noosfero-template.filter";
import {DateFormat} from "../components/noosfero/date-format/date-format.filter";

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
        MainBlock, RecentDocumentsBlock, Navbar, ProfileImageBlock,
        MembersBlock, NoosferoTemplate, DateFormat, RawHTMLBlock
    ],
    providers: [AuthService, Session]
})
@StateConfig([
    {
        url: '/',
        component: MainContent,
        name: 'main',
    },
    {
        url: "^/:profile",
        abstract: true,
        component: Profile,
        name: 'main.profile',
        views: {
            "content": {
                templateUrl: "app/profile/profile.html",
                controller: Profile,
                controllerAs: "vm"
            }
        }
    }
])
export class Main {

}
