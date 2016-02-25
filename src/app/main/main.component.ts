import {bundle, Component, StateConfig} from 'ng-forward';
import {NoosferoArticleBlog} from "./../components/noosfero-articles/blog/blog.component.ts";

import {ArticleDirective} from "../components/noosfero-articles/article/article.directive.ts";

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
    }
])
export class Main {

}
