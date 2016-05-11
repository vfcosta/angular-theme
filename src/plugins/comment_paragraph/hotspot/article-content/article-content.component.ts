import { Input, Inject, Component } from "ng-forward";
import {Hotspot} from "../../../../app/hotspot/hotspot.decorator";

@Component({
    selector: "comment-paragraph-article-content-hotspot",
    templateUrl: "plugins/comment_paragraph/hotspot/article-content/article-content.html",
})
@Hotspot("article_extra_content")
export class CommentParagraphArticleContentHotspotComponent {

    @Input() article: noosfero.Article;

    isDiscussion() {
        return this.article.type === "CommentParagraphPlugin::Discussion";
    }
}
