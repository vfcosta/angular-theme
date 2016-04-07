import { Inject, Input, Component } from 'ng-forward';
import { CommentService } from "../../../../lib/ng-noosfero-api/http/comment.service";
import { NotificationService } from "../../../shared/services/notification.service";
import { SessionService } from "../../../login";
import { PostCommentEventService } from "./post-comment-event.service";
import { CommentFormHotspotComponent } from "../../../hotspot/comment-form-hotspot.component";

@Component({
    selector: 'noosfero-post-comment',
    templateUrl: 'app/article/comment/post-comment/post-comment.html',
    directives: [CommentFormHotspotComponent]
})
@Inject(CommentService, NotificationService, SessionService, PostCommentEventService)
export class PostCommentComponent {

    public static EVENT_COMMENT_RECEIVED = "comment.received";

    @Input() article: noosfero.Article;
    @Input() parent: noosfero.Comment;

    comment = <noosfero.Comment>{};
    private currentUser: noosfero.User;

    constructor(private commentService: CommentService,
        private notificationService: NotificationService,
        private session: SessionService,
        private postCommentEventService: PostCommentEventService) {
        this.currentUser = this.session.currentUser();
    }

    save() {
        if (this.parent && this.comment) {
            this.comment.reply_of_id = this.parent.id;
        }
        this.commentService.createInArticle(this.article, this.comment).then((result: noosfero.RestResult<noosfero.Comment>) => {
            this.postCommentEventService.emit(result.data);
            this.comment.body = "";
            this.notificationService.success({ title: "comment.post.success.title", message: "comment.post.success.message" });
        });
    }
}
