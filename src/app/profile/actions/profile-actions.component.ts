import { Component, Input, Inject } from "ng-forward";
import { ArticleService } from "../../../lib/ng-noosfero-api/http/article.service";

@Component({
    selector: "profile-actions",
    templateUrl: "app/profile/actions/profile-actions.html"
})
@Inject(ArticleService)
export class ProfileActionsComponent {

    @Input() profile: noosfero.Profile;
    article: noosfero.Article;
    parentId: number;

    constructor(articleService: ArticleService) {
        articleService.getCurrent().then((article: noosfero.Article) => {
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
