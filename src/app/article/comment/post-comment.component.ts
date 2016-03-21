import { Inject, Input, Component } from 'ng-forward';
import { CommentService } from "../../../lib/ng-noosfero-api/http/comment.service";
import { NotificationService } from "../../shared/services/notification.service";

@Component({
    selector: 'post-comment',
    templateUrl: 'app/article/comment/post-comment.html'
})
@Inject(CommentService, NotificationService)
export class PostCommentComponent {

    @Input() article: noosfero.Article;
    comment: noosfero.Comment;

    @Input() replyOf: noosfero.Comment;

    constructor(private commentService: CommentService, private notificationService: NotificationService) { }

    save() {
        if (this.replyOf) {
            this.comment.reply_of_id = this.replyOf.id;
        }
        this.commentService.createInArticle(this.article, this.comment).then(() => {
            this.notificationService.success({ title: "Good job!", message: "Comment saved!" });
        });
    }
}
