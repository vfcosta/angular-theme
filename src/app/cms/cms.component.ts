import {StateConfig, Component, Inject, provide} from 'ng-forward';
import {Profile} from "./../models/interfaces";
import {ArticleService} from "../../lib/ng-noosfero-api/http/article.service";

@Component({
    selector: 'cms',
    templateUrl: "app/cms/cms.html",
    providers: [provide('articleService', { useClass: ArticleService })]
})
@Inject(ArticleService, "noosfero", "$stateParams", "$httpParamSerializer", "$state", "SweetAlert")
export class Cms {

    article: any = {};
    profile: any;

    constructor(private articleService: ArticleService, private noosfero: any/* TODO convert noosferoService */, private $stateParams: ng.ui.IStateParamsService, private $httpParamSerializer: any, private $state: ng.ui.IStateService, private SweetAlert: any) {

    }

    save() {
        this.noosfero.currentProfile.then((profile: Profile) => {
            return this.articleService.create(profile.id, this.article);
        }).then((response: restangular.IResponse) => {
            this.$state.transitionTo('main.profile.page', { page: response.data.article.path, profile: response.data.article.profile.identifier });
            this.SweetAlert.swal({
                title: "Good job!",
                text: "Article saved!",
                type: "success",
                timer: 1000
            });
        });
    }

}
