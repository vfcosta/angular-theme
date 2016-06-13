import { Input, Inject, Component } from "ng-forward";
import {Hotspot} from "../../../app/hotspot/hotspot.decorator";
import {CommentParagraphService} from "../http/comment-paragraph.service";

@Component({
    selector: "export-comment-button-hotspot",
    templateUrl: "plugins/comment_paragraph/hotspot/export-comment-button.html",
})
@Inject(CommentParagraphService)
@Hotspot("article_extra_toolbar_buttons")
export class ExportCommentButtonHotspotComponent {

    @Input() article: noosfero.Article;
    exportCommentPath: any;

    constructor(private commentParagraphService: CommentParagraphService) { }

    isActivated() {
        this.exportCommentPath = ["/api/v1/articles/", this.article.id, "/comment_paragraph_plugin/export"].join("");
        return this.article && this.article.setting && this.article.setting.comment_paragraph_plugin_activate;
    }

}
