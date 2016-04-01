import { Inject, Input, Component } from 'ng-forward';
import { CommentService } from "../../../../lib/ng-noosfero-api/http/comment.service";
import { NotificationService } from "../../../shared/services/notification.service";

@Component({
    selector: 'noosfero-post-comment',
    templateUrl: 'app/article/comment/post-comment/post-comment.html'
})
@Inject(CommentService, NotificationService, "$scope")
export class PostCommentComponent {

    public static EVENT_COMMENT_RECEIVED = "comment.received";

    @Input() article: noosfero.Article;
    @Input() parent: noosfero.Comment;

    comment = <noosfero.Comment>{};

    constructor(private commentService: CommentService, private notificationService: NotificationService, private $scope: ng.IScope) { }

    save() {
        if (this.parent && this.comment) {
            this.comment.reply_of_id = this.parent.id;
        }
        this.commentService.createInArticle(this.article, this.comment).then((result: noosfero.RestResult<noosfero.Comment>) => {
            this.$scope.$emit(PostCommentComponent.EVENT_COMMENT_RECEIVED, result.data);
            this.comment.body = "";
            this.notificationService.success({ title: "Good job!", message: "Comment saved!" });
        });
    }
}
