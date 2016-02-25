
import * as noosfero from "../models/interfaces";

import {ArticleDirective, ArticleView} from "../components/noosfero-articles/article/article.directive";
import {Input, Component, StateConfig} from "ng-forward";

@Component({
    selector: "content-viewer",
    template: "",
    providers: [
        "noosferoService", "$log", "$stateParams"
    ]
})
export class ContentViewerController {

    @Input()
    article: noosfero.Article = null;

    @Input()
    profile: noosfero.Profile = null;

    constructor(private noosfero: any, private $log: ng.ILogService, private $stateParams: angular.ui.IStateParamsService) {
        this.activate();
    }

    activate() {
        this.noosfero.currentProfile.then(function(profile) {
            this.profile = profile;
            return this.noosfero.profiles.one(this.profile.id).one("articles").get({ path: this.$stateParams.page });
        }).then(function(response) {
            this.article = response.data.article;
        });
    }
}
