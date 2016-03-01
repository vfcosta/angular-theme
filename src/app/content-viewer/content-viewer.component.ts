import * as noosfero from "../models/interfaces";

import {ArticleDirective} from "../components/noosfero-articles/article/article.directive";
import {Input, Component, StateConfig, Inject} from "ng-forward";

import {NoosferoArticleBlog} from "./../components/noosfero-articles/blog/blog.component";

@Component({
    selector: "content-viewer",
    templateUrl: "app/content-viewer/page.html",
    directives: [NoosferoArticleBlog, ArticleDirective]
})
@Inject("noosfero", "$log", "$stateParams")
export class ContentViewer {

    @Input()
    article: noosfero.Article = null;

    @Input()
    profile: noosfero.Profile = null;

    constructor(private noosfero: any, private $log: ng.ILogService, private $stateParams: angular.ui.IStateParamsService) {
        this.activate();
    }

    activate() {
        console.log("HERE CONTENT VIEWER");
        this.noosfero.currentProfile.then((profile) => {
            this.profile = profile;
            return this.noosfero.profiles.one(this.profile.id).one("articles").get({ path: this.$stateParams["page"] });
        }).then((response) => {
            this.article = response.data.article;
        });
    }
}
