import {Component, Input} from "ng-forward";

@Component({
    selector: "comment-paragraph-plugin-allow-comment",
    templateUrl: "plugins/comment_paragraph/allow-comment/allow-comment.html"
})
export class AllowComment {

    @Input() content: string;
    @Input() paragraphUuid: string;
    @Input() article: noosfero.Article;

    constructor() {
        console.log("ALLOW COMMENT");
    }
}
