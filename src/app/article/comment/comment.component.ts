import { Inject, Input, Component, Output, EventEmitter } from 'ng-forward';
import { PostCommentComponent } from "./post-comment/post-comment.component";
import { CommentService } from "../../../lib/ng-noosfero-api/http/comment.service";
import { NotificationService } from "../../shared/services/notification.service";

@Component({
    selector: 'noosfero-comment',
    templateUrl: 'app/article/comment/comment.html'
})
@Inject(CommentService, NotificationService)
export class CommentComponent {

    @Input() comment: noosfero.CommentViewModel;
    @Input() article: noosfero.Article;
    @Input() displayActions = true;
    @Input() displayReplies = true;

    showReply() {
        return this.comment && this.comment.__show_reply === true;
    }

    constructor(private commentService: CommentService,
        private notificationService: NotificationService) { }

    reply() {
        this.comment.__show_reply = !this.comment.__show_reply;
    }

    allowRemove() {
        return true;
    }

    remove() {
        this.notificationService.confirmation({ title: "comment.remove.confirmation.title", message: "comment.remove.confirmation.message" }, () => {
            this.commentService.removeFromArticle(this.article, this.comment).then((result: noosfero.RestResult<noosfero.Comment>) => {
                // FIXME send event
                this.notificationService.success({ title: "comment.remove.success.title", message: "comment.remove.success.message" });
            });
        });
    }
}
