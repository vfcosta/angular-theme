import { ArticleContentHotspotComponent } from './../../../../app/hotspot/article-content-hotspot.component';
import { Input, Inject, Injector, Component } from "@angular/core";
import { Hotspot } from "../../../../app/hotspot/hotspot.decorator";

@Component({
    selector: "comment-paragraph-article-content-hotspot",
    template: "<discussion-period [article]='article'></discussion-period>"
})
@Hotspot("article_extra_content")
export class CommentParagraphArticleContentHotspotComponent {

    article: noosfero.Article;

    parent: ArticleContentHotspotComponent;

    constructor(injector: Injector) {
        this.parent = injector.get(ArticleContentHotspotComponent);
        this.article = this.parent.article;
    }
}
