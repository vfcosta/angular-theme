import {StateConfig, Component, Inject, provide} from 'ng-forward';
import {Profile} from "./../models/interfaces";
import {ArticleService} from "../../lib/ng-noosfero-api/http/article.service";
import {ProfileService} from "../../lib/ng-noosfero-api/http/profile.service";

@Component({
    selector: 'cms',
    templateUrl: "app/cms/cms.html",
    providers: [
        provide('articleService', { useClass: ArticleService }),
        provide('profileService', { useClass: ProfileService })
    ]
})
@Inject(ArticleService, ProfileService, "$state", "SweetAlert")
export class Cms {

    article: any = {};

    constructor(private articleService: ArticleService,
        private profileService: ProfileService,
        private $state: ng.ui.IStateService, private SweetAlert: any) { }

    save() {
        this.profileService.getCurrentProfile().then((profile: Profile) => {
            return this.articleService.create(profile.id, this.article);
        }).then((article: noosfero.Article) => {
            this.$state.transitionTo('main.profile.page', { page: article.path, profile: article.profile.identifier });
            this.SweetAlert.swal({
                title: "Good job!",
                text: "Article saved!",
                type: "success",
                timer: 1000
            });
        });
    }

}
