import {Component, Input} from "ng-forward";
import {SideCommentsComponent} from "../side-comments/side-comments.component";

@Component({
    selector: "comment-paragraph-plugin-allow-comment",
    templateUrl: "plugins/comment_paragraph/allow-comment/allow-comment.html",
    directives: [SideCommentsComponent]
})
export class AllowCommentComponent {

    @Input() content: string;
    @Input() paragraphUuid: string;
    @Input() article: noosfero.Article;

    isActivated() {
        return this.article.setting.comment_paragraph_plugin_activate;
    }
}
