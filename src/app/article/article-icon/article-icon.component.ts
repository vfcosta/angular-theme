import { Component, Input } from "ng-forward";

@Component({
    selector: "noosfero-article-icon",
    templateUrl: "app/article/article-icon/article-icon.html"
})
export class ArticleIconComponent {

    @Input() article: noosfero.Article;

    iconClass() {
        return this.article.type.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase().replace(/::/, '-');
    }
}
