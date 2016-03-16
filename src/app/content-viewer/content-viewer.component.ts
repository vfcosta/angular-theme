import * as noosfero from "../models/interfaces";


import {ArticleView} from "../components/noosfero-articles/article/article_view";
import {Input, Component, StateConfig, Inject, provide} from "ng-forward";

import {ArticleBlog} from "./../components/noosfero-articles/blog/blog.component";
import {ArticleService} from "../../lib/ng-noosfero-api/http/article.service";
import {ProfileService} from "../../lib/ng-noosfero-api/http/profile.service";

@Component({
    selector: "content-viewer",
    templateUrl: "app/content-viewer/page.html",
    directives: [ArticleBlog, ArticleView],
    providers: [
        provide('articleService', { useClass: ArticleService }),
        provide('profileService', { useClass: ProfileService })
    ]
})
@Inject(ArticleService, ProfileService, "$log", "$stateParams")
export class ContentViewer {

    @Input()
    article: noosfero.Article = null;

    @Input()
    profile: noosfero.Profile = null;

    constructor(private articleService: ArticleService, private profileService: ProfileService, private $log: ng.ILogService, private $stateParams: angular.ui.IStateParamsService) {
        this.profileService.getCurrentProfile().then((profile: noosfero.Profile) => {
            this.profile = profile;
            return this.articleService.getByProfile(this.profile.id, { path: this.$stateParams["page"] });
        }).then((response: restangular.IResponse) => {
            this.article = response.data.article;
        });
    }
}
