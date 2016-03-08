import * as noosfero from "../models/interfaces";


import {ArticleView} from "../components/noosfero-articles/article/article_view";
import {Input, Component, StateConfig, Inject, provide} from "ng-forward";

import {ArticleBlog} from "./../components/noosfero-articles/blog/blog.component";
import {ArticleService} from "../../lib/ng-noosfero-api/http/article.service";

@Component({
    selector: "content-viewer",
    templateUrl: "app/content-viewer/page.html",
    directives: [ArticleBlog, ArticleView],
    providers: [provide('articleService', { useClass: ArticleService })]
})
@Inject(ArticleService, "noosfero", "$log", "$stateParams")
export class ContentViewer {

    @Input()
    article: noosfero.Article = null;

    @Input()
    profile: noosfero.Profile = null;

    constructor(private articleService: ArticleService, private noosfero: any, private $log: ng.ILogService, private $stateParams: angular.ui.IStateParamsService) {
        this.activate();
    }

    activate() {
        this.noosfero.currentProfile.then((profile: noosfero.Profile) => {
            this.profile = profile;
            return this.articleService.getByProfile(this.profile.id, { path: this.$stateParams["page"] });
        }).then((response: restangular.IResponse) => {
            this.article = response.data.article;
        });
    }
}
