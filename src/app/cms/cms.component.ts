import {StateConfig, Component, Inject, provide} from 'ng-forward';
import {ArticleService} from "../../lib/ng-noosfero-api/http/article.service";
import {ProfileService} from "../../lib/ng-noosfero-api/http/profile.service";
import {Notification} from "../components/notification/notification.component";

@Component({
    selector: 'cms',
    templateUrl: "app/cms/cms.html",
    providers: [
        provide('articleService', { useClass: ArticleService }),
        provide('profileService', { useClass: ProfileService }),
        provide('notification', { useClass: Notification })
    ]
})
@Inject(ArticleService, ProfileService, "$state", Notification)
export class Cms {

    article: noosfero.Article = <noosfero.Article>{};

    constructor(private articleService: ArticleService,
        private profileService: ProfileService,
        private $state: ng.ui.IStateService,
        private notification: Notification) { }

    save() {
        this.profileService.getCurrentProfile().then((profile: noosfero.Profile) => {
            return this.articleService.create(this.article, profile);
        }).then((response: noosfero.RestResult<noosfero.Article>) => {
            let article = (<noosfero.Article>response.data);
            this.$state.transitionTo('main.profile.page', { page: article.path, profile: article.profile.identifier });
            this.notification.success("Good job!", "Article saved!");
        });
    }

}
