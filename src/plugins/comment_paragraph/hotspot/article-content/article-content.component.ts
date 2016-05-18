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

    notOpened() {
        let now = new Date();
        return !!this.article.start_date && new Date(this.article.start_date) > now;
    }

    available() {
        let now = new Date();
        return (!this.article.start_date || new Date(this.article.start_date) <= now) &&
            (!this.article.end_date || new Date(this.article.end_date) >= now);
    }

    closed() {
        let now = new Date();
        return !!this.article.end_date && new Date(this.article.end_date) < now;
    }
}
