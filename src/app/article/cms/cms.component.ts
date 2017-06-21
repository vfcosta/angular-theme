import { EventsHubService } from './../../shared/services/events-hub.service';
import { Component, Inject, provide } from 'ng-forward';
import { ArticleService } from "../../../lib/ng-noosfero-api/http/article.service";
import { ProfileService } from "../../../lib/ng-noosfero-api/http/profile.service";
import { NotificationService } from "../../shared/services/notification.service";
import { BasicOptionsComponent } from './basic-options/basic-options.component';

@Component({
    selector: 'article-cms',
    templateUrl: "app/article/cms/cms.html",
})
@Inject("articleService", "profileService", "$state", "notificationService", "$stateParams", "$window", "eventsHubService")
export class CmsComponent {

    article: noosfero.Article;
    parent: noosfero.Article = <noosfero.Article>{};
    profile: noosfero.Profile;

    id: number;
    parentId: number;
    profileIdentifier: string;
    loading: boolean | number;
    path: string;


    constructor(private articleService: ArticleService,
        private profileService: ProfileService,
        private $state: ng.ui.IStateService,
        private notificationService: NotificationService,
        private $stateParams: ng.ui.IStateParamsService,
        private $window: ng.IWindowService,
        private EventsHubService: EventsHubService) {

        this.parentId = this.$stateParams['parent_id'];
        this.profileIdentifier = this.$stateParams["profile"];
        this.id = this.$stateParams['id'];

        this.path = $window.location.pathname;

        this.profileService.setCurrentProfileByIdentifier(this.profileIdentifier).then((profile: noosfero.Profile) => {
            this.profile = profile;
        });

        if (this.parentId) {
            this.articleService.get(this.parentId).then((result: noosfero.RestResult<noosfero.Article>) => {
                this.parent = result.data;
            });
        }
        if (this.id) {
            this.articleService.get(this.id).then((result: noosfero.RestResult<noosfero.Article>) => {
                this.article = result.data;
                this.article.name = this.article.title; // FIXME
            });
        } else {
            this.article = <noosfero.Article>{ type: this.$stateParams['type'] || "TextArticle", published: true };
        }
    }

    save() {
        this.loading = true;

        this.profileService.getCurrentProfile().then((profile: noosfero.Profile) => {
            if (this.id) {
                return this.articleService.updateArticle(this.article);
            } else if (this.parentId) {
                return this.articleService.createInParent(this.parentId, this.article);
            } else {
                return this.articleService.createInProfile(profile, this.article);
            }
        }).then((response: noosfero.RestResult<noosfero.Article>) => {
            let article = (<noosfero.Article>response.data);
            this.$state.go('main.profile.page', { page: article.path, profile: article.profile.identifier });
            this.notificationService.success({ message: `article.basic_editor.${article.type.replace(/.*::/, '')}.success.message` });
        }).catch((error: any) => {
            this.loading = false;
            this.EventsHubService.emitEvent(this.EventsHubService.knownEvents.ARTICLE_SAVE_ERROR, error);
            this.notificationService.error({ message: "article.basic_editor.save.failed" });
        });
    }

    cancel() {
        this.$window.history.back();
    }

}
