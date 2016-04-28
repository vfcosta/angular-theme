import {StateConfig, Component, Inject, provide} from 'ng-forward';
import {ArticleService} from "../../../lib/ng-noosfero-api/http/article.service";
import {ProfileService} from "../../../lib/ng-noosfero-api/http/profile.service";
import {NotificationService} from "../../shared/services/notification.service.ts";

@Component({
    selector: 'article-basic-editor',
    templateUrl: "app/article/basic-editor/basic-editor.html",
    providers: [
        provide('articleService', { useClass: ArticleService }),
        provide('profileService', { useClass: ProfileService }),
        provide('notification', { useClass: NotificationService })
    ]
})
@Inject(ArticleService, ProfileService, "$state", NotificationService, "$stateParams", "$window")
export class BasicEditorComponent {

    article: noosfero.Article = <noosfero.Article>{ type: "TextArticle" };
    parent: noosfero.Article = <noosfero.Article>{};

    id: number;
    parentId: number;
    profileIdentifier: string;
    editorOptions = {};

    constructor(private articleService: ArticleService,
        private profileService: ProfileService,
        private $state: ng.ui.IStateService,
        private notification: NotificationService,
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
        }
    }

    save() {
        this.profileService.setCurrentProfileByIdentifier(this.profileIdentifier).then((profile: noosfero.Profile) => {
            if (this.id) {
                return this.articleService.updateArticle(this.article);
            } else {
                return this.articleService.createInParent(this.parentId, this.article);
            }
        }).then((response: noosfero.RestResult<noosfero.Article>) => {
            let article = (<noosfero.Article>response.data);
            this.$state.go('main.profile.page', { page: article.path, profile: article.profile.identifier });
            this.notification.success({ title: "article.basic_editor.success.title", message: "article.basic_editor.success.message" });
        });
    }

    cancel() {
        this.$window.history.back();
    }

}
