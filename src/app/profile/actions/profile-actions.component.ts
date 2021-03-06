import { Component, Input, Inject, ViewEncapsulation } from '@angular/core';
import { ArticleService } from '../../../lib/ng-noosfero-api/http/article.service';

@Component({
    selector: "profile-actions",
    templateUrl: './profile-actions.html',
    styleUrls: ['./profile-actions.scss'],
    encapsulation: ViewEncapsulation.None,
})
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
        return null;
    }
}
