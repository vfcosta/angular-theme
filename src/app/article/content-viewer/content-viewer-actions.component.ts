import {Component, Inject, provide} from "ng-forward";
import {ProfileService} from "../../../lib/ng-noosfero-api/http/profile.service";
import {ArticleService} from "../../../lib/ng-noosfero-api/http/article.service";

@Component({
    selector: "content-viewer-actions",
    templateUrl: "app/article/content-viewer/navbar-actions.html",
    providers: [
        provide('profileService', { useClass: ProfileService }),
        provide('articleService', { useClass: ArticleService })
    ]
})
@Inject(ProfileService, ArticleService)
export class ContentViewerActionsComponent {

    article: noosfero.Article;
    profile: noosfero.Profile;
    parentId: number;

    constructor(profileService: ProfileService, articleService: ArticleService) {
        profileService.getCurrentProfile().then((profile: noosfero.Profile) => {
            this.profile = profile;
            return articleService.getCurrent();
        }).then((article: noosfero.Article) => {
            this.article = article;
            this.parentId = this.getArticleContainer(article);
        });
    }

    getArticleContainer(article: noosfero.Article) {
        // FIXME get folder types from api
        if (article.type === "Blog" || article.type === "Folder") {
            return article.id;
        } else if (article.parent) {
            return article.parent.id;
        }
    }
}
