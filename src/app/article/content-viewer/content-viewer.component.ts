import {ArticleViewComponent} from "./../article-default-view.component";
import {Input, Component, Inject, provide} from "ng-forward";

import {ArticleBlogComponent} from "./../types/blog/blog.component";
import {ArticleService} from "../../../lib/ng-noosfero-api/http/article.service";
import {ProfileService} from "../../../lib/ng-noosfero-api/http/profile.service";

@Component({
    selector: "content-viewer",
    templateUrl: "app/article/content-viewer/page.html",
    directives: [ArticleBlogComponent, ArticleViewComponent],
    providers: [
        provide('articleService', { useClass: ArticleService }),
        provide('profileService', { useClass: ProfileService })
    ]
})
@Inject(ArticleService, ProfileService, "$stateParams", "$state")
export class ContentViewerComponent {

    @Input()
    article: noosfero.Article = null;

    @Input()
    profile: noosfero.Profile = null;

    constructor(
        private articleService: ArticleService,
        private profileService: ProfileService,
        private $stateParams: angular.ui.IStateParamsService,
        private $state: ng.ui.IStateService) {
        this.activate();
    }

    activate() {
        if (!this.$stateParams["page"]) {
            return this.$state.go('main.profile.home', this.$stateParams);
        }
        this.profileService.getCurrentProfile().then((profile: noosfero.Profile) => {
            this.profile = profile;
            return this.articleService.getArticleByProfileAndPath(this.profile, this.$stateParams["page"]);
        }).then((result: noosfero.RestResult<any>) => {
            this.article = <noosfero.Article>result.data;
            this.articleService.setCurrent(this.article);
        });
    }
}
