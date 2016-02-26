import {bundle, Component, StateConfig} from "ng-forward";
import {NoosferoArticleBlog} from "./../components/noosfero-articles/blog/blog.component.ts";

import {ArticleDirective} from "../components/noosfero-articles/article/article.directive.ts";

import {Profile} from "../profile/profile.component";

@Component({
    selector: 'main-content',
    templateUrl: "app/main/main.html",
})
export class MainContent {

}

@Component({
    selector: 'main',
    template: '<div ng-view></div>',
    directives: [NoosferoArticleBlog, ArticleDirective]
})
@StateConfig([
    {
        url: '/',
        component: MainContent,
        name: 'main',
        resolve: {
            currentUser: function(AuthService) {
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
