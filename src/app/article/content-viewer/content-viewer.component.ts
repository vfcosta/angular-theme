import {Input, Component, Inject, provide} from "ng-forward";

import {ArticleService} from "../../../lib/ng-noosfero-api/http/article.service";
import {ProfileService} from "../../../lib/ng-noosfero-api/http/profile.service";

@Component({
    selector: "content-viewer",
    templateUrl: "app/article/content-viewer/page.html",
    providers: [
        provide('profileService', { useClass: ProfileService })
    ]
})
@Inject("articleService", "profileService", "$stateParams", "$state")
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
        this.profileService.getCurrentProfile().then((profile: noosfero.Profile) => {
            this.profile = profile;
            return this.articleService.getArticleByProfileAndPath(this.profile, this.$stateParams["page"]);
        }).then((result: noosfero.RestResult<any>) => {
            this.article = <noosfero.Article>result.data;
            this.articleService.setCurrent(this.article);
        });
    }
}
