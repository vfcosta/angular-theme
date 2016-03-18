import {StateConfig, Component, Inject, provide} from 'ng-forward';
import {ArticleService} from "../../lib/ng-noosfero-api/http/article.service";
import {ProfileService} from "../../lib/ng-noosfero-api/http/profile.service";
import {NotificationService} from "../shared/services/notification.service.ts";

@Component({
    selector: 'article-basic-editor',
    templateUrl: "app/article/basic-editor.html",
    providers: [
        provide('articleService', { useClass: ArticleService }),
        provide('profileService', { useClass: ProfileService }),
        provide('notification', { useClass: NotificationService })
    ]
})
@Inject(ArticleService, ProfileService, "$state", NotificationService)
export class BasicEditorComponent {

    article: noosfero.Article = <noosfero.Article>{};

    constructor(private articleService: ArticleService,
        private profileService: ProfileService,
        private $state: ng.ui.IStateService,
        private notification: NotificationService) { }

    save() {
        this.profileService.getCurrentProfile().then((profile: noosfero.Profile) => {
            return this.articleService.createInProfile(profile, this.article);
        }).then((response: noosfero.RestResult<noosfero.Article>) => {
            let article = (<noosfero.Article>response.data);
            this.$state.transitionTo('main.profile.page', { page: article.path, profile: article.profile.identifier });
            this.notification.success("Good job!", "Article saved!");
        });
    }

}
