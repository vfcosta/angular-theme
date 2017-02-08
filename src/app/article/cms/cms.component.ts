import { Component, Inject, provide } from 'ng-forward';
import { ArticleService } from "../../../lib/ng-noosfero-api/http/article.service";
import { ProfileService } from "../../../lib/ng-noosfero-api/http/profile.service";
import { NotificationService } from "../../shared/services/notification.service";
import { BasicOptionsComponent } from './basic-options/basic-options.component';
import { BasicEditorComponent } from './basic-editor/basic-editor.component';
import { ArticleEditorComponent } from './article-editor/article-editor.component';

@Component({
    selector: 'article-cms',
    templateUrl: "app/article/cms/cms.html",
    providers: [
        provide('articleService', { useClass: ArticleService }),
        provide('profileService', { useClass: ProfileService }),
        provide('notificationService', { useClass: NotificationService })
    ]
})
@Inject(ArticleService, ProfileService, "$state", NotificationService, "$stateParams", "$window")
export class CmsComponent {

    article: noosfero.Article;
    parent: noosfero.Article = <noosfero.Article>{};

    id: number;
    parentId: number;
    profileIdentifier: string;
    loading: boolean | number;

    constructor(private articleService: ArticleService,
        private profileService: ProfileService,
        private $state: ng.ui.IStateService,
        private notificationService: NotificationService,
        private $stateParams: ng.ui.IStateParamsService,
        private $window: ng.IWindowService) {

        this.parentId = this.$stateParams['parent_id'];
        this.profileIdentifier = this.$stateParams["profile"];
        this.id = this.$stateParams['id'];

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
        this.profileService.setCurrentProfileByIdentifier(this.profileIdentifier).then((profile: noosfero.Profile) => {
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
        }).catch(() => {
            this.loading = false;
            this.notificationService.error({ message: "article.basic_editor.save.failed" });
        });
    }

    cancel() {
        this.$window.history.back();
    }

}
